import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from './store';

Vue.use(VueI18n);

// Load all locales and remember context
function loadMessages() {
  const context = require.context('./locales', true, /[a-z0-9-_]+\.json$/i);

  const messages = context
    .keys()
    .map((key) => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      // eslint-disable-next-line no-shadow
      (messages, { key, locale }) => ({
        ...messages,
        [locale]: context(key),
      }),
      {},
    );

  return { messages };
}

const { messages } = loadMessages();

const i18n = new VueI18n({
  locale: store.state.locale, // set locale
  messages, // set locale messages
  fallbackLocale: 'en',
});

export function changeLocale(locale) {
  i18n.locale = locale;
}

export default i18n;

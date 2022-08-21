import Vue from 'vue';
import VueI18n from 'vue-i18n';
import validationMessagesEn from 'vee-validate/dist/locale/en.json';
import validationMessagesEs from 'vee-validate/dist/locale/es.json';
import store from './store';

Vue.use(VueI18n);

// Load all locales and remember context
export function loadMessages() {
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

  messages.en = {
    ...messages.en,
    validations: validationMessagesEn,
  };

  messages.es = {
    ...messages.es,
    validations: validationMessagesEs,
  };
  return { messages };
}

const { messages } = loadMessages();

const i18n = new VueI18n({
  locale: store.state.locale, // set locale
  messages, // set locale messages
  fallbackLocale: 'en',
});

export default i18n;

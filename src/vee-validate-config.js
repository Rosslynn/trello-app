import Vue from 'vue';

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import i18n from './i18n';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
  ...required,
  message(_, values) {
    return i18n.t('validations.messages.required', values);
  },
});
extend('min', {
  ...min,
  message(_, values) {
    return i18n.t('validations.messages.min', values);
  },
});

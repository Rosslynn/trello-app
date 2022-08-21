/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import Vue from 'vue';

import {
  ValidationProvider, ValidationObserver, extend, configure,
} from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import i18n from './i18n';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

configure({
  // this will be used to generate messages.
  defaultMessage: (field, values) => {
    // Basicamente reemplaza el field por otro valor, eso es totalmente valido
    // La función de messages lo recibe y lo muestra {_field_}
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validations.messages.${values._rule_}`, values);
  },
});

extend('required', required);
extend('min', min);

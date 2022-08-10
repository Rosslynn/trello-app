import Vue from 'vue';
import Vuex from 'vuex';
import boardsModule from './modules/boards';
import notificationsModule from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardsModule,
    notificationsModule,
  },
});

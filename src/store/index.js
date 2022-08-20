import Vue from 'vue';
import Vuex from 'vuex';
import boardsModule from './modules/boards';
import notificationsModule from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    langs: [
      {
        valueToDisplay: 'Español',
        image: 'https://i.ytimg.com/vi/tgGWMBHAwcg/maxresdefault.jpg',
        value: 'es',
      },
      {
        valueToDisplay: 'English',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png',
        value: 'en',
      },
    ],
  },
  getters: {
    getLangs(state) {
      return [...state.langs];
    },
  },
  mutations: {},
  actions: {},
  modules: {
    boardsModule,
    notificationsModule,
  },
});

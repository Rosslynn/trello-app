/* eslint-disable no-shadow */
import { getBoards } from '../../services/boardsService';

const state = () => ({
  boards: [],
});

const mutations = {
  SET_BOARDS(state, boards) {
    state.boards = boards;
  },
};

const actions = {
  async obtainBoards({ commit }) {
    const { data } = await getBoards();
    commit('SET_BOARDS', data);
  },
};

const getters = {
  boards(state) {
    return [...state.boards];
  },
  boardsLength(state) {
    return state.boards.length;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

/* eslint-disable no-shadow */
import { getBoards, deleteBoard } from '../../services/boardsService';

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
  async removeBoard({ commit, state }, boardId) {
    try {
      await deleteBoard(boardId);
      commit('SET_BOARDS', state.boards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  boards(state) {
    return [...state.boards];
  },
  boardsCount(_state, getters) {
    return getters.boards.length;
  },
  starredBoards(_state, getters) {
    // eslint-disable-next-line max-len
    return ((isStarred = true) => getters.boards.filter((board) => board.isStarred === isStarred))();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

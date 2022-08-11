/* eslint-disable no-shadow */
import {
  getBoards, deleteBoard, getBoardById, updateBoardById, addBoard,
} from '../../services/boardsService';
import Board from '../../classes/board';

const state = () => ({
  boards: [],
  board: null,
});

const mutations = {
  SET_BOARDS(state, boards) {
    state.boards = boards;
  },
  SET_BOARD(state, board) {
    state.board = board;
  },
  PUSH_BOARD(state, board) {
    state.boards.push(board);
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
  async getSingleBoard({ commit }, boardId) {
    const { data } = await getBoardById(boardId);
    commit('SET_BOARD', data);
  },
  async updateSingleBoard({ commit }, { id, body }) {
    const { data } = await updateBoardById({ id, body });
    commit('SET_BOARD', data);
  },
  async createBoard({ commit }, boardData) {
    const newBoard = new Board({ ...boardData });
    const { data } = await addBoard(newBoard);
    commit('PUSH_BOARD', data);
  },
};

const getters = {
  boards(state) {
    return [...state.boards];
  },
  board(state) {
    return { ...state.board };
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

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
  REPLACE_BOARD(state, { newBoard, indexInTables }) {
    state.boards.splice(indexInTables, 1, newBoard);
  },
};

const actions = {
  async obtainBoards({ commit }) {
    const { data } = await getBoards();
    commit('SET_BOARDS', data);
  },
  async removeBoard({ commit, state }, boardId) {
    await deleteBoard(boardId);
    commit('SET_BOARDS', state.boards.filter((board) => board.id !== boardId));
  },
  async getSingleBoard({ commit }, boardId) {
    const { data } = await getBoardById(boardId);
    commit('SET_BOARD', data);
  },
  async updateSingleBoard({ commit, getters, dispatch }, { id, body, toggleFavorite = false }) {
    const { data } = await updateBoardById({ id, body });
    if (toggleFavorite) {
      const boardToReplaceIndex = getters.boards.findIndex((board) => board.id === data.id);
      if (boardToReplaceIndex >= 0) {
        commit('REPLACE_BOARD', { newBoard: data, indexInTables: boardToReplaceIndex });
      } else {
        dispatch('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to replace the updated board. Refresh the page' }, { root: true });
      }
    } else {
      commit('SET_BOARD', data);
    }
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

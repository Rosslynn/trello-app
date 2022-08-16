/* eslint-disable max-len */
import {
  describe, it, expect, vi,
  beforeEach,
} from 'vitest';
import boardsModule from '../store/modules/boards';
import {
  getBoards, deleteBoard, getBoardById, updateBoardById,
  addBoard,
} from '../services/boardsService';

vi.mock('../services/boardsService');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('boards', () => {
  describe('mutations', () => {
    describe('SET_BOARDS', () => {
      it('should replace the value of the boards in the state', () => {
        const state = {
          boards: [],
        };
        const newValue = [4, 5, 6];

        boardsModule.mutations.SET_BOARDS(state, newValue);
        expect(state.boards).toEqual(newValue);
      });
    });

    describe('SET_BOARD', () => {
      it('should replace the value of the current board in the state', () => {
        const currentBoard = ['la villana'];
        const state = {
          board: null,
        };

        boardsModule.mutations.SET_BOARD(state, currentBoard);

        expect(state.board).toEqual(currentBoard);
      });
    });

    describe('PUSH_BOARD', () => {
      it('should add a board to the state', () => {
        const newBoard = {
          id: 2, name: 'quiero ser millonario', isStarred: true, description: 'The marias es una banda GOD',
        };
        const state = {
          boards: [
            {
              id: 1, name: 'oh oh mami dime que tu me hiciste', isStarred: false, description: 'que pasa el tiempo y no te olvido',
            },
          ],
        };

        boardsModule.mutations.PUSH_BOARD(state, newBoard);

        expect(state.boards.includes(newBoard)).toBe(true);
      });
    });

    describe('REPLACE_BOARD', () => {
      it('should replace a board in the state', () => {
        const newBoard = {
          id: 45, name: 'VETE PAL MALL', isStarred: false, description: 'nadie lo hace como tu lo sabes hacer',
        };
        const indexInTables = 1;
        const state = {
          boards: [
            {
              id: 1, name: 'oh oh mami dime que tu me hiciste', isStarred: false, description: 'que pasa el tiempo y no te olvido',
            },
            {
              id: 2, name: 'quiero ser millonario', isStarred: true, description: 'The marias es una banda GOD',
            },
          ],
        };

        boardsModule.mutations.REPLACE_BOARD(state, { newBoard, indexInTables });

        expect(state.boards[indexInTables]).toMatchObject(newBoard);
      });
    });
  });

  describe('actions', () => {
    describe('obtainBoards', () => {
      it('should call getBoards function and SET_BOARDS mutation', async () => {
        const commit = vi.fn();
        const returnedValue = {
          data: 'mathias mi sobrino hermoso',
        };

        getBoards.mockResolvedValueOnce(returnedValue);
        await boardsModule.actions.obtainBoards({ commit });

        expect(getBoards).toHaveBeenCalledOnce();
        expect(commit).toHaveBeenCalledWith('SET_BOARDS', returnedValue.data);
      });
    });

    describe('removeBoard', () => {
      it('should call deleteBoard function and SET_BOARDS mutation', async () => {
        const state = {
          boards: [
            {
              id: 1, name: 'oh oh mami dime que tu me hiciste', isStarred: false, description: 'que pasa el tiempo y no te olvido',
            },
            {
              id: 2, name: 'quiero ser millonario', isStarred: true, description: 'The marias es una banda GOD',
            },
          ],
        };
        const commit = vi.fn();
        const boardIdToRemove = state.boards[1].id;

        await boardsModule.actions.removeBoard({ commit, state }, boardIdToRemove);

        expect(deleteBoard).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith('SET_BOARDS', state.boards.filter((board) => board.id !== boardIdToRemove));
      });
    });

    describe('getSingleBoard', () => {
      it('should call getSingleBoard function and SET_BOARDS mutation', async () => {
        const commit = vi.fn();
        const resolvedValue = {
          data: {
            id: 1,
            name: 'Marquardt Inc',
            isStarred: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
          },
        };

        getBoardById.mockResolvedValueOnce(resolvedValue);
        await boardsModule.actions.getSingleBoard({ commit });

        expect(getBoardById).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith('SET_BOARD', resolvedValue.data);
      });
    });

    describe('updateSingleBoard', () => {
      let getters;
      const commit = vi.fn();
      const dispatch = vi.fn();
      const id = 1;
      const body = {
        id: 1,
        name: 'Marquardt Inc',
        isStarred: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
      };

      beforeEach(() => {
        getters = {
          boards: [],
        };
      });

      it('should call updateBoardById function', async () => {
        updateBoardById.mockResolvedValueOnce({ data: 'uwu' });
        await boardsModule.actions.updateSingleBoard({ commit, dispatch, getters }, { id, body });
        expect(updateBoardById).toHaveBeenCalled();
      });

      describe('if toggleFavorite property was sent as true', () => {
        describe('if boardToReplaceIndex is >= 0', () => {
          it('should call REPLACE_BOARD mutation', async () => {
            getters = {
              boards: [{
                id: 1,
                name: 'Marquardt Inc',
                isStarred: false,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
              }],
            };
            const data = getters.boards[0];
            const boardToReplaceIndex = getters.boards.findIndex((board) => board.id === data.id);

            updateBoardById.mockResolvedValueOnce({ data });
            await boardsModule.actions.updateSingleBoard({ commit, dispatch, getters }, { id, body, toggleFavorite: true });

            expect(commit).toHaveBeenCalledWith('REPLACE_BOARD', { newBoard: data, indexInTables: boardToReplaceIndex });
          });
        });

        describe('if boardToReplaceIndex is < 0', () => {
          it('should dispatch notificationsModule/addNotification action', async () => {
            getters = {
              boards: [{
                id: 1,
                name: 'Marquardt Inc',
                isStarred: false,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
              }],
            };
            const data = { id: 500 };

            updateBoardById.mockResolvedValueOnce({ data });
            await boardsModule.actions.updateSingleBoard({ commit, dispatch, getters }, { id, body, toggleFavorite: true });

            expect(dispatch).toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to replace the updated board. Refresh the page and try again' }, { root: true });
          });
        });
      });

      describe('if toggleFavorite property was sent as false', () => {
        it('should call updateBoardById function and SET_BOARD mutation', async () => {
          const data = 'uwu';

          updateBoardById.mockResolvedValueOnce({ data });
          await boardsModule.actions.updateSingleBoard({ commit, dispatch, getters }, { id, body, toggleFavorite: false });

          expect(updateBoardById).toHaveBeenCalled();
          expect(commit).toHaveBeenCalledWith('SET_BOARD', data);
        });
      });
    });

    describe('addBoard', () => {
      it('should call addBoard function and PUSH_BOARD mutation', async () => {
        const commit = vi.fn();
        const newBoard = { name: 'board name', description: 'board description' };
        const resolvedValue = 'mathis te amo';

        addBoard.mockResolvedValueOnce({ data: resolvedValue });
        await boardsModule.actions.createBoard({ commit }, newBoard);

        expect(addBoard).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith('PUSH_BOARD', resolvedValue);
      });
    });
  });

  describe('getters', () => {
    const state = {
      boards: [
        {
          id: 1,
          name: 'Marquardt Inc',
          isStarred: false,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
        },
        {
          id: 2,
          name: 'Otro lorem ipsum',
          isStarred: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
        },
        {
          id: 3,
          name: 'Lorem ipsum',
          isStarred: false,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
        },
      ],
      board: {
        id: 100,
        name: 'Mangekyo sharingan',
        isStarred: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
      },
    };

    describe('boards', () => {
      it('should return the boards list in the state', () => {
        const result = boardsModule.getters.boards(state);
        expect(result).toEqual(state.boards);
      });
    });

    describe('board', () => {
      it('should return the board in the state', () => {
        const result = boardsModule.getters.board(state);
        expect(result).toEqual(state.board);
      });
    });

    describe('boardsCount', () => {
      it('should return the number of boards in the state', () => {
        const getters = {
          boards: state.boards,
        };
        const boardsCount = boardsModule.getters.boardsCount(state, getters);
        expect(boardsCount).toBe(state.boards.length);
      });
    });

    describe('starredBoards', () => {
      it('it should return the starred boards in the state', () => {
        const getters = {
          boards: state.boards,
        };
        const isStarred = false;
        const expecetedResult = getters.boards.filter((board) => board.isStarred === isStarred);

        const result = boardsModule.getters.starredBoards(state, getters)(isStarred);

        expect(result).toEqual(expecetedResult);
      });
    });
  });
});

/* describe('obtainBoards', () => {
  it('should call getBoards function and SET_BOARDS mutation', async () => {
    const commit = vi.fn();
    const returnedValue = {
      data: 'mathias mi sobrino hermoso',
    };
    const getBoardsSpy = vi.spyOn(boardsService, 'getBoards').mockResolvedValue(returnedValue);
    await boardsModule.actions.obtainBoards({ commit });

    expect(getBoardsSpy).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('SET_BOARDS', returnedValue.data);
  });
}); */

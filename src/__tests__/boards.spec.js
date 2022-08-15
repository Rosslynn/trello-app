import { describe, it, expect } from 'vitest';
import boardsModule from '../store/modules/boards';

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
});

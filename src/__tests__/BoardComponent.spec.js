/* eslint-disable max-len */
import {
  describe, it, vi, expect,
  beforeEach,
} from 'vitest';
import Vuex from 'vuex';
import {
  createLocalVue, mount, RouterLinkStub,
} from '@vue/test-utils';
import BoardComponent from '../components/BoardComponent.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseIcon from '../components/BaseIcon.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store();
store.dispatch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('BoardCompoent', () => {
  let wrapper;
  let board;

  beforeEach(() => {
    board = {
      id: 1,
      name: 'Marquardt Inc',
      isStarred: false,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
    };

    wrapper = mount(BoardComponent, {
      propsData: {
        board,
      },
      store,
      localVue,
      stubs: {
        DropdownComponent: { template: '<div data-test-id="dropdown-container"><p>Hello World</p></div>' },
        BaseButton,
        BaseIcon,
        RouterLink: RouterLinkStub,
      },
    });
  });

  describe('board container', () => {
    it('should be rendered', () => {
      const boardContainer = wrapper.find('[data-test-id="board-container"]');
      expect(boardContainer.isVisible()).toBe(true);
    });

    it('should have a random bootstrap class that starts with bg-', () => {
      const { availableClasses } = wrapper.vm;
      const boardContainerClasses = wrapper.find('[data-test-id="board-container"]').classes();

      const response = boardContainerClasses.find((boardClass) => availableClasses.includes(boardClass));

      expect(response).not.toBeUndefined();
    });
  });

  describe('board header', () => {
    it('there should be a link that leads to more information about the board', () => {
      const link = wrapper.find('[data-test-id="more-information"]');
      const expectedResult = { name: 'single-board-view', params: { id: board.id } };
      expect(link.props().to).toEqual(expectedResult);
    });

    it('there should be a dropdown component', () => {
      const dropdownComponent = wrapper.find('[data-test-id="dropdown-container"]');
      expect(dropdownComponent.text()).toBe('Hello World');
    });
  });

  describe('board body', () => {
    describe('title', () => {
      it('there should be a title with BCIMIAMI - and the board id', () => {
        const boardTitle = wrapper.find('[data-test-id="board-title"]');
        expect(boardTitle.text()).toBe(`BCIMIAMI - ${board.id}`);
      });
    });

    describe('description', () => {
      it('should render the board description', () => {
        const boardDescription = wrapper.find('[data-test-id="board-description"]');
        expect(boardDescription.text()).toBe(board.description);
      });
    });

    describe('toggleFavorite button', () => {
      it('should render the toggleFavorite button', () => {
        const toggleFavoriteButton = wrapper.find('[data-test-id="toggle-favorite-button"');
        expect(toggleFavoriteButton.isVisible()).toBe(true);
      });

      describe('if the board has not been favorited', () => {
        it('toggleFavorite icon border should be white', () => {
          const expectedColor = 'white';
          const icon = wrapper.find('[data-test-id="toggle-favorite-icon"]');
          const { color } = icon.find('svg').attributes();

          expect(color).toBe(expectedColor);
        });

        it('toggleFavorite icon fill color should be none', () => {
          const expectedFill = 'none';
          const icon = wrapper.find('[data-test-id="toggle-favorite-icon"]');
          const { fill } = icon.find('svg').attributes();

          expect(fill).toBe(expectedFill);
        });

        describe('clicking the toggleFavorite button', () => {
          it('should add the board to favorites', async () => {
            const button = wrapper.find('[data-test-id="toggle-favorite-button"]');
            const isStarred = true;

            await button.trigger('click');

            expect(store.dispatch).toHaveBeenCalledWith('boardsModule/updateSingleBoard', { id: board.id, body: { ...board, isStarred }, toggleFavorite: true });
          });

          it('should show a notification telling to the user that the board was added to favorites', async () => {
            const button = wrapper.find('[data-test-id="toggle-favorite-button"]');
            const message = `${board.name} was added to favorites`;

            await button.trigger('click');

            expect(store.dispatch).toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'info', message });
          });
        });
      });

      describe('if the board has been favorited', () => {
        beforeEach(() => {
          board.isStarred = true;
          wrapper = mount(BoardComponent, {
            propsData: {
              board,
            },
            store,
            localVue,
            stubs: {
              DropdownComponent: { template: '<div data-test-id="dropdown-container"><p>Hello World</p></div>' },
              BaseButton,
              BaseIcon,
              RouterLink: RouterLinkStub,
            },
          });
        });

        it('toggleFavorite icon border should be red', () => {
          const expectedColor = 'red';
          const icon = wrapper.find('[data-test-id="toggle-favorite-icon"]');
          const { color } = icon.find('svg').attributes();

          expect(color).toBe(expectedColor);
        });

        it('toggleFavorite icon fill color should be red', () => {
          const expectedFill = 'red';
          const icon = wrapper.find('[data-test-id="toggle-favorite-icon"]');
          const { fill } = icon.find('svg').attributes();

          expect(fill).toBe(expectedFill);
        });

        describe('clicking the toggleFavorite button', () => {
          it('should remove the board from favorites', async () => {
            const button = wrapper.find('[data-test-id="toggle-favorite-button"]');
            const isStarred = false;

            await button.trigger('click');

            expect(store.dispatch).toHaveBeenCalledWith('boardsModule/updateSingleBoard', { id: board.id, body: { ...board, isStarred }, toggleFavorite: true });
          });
        });
      });

      describe('if toggleFavorite method fails', () => {
        it('should dispatch a notification telling the user that it failed', async () => {
          const button = wrapper.find('[data-test-id="toggle-favorite-button"]');
          // Le pongo el error al dispatch para que entre al try catch y por último verifico que efectivamente llame la alerta correspondiente
          store.dispatch = vi.fn().mockImplementationOnce(() => {
            throw new Error('im just an error');
          });

          await button.trigger('click');

          expect(store.dispatch).toHaveBeenLastCalledWith('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to do this. Please try again later' });
        });
      });
    });
  });
});

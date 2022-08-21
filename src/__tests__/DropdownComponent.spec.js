/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import Swal from 'sweetalert2';
import NProgress from 'nprogress';
import Vuex from 'vuex';
import {
  createLocalVue, mount, RouterLinkStub, config,
} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import DropdownComponent from '../components/DropdownComponent.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseIcon from '../components/BaseIcon.vue';

import translations from '../utils/loadMessages';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn((config) => Promise.resolve({ isConfirmed: true })),
  },
}));

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

const locale = 'en';

config.mocks['$t'] = (msg) => msg.split('.').reduce((o, i) => {
  if (o) return o[i];
}, translations[locale]);

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store();
store.dispatch = vi.fn();

let wrapper;
let board;

beforeEach(() => {
  vi.clearAllMocks();
  board = {
    id: 1,
    name: 'Marquardt Inc',
    isStarred: false,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
  };
  wrapper = mount(DropdownComponent, {
    propsData: {
      board,
    },
    stubs: {
      RouterLink: RouterLinkStub,
      BaseButton,
      BaseIcon,
    },
    store,
    localVue,
  });
});

describe('DropdownComponent', () => {
  it('should render the dropdown container', () => {
    expect(wrapper.find('[data-test-id="dropdown-container"]').isVisible()).toBe(true);
  });

  describe('dropdown', () => {
    describe('button', () => {
      it('should render the dropdown button', () => {
        expect(wrapper.find('[data-toggle="dropdown"]').isVisible()).toBe(true);
      });

      describe('button icon', () => {
        it('should render the button icon', () => {
          const iconInsideButton = wrapper.findComponent('[data-toggle="dropdown"]').findComponent('.custom-icon');
          expect(iconInsideButton.isVisible()).toBe(true);
        });

        it('the icon should be white', () => {
          const iconInsideButton = wrapper.findComponent('[data-toggle="dropdown"]').findComponent('.custom-icon');
          const { color } = iconInsideButton.find('svg').attributes();
          expect(color).toBe('white');
        });
      });

      describe('clicking the button', () => {
        it('should open the dropdown menu', () => {
          const dropdownButton = wrapper.findComponent('[data-toggle="dropdown"]');
          const dropdownMenu = wrapper.find('.dropdown-menu');

          expect(dropdownButton.isVisible()).toBe(true);
          expect(dropdownMenu.exists()).toBe(true);
        });
      });
    });

    describe('dropdown menu', () => {
      describe('edit the board', () => {
        it('should exist a link that redirects to the page for editing the board', () => {
          const link = wrapper.findComponent(RouterLinkStub);
          expect(link.props().to).toEqual({ name: 'edit-board', params: { id: board.id } });
        });
      });

      describe('delete the board', () => {
        it('should exist a button for delete the board', () => {
          const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');
          expect(btnDeleteBoard.isVisible()).toBe(true);
        });

        describe('when delete the board button is clicked', () => {
          it('should display an alert to confirm the delete', async () => {
            const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

            await btnDeleteBoard.trigger('click');
            await flushPromises();

            expect(Swal.fire).toHaveBeenCalledWith({
              title: 'Deleting board with name {name}',
              text: 'Do you want to continue?',
              icon: 'warning',
              confirmButtonText: 'Delete',
              showCancelButton: true,
              cancelButtonText: 'Cancel',
            });
          });

          describe('if the delete is NOT confirmed', () => {
            it('should not display the loading indicator', async () => {
              Swal.fire.mockResolvedValueOnce({ isConfirmed: false });
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(NProgress.start).not.toHaveBeenCalled();
            });

            it('should not dispatch the action to delete the board', async () => {
              Swal.fire.mockResolvedValueOnce({ isConfirmed: false });
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(store.dispatch).not.toHaveBeenCalledWith('boardsModule/removeBoard', board.id);
            });

            it('should not dispatch the action to display a success message', async () => {
              Swal.fire.mockResolvedValueOnce({ isConfirmed: false });
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(store.dispatch).not.toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'success', message: 'The board was deleted succcesfully' });
            });
          });

          // TODO: Siempre que haya código de terceros con cosas asíncronas se debe usar flushPromises
          describe('if the delete is confirmed', () => {
            it('should render the loading indicator', async () => {
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(NProgress.start).toHaveBeenCalled();
            });

            it('should dispatch an action to delete the board', async () => {
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(store.dispatch).toHaveBeenCalledWith('boardsModule/removeBoard', board.id);
            });

            it('should dispatch an action to display a success message', async () => {
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(store.dispatch).toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'success', message: 'The board was deleted succcesfully' });
            });
          });

          describe('when deleting the board ends', () => {
            it('should stop rendering the loading indicator', async () => {
              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              await flushPromises();

              expect(NProgress.done).toHaveBeenCalled();
            });
          });

          describe('if deleting the board fails', () => {
            it('should dispatch an action to display a fail message', async () => {
              Swal.fire.mockImplementationOnce(() => {
                throw new Error('im just an error');
              });

              const btnDeleteBoard = wrapper.find('[data-test-id="btn-delete-board"]');

              await btnDeleteBoard.trigger('click');
              // TODO: aquí funciona sin flushPromises ya que cambio swal.Fire por algo que no necesita esperar, sino que va al catch de una vez

              expect(store.dispatch).toHaveBeenLastCalledWith('notificationsModule/addNotification', { type: 'danger', message: 'There was a problem deleting the board. Please try again later' });
            });
          });
        });
      });
    });
  });
});

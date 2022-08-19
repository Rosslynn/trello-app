/* eslint-disable no-unused-vars */
import {
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import Swal from 'sweetalert2';
import NProgress from 'nprogress';
import Vuex from 'vuex';
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils';
import DropdownComponent from '../components/DropdownComponent.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseIcon from '../components/BaseIcon.vue';

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

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store();
store.dispatch = vi.fn();

let wrapper;

beforeEach(() => {
  vi.clearAllMocks();
  wrapper = mount(DropdownComponent, {
    propsData: {
      board: {
        id: 1,
        name: 'Marquardt Inc',
        isStarred: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget ante sem.',
      },
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
        it('the icon should be white', () => {});
      });

      describe('clicking the button', () => {
        it('should open the dropdown menu', () => {});
      });
    });

    describe('dropdown menu', () => {
      describe('edit the board', () => {
        it('should exist a link that redirects to the page for editing the board', () => {});
      });

      describe('delete the board', () => {
        it('should exist a button for delete the board', () => {});

        describe('when delete the board button is clicked', () => {
          it('should display an alert to confirm the delete', () => {});

          describe('if the delete is confirmed', () => {
            it('should render the loading indicator', () => {});
            it('should dispatch an action to delete the board', () => {});
            it('should dispatch an action to display a success message');
          });

          describe('when deleting the board ends', () => {
            it('should stop rendering the loading indicator', () => {});
          });

          describe('if deleting the board fails', () => {
            it('should dispatch an action to display a fail message', () => {});
          });
        });
      });
    });
  });
});

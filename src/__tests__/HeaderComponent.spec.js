/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { mount, RouterLinkStub, config } from '@vue/test-utils';
import HeaderComponent from '../components/HeaderComponent.vue';
import translations from '../utils/loadMessages';

let wrapper;
let locale = 'es';

config.mocks['$t'] = (msg) => msg.split('.').reduce((o, i) => {
  if (o) return o[i];
}, translations[locale]);

beforeEach(() => {
  wrapper = mount(HeaderComponent, {
    stubs: {
      RouterLink: RouterLinkStub,
      BaseButton: { template: '<button><span>Hello</span></button>' },
    },
    mocks: {
      $store: {
        getters: {
          getLangs: ['es', 'en'],
        },
      },
    },
  });
});

describe('HeaderComponent', () => {
  describe('logo', () => {
    it('should render the logo', () => {
      expect(wrapper.find('[data-test-id="logo"]').isVisible()).toBe(true);
    });

    it('should have the navbar-brand class', () => {
      expect(wrapper.find('[data-test-id="logo"]').classes()).toContain('navbar-brand');
    });

    describe('when logo is clicked', () => {
      it('should go to the boards view', () => {
        const expectedRouteName = 'boards-view';
        const logoProps = wrapper.find('[data-test-id="logo"]').props();
        expect(logoProps.to.name).toBe(expectedRouteName);
      });
    });
  });

  describe('menu', () => {
    it('there should be a link leading to the boards page', () => {
      const expectedRouteName = 'boards-view';
      const linkBoardsPage = wrapper.find('[data-test-id="boards" ]').props();
      expect(linkBoardsPage.to.name).toBe(expectedRouteName);
    });
  });
});

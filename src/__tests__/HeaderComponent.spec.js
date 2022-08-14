import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import HeaderComponent from '../components/HeaderComponent.vue';

let wrapper;

beforeEach(() => {
  wrapper = mount(HeaderComponent, {
    stubs: {
      RouterLink: RouterLinkStub,
      BaseButton: { template: '<button><span>Hello</span></button>' },
    },
  });
});

describe('HeaderComponent', () => {
  describe('logo', () => {
    it('should render the logo', () => {
      expect(wrapper.find('[data-test-id="logo"]').exists()).toBe(true);
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

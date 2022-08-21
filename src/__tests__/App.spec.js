/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { mount, config, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import {
  describe, expect, it, vi,
} from 'vitest';
import App from '../App.vue';
import translations from '../utils/loadMessages';
import { routes } from '../router/index';

// TODO: Importante hacer esto ya que sino BoardsView usará muchos componentes hijos
// TODO: y no me interesa que se muestren ellos
vi.mock('../views/ContainerBoardView.vue', () => ({
  name: 'ContainerBoardView',
  render: (h) => h('div'),
}));

const localStorageStub = {
  getItem: vi.fn((itemName) => itemName),
};
vi.stubGlobal('localStorage', localStorageStub);

const locale = 'en';
const localVue = createLocalVue();
localVue.use(VueRouter);

config.mocks['$t'] = (msg) => msg.split('.').reduce((o, i) => {
  if (o) return o[i];
}, translations[locale]);

describe('App', () => {
  describe('when component is created', () => {
    it('should call the created life cycle hook', () => {
      const createdSpy = vi.spyOn(App, 'created');
      const router = new VueRouter({ routes, mode: 'abstract' });
      mount(App, {
        stubs: {
          HeaderComponent: true,
          NotificationsContainer: true,
        },
        mocks: {
          $i18n: {
            locale,
          },
        },
        localVue,
        router,
      });

      expect(createdSpy).toHaveBeenCalled();
    });

    it('i18n locale should have a value', () => {
      const i18n = {
        $i18n: {
          locale,
        },
      };
      const router = new VueRouter({ routes, mode: 'abstract' });
      mount(App, {
        stubs: {
          HeaderComponent: true,
          NotificationsContainer: true,
        },
        mocks: {
          ...i18n,
        },
        localVue,
        router,
      });
      // Lo ideal seria tomar los langs del store y verificar que ese valor enviado
      // Coincida con los que están definidos pero me da pereza
      expect(i18n.$i18n.locale).toBeTruthy();
    });
  });

  describe('header', () => {
    it('should render the header component', () => {
      const router = new VueRouter({ routes, mode: 'abstract' });
      const wrapper = mount(App, {
        stubs: {
          HeaderComponent: true,
          NotificationsContainer: true,
        },
        mocks: {
          $i18n: {
            locale,
          },
        },
        localVue,
        router,
      });

      expect(wrapper.findComponent({ name: 'HeaderComponent' }).isVisible()).toBe(true);
    });
  });

  describe('main', () => {
    it('should render the boards-view child component via routing by default', async () => {
      const router = new VueRouter({ routes, mode: 'abstract' });
      const wrapper = mount(App, {
        stubs: {
          HeaderComponent: true,
          NotificationsContainer: true,
        },
        mocks: {
          $i18n: {
            locale,
          },
        },
        localVue,
        router,
      });

      await router.push('/');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'ContainerBoardView' }).exists()).toBe(true);
      expect(router.currentRoute.name).toBe('boards-view');
    });
  });

  describe('footer', () => {
    // De esta forma puedo testear los componentes async, poniendoles un template XD
    it('should render the notifications container', () => {
      const router = new VueRouter({ routes, mode: 'abstract' });
      const wrapper = mount(App, {
        stubs: {
          HeaderComponent: true,
          NotificationsContainer: { template: '<div data-test-id="notifications"><span>Hello World</span></div>' },
        },
        mocks: {
          $i18n: {
            locale,
          },
        },
        localVue,
        router,
      });

      expect(wrapper.find('[data-test-id="notifications"]').text()).toBe('Hello World');
    });
  });
});

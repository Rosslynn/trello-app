/* eslint-disable max-len */
import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NotificationsContainer from '../components/NotificationsContainer.vue';
import Notifications from '../store/modules/notifications';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('NotificationsContainer', () => {
  let getters;
  let store;
  let state;

  beforeEach(() => {
    state = {
      notifications: [1],
    };
    /**
     * Es necesario hacer un mock del notificationsModule ya que el NotificationsContainer lo utiliza para renderizar contenido
     * Si no se mockea va a dar error los tests ya que al array ser vacio no se itera nada y no va a encontrar el selector
     */
    store = new Vuex.Store({
      getters,
      modules: {
        notificationsModule: {
          namespaced: true,
          state,
          getters: Notifications.getters,
        },
      },
    });
  });

  describe('notifications container', () => {
    it('should be rendered', () => {
      const wrapper = shallowMount(NotificationsContainer, {
        stubs: {
          NotificationComponent: { template: '<div><span id="n-c">uwu</span></div>' },
        },
        store,
        localVue,
      });
      expect(wrapper.find('[data-test-id="alert-container"]').isVisible()).toBe(true);
    });

    it('should have a high z-index to prevent other elements from overlapping it', () => {
      const classToContain = 'custom-z-index';
      const wrapper = shallowMount(NotificationsContainer, {
        stubs: {
          NotificationComponent: { template: '<div><span id="n-c">uwu</span></div>' },
        },
        store,
        localVue,
      });
      expect(wrapper.find('[data-test-id="alert-container"]').classes()).toContain(classToContain);
    });
  });

  describe('notifications component', () => {
    it('should be rendered', () => {
      const wrapper = shallowMount(NotificationsContainer, {
        stubs: {
          NotificationComponent: { template: '<div><span id="n-c">uwu</span></div>' },
        },
        store,
        localVue,
      });
      expect(wrapper.find('#n-c').text()).toBe('uwu');
    });
  });
});

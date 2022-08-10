/* eslint-disable no-shadow */
import Notification from '../../classes/notification';

const state = () => ({
  notifications: [],
});

const mutations = {
  SET_NOTIFICATION(state, notification) {
    const newNotification = new Notification({ ...notification });
    state.notifications.push(newNotification);
  },
  REMOVE_NOTIFICATION(state, notificationToRemove) {
    // eslint-disable-next-line max-len
    state.notifications = state.notifications.filter((notification) => notification.id !== notificationToRemove.id);
  },
};

const actions = {
  addNotification({ commit }, notification) {
    commit('SET_NOTIFICATION', notification);
  },
  removeNotification({ commit }, notification) {
    commit('REMOVE_NOTIFICATION', notification);
  },
};

const getters = {
  notifications(state) {
    return [...state.notifications];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

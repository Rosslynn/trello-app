import {
  describe, expect, it, vi,
} from 'vitest';
import notifications from '../store/modules/notifications';

describe('notifications', () => {
  describe('mutations', () => {
    describe('SET_NOTIFICATION', () => {
      it('adds a notifications to the state', () => {
        const message = 'Hello World';
        const notification = { type: 'danger', message };
        const state = {
          notifications: [],
        };

        notifications.mutations.SET_NOTIFICATION(state, notification);

        expect(state.notifications[0].message).toBe(message);
      });
    });

    describe('REMOVE_NOTIFICATION', () => {
      it('should remove a notification from the state', () => {
        const notificationsArr = [
          {
            id: 1,
            type: 'success',
            message: 'Me roncaste de salvaje, de amazona',
          },
          {
            id: 2,
            type: 'danger',
            message: 'Y si le gusta lo repite, sino delete, te jodiste',
          },
        ];
        const notificationToDelete = notificationsArr[1];

        const state = {
          notifications: notificationsArr,
        };

        notifications.mutations.REMOVE_NOTIFICATION(state, notificationToDelete);

        expect(state.notifications.includes(notificationToDelete)).toBe(false);
      });
    });
  });

  describe('actions', () => {
    describe('addNotification', () => {
      it('should call the mutation SET_NOTIFICATION', () => {
        const commit = vi.fn();
        const notification = { id: 1, type: 'danger', message: 'Efecto' };
        const mutationToCall = 'SET_NOTIFICATION';

        notifications.actions.addNotification({ commit }, notification);

        expect(commit).toHaveBeenCalledWith(mutationToCall, notification);
      });

      it('should call the mutation REMOVE_NOTIFICATION', () => {
        const commit = vi.fn();
        const notification = { id: 1, type: 'success', message: 'one piece' };
        const mutationToCall = 'REMOVE_NOTIFICATION';

        notifications.actions.removeNotification({ commit }, notification);

        expect(commit).toHaveBeenCalledWith(mutationToCall, notification);
      });
    });
  });

  describe('getters', () => {
    describe('notifications', () => {
      it('should return the notifications list', () => {
        const state = {
          notifications: [{
            id: 1,
            type: 'success',
            message: 'Me roncaste de salvaje, de amazona',
          },
          {
            id: 2,
            type: 'danger',
            message: 'Y si le gusta lo repite, sino delete, te jodiste',
          }],
        };

        const result = notifications.getters.notifications(state);

        expect(result).toEqual(state.notifications);
      });
    });
  });
});

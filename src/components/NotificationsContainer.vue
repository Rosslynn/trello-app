<template>
  <div class="notifications-container pt-3">
    <notification-component
      v-for="notification of notifications"
      :key="notification.id"
      :notification="notification">
    </notification-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationsContainer',
  components: {
    NotificationComponent: () => import('./NotificationComponent.vue'),
  },
  computed: {
    ...mapGetters('notificationsModule', [
      'notifications',
    ]),
  },
};
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

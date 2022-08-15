<template>
  <div data-test-id="alert-container" class="notifications-container custom-z-index pt-3">
    <notification-component
      v-for="notification of notifications"
      :key="notification.id"
      :notification="notification">
    </notification-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotificationComponent from './NotificationComponent.vue';

export default {
  name: 'NotificationsContainer',
  components: {
    NotificationComponent,
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

.custom-z-index {
  z-index:  99999999 !important;
}
</style>

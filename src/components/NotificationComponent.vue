<template>
  <div class="alert container fade show" :class="alertClass" role="alert">
    {{ notification.message}}.
    <strong>This will be automatically  closed in {{ timeLeft }} seconds</strong>
    <base-button type="button" class="close" aria-label="Close" @click="removeAlert">
      <span aria-hidden="true">&times;</span>
    </base-button>
  </div>
</template>

<script>
import Notification from '../classes/notification';

export default {
  name: 'NotificationComponent',
  data() {
    return {
      notificationTimeOut: null,
      closeTime: 5000,
      timeLeft: null,
    };
  },
  props: {
    notification: {
      type: Notification,
      required: true,
    },
  },
  created() {
    this.timeLeft = this.closeTime / 1000;
    this.notificationTimeOut = setTimeout(() => {
      this.removeAlert();
    }, this.closeTime);
  },
  methods: {
    removeAlert() {
      this.$store.dispatch('notificationsModule/removeNotification', this.notification);
    },
  },
  computed: {
    alertClass() {
      return `alert-${this.notification.type}`;
    },
  },
  watch: {
    timeLeft() {
      if (this.timeLeft > 0) {
        this.timeLeftTimer = setTimeout(() => {
          this.timeLeft -= 1;
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.notificationTimeOut);
  },
};
</script>

<style lang="scss" scoped>
</style>

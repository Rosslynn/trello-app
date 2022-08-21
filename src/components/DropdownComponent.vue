<template>
  <div data-test-id="dropdown-container" class="dropdown drop-container">
    <base-button class="btn" type="button" data-toggle="dropdown" aria-expanded="false">
      <template #icon>
        <base-icon name="more-vertical" class="custom-icon" color="white"></base-icon>
      </template>
    </base-button>
    <div class="dropdown-menu dropdown-menu-right">
      <router-link
        :to="{ name: 'edit-board', params: { id: board.id }}"
        class="dropdown-item"
        type="button">
        {{ $t('components.dropdownComponent.editText') }}
      </router-link>
      <base-button
        data-test-id="btn-delete-board"
        class="dropdown-item"
        type="button"
        @click="deleteBoard">
        {{ $t('components.dropdownComponent.deleteText') }}
      </base-button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import NProgress from 'nprogress';

export default {
  name: 'DropdownComponent',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteBoard() {
      try {
        const response = await Swal.fire({
          title: this.$t('components.dropdownComponent.notification.title', { name: this.board.name }),
          text: this.$t('components.dropdownComponent.notification.text'),
          icon: 'warning',
          confirmButtonText: this.$t('components.dropdownComponent.notification.confirmButtonText'),
          showCancelButton: true,
          cancelButtonText: this.$t('components.dropdownComponent.notification.cancelButtonText'),
        });

        if (response.isConfirmed) {
          NProgress.start();
          await this.$store.dispatch('boardsModule/removeBoard', this.board.id);
          this.$store.dispatch('notificationsModule/addNotification', { type: 'success', message: 'The board was deleted succcesfully' });
        }
      } catch (error) {
        this.$store.dispatch('notificationsModule/addNotification', { type: 'danger', message: 'There was a problem deleting the board. Please try again later' });
      }
      NProgress.done();
    },
  },
};
</script>

<style scoped>
.drop-container {
  position: absolute;
  top: 0;
  right: 0
}

.custom-icon {
  position: absolute;
  top: 4px;
  right: 0px;
}

button {
  height: 30px !important;
}
</style>

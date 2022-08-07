<template>
  <div class="dropdown drop-container">
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
        Edit
      </router-link>
      <base-button class="dropdown-item" type="button" @click="deleteBoard">Delete</base-button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

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
      const response = await Swal.fire({
        title: `Deleting board with name ${this.board.name}`,
        text: 'Do you want to continue?',
        icon: 'warning',
        confirmButtonText: 'Delete',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      });
      if (response.isConfirmed) {
        console.log('Borrando');
      }
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

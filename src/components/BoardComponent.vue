<!-- eslint-disable max-len -->
<template>
  <div class="card text-white mb-4" :class="randomClass" style="max-width: 18rem;">
    <div class="card-header position-relative">
      <p class="mb-0">
        <router-link :to="{ name: 'single-board-view', params: { id: board.id } }">
          {{ board.name }}
        </router-link>
      </p>
      <dropdown-component :board="board"></dropdown-component>
    </div>
    <div class="card-body">
      <h5 class="card-title">BCIMIAMI - {{ board.id }}</h5>
      <p class="card-text">{{ board.description }}</p>
      <base-button class="btn btn-link" @click="toggleFavorite">
        <template name="icon">
          <base-icon name="heart" :color="borderColor" :fill="colorToFill"></base-icon>
        </template>
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  data() {
    return {
      availableClasses: ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-info', 'bg-dark'],
      fillColor: 'red',
      defaultBorderColor: 'white',
    };
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async toggleFavorite() {
      try {
        const isStarred = !this.board.isStarred;
        const message = (isStarred) ? `${this.board.name} was added to favorites` : `${this.board.name} was removed from favorites`;
        await this.$store.dispatch('boardsModule/updateSingleBoard', { id: this.board.id, body: { ...this.board, isStarred }, toggleFavorite: true });
        this.$store.dispatch('notificationsModule/addNotification', { type: 'info', message });
      } catch (error) {
        this.$store.dispatch('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to do this. Please try again later' });
      }
    },
  },
  computed: {
    availableClassesIndexes() {
      return this.availableClasses.length - 1;
    },
    randomIndex() {
      return Math.floor(Math.random() * ((this.availableClassesIndexes) + 1));
    },
    randomClass() {
      return this.availableClasses[this.randomIndex];
    },
    isStarred() {
      return this.board.isStarred;
    },
    colorToFill() {
      return this.isStarred ? this.fillColor : 'none';
    },
    borderColor() {
      return this.isStarred ? this.fillColor : this.defaultBorderColor;
    },
  },
  components: {
    DropdownComponent: () => import('./DropdownComponent.vue'),
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: inherit !important;
}
</style>

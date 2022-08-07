<!-- eslint-disable max-len -->
<template>
  <div class="card text-white mb-4" :class="randomClass" style="max-width: 18rem;">
    <div class="card-header position-relative">
      <p class="mb-0">{{ board.name }}</p>
      <dropdown-component :board="board"></dropdown-component>
    </div>
    <router-link :to="{ name: 'single-board-view', params: { id: board.id } }">
    <div class="card-body">
      <h5 class="card-title">BCIMIAMI - {{ board.id }}</h5>
      <p class="card-text">{{ board.description }}</p>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  data() {
    return {
      availableClasses: ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-dark'],
    };
  },
  props: {
    board: {
      type: Object,
      required: true,
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

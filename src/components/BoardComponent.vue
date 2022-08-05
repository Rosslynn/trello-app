<!-- eslint-disable max-len -->
<template>
  <div class="card text-white mb-4" :class="randomClass" style="max-width: 18rem;">
    <div class="card-header">{{ board.name }}
      <div class="dropdown" @click.stop>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>
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
      availableClasses: ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-dark', 'bg-light'],
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
      const classToAdd = this.availableClasses[this.randomIndex];
      return (classToAdd === 'bg-light') ? `${classToAdd} text-dark` : classToAdd;
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
  color: inherit !important;
}
</style>

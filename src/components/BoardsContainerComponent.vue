<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-3">
        <h2 class="h4 text-dark">{{ title }}</h2>
      </div>
      <div class="col-12 d-flex flex-wrap justify-content-between">
        <board-component  v-for="board in boards" :key="board.id" :board="board"></board-component>
        <p v-if="boards.length === 0" class="text-info">Nothing to show here... :)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardsContainerComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    boards: {
      type: Array,
      required: true,
    },
  },
  components: {
    BoardComponent: () => import('./BoardComponent.vue'),
  },
};
</script>

<style>
</style>

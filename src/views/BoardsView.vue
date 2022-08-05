<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <boards-container-component title="My starred" :boards="[]"></boards-container-component>
      </div>
      <div class="col-12 my-3">
        <boards-container-component title="My boards" :boards="[]"></boards-container-component>
      </div>
      {{ starredBoards }} uwu
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardsView',
  components: {
    BoardsContainerComponent: () => import('../components/BoardsContainerComponent.vue'),
  },
  props: {
    boards: {
      type: Array,
      require: true,
      default: () => [],
    },
    starredBoards: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
};
</script>

<style
    BoardsContainerComponent>
    </style>

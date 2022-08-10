<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <boards-container-component
          title="My starred"
          :boards="starredBoards">
        </boards-container-component>
      </div>
      <div class="col-12 my-3">
        <boards-container-component
          title="My boards"
          :boards="boards">
        </boards-container-component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardsView',
  props: {
    boards: {
      type: Array,
      required: true,
    },
    starredBoards: {
      type: Array,
      required: true,
    },
  },
  components: {
    BoardsContainerComponent: () => import('../components/BoardsContainerComponent.vue'),
  },
};
</script>

<style
    BoardsContainerComponent>
    </style>

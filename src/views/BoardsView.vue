<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <boards-container-component title="My starred" :boards="[]"></boards-container-component>
      </div>
      <div class="col-12">
        <boards-container-component title="My boards" :boards="[]"></boards-container-component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardsView',
  components: {
    BoardsContainerComponent: () => import('../components/BoardsContainerComponent.vue'),
  },
};
</script>

<style
    BoardsContainerComponent>
</style>

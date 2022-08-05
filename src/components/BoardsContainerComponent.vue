<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>{{ title }}</h2>
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
};
</script>

<style>
</style>

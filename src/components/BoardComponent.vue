<!-- eslint-disable max-len -->
<template>
  <div class="card text-white bg-primary mb-4" style="max-width: 18rem;">
    <div class="card-header">Header</div>
    <div class="card-body">
      <h5 class="card-title">Primary card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
    </div>
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
};
</script>

<style>
</style>

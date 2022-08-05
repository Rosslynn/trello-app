<!-- eslint-disable max-len -->
<template>
  <div class="card text-white mb-4" :class="randomClass" style="max-width: 18rem;">
    <div class="card-header">{{ board.name }}</div>
    <div class="card-body">
      <h5 class="card-title">BCIMIAMI - {{ board.id }}</h5>
      <p class="card-text">{{ board.description }}</p>
    </div>
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
</style>

<template>
  <div class="bg-white mb-2 p-2">
    {{ card.name }}
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>

<template>
  <button v-bind="$attrs" v-on="$listeners"><slot name="text"></slot></button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>

<style scoped>
  button {
    position: relative;
  }
</style>

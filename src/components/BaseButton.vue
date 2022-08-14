<!-- eslint-disable max-len -->
<template>
  <button data-test-id="base-button" v-bind="$attrs" v-on="$listeners"><slot name="icon"></slot><slot></slot></button>
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

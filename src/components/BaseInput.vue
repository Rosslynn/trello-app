<template>
  <input v-bind="$attrs" v-on="listeners" :value="value" @input="updateValue">
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value);
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style>
</style>

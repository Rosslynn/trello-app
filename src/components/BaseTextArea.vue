<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <textarea v-bind="$attrs" v-on="listeners" :value="value" @input="updateValue"></textarea>
</template>

<script>
export default {
  name: 'BaseTextArea',
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateValue(e) {
      console.log(e.target.value);
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

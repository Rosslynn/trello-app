<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <label v-if="label"> {{ label }}</label>
    <input v-bind="$attrs" v-on="listeners" :value="value" @input="updateValue" class="form-control">
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
    },
    label: {
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

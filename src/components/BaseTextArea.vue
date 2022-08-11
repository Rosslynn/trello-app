<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
     <textarea v-bind="$attrs" v-on="listeners" :value="value" @input="updateValue" class="form-control"></textarea>
  </div>
</template>

<script>
export default {
  name: 'BaseTextArea',
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

<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
 <div>
  <label v-if="label" >{{ label }}</label>
  <select class="form-control" :value="value" v-on="listeners" @input="updateValue" v-bind="$attrs">
  <option :selected="value === option.value" v-for="option in options" :key="JSON.stringify(option)" :value="option.value">
    {{ option.text }}
  </option>
</select>
 </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean],
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', Boolean(e.target.value));
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

<style scoped>
  button {
    position: relative;
  }
</style>

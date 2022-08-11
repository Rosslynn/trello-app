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
import baseElementsMixin from '../mixins/baseElementsMixin';

export default {
  name: 'BaseSelect',
  mixins: [baseElementsMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  button {
    position: relative;
  }
</style>

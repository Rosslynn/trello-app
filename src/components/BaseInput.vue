<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <label v-if="label"> {{ label }}</label>
    <input v-bind="$attrs" v-on="listeners" :value="value" @input="updateValue" class="form-control">
  </div>
</template>

<script>
import baseElementsMixin from '../mixins/baseElementsMixin';

export default {
  name: 'BaseInput',
  mixins: [baseElementsMixin],
};
</script>

<style>
</style>

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
import baseElementsMixin from '../mixins/baseElementsMixin';

export default {
  name: 'BaseTextArea',
  mixins: [baseElementsMixin],
};
</script>

<style>
</style>

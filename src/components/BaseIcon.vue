<template>
  <div data-test-id="icon-wrapper" v-html="svgIcon">

  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
    },
    fill: {
      type: String,
    },
  },
  computed: {
    svgIcon() {
      return feather.icons[this.name].toSvg({
        width: this.width,
        height: this.height,
        color: this.color,
        fill: this.fill,
      });
    },
  },
};
</script>

<style>
</style>

<template>
  <div>
    The {{ resource }} was not found :D
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  name: 'not-found-view',
  props: {
    resource: {
      type: String,
      default: 'resource',
    },
  },
  mounted() {
    this.$nextTick(() => {
      NProgress.done();
    });
  },
  beforeRouteLeave(to, from, next) {
    NProgress.done();
    next();
  },
};
</script>

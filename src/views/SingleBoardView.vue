<!-- eslint-disable max-len -->
<template>
  <div class="stages-container">
   <stage-component v-for="stage in stages" :stage="stage" :key="JSON.stringify(stage)"></stage-component>
  </div>
</template>

<script>
export default {
  name: 'SingleBoardView',
  props: {
    stages: {
      type: Array,
      required: true,
    },
  },
  components: {
    StageComponent: () => import('../components/StageComponent.vue'),
  },
};
</script>

<style scoped>
.stages-container {
  overflow-y: hidden;
  overflow-x: auto;
  width: auto;
  height: 100%;
  padding: 0px 20px;
  white-space: nowrap;
}
</style>

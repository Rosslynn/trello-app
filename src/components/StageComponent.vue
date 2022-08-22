<template>
   <div class="stages p-3">
      <div class="stages-header">
        <h2 class="h5 mb-3">{{ stage.name }}</h2>
      </div>
      <div class="stages-body">
        <div class="bg-white mb-2 p-2">
          Estudiar vue 2
        </div>
        <div class="bg-white mb-2 p-2">
          Hacer los tests
        </div>
        <div class="bg-white mb-2 p-2">
          Gimpse of us
        </div>
      </div>
      <div class="stages-footer">
        <button class="btn w-100 text-left btn-sm text-muted">Add a card...</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'StageComponent',
  created() {
    this.getCards();
  },
  props: {
    stage: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async getCards() {
      try {
        const cards = await this.$store.dispatch('boardsModule/obtainBoardStageCards', { boardId: this.stage.boardId, stageId: this.stage.id });
        // TODO: utilizar las cartas pertenecientes a cada stage
        // TODO: utilizar el bicho de reordenar: https://github.com/SortableJS/Vue.Draggable
        console.log({ cards });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.stages {
  width: auto;
  min-width: 300px;
  background: #eee;
  height: auto;
  margin: 0 30px 0 0;
  padding: 0;
  display: inline-block;
}
</style>

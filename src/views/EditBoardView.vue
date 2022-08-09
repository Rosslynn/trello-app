<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="container py-5">
      <div class="row justify-content-center">
        <h2 class="col-12 text-center pb-3">Editing board "{{ board.name }}"</h2>
        <form class="col-6 my-3">
          <div class="row">
            <div class="col-12 mb-3">
                <base-input v-model="editableBoard.name" type="text" class="form-control" placeholder="Name"></base-input>
            </div>
            <div class="col-12 mb-3">
                <base-text-area type="text" v-model="editableBoard.description" class="form-control" placeholder="Description"></base-text-area>
            </div>
            <div class="col-12 mb-3 mt-3 text-center">
              <base-button type="submit" class="btn btn-primary w-100">Submit</base-button>
            </div>
          </div>
        </form>
      </div>
    </div>
     {{ editableBoard }}
  </div>
</template>

<script>
export default {
  name: 'EditBoardView',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editableBoard: { ...this.board },
    };
  },
};
</script>

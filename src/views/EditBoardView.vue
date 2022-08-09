<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="container py-5">
      <div class="row justify-content-center">
        <h2 class="col-12 text-center pb-3">Editing board "{{ board.name }}"</h2>
        <validation-observer tag="form" class="col-6 my-3" ref="editBoardForm" @submit.prevent="updateBoard">
          <div class="row">
            <validation-provider name="board-name" rules="required|min:2" v-slot="{ errors }" slim>
              <div class="col-12 mb-3">
                <base-input v-model="editableBoard.name" type="text" class="form-control" placeholder="Name"></base-input>
                <p class="text-danger mb-0 mt-2">{{ errors[0] }}</p>
              </div>
            </validation-provider>
            <validation-provider name="board-description" rules="required|min:2"  v-slot="{ errors }" slim>
              <div class="col-12 mb-3">
                <base-text-area type="text" v-model="editableBoard.description" class="form-control"
                  placeholder="Description"></base-text-area>
                  <p class="text-danger mb-0 mt-2">{{ errors[0] }}</p>
              </div>
            </validation-provider>
            <p class="col-12 text-danger" style="font-size:14px" v-if="wasNotUpdated">The form was not updated, the request was not submitted. <br> (This will be automatically  closed in {{ timeLeft }} seconds)</p>
            <p class="col-12 text-success text-center" v-if="wasUpdated">Board was succesfully updated!</p>
            <div class="col-12 mb-3 mt-3 text-center">
              <base-button type="submit" class="btn btn-primary w-100">Submit</base-button>
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

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
      wasNotUpdated: false,
      notUpdatedMessage: null,
      timeLeftTimer: null,
      closeTime: 5000,
      timeLeft: null,
      wasUpdated: false,
    };
  },
  computed: {
  },
  methods: {
    async updateBoard() {
      try {
        const { isValid } = await this.$refs.editBoardForm.validateWithInfo();

        if (!isValid) {
          console.log('Form is not valid bro');
          return;
        }

        const isEqual = _.isEqual(this.board, this.editableBoard);

        if (isEqual) {
          this.wasNotUpdated = true;
          this.HideNotUpdatedText();
          return;
        }
        const { id, isStarred, ...body } = this.editableBoard;
        await this.$store.dispatch('boardsModule/updateSingleBoard', { id, body });
        this.wasUpdated = true;
        // TODO: Crear sistema de notificaciones y quitar estos timers
        this.timeLeft = this.closeTime / 1000;
        this.wasNotUpdated = false;
        this.wasUpdated = setTimeout(() => {
          this.wasUpdated = false;
        }, this.closeTime);
      } catch (error) {
        console.log(error);
      }
    },
    HideNotUpdatedText() {
      this.timeLeft = this.closeTime / 1000;
      this.notUpdatedMessage = setTimeout(() => {
        this.wasNotUpdated = false;
      }, this.closeTime);
    },
  },
  beforeDestroy() {
    clearTimeout(this.notUpdatedMessage);
    clearTimeout(this.timeLeftTimer);
  },
  watch: {
    timeLeft() {
      if (this.timeLeft > 0) {
        this.timeLeftTimer = setTimeout(() => {
          this.timeLeft -= 1;
        }, 1000);
      }
    },
  },
};
</script>

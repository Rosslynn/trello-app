<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="container py-5">
      <div class="row justify-content-center">
        <h2 class="col-12 text-center pb-3">{{ $t('views.editBoardView.title', { name: board.name }) }}</h2>
        <validation-observer tag="form" class="col-6 my-3" ref="editBoardForm" @submit.prevent="updateBoard">
          <div class="row">
            <validation-provider name="board-name" rules="required|min:2" v-slot="{ errors }" slim>
              <div class="col-12 mb-3">
                <base-input v-model="editableBoard.name" type="text" :placeholder="$t('views.editBoardView.labelName')" :label="$t('views.editBoardView.labelName')"></base-input>
                <p class="text-danger mb-0 mt-2">{{ errors[0] }}</p>
              </div>
            </validation-provider>
            <validation-provider name="board-description" rules="required|min:2"  v-slot="{ errors }" slim>
              <div class="col-12 mb-3">
                <base-text-area type="text" v-model="editableBoard.description" :label="$t('views.editBoardView.labelDescription')"
                  :placeholder="$t('views.editBoardView.labelDescription')"></base-text-area>
                  <p class="text-danger mb-0 mt-2">{{ errors[0] }}</p>
              </div>
            </validation-provider>
            <div class="col-12 mb-3 mt-3 text-center">
              <base-button type="submit" class="btn btn-primary w-100">{{ $t('views.editBoardView.submitText') }}</base-button>
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import NProgress from 'nprogress';

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
  computed: {
  },
  methods: {
    async updateBoard() {
      try {
        const { isValid } = await this.$refs.editBoardForm.validateWithInfo();

        if (!isValid) {
          this.$store.dispatch('notificationsModule/addNotification', { type: 'info', message: 'The form is not valid, check the fields and try again' });
          return;
        }

        const isEqual = _.isEqual(this.board, this.editableBoard);

        if (isEqual) {
          this.$store.dispatch('notificationsModule/addNotification', { type: 'danger', message: 'The form was not updated. The request was not submitted' });
          NProgress.done();
          return;
        }
        NProgress.start();
        const { id, ...body } = this.editableBoard;
        await this.$store.dispatch('boardsModule/updateSingleBoard', { id, body });
        this.$store.dispatch('notificationsModule/addNotification', { type: 'success', message: 'The board was updated succcesfully' });
      } catch (error) {
        this.$store.dispatch('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to update the board. Please try again later' });
      }
      NProgress.done();
    },
  },
};
</script>

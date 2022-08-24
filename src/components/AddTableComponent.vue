<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="text-right">
      <base-button data-test-id="btn-add-table" class="btn btn-primary" data-toggle="modal" data-target="#addBoardCenter">
        {{ $t('components.addTableComponent.title') }}
      </base-button>
    </div>
    <!-- Modal -->
    <div data-test-id="modal-container" class="modal fade" id="addBoardCenter" tabindex="-1" role="dialog" aria-labelledby="addBoardCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addBoardLongTitle">{{ $t('components.addTableComponent.newTable.title') }}</h5>
            <base-button type="button" class="close" data-dismiss="modal" ref="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </base-button>
          </div>
          <div class="modal-body">
            <validation-observer tag="form" class="col-12" ref="createBoardForm" @submit.prevent="createBoard">
              <div class="row">
                <validation-provider name="board-name" rules="required|min:2" v-slot="{ errors }" slim>
                  <div class="col-12 mb-3">
                    <base-input id="input-name" v-model="newBoard.name" type="text" :label="$t('components.addTableComponent.newTable.name')" :placeholder="$t('components.addTableComponent.newTable.name')">
                    </base-input>
                    <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                  </div>
                </validation-provider>
                <validation-provider name="board-is-starred" rules="required" v-slot="{ errors }" slim>
                  <div class="col-12 mb-3">
                    <base-select id="board-isStarred" :label="$t('components.addTableComponent.newTable.isFavorite')" :options="favoriteOptions" v-model="newBoard.isStarred"></base-select>
                    <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                  </div>
                </validation-provider>
                <validation-provider name="board-description" rules="required|min:2" v-slot="{ errors }" slim>
                  <div class="col-12 mb-3">
                    <base-text-area id="board-description" type="text" v-model="newBoard.description" :label="$t('components.addTableComponent.newTable.description')"
                      :placeholder="$t('components.addTableComponent.newTable.description')"></base-text-area>
                    <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                  </div>
                </validation-provider>
                <div class="col-12 mb-3 mt-3 text-center">
                  <base-button data-test-id="btn-add-table" type="submit" class="btn btn-primary w-100">{{ $t('components.addTableComponent.newTable.submit') }}</base-button>
                </div>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  name: 'AddTableComponent',
  created() {
  },
  data() {
    return {
      newBoard: {
        name: '',
        isStarred: false,
        description: '',
      },
      favoriteOptions: [
        {
          value: true,
          text: 'Yes',
        },
        {
          value: false,
          text: 'No',
        },
      ],
    };
  },
  methods: {
    async createBoard() {
      try {
        const { isValid } = await this.$refs.createBoardForm.validateWithInfo();

        if (!isValid) {
          this.$store.dispatch('notificationsModule/addNotification', { type: 'info', message: 'The form is not valid, check the fields and try again' });
          return;
        }

        NProgress.start();
        this.newBoard.isStarred = Boolean(this.newBoard.isStarred);
        await this.$store.dispatch('boardsModule/createBoard', this.newBoard);
        this.$store.dispatch('notificationsModule/addNotification', { type: 'success', message: 'The board was created succcesfully' });
        this.closeTheModal();
        // eslint-disable-next-line no-multi-assign
        this.newBoard.name = this.newBoard.description = '';
        this.newBoard.isStarred = false;
        this.$nextTick(() => {
          this.$refs.createBoardForm.reset();
        });
      } catch (error) {
        this.$store.dispatch('notificationsModule/addNotification', { type: 'danger', message: 'Was not possible to create the board. Please try again' });
      }
      NProgress.done();
    },
    closeTheModal() {
      this.$refs.closeModal.$el.click();
    },
  },
};
</script>

<style scoped>
</style>

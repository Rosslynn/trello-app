<!-- eslint-disable max-len -->
<template>
  <div style="height: 94% !important;">
    <div class="container">
      <div class="row">
        <div class="col-12 text-right pb-3">
          <base-button class="btn btn-primary" ref="btnModal" data-toggle="modal" data-target="#addStage">{{ $t('views.singleBoardView.addStage') }}</base-button>
        </div>
        <!-- Modal -->
        <div data-test-id="add-stage-container" class="modal fade" id="addStage" tabindex="-1" role="dialog"
          aria-labelledby="addStageTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addBoardLongTitle">{{ $t('views.singleBoardView.newStage.title') }}
                </h5>
                <base-button type="button" class="close" data-dismiss="modal" ref="closeModal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </base-button>
              </div>
              <div class="modal-body">
                <validation-observer tag="form" class="col-12" ref="createStageForm" @submit.prevent="createStage">
                  <div class="row">
                    <validation-provider name="stage-name" rules="required|min:2" v-slot="{ errors }" slim>
                      <div class="col-12 mb-3">
                        <base-input id="stage-name" v-model="newStage.name" type="text"
                          :label="$t('views.singleBoardView.newStage.name')"
                          :placeholder="$t('views.singleBoardView.newStage.name')">
                        </base-input>
                        <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                      </div>
                    </validation-provider>
                    <div class="col-12 mb-3 mt-3 text-center">
                      <base-button data-test-id="btn-add-table" type="submit" class="btn btn-primary w-100">{{
                          $t('views.singleBoardView.newStage.submit')
                      }}</base-button>
                    </div>
                  </div>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
        <!-- End modal -->
      </div>
    </div>
    <div class="stages-container d-flex align-items-start">
      <stage-component v-for="stage in stages" :stage="stage" :key="JSON.stringify(stage)"></stage-component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleBoardView',
  data() {
    return {
      newStage: {
        boardId: this.id,
        name: '',
      },
    };
  },
  props: {
    id: {
      type: [String, Number],
    },
    stages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async createStage() {
      try {
        const isValid = await this.$refs.createStageForm.validate();

        if (!isValid) {
          return;
        }

        await this.$store.dispatch('boardsModule/createStage', this.newStage);
        this.$store.dispatch('notificationsModule/addNotification', { type: 'success', message: 'The stage was created succcesfully' });
        this.newStage.name = '';
        this.$nextTick(() => {
          this.$refs.createStageForm.reset();
        });
        this.$refs.btnModal.$el.click();
      } catch (error) {
        console.log(error);
      }
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
  font-size: 16px;
}
</style>

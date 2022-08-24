<!-- eslint-disable max-len -->
<template>
   <div class="stages p-3">
      <div class="stages-header">
        <h2 class="h5 mb-3">{{ stage.name }}</h2>
      </div>
      <div class="stages-body">
        <draggable :list="cards" group="cards"  @change="log">
        <card-component  v-for="card in cards" :key="card.id" :card="card"></card-component>
        </draggable>
      </div>
      <div class="stages-footer">
        <base-button  data-toggle="modal" data-target="#addCard" @click="updateModal" class="btn w-100 text-left btn-sm text-muted">{{ $t('components.stageComponent.cards.title') }}</base-button>
      </div>
       <!-- Modal -->
    <div data-test-id="modal-container" v-if="showModal" data-backdrop="static" data-keyboard="false" class="modal fade" ref="addCard" id="addCard" tabindex="-1" role="dialog" aria-labelledby="addCardTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCardTitle">{{ $t('components.stageComponent.cards.newCard.title') }}</h5>
            <base-button type="button" class="close" data-dismiss="modal" @click="updateModal" ref="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </base-button>
          </div>
          <div class="modal-body">
            <validation-observer tag="form" class="col-12" ref="createCardForm" @submit.prevent="createCard">
              <div class="row">
                <validation-provider name="card-name" rules="required|min:2" v-slot="{ errors }" slim>
                  <div class="col-12 mb-3">
                    <base-input id="card-name" v-model="newCard.name" type="text" :label="$t('components.stageComponent.cards.newCard.name')" :placeholder="$t('components.stageComponent.cards.newCard.name')">
                    </base-input>
                    <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                  </div>
                </validation-provider>
                <validation-provider name="card-description" rules="required|min:2" v-slot="{ errors }" slim>
                  <div class="col-12 mb-3">
                    <base-text-area id="stage-description" type="text" v-model="newCard.description" :label="$t('components.addTableComponent.newTable.description')"
                      :placeholder="$t('components.addTableComponent.newTable.description')"></base-text-area>
                    <p class="text-error text-danger mb-0 mt-2">{{ errors[0] }}</p>
                  </div>
                </validation-provider>
                <div class="col-12 mb-3 mt-3 text-center">
                  <base-button data-test-id="btn-add-stage" type="submit" class="btn btn-primary w-100">{{ $t('components.stageComponent.cards.newCard.submit') }}</base-button>
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
import draggable from 'vuedraggable';

export default {
  components: { CardComponent: () => import('./CardComponent.vue'), draggable },
  name: 'StageComponent',
  data() {
    return {
      cards: [],
      showModal: false,
      newCard: {
        stageId: this.stage.id,
        name: '',
        description: '',
      },
    };
  },
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
    updateModal() {
      this.showModal = !this.showModal;
    },
    async log(evt) {
      if (evt.added) {
        try {
          const { id } = evt.added.element;
          await this.$store.dispatch('boardsModule/updateSingleCard', { id, body: { ...evt.added.element, stageId: this.stage.id } });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getCards() {
      try {
        await this.$store.dispatch('boardsModule/obtainBoardStageCards', { boardId: this.stage.boardId, stageId: this.stage.id });
        this.cards = this.$store.getters['boardsModule/getCardsByStageId'](this.stage.id);
      } catch (error) {
        console.log(error);
      }
    },
    async createCard() {
      try {
        const isValid = await this.$refs.createCardForm.validate();

        if (!isValid) {
          return;
        }

        const newCard = await this.$store.dispatch('boardsModule/createCard', this.newCard);
        this.cards.push(newCard);
        this.$store.dispatch('notificationsModule/addNotification', { type: 'success', message: 'The card was created succcesfully' });
        this.newCard.name = '';
        this.newCard.description = '';
        this.$nextTick(() => {
          this.$refs.createCardForm.reset();
          this.$refs.closeModal.$el.click();
        });
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

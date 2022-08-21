/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import Vuex from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { createLocalVue, mount, config } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import NProgress from 'nprogress';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseTextArea from '../components/BaseTextArea.vue';
import BaseSelect from '../components/BaseSelect.vue';
import AddTableComponent from '../components/AddTableComponent.vue';
import translations from '../utils/loadMessages';

vi.mock('nprogress');

const locale = 'es';

config.mocks['$t'] = (msg) => msg.split('.').reduce((o, i) => {
  if (o) return o[i];
}, translations[locale]);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('ValidationProvider', ValidationProvider);
localVue.component('ValidationObserver', ValidationObserver);

const store = new Vuex.Store();
store.dispatch = vi.fn();

extend('required', required);
extend('required', min);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AddTableComponent', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(AddTableComponent, {
      stubs: {
        BaseButton,
        BaseInput,
        BaseTextArea,
        BaseSelect,
      },
      store,
      localVue,
    });
  });

  describe('add table button', () => {
    it('should be rendered', () => {
      const tableButton = wrapper.findComponent('[data-test-id="btn-add-table"]');
      expect(tableButton.isVisible()).toBe(true);
    });

    it('should show Add table', () => {
      const tableButton = wrapper.findComponent('[data-test-id="btn-add-table"]');
      expect(tableButton.text()).toBeTruthy();
    });

    describe('when button is clicked', () => {
      it('should open the modal', () => {
        // Aquí se testea que exista un botón con el atributo data-target="#addBoardCenter" y un div con el id addBoardCenter
        // Ya que como tal, los encargados de testear que se abra el modal son los de bootstrap, no yo
        // por lo que lo único que debo testear para que todo este ok, es que existan estos dos elementos y estén enlazados
        const button = wrapper.findComponent('[data-target="#addBoardCenter"]');
        const div = wrapper.find('#addBoardCenter');

        expect(button.isVisible()).toBe(true);
        expect(div.exists()).toBe(true);
      });
    });
  });

  describe('modal', () => {
    it('the modal should exist', () => {
      const modalContainer = wrapper.find('[data-test-id="modal-container"]');
      expect(modalContainer.exists()).toBe(true);
    });

    describe('modal header', () => {
      it('should render text inside the modal title', () => {
        const modalTitle = wrapper.find('.modal-title');
        expect(modalTitle.text()).toBeTruthy();
      });

      it('there should be a button that closes the modal', () => {
        const btnCloseModal = wrapper.findComponent('[data-dismiss="modal"]');
        expect(btnCloseModal.isVisible()).toBe(true);
      });
    });

    describe('modal body', () => {
      it('should render a input for the board name ', () => {
        const inputName = wrapper.findComponent('#input-name');
        expect(inputName.isVisible()).toBe(true);
      });

      it('should render a selector to decide whether the board is a favorite or not', () => {
        const isFavoriteSelector = wrapper.findComponent('#board-isStarred');
        expect(isFavoriteSelector.isVisible()).toBe(true);
      });

      it('should render a textarea to describe the board', () => {
        const boardDescription = wrapper.findComponent('#board-description');
        expect(boardDescription.isVisible()).toBe(true);
      });

      describe('submit button', () => {
        it('should exists', () => {
          const btnAddTable = wrapper.find('[data-test-id="btn-add-table"]').find('button');
          expect(btnAddTable.isVisible()).toBe(true);
        });

        describe('clicking the submit button', () => {
          describe('if the submitted form is not valid', () => {
            beforeEach(async () => {
              const inputName = wrapper.findComponent('#input-name').find('input');
              const isFavoriteSelector = wrapper.findComponent('#board-isStarred').find('select');
              const boardDescription = wrapper.findComponent('#board-description').find('textarea');
              const form = wrapper.find('form');

              await inputName.setValue('');
              await isFavoriteSelector.setValue();
              await boardDescription.setValue('');
              await form.trigger('submit.prevent');
              await flushPromises();
            });

            it('should call the action to display a info message telling to the user that the form is invalid', async () => {
              expect(store.dispatch).toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'info', message: 'The form is not valid, check the fields and try again' });
            });

            it('should show an error under the invalid text fields', async () => {
              const errorTexts = wrapper.findAll('.text-error');
              expect(errorTexts.at(0).text()).toBeTruthy();
              expect(errorTexts.at(1).text()).toBeTruthy();
              expect(errorTexts.at(2).text()).toBeTruthy();
            });
          });
          // Estos tests son volatiles porque se usa createBoardForm y si esto cambia en el componente
          // este test va a fallar pero no encontré otra forma de arreglarlo
          describe.todo('if the submitted form is valid', () => {
            const newBoard = {
              name: 'new board',
              isStarred: true,
              description: 'the description',
            };

            beforeEach(async () => {
              wrapper.vm.$refs.createBoardForm.validateWithInfo = vi.fn().mockResolvedValueOnce({ isValid: true });
              const form = wrapper.find('form');

              await form.trigger('submit.prevent');
              await flushPromises();
            });

            it('renders a loading indicator', async () => {
              expect(NProgress.start).toHaveBeenCalled();
            });

            it('should call the action to add the board', async () => {
              await wrapper.setData({
                newBoard,
              });
              expect(store.dispatch).toHaveBeenCalledWith('boardsModule/createBoard', newBoard);
            });

            it('should call the action to display a success notification', () => {
              expect(store.dispatch).toHaveBeenCalledWith('notificationsModule/addNotification', { type: 'success', message: 'The board was created succcesfully' });
            });

            it('should reset the properties to create a board', () => {
            });

            it('should reset the form to create a board ', () => {});

            it('should closes the modal', async () => {
            });
          });

          describe.todo('if submitting the form fails', () => {
            it('should call the action to display a message telling the user that was not possible to create a board', () => {});
          });

          describe.todo('when the form submission is complete and successful', () => {
            it('should stop rendering the loading indicator', () => {});
          });
        });
      });
    });
  });
});

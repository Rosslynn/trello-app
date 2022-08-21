/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
import { describe, it, expect } from 'vitest';
import { shallowMount, config } from '@vue/test-utils';
import BoardsView from '../views/BoardsView.vue';
import translations from '../utils/loadMessages';

const locale = 'es';

config.mocks['$t'] = (msg) => msg.split('.').reduce((o, i) => {
  if (o) return o[i];
}, translations[locale]);

describe('BoardsView', () => {
  it('should render one AddTableComponent and two BoardsContainerComponent', () => {
    const expectedBoardsContainersLength = 2;
    const wrapper = shallowMount(BoardsView, {
      propsData: {
        boards: [],
        starredBoards: [],
      },
      stubs: {
        AddTableComponent: { template: '<div data-test-id="add-t-c"><span>uwu</span></div>' },
        BoardsContainerComponent: { template: '<div class="boards-container-component"><span>hello world</span>></div>' },
      },
    });
    expect(wrapper.find('div[data-test-id="add-t-c"').element.textContent).toBe('uwu');
    expect(wrapper.findAll('div.boards-container-component')).toHaveLength(expectedBoardsContainersLength);
  });
});

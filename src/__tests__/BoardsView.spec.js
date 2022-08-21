/* eslint-disable dot-notation */
import { describe, it, expect } from 'vitest';
import { shallowMount, config } from '@vue/test-utils';
import BoardsView from '../views/BoardsView.vue';

config.mocks['$t'] = (msg) => msg;

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

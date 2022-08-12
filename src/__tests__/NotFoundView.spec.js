import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import NotFoundView from '../views/NotFoundView.vue';

describe('NotFoundView', () => {
  it('renders a not found message', () => {
    const resource = 'boards';
    const expectedMessage = `The ${resource} was not found :D`;

    const wrapper = mount(NotFoundView, {
      propsData: {
        resource,
      },
    });

    expect(wrapper.find('div[data-test-id="not-found-view"]').element.textContent).toContain(expectedMessage);
  });
});

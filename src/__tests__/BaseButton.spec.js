import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton.vue';

describe('BaseButton', () => {
  it('should render a button', () => {
    const wrapper = mount(BaseButton);

    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
  });

  it('should render the content via slot named icon and the default slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        icon: '<span>matis te amo sobrino</span>',
        default: '<p>sandman</p>',
      },
    });

    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });
});

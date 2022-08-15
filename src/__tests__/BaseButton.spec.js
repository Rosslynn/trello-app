import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton.vue';

describe('BaseButton', () => {
  it('should render a button', () => {
    const wrapper = mount(BaseButton);

    const button = wrapper.find('button[data-test-id="base-button"]');

    expect(button.isVisible()).toBe(true);
  });

  it('should render content via the slot named icon and the default slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        icon: '<span>matis te amo sobrino</span>',
        default: '<p>sandman</p>',
      },
    });

    expect(wrapper.find('span').isVisible()).toBe(true);
    expect(wrapper.find('p').isVisible()).toBe(true);
  });
});

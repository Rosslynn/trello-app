/* eslint-disable no-unused-vars */
import {
  describe, expect, it, beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '../components/BaseInput.vue';

describe('BaseInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseInput);
  });

  describe('label', () => {
    describe('if label property is provided', () => {
      it('should render the label', async () => {
        await wrapper.setProps({ label: 'uwu' });
        expect(wrapper.find('label[data-test-id="base-input-label"]').exists()).toBe(true);
      });

      it('should show the provided message via the property', async () => {
        const label = 'fortestingpurposes';
        await wrapper.setProps({ label });
        expect(wrapper.find('label[data-test-id="base-input-label"]').element.textContent).toContain(label);
      });
    });

    describe('if label property is NOT provided', () => {
      it('should NOT render the label', () => {
        expect(wrapper.find('label[data-test-id="base-input-label"]').exists()).toBe(false);
      });
    });
  });

  describe('input', () => {
    let input;
    beforeEach(() => {
      input = wrapper.find('input[data-test-id="base-input"]');
    });

    it('should render the input', () => {
      expect(input.exists()).toBe(true);
    });

    it('should emit an update event when user types', async () => {
      const valueTyped = 'mama said, dont give up its a little complicated';

      await input.setValue(valueTyped);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('input')).toBeTruthy();
      expect(wrapper.emitted('input')[0]).toEqual([valueTyped]);
    });

    it('if a value is sent in the value property it should initially display it', async () => {
      const value = 'mathias te amo sobrino';

      await wrapper.setProps({ value });

      expect(input.element.value).toBe(value);
    });
  });
});

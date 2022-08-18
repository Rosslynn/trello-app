import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTextArea from '../components/BaseTextArea.vue';

describe('BaseTextArea', () => {
  describe('label', () => {
    let label;
    let wrapper;

    beforeEach(() => {
      label = 'matis mi principe';
      wrapper = mount(BaseTextArea, {
        propsData: {
          label,
        },
      });
    });

    describe('if label property is provided', () => {
      it('should render the label element', () => {
        expect(wrapper.find('label[data-test-id="bta-label"]').isVisible()).toBe(true);
      });

      it('the text inside the label should contain the text sent through the property label', () => {
        expect(wrapper.find('label[data-test-id="bta-label"]').text()).toContain(label);
      });
    });

    describe('if label property is NOT provided', () => {
      it('should not render the label element', () => {
        wrapper = mount(BaseTextArea);
        expect(wrapper.find('label[data-test-id="bta-label"]').exists()).toBe(false);
      });
    });
  });

  describe('textarea', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(BaseTextArea);
    });

    it('should render the textarea element', () => {
      expect(wrapper.find('textarea[data-test-id="bta-txtarea"]').isVisible()).toBe(true);
    });

    it('should have the form-control class', () => {
      const textArea = wrapper.find('textarea[data-test-id="bta-txtarea"]');
      expect(textArea.element.classList.contains('form-control')).toBe(true);
    });

    it('should emit an input event when user types', async () => {
      const valueTyped = 'mama said, dont give up its a little complicated';
      const textArea = wrapper.find('textarea[data-test-id="bta-txtarea"]');

      await textArea.setValue(valueTyped);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('input')).toBeTruthy();
      expect(wrapper.emitted('input')[0]).toEqual([valueTyped]);
    });

    it('if a value is sent in the value property it should initially display it', async () => {
      const value = 'mathias te amo sobrino';
      const textArea = wrapper.find('textarea[data-test-id="bta-txtarea"]');

      await wrapper.setProps({ value });

      expect(textArea.element.value).toBe(value);
    });
  });
});

import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '../components/BaseSelect.vue';

let wrapper;
let label;
let options;

beforeEach(() => {
  label = 'mi principe matias';
  options = [
    {
      value: 'colombia',
      text: 'Colombia',
    },
    {
      value: 'panama',
      text: 'Panama',
    },
  ];
  wrapper = mount(BaseSelect, {
    propsData: { label, options },
  });
});

describe('BaseSelect', () => {
  describe('label', () => {
    describe('if label property is provided', () => {
      it('should render the label', () => {
        expect(wrapper.find('label[data-test-id="bs-label"]').exists()).toBe(true);
      });

      it('the text inside the label should be the same as the one sent through the property label', () => {
        expect(wrapper.find('label[data-test-id="bs-label"]').text()).toBe(label);
      });
    });

    describe('if label property is NOT provided', () => {
      it('should NOT render the label', () => {
        wrapper = mount(BaseSelect, {
          propsData: { options },
        });
        expect(wrapper.find('label[data-test-id="bs-label"]').exists()).toBe(false);
      });
    });
  });

  describe('selector', () => {
    it('should render a selector', () => {
      expect(wrapper.find('select[data-test-id="bs-select"]').exists()).toBe(true);
    });

    it('should render all the options sent through the options property', () => {
      const selectOptions = wrapper.find('select[data-test-id="bs-select"]').findAll('option');
      expect(selectOptions.length).toBe(options.length);
    });

    it('the inner text and value of the option should be the one sent through the options property', () => {
      const selectOptions = wrapper.find('select[data-test-id="bs-select"]').findAll('option');

      const firstOptionText = selectOptions.at(0).text();
      const firstOptionValue = selectOptions.at(0).element.value;

      const secondOptionText = selectOptions.at(1).text();
      const secondOptionValue = selectOptions.at(1).element.value;

      expect(firstOptionText).toBe(options[0].text);
      expect(firstOptionValue).toBe(options[0].value);
      expect(secondOptionText).toBe(options[1].text);
      expect(secondOptionValue).toBe(options[1].value);
    });

    it('should emit an input event when user select an option', async () => {
      const selectOptions = wrapper.find('select[data-test-id="bs-select"]');

      await selectOptions.trigger('input');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('input')).toBeTruthy();
    });

    it('if a value is sent in the value property it should initially display it', () => {
      const value = 'colombia';

      wrapper = mount(BaseSelect, {
        propsData: { value, options },
      });

      expect(wrapper.find('option:checked').element.value).toBe(value);
    });
  });
});

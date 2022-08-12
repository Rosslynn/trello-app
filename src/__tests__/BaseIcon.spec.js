/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
import {
  vi, describe, expect, it, beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import BaseIcon from '../components/BaseIcon.vue';

const mockResolveValueFeatherIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart" color="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';

vi.mock('feather-icons', () => ({
  default: {
    icons: {
      heart: {
        toSvg: vi.fn((options) => mockResolveValueFeatherIcon),
      },
    },
  },
}));

let feather;

beforeEach(async () => {
  vi.clearAllMocks();
  feather = await import('feather-icons');
});

describe('BaseIcon', () => {
  it(' the result of the svg function should be rendered', async () => {
    const wrapper = mount(BaseIcon, { propsData: { name: 'heart' } });
    expect(feather.default.icons.heart.toSvg).toHaveBeenCalledOnce();
    expect(wrapper.find('div[data-test-id="icon-wrapper"]').element.innerHTML).toBe(`${mockResolveValueFeatherIcon}`);
  });

  it('the icon should use the styles sent through properties', async () => {
    const iconStyles = {
      color: 'white', fill: 'none', width: 80, height: 80,
    };
    const propsData = {
      name: 'heart', ...iconStyles,
    };

    mount(BaseIcon, { propsData });

    expect(feather.default.icons.heart.toSvg.calls[0]).toMatchObject([iconStyles]);
  });
});

/* it('this test is for learning purposes', async () => {
    const mockImplementationValue = 'uwu';

    feather.default.icons.heart.toSvg.mockImplementationOnce(() => mockImplementationValue);
    const wrapper = mount(BaseIcon, { propsData: { name: 'heart' } });

    expect(wrapper.find('div[data-test-id="icon-wrapper"]').element.innerHTML).toBe(mockImplementationValue);
}); */

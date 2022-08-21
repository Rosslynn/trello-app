/* eslint-disable dot-notation */
import { describe, expect, it } from 'vitest';
import store from '../store/index';

describe('indexStore', () => {
  describe('getters', () => {
    describe('getLangs', () => {
      it('should return the list of the langs in the state', () => {
        const result = store.getters.getLangs;
        expect(result).toEqual(store.state.langs);
      });
    });
  });
});

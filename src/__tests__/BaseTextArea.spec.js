import { describe, it } from 'vitest';

describe('BaseTextArea', () => {
  describe('label', () => {
    describe('if label property is provided', () => {
      it('should render the label element', () => {});
      it('the text inside the label should be the same as the one sent through the property label', () => {});
    });

    describe('if label property is NOT provided', () => {
      it('should not render the label element', () => {});
    });
  });

  describe('textarea', () => {
    it('should render the textarea element', () => {});
    it('should have the form-control class', () => {});
    it('should emit an input event when user types', () => {});
    it('if a value is sent in the value property it should initially display it', () => {});
  });
});

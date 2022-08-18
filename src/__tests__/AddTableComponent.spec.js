import { describe, it } from 'vitest';

describe.todo('AddTableComponent', () => {
  describe('add table button', () => {
    it('should be rendered', () => {});

    it('should show Add table', () => {});

    describe('when button is clicked', () => {
      it('should open the modal', () => {});
    });
  });

  describe('modal', () => {
    it('the modal should exist', () => {});

    describe('modal header', () => {
      it('should render text inside the modal header', () => {});
      it('there should be a button that closes the modal', () => {});
    });

    describe('modal body', () => {
      it('should render a input for the board name ', () => {});
      it('should render a selector to decide whether the board is a favorite or not', () => {});
      it('should render a textarea to describe the board', () => {});

      describe('submit button', () => {
        it('should exists', () => {});

        describe('clicking the submit button', () => {
          describe('if the submitted form is not valid', () => {
            it('should call the action to display a info message telling to the user that the form is invalid', () => {});
          });

          describe('if the submitted form is valid', () => {
            it('renders a loading indicator', () => {});
            it('should call the action to add the board', () => {});
            it('should call the action to display a success notification', () => {});

            it('should reset the properties to create a board', () => {});
            it('should reset the form to create a board ', () => {});

            it('should closes the modal', () => {});
          });

          describe('if submitting the form fails', () => {
            it('should call the action to display a message telling the user that was not possible to create a board', () => {});
          });

          describe('when the form submission is complete and successful', () => {
            it('should stop rendering the loading indicator', () => {});
          });
        });
      });
    });
  });
});

/* eslint-disable no-unused-vars */
import { describe, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import NProgress from 'nprogress';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn((config) => Promise.resolve({ isConfirmed: true })),
  },
}));

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

describe('DropdownComponent', () => {
  it('should render the dropdown container', () => {});

  describe('dropdown', () => {
    describe('button', () => {
      it('should render the dropdown button', () => {});

      describe('button icon', () => {
        it('should render the button icon', () => {});
        it('the icon should be white', () => {});
      });

      describe('clicking the button', () => {
        it('should open the dropdown menu', () => {});
      });
    });

    describe('dropdown menu', () => {
      describe('edit the board', () => {
        it('should exist a link that redirects to the page for editing the board', () => {});
      });

      describe('delete the board', () => {
        it('should exist a button for delete the board', () => {});

        describe('when delete the board button is clicked', () => {
          it('should display an alert to confirm the delete', () => {});

          describe('if the delete is confirmed', () => {
            it('should render the loading indicator', () => {});
            it('should dispatch an action to delete the board', () => {});
            it('should dispatch an action to display a success message');
          });

          describe('when deleting the board ends', () => {
            it('should stop rendering the loading indicator', () => {});
          });

          describe('if deleting the board fails', () => {
            it('should dispatch an action to display a fail message', () => {});
          });
        });
      });
    });
  });
});

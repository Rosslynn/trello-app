import { describe, it } from 'vitest';

describe('BoardCompoent', () => {
  describe('board container', () => {
    it('should be rendered', () => {});
    it('should have a random bootstrap class that starts with bg-', () => {});
  });

  describe('board header', () => {
    it('there should be a link that leads to more information about the board', () => {});
    it('there should be a dropdown component', () => {});
  });

  describe('board body', () => {
    describe('title', () => {
      it('there should be a title with BCIMIAMI - and the board id', () => {});
    });

    describe('description', () => {
      it('should render the board description', () => {});
    });

    describe('toggleFavorite button', () => {
      it('should render the toggleFavorite button', () => {});

      describe('if the board has not been favorited', () => {
        it('toggleFavorite button border should be white', () => {});
        it('toggleFavorite button fill color should be none', () => {});

        describe('clicking the toggleFavorite button', () => {
          it('should add the board to favorites', () => {});
        });
      });

      describe('if the board has been favorited', () => {
        it('toggleFavorite button border should be red', () => {});
        it('toggleFavorite button fill color should be red', () => {});

        describe('clicking the toggleFavorite button', () => {
          it('should remove the board from favorites', () => {});
        });
      });
    });
  });
});

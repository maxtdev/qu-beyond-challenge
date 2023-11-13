/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from '@testing-library/react';
import Paginator from '../paginator';

const COUNT = 10;
const ITEMS_PER_PAGE = 2;
const NEXT_PAGE = jest.fn();
const PREV_PAGE = jest.fn();
const PAGE = 'MOCKED_PAGE_NUMBER';
const IS_TRANSITIONING = false;

const MOCKED_PROPS = {
  count: COUNT,
  itemsPerPage: ITEMS_PER_PAGE,
  nextPage: NEXT_PAGE,
  prevPage: PREV_PAGE,
  page: PAGE,
  isTransitioning: IS_TRANSITIONING,
};

describe('Paginator component', () => {
  describe('When is rendered by default', () => {
    it('should have previous button', () => {
      const { getByText } = render(<Paginator {...MOCKED_PROPS }/>);
      const previousButton = getByText('Previous');

      expect(previousButton).toBeDefined();
    });
    it('should have next button', () => {
      const { getByText } = render(<Paginator {...MOCKED_PROPS }/>);
      const nextButton = getByText('Next');

      expect(nextButton).toBeDefined();
    });
    it('should have legend "Page $ of amount of pages"', () => {
      const { getByTestId } = render(<Paginator {...MOCKED_PROPS }/>);
      const pageNumber = MOCKED_PROPS.page;
      const totalPages = MOCKED_PROPS.count / MOCKED_PROPS.itemsPerPage;
      const pageNode = getByTestId('paginator-label');

      expect(pageNode).toBeDefined();
      expect(pageNode.textContent).toContain(`Page ${pageNumber} of ${totalPages}`);
    });
    it('should call next page', () => {
      const pageNumber = 1;
      const { getByText } = render(<Paginator {...MOCKED_PROPS } page={pageNumber} />); 
      const nextButton = getByText('Next');

      expect(MOCKED_PROPS.nextPage).toHaveBeenCalledTimes(0);

      fireEvent.click(nextButton);

      expect(MOCKED_PROPS.nextPage).toHaveBeenCalledTimes(1);
    });
    it('should call previous page', () => {
      const pageNumber = 2;
      const { getByText } = render(<Paginator {...MOCKED_PROPS } page={pageNumber} />); 
      const previousButton = getByText('Previous');

      expect(MOCKED_PROPS.prevPage).toHaveBeenCalledTimes(0);

      fireEvent.click(previousButton);

      expect(MOCKED_PROPS.prevPage).toHaveBeenCalledTimes(1);
    });
    it('should disable buttons when doing transition', () => {
      const { getByText } = render(<Paginator {...MOCKED_PROPS } isTransitioning={true} />); 
      const previousButton = getByText('Previous');

      expect(previousButton.getAttribute('class')).toContain('pointer-events-none');
    });
  });
});

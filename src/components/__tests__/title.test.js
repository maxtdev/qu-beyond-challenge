/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import Title from '../title';

describe('Title component', () => {
  describe('When is rendered by default', () => {
    it('should render children', () => {
      const MOCKED_TEXT = 'I`m an awesome title';
      const { getByText } = render(<Title>{MOCKED_TEXT}</Title>)
      const titleNode = getByText(MOCKED_TEXT);

      expect(titleNode).toBeDefined();
    });
  });
});

import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Search from './Search';

describe('Card Search', () => {
  describe('render Search', () => {
    const { container } = render(
      <Search theme="dark" error={true} />
    );
    const searchElement = container.firstChild;

    test('check Search', () => {
      expect(searchElement).toBeInTheDocument();
    });
  });
});
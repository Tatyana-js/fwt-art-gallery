import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Search from './Search';

describe('Card Search', () => {
  describe('render Search', () => {
    const { container } = render(
      <Search theme="dark" error={true} value="" onChange={() => {}} />
    );
    const searchElement = container.firstChild;

    test('check Search', () => {
      expect(searchElement).toBeInTheDocument();
    });
  });
});

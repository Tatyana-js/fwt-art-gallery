import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Checkbox from './Checkbox';

describe('Card Checkbox', () => {
  describe('render Checkbox', () => {
    const { container } = render(<Checkbox theme="dark" />);
    const checkboxEl = container.firstChild;

    test('check Checkbox', () => {
      expect(checkboxEl).toBeInTheDocument();
    });
  });
});

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Card from './Card';
import artist from './mock';

describe('Card Component', () => {
  describe('render card', () => {
    const { container } = render(<Card theme="dark" artist={artist} />);
    const card = container.firstChild;

    test('check Card', () => {
      expect(card).toBeInTheDocument();
    });
  });
});

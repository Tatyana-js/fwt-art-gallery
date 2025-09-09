import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Card from './Card';
import artist from './mock';

describe('Card Component', () => {
  describe('render card', () => {
    const { container } = render(<Card artist={artist} theme="dark" />);
    const card = container.firstChild;

    test('check Card', () => {
      expect(card).toBeInTheDocument();
    });
  });
});

import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Label from './Label';

describe('Card Label', () => {
  describe('render Label', () => {
    const { container } = render(<Label theme="dark" children="Romantism" />);
    const labelEl = container.firstChild;

    test('check Label', () => {
      expect(labelEl).toBeInTheDocument();
    });
  });
});

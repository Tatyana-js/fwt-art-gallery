import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

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

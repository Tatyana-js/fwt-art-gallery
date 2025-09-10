import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Input from './Input';

describe('Card Input', () => {
  describe('render Input', () => {
    const { container } = render(
      <Input label="text" theme="dark" error={true} />
    );
    const inputForm = container.firstChild;

    test('check Input', () => {
      expect(inputForm).toBeInTheDocument();
    });
  });
});

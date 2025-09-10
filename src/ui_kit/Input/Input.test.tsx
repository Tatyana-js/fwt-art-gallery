import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import InputForm from './InputForm';

describe('Card InputForm', () => {
  describe('render InputForm', () => {
    const { container } = render(<InputForm label='text' theme="dark" error={true} />);
    const inputForm = container.firstChild;

    test('check InputForm', () => {
      expect(inputForm).toBeInTheDocument();
    });
  });
});
import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import TextArea from './Textarea';

describe('Card InputForm', () => {
  describe('render InputForm', () => {
    const { container } = render(
      <TextArea label="text" text="" theme="dark" error={true} />
    );
    const textArea = container.firstChild;

    test('check TextArea', () => {
      expect(textArea).toBeInTheDocument();
    });
  });
});

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import TextArea from './Textarea';

describe('Card InputForm', () => {
  describe('render InputForm', () => {
    const { container } = render(
      <TextArea label="text" theme="dark" error='error' />
    );
    const textArea = container.firstChild;

    test('check TextArea', () => {
      expect(textArea).toBeInTheDocument();
    });
  });
});

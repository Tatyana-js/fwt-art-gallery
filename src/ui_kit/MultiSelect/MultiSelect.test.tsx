import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import MultiSelect from './MultiSelect';
import { genres } from './mock';
import { selectedGenres } from './mock';

describe('Card MultiSelect', () => {
  describe('render MultiSelect', () => {
    const { container } = render(
      <MultiSelect
        theme="dark"
        genres={genres}
        selectedGenres={selectedGenres}
        onGenresChange={() => {}}
      />
    );
    const multiSelectEl = container.firstChild;

    test('check MultiSelect', () => {
      expect(multiSelectEl).toBeInTheDocument();
    });
  });
});

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import IArtist from '@/types/Artist';

import { Card } from '../Card';
import Grid from './Grid';
import type { IGridProps } from './Grid';
import artists from './mock';

const mainPaintingsData: IGridProps = {
  children: artists.map((artistData: IArtist) => (
    <Card key={artistData._id} artist={artistData} theme="dark" />
  )),
};

describe('GalleryList Component', () => {
  describe('render gallery', () => {
    const { container } = render(
      <Grid children={mainPaintingsData.children} />
    );
    const gallery = container.firstChild;

    test('check Grid', () => {
      expect(gallery).toBeInTheDocument();
    });
  });
});

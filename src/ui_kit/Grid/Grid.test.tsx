import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Grid from './Grid';
import { Card } from '../Card';
import type { IGridProps } from './Grid';
import artists from './mock';
import IArtist from '@/types/Artist';

const  mainPaintingsData: IGridProps = {
  children: artists.map((artistData: IArtist) => (
    <Card key={artistData._id} artist={artistData} theme='dark' />
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

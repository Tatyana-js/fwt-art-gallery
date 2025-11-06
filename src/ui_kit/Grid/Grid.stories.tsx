import type { Meta, StoryObj } from '@storybook/react-vite';

import IArtist from '@/types/Artist';

import Card from '../Card/Card';
import Grid from './Grid';
import artists from './mock';

// данные для историй
const paintingsData = {
  children: artists.map((artistData: IArtist) => (
    <Card
      key={artistData._id}
      name={artistData.name}
      theme="dark"
      imageSrc={''}
      details={''}
      type={'painting'}
    />
  )),
};

const meta = {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    ...paintingsData,
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    ...paintingsData,
  },
};

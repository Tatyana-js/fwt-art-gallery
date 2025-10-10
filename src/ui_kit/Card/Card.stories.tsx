import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card';
import type { ICardProps } from './Card';
import artist from './mock';

const cardData: ICardProps = {
  artist: artist,
  theme: 'dark',
};

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    ...cardData,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    ...cardData,
  },
};

// Длинное имя автора
export const WithLongTitle: Story = {
  args: {
    ...cardData,
  },
};

export const Loading: Story = {
  args: {
    ...cardData,
  },
};

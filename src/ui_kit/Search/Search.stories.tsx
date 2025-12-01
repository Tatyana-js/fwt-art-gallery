import type { Meta, StoryObj } from '@storybook/react-vite';

import Search from './Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Цветовая тема компонента',
    },
    error: {
      control: 'boolean',
      description: 'Показать ошибку',
    },
  },
  args: {
    theme: 'light',
    error: false,
  },
} satisfies Meta<typeof Search>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    theme: 'dark',
    error: false,
    value: '',
    onChange: () => {},
  },
};

export const DefaultLight: Story = {
  args: {
    theme: 'light',
    error: false,
    value: '',
    onChange: () => {},
  },
};

export const ErrorStory: Story = {
  args: {
    theme: 'dark',
    error: true,
    value: '',
    onChange: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Цветовая тема компонента',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла',
    },
    error: {
      control: 'boolean',
      description: 'Показать ошибку',
    },
  },
  args: {
    label: 'Label',
    theme: 'light',
    error: 'errror',
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    label: 'Имя художника',
    theme: 'dark',
    error: 'error',
    placeholder: 'Placeholder',
  },
};

export const DefaultLight: Story = {
  args: {
    label: 'Имя художника',
    theme: 'light',
    error: 'error',
  },
};

export const ErrorStory: Story = {
  args: {
    label: 'Имя художника',
    theme: 'dark',
    error: 'error',
  },
};

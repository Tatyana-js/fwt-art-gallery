import type { Meta, StoryObj } from '@storybook/react-vite';
import InputForm from './InputForm';

const meta = {
  title: 'Components/InputForm',
  component: InputForm,
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
    error: false,
  },
} satisfies Meta<typeof InputForm>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    label: 'Имя художника',
    theme: 'dark',
    error: false,
  },
};

export const DefaultLight: Story = {
  args: {
    label: 'Имя художника',
    theme: 'light',
    error: false,
  },
};

export const ErrorStory: Story = {
  args: {
    label: 'Имя художника',
    theme: 'dark',
    error: true,
  },
};

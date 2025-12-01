import type { Meta, StoryObj } from '@storybook/react-vite';

import Textarea from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
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
    label: 'Описание',
    theme: 'dark',
    error: 'error',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    label: 'Описание проекта',
    theme: 'dark',
    error: 'error',
  },
};

// Светлая тема
export const LightTheme: Story = {
  args: {
    label: 'Комментарий',
    theme: 'light',
    error: 'error',
  },
};

// С ошибкой
export const WithErrorLight: Story = {
  args: {
    label: 'Email',
    theme: 'dark',
    error: 'error',
  },
};

// Длинный текст
export const WithLongText: Story = {
  args: {
    label: 'Полное описание',
    theme: 'light',
    error: 'error',
  },
};

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
    text: {
      control: 'text',
      description: 'Текст в textarea',
    },
    error: {
      control: 'boolean',
      description: 'Показать ошибку',
    },
  },
  args: {
    label: 'Описание',
    text: '',
    theme: 'dark',
    error: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    label: 'Описание проекта',
    text: 'Это описание моего проекта...',
    theme: 'dark',
    error: false,
  },
};

// Светлая тема
export const LightTheme: Story = {
  args: {
    label: 'Комментарий',
    text: 'Этот комментарий содержит несколько строк текста для демонстрации работы текстового поля.',
    theme: 'light',
    error: false,
  },
};

// С ошибкой
export const WithErrorLight: Story = {
  args: {
    label: 'Email',
    text: 'invalid-email',
    theme: 'dark',
    error: true,
  },
};

// Длинный текст
export const WithLongText: Story = {
  args: {
    label: 'Полное описание',
    text: 'Это очень длинный текст, который занимает несколько строк и демонстрирует работу скроллбара. Текст продолжается и продолжается, чтобы показать как компонент ведет себя с большим объемом контента. Еще немного текста для заполнения пространства...',
    theme: 'light',
    error: false,
  },
};

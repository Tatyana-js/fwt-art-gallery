import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Цветовая тема компонента',
    },
    children: {
      control: 'text',
      description: 'Текст лейбла',
    },
  },
  args: {
    theme: 'light',
    children: 'Romantism',
  },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    theme: 'dark',
    children: 'Romantism',
  },
};

export const DefaultLight: Story = {
  args: {
    theme: 'light',
    children: 'Romantism',
  },
};

export const Clickable: Story = {
  args: {
    theme: 'light',
    children: 'Click me',
  },
};

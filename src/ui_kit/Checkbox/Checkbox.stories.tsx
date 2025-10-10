import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Цветовая тема компонента',
    },
  },
  args: {
    theme: 'light',
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    theme: 'dark',
  },
};

export const DefaultLight: Story = {
  args: {
    theme: 'light',
  },
};

export const CheckedDark: Story = {
  args: {
    theme: 'dark',
    checked: true,
  },
};

export const CheckedLight: Story = {
  args: {
    theme: 'light',
    checked: true,
  },
};

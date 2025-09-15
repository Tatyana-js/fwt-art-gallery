import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['defaultButton', 'text', 'icon', 'circleIcon'],
      description: 'Вариант кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Тип кнопки',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    variant: 'defaultButton',
    type: 'submit',
    children: 'Button',
    theme: 'dark',
  },
};

export const TextButton: Story = {
  args: {
    variant: 'text',
    type: 'submit',
    children: (
      <>
        <PlusIcon /> Button Text
      </>
    ),
    theme: 'dark',
  },
};

export const IconButton: Story = {
  args: {
    variant: 'icon',
    type: 'submit',
    children: <DeleteIcon />,
    theme: 'dark',
  },
};

export const IconCircleButton: Story = {
  args: {
    variant: 'circleIcon',
    type: 'submit',
    children: <ArrowIcon />,
    theme: 'dark',
  },
};

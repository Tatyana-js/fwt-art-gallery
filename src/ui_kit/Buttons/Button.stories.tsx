import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["defaultButton", "text", "icon", "circleIcon"],
      description: "Вариант кнопки",
    },
    disabled: {
      control: "boolean",
      description: "Состояние disabled",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Тип кнопки",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    variant: "defaultButton",
    type: "submit",
    children: "Default Button",
  },
};

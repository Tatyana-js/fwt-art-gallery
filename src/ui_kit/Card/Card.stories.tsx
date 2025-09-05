import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";
import type IArtist from "@/types/Artist";
import artist from "./mock";

// данные для историй
const cardData: IArtist = artist;

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
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
    name: "The Starry Night Over the Rhône with Beautiful Sky and Stars",
  },
};

export const Loading: Story = {
  args: {
    ...cardData,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";
import type ICard from "./types";

// данные для историй
const mockCardData: ICard = {
  _id: "66d70a6bb123431edba12d9f",
  name: "Field with poppies",
  yearOfCreation: "1890",
  image: {
    _id: "6895b1b67f43dbbf6fcac009",
    src: "/images/6895b1b57f43dbbf6fcac008/image.jpg",
    webp: "/images/6895b1b57f43dbbf6fcac008/image.webp",
    src2x: "/images/6895b1b57f43dbbf6fcac008/image2x.jpg",
    webp2x: "/images/6895b1b57f43dbbf6fcac008/image2x.webp",
    original: "/images/6895b1b57f43dbbf6fcac008/original.jpg",
  },
  artist: "66d70a65b123431edba12d05",
};

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    ...mockCardData,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    ...mockCardData,
  },
};

// Картина с длинным названием
export const WithLongTitle: Story = {
  args: {
    ...mockCardData,
    name: "The Starry Night Over the Rhône with Beautiful Sky and Stars",
  },
};

export const Loading: Story = {
  args: {
    ...mockCardData,
    name: undefined,
    yearOfCreation: undefined,
    artist: undefined,
  },
};

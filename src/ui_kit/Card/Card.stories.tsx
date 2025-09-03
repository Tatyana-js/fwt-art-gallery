import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";
import type Artist from "../../types/types";

// данные для историй
const cardData: Artist = {
  "genres": [
    "66d70a64b123431edba12ccd"
  ],
  "_id": "66d70a65b123431edba12d05",
  "name": "Vincent van Gogh2",
  "description": "Was a Dutch post-impressionist painter who posthumously became one of the most famous and influential figures in the history of Western art.",
  "yearsOfLife": "30 March 1853 – 29 July 1890",
  "__v": 0,
  "mainPainting": {
    "_id": "66d70a6bb123431edba12d9f",
    "name": "Field with poppies",
    "yearOfCreation": "1890",
    "image": {
      "_id": "6895b1b67f43dbbf6fcac009",
      "src": "/images/6895b1b57f43dbbf6fcac008/image.jpg",
      "webp": "/images/6895b1b57f43dbbf6fcac008/image.webp",
      "src2x": "/images/6895b1b57f43dbbf6fcac008/image2x.jpg",
      "webp2x": "/images/6895b1b57f43dbbf6fcac008/image2x.webp",
      "original": "/images/6895b1b57f43dbbf6fcac008/original.jpg"
    },
    "artist": "66d70a65b123431edba12d05"
  },
  yearOfCreation: ""
};

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

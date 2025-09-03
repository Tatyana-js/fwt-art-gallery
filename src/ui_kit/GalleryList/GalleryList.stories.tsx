import type { Meta, StoryObj } from "@storybook/react-vite";
import GalleryList from "./GalleryList";
import type { IGalleryListProps } from "./GalleryList";

// данные для историй
const paintingsData: IGalleryListProps = {
  artists: [
{
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
    }
  },
  {
    "genres": [
      "66d70a64b123431edba12cc3",
      "66d70a64b123431edba12cc5"
    ],
    "_id": "66d70a65b123431edba12d01",
    "name": "Ivan Shishkin",
    "description": "Was a Russian landscape painter closely associated with the Peredvizhniki movement.",
    "yearsOfLife": "25 January 1832 – 20 March 1898",
    "__v": 0,
    "mainPainting": {
      "_id": "66d70a6ab123431edba12d87",
      "name": "Village courtyard",
      "yearOfCreation": "1860",
      "image": {
        "_id": "68a317877f43dbbf6fcacf85",
        "src": "/images/68a317867f43dbbf6fcacf84/image.jpg",
        "webp": "/images/68a317867f43dbbf6fcacf84/image.webp",
        "src2x": "/images/68a317867f43dbbf6fcacf84/image2x.jpg",
        "webp2x": "/images/68a317867f43dbbf6fcacf84/image2x.webp",
        "original": "/images/68a317867f43dbbf6fcacf84/original.jpg"
      },
      "artist": "66d70a65b123431edba12d01"
    }
  },
  ],
};

const meta = {
  title: "Components/GalleryList",
  component: GalleryList,
  tags: ["autodocs"],
  args: {
    ...paintingsData,
  },
} satisfies Meta<typeof GalleryList>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    ...paintingsData,
  },
};

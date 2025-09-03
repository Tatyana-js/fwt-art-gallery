import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import Card from "./Card"; 
import type Artist from "../../types/types";

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

describe("Card Component", () => {
  describe("render card", () => {
    const { container } = render(
      <Card mainPainting={cardData.mainPainting} />,
    );
    const card = container.firstChild;

    test("check Card", () => {
      expect(card).toBeInTheDocument();
    });
  });
});

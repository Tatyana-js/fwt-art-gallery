import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import Card from "./Card"; // путь к вашему компоненту
import type ICard from "./types"; // импорт типа

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

describe("Card Component", () => {
  describe("render card", () => {
    const { container } = render(
      <Card
        name={mockCardData.name}
        yearOfCreation={mockCardData.yearOfCreation}
      />,
    );
    const card = container.firstChild;

    test("check Card", () => {
      expect(card).toBeInTheDocument();
    });
  });
});

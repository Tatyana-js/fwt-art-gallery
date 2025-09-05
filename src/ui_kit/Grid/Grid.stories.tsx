import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid from "./Grid";
import type { IGridProps } from "./Grid";
import artist from "../Card/mock";
import Card from "../Card/Card";

// данные для историй
const paintingsData: IGridProps = {
  children: Array(6)
    .fill(artist)
    .map((artistData, index) => <Card key={index} {...artistData} />),
};

const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    ...paintingsData,
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    ...paintingsData,
  },
};

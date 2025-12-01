import type { Meta, StoryObj } from '@storybook/react-vite';

import MultiSelect from './MultiSelect';
import { genres } from './mock';
import { selectedGenres } from './mock';

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Цветовая тема компонента',
    },
    genres: {
      table: {
        category: 'Data',
      },
      description: 'Массив жанров для выбора',
    },
    selectedGenres: {
      table: {
        category: 'Data',
      },
      description: 'Массив выбранных жанров',
    },
  },
  args: {
    theme: 'light',
    genres: genres,
    selectedGenres: selectedGenres,
  },
} satisfies Meta<typeof MultiSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const DefaultDark: Story = {
  args: {
    theme: 'dark',
    genres: genres,
    selectedGenres: selectedGenres,
    onGenresChange: () => {}
  },
};

export const DefaultLight: Story = {
  args: {
    theme: 'light',
    genres: genres,
    selectedGenres: selectedGenres,
    onGenresChange: () => {}
  },
};

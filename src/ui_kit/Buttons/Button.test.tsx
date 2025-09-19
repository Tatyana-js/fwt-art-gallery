import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Button from './Button';
import PlusIcon from '@/assets/icons/PlusIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import ArrowIconLight from '@/assets/icons/ArrowIcon';

describe('Button Component', () => {
  describe('render defaultButton', () => {
    const { container } = render(
      <Button variant="defaultButton" type="button" theme="dark">
        TEXT
      </Button>
    );
    const button = container.firstChild;

    test('check Button', () => {
      expect(button).toBeInTheDocument();
    });
  });

  describe('render text', () => {
    const { container } = render(
      <Button variant="text" type="button" theme="dark">
        <PlusIcon />
        TEXT
      </Button>
    );
    const button = container.firstChild;

    test('check Button', () => {
      expect(button).toBeInTheDocument();
    });
  });

  describe('render icon', () => {
    const { container } = render(
      <Button variant="icon" type="button" theme="dark">
        <DeleteIcon />
      </Button>
    );
    const button = container.firstChild;

    test('check Button', () => {
      expect(button).toBeInTheDocument();
    });
  });

  describe('render circleIcon', () => {
    const { container } = render(
      <Button variant="text" type="button" theme="dark">
        <ArrowIconLight />
      </Button>
    );
    const button = container.firstChild;

    test('check Button', () => {
      expect(button).toBeInTheDocument();
    });
  });
});

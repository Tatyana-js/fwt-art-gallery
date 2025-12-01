import useMediaQuery from '@/hooks/useMediaQuery';
import { IFilterModalState } from '@/types/types';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './FilterComponent.module.scss';

import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Modal from '@/ui_kit/Modal';

import ClearIcon from '@/assets/icons/ClearIcon';

import FilterModal from './FilterModal';

interface IFilterCopmponentProps {
  theme: theme;
  filterState: IFilterModalState;
  setFilterState: React.Dispatch<React.SetStateAction<IFilterModalState>>;
  closeModal: () => void;
  onApplyFilters: () => void;
}

const FilterCopmponent: FC<IFilterCopmponentProps> = ({
  theme,
  filterState,
  setFilterState,
  closeModal,
  onApplyFilters,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      {isMobile ? (
        <Modal variant="filter" closeModal={closeModal}>
          <FilterModal
            theme={theme}
            filterState={filterState}
            setFilterState={setFilterState}
            onApplyFilters={onApplyFilters}
          />
        </Modal>
      ) : (
        <div
          className={clsx(
            styles.filterWrapper,
            styles[`filterWrapper--${theme}`]
          )}
        >
          <FilterModal
            theme={theme}
            filterState={filterState}
            setFilterState={setFilterState}
            onApplyFilters={onApplyFilters}
          />
          <div className={styles.closeButton}>
            <Button
              variant="icon"
              theme={theme}
              onClick={() =>
                setFilterState((prev) => ({ ...prev, isOpen: false }))
              }
            >
              <ClearIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterCopmponent;

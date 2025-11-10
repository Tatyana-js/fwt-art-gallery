import { useSwipe } from '@/hooks/useSwipe';
import clsx from 'clsx';
import { FC, useCallback, useEffect } from 'react';

import styles from './SliderPaintings.module.scss';

import IArtist, { IPainting } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import getImageSrc from '@/utils/getImageSrc';

import ArrowIcon from '@/assets/icons/ArrowIcon';
import ClearIcon from '@/assets/icons/ClearIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import PreviewIcon from '@/assets/icons/PreviewIcon';

interface ISliderPaintingsProps {
  theme: theme;
  artist: IArtist;
  onDeleteModal: (painting: IPainting) => void;
  onPaintModal: () => void;
  currentIndex: number | null;
  onSlideChange: (index: number) => void;
  openSlider: () => void;
  onSetMainPaint: () => void;
}

const SliderPaintings: FC<ISliderPaintingsProps> = ({
  theme,
  artist,
  onDeleteModal,
  onPaintModal,
  currentIndex,
  onSlideChange,
  openSlider,
  onSetMainPaint,
}) => {
  const { paintings, mainPainting } = artist;
  const currentPainting =
    currentIndex !== null ? paintings[currentIndex] : undefined;

  const goToNext = useCallback(() => {
    if (currentIndex === null || paintings.length === 0) return;
    const nextIndex = (currentIndex + 1) % paintings.length;
    onSlideChange(nextIndex);
  }, [currentIndex, paintings.length, onSlideChange]);

  const goToPrev = useCallback(() => {
    if (currentIndex === null || paintings.length === 0) return;
    const prevIndex = (currentIndex - 1 + paintings.length) % paintings.length;
    onSlideChange(prevIndex);
  }, [currentIndex, paintings.length, onSlideChange]);

  const swipeHandlers = useSwipe(goToNext, goToPrev);

  useEffect(() => {
    if (!currentPainting) {
      openSlider();
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (paintings.length === 0) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [
    currentPainting,
    currentIndex,
    paintings.length,
    onSlideChange,
    openSlider,
    goToNext,
    goToPrev,
  ]);

  if (!currentPainting) {
    return null;
  }
  console.log(currentIndex);
  const pageCounterText =
    currentIndex !== null && paintings.length > 0
      ? `${currentIndex + 1} / ${paintings.length}`
      : '0 / 0';
  const { name, yearOfCreation } = currentPainting;
  const isMainPaint = currentPainting._id === mainPainting?._id;

  return (
    <div className={styles.container} {...swipeHandlers}>
      <div className={styles.mainImageContainer}>
        <img
          src={getImageSrc(currentPainting.image.src)}
          alt={currentPainting.name}
          className={styles.mainImage}
        />
        {!isMainPaint && (
          <div className={styles.setContainer}>
            <div className={styles.previewIcon}>
              <Button variant="icon" theme={theme} onClick={onSetMainPaint}>
                <PreviewIcon />
              </Button>
            </div>
            <Button variant="text" theme={theme} onClick={onSetMainPaint}>
              SET THE COVER
            </Button>
          </div>
        )}
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
          onClick={openSlider}
        >
          <ClearIcon />
        </button>
        <div className={styles.buttonNext}>
          <Button variant="icon" theme={theme} onClick={goToNext}>
            <ArrowIcon />
          </Button>
        </div>
        <div className={styles.buttonPrev}>
          <Button variant="icon" theme={theme} onClick={goToPrev}>
            <ArrowIcon />
          </Button>
        </div>
        <div
          className={clsx(
            styles.infoContainer,
            styles[`infoContainer--${theme}`]
          )}
        >
          <div className={clsx(styles.line, styles[`line--${theme}`])}></div>
          <p className={clsx(styles.details, styles[`details--${theme}`])}>
            {yearOfCreation}
          </p>
          <p>{name}</p>
        </div>
        <div className={styles.editButtons}>
          <Button variant="icon" theme={theme} onClick={onPaintModal}>
            <EditIcon />
          </Button>
          <Button
            variant="icon"
            theme={theme}
            onClick={() => onDeleteModal(currentPainting)}
          >
            <DeleteIcon />
          </Button>
        </div>
        <div className={styles.pageCounter}>{pageCounterText}</div>
      </div>
      <div className={styles.thumbnails}>
        {paintings.map((painting, index) => (
          <img
            key={painting._id}
            src={painting.image.src}
            alt={painting.name}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderPaintings;

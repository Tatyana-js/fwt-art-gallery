import clsx from 'clsx';
import { FC } from 'react';

import styles from './SliderPaintings.module.scss';

import IArtist, { IPainting } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import ClearIcon from '@/assets/icons/ClearIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import PreviewIcon from '@/assets/icons/PreviewIcon';

import AnimatedImage from './AnimatedImage';

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

  if (!currentPainting) {
    return null;
  }

  const pageCounterText =
    currentIndex !== null && paintings.length > 0
      ? `${currentIndex + 1} / ${paintings.length}`
      : '0 / 0';
  const { name, yearOfCreation } = currentPainting;
  const isMainPaint = currentPainting._id === mainPainting?._id;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.mainImageContainer)}>
        <AnimatedImage
          theme={theme}
          currentPainting={currentPainting}
          onSlideChange={onSlideChange}
          currentIndex={currentIndex!}
          paintings={paintings}
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

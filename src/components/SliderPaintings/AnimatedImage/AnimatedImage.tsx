import { useSwipe } from '@/hooks/useSwipe';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

import styles from './AnimatedImage.module.scss';

import { IPainting } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import getImageSrc from '@/utils/getImageSrc';

import ArrowIcon from '@/assets/icons/ArrowIcon';

interface AnimatedImageProps {
  theme: theme;
  currentPainting: IPainting;
  onSlideChange: (index: number) => void;
  currentIndex: number;
  paintings: Array<{ _id: string; image: { src: string }; name: string }>;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  theme,
  currentPainting,
  onSlideChange,
  currentIndex,
  paintings,
}) => {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null
  );
  const [prevPainting, setPrevPainting] = useState(currentPainting);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (currentIndex === null || paintings.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');

    const nextIndex = currentIndex + 1;
    setPrevPainting(currentPainting);

    setTimeout(() => {
      onSlideChange(nextIndex);
    }, 10);
  }, [
    currentIndex,
    paintings.length,
    onSlideChange,
    currentPainting,
    isAnimating,
  ]);

  const goToPrev = useCallback(() => {
    if (currentIndex === null || paintings.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');

    const prevIndex = currentIndex - 1;
    setPrevPainting(currentPainting);

    setTimeout(() => {
      onSlideChange(prevIndex);
    }, 10);
  }, [
    currentIndex,
    paintings.length,
    onSlideChange,
    currentPainting,
    isAnimating,
  ]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
        setPrevPainting(currentPainting);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, currentPainting]);

  const swipeHandlers = useSwipe(goToNext, goToPrev);

  return (
    <div className={styles.sliderContainer} {...swipeHandlers}>
      {isAnimating && (
        <img
          src={getImageSrc(prevPainting.image.src)}
          alt={prevPainting.name}
          className={clsx(
            styles.image,
            styles.prevImage,
            slideDirection === 'right' && styles.slideOutLeft,
            slideDirection === 'left' && styles.slideOutRight
          )}
        />
      )}
      <img
        src={getImageSrc(currentPainting.image.src)}
        alt={currentPainting.name}
        className={clsx(
          styles.image,
          styles.currentImage,
          slideDirection === 'right' && styles.slideInRight,
          slideDirection === 'left' && styles.slideInLeft
        )}
      />
      <div className={styles.buttonNext}>
        <Button
          variant="icon"
          theme={theme}
          onClick={goToNext}
          disabled={currentIndex === paintings.length - 1}
        >
          <ArrowIcon />
        </Button>
      </div>
      <div className={styles.buttonPrev}>
        <Button
          variant="icon"
          theme={theme}
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};
export default AnimatedImage;

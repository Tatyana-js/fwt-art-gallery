import clsx from 'clsx';
import { FC, useRef, useState } from 'react';

import styles from './EmptyCard.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import AddArtistPhoto from '@/assets/image/AddArtistPhoto';

export interface ICardProps {
  theme: theme;
}

const EmptyCard: FC<ICardProps> = ({ theme }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFilesDrop = (files: File[]) => {
    console.log('Dropped files:', files);
    // Обработка файлов
  };

  const handleBrowseClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFilesDrop(files);
    }
  };

  return (
    <div className={styles.columnLeft}>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileInputChange}
        accept="image/*"
      />
      <div
        className={clsx(isDragOver && styles.dragOver)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const files = Array.from(e.dataTransfer.files);
          const imageFiles = files.filter((file) =>
            file.type.startsWith('image/')
          );
          if (imageFiles.length > 0) handleFilesDrop(imageFiles);
        }}
        onClick={handleBrowseClick}
      >
        <div className={clsx(styles.image, styles[`image--${theme}`])}>
          <AddArtistPhoto />
          <div
            className={clsx(
              styles.dropMessage,
              styles[`dropMessage--${theme}`]
            )}
          >
            <p>You can drop your image here</p>
          </div>
        </div>
      </div>
      <Button variant="text" theme={theme} onClick={handleBrowseClick}>
        BROWSE PROFILE PHOTO
      </Button>
    </div>
  );
};

export default EmptyCard;

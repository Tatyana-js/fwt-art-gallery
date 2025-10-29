import clsx from 'clsx';
import { FC, useRef } from 'react';

import styles from './EmptyCard.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import DeleteIcon from '@/assets/icons/DeleteIcon';
import AddArtistPhoto from '@/assets/image/AddArtistPhoto';

export interface IEmptyCardProps {
  theme: theme;
  onFilesDrop: (files: File[]) => void;
  previewUrl?: string | null;
  // selectedFile?: File | null;
  isDragOver?: boolean;
  setIsDragOver: (arg0: boolean) => void;
  handleClearImage: () => void;
}

const EmptyCard: FC<IEmptyCardProps> = ({
  theme,
  onFilesDrop,
  previewUrl,
  // selectedFile,
  isDragOver = false,
  setIsDragOver,
  handleClearImage,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesDrop(files);
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) onFilesDrop(imageFiles);
  };

  return (
    <div className={clsx(styles.columnLeft)}>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileInputChange}
        accept="image/*"
      />
      <div
        className={clsx(
          styles.image,
          styles[`image--${theme}`],
          isDragOver && styles.imageDrag
        )}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        {isDragOver ? (
          <div className={styles.dragOverState}>
            <AddArtistPhoto />
            <div className={styles.messageContainer}>
              <p className={styles.dropMessage}>Drop your image here</p>
              <p className={styles.uploadMessage}>
                Upload only .jpg or .png format less than 3 MB
              </p>
            </div>
          </div>
        ) : previewUrl ? (
          <>
            <img
              src={previewUrl || ''}
              alt="Preview"
              className={styles.previewImage}
            />
            <div className={clsx(styles.deleteButton)}>
              <Button
                variant="icon"
                theme={theme}
                onClick={(e) => {
                  e.stopPropagation();
                  onFilesDrop([]);
                  handleClearImage();
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <AddArtistPhoto />
            <p className={styles.emptyCardMessage}>
              You can drop your image here
            </p>
          </div>
        )}
      </div>
      {!isDragOver && (
        <Button variant="text" theme={theme} onClick={handleBrowseClick}>
          BROWSE PROFILE PHOTO
        </Button>
      )}
    </div>
  );
};

export default EmptyCard;

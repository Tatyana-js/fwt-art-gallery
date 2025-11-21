import { useUpdateArtistMainPaintingMutation } from '@/store/api/artistsApi';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import styles from './PaintingGallery.module.scss';

import EmptyPaintings from '@/components/EmptyPaintings';
import SettingPaintButton from '@/components/SettingPaintButton';

import IArtist from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card';
import Grid from '@/ui_kit/Grid';
import Modal from '@/ui_kit/Modal';

import PlusIcon from '@/assets/icons/PlusIcon';

import DeleteModal from '../DeleteModal';
import Pagination from '../Pagination';
import PaintModal from '../PaintModal';
import Skeletons from '../Skeletons';
import SliderPaintings from '../SliderPaintings';

interface IPaintingsGalleryProps {
  theme: theme;
  artist: IArtist;
  isAuth: boolean;
  isLoading: boolean;
}

const PaintingsGallery: FC<IPaintingsGalleryProps> = ({
  theme,
  artist,
  isAuth,
  isLoading,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [updateMainPainting] = useUpdateArtistMainPaintingMutation();

  const { paintings } = artist;
  const currentPainting =
    currentIndex !== null ? paintings[currentIndex] : undefined;

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handleSetMainPainting = (paintId: string) => {
    updateMainPainting({
      id: artist._id,
      paintingId: paintId,
    });
  };

  return (
    <>
      <div className={clsx(styles.containerPicture, 'container')}>
        <h3 className={clsx(styles.workTitle, styles[`workTitle--${theme}`])}>
          Artworks
        </h3>
        {isAuth && paintings?.length && (
          <div
            className={clsx(styles.addPicture, styles[`addPicture--${theme}`])}
          >
            <Button
              theme={theme}
              variant="text"
              onClick={() => setEditModal(true)}
            >
              <PlusIcon />
              ADD PICTURE
            </Button>
          </div>
        )}
        {paintings?.length > 0 ? (
          <Grid>
            {isLoading &&
              Array(paintings.length)
                .fill(null)
                .map(() => <Skeletons key={nanoid()} theme={theme} />)}
            {paintings.map((painting, index) => (
              <div
                key={painting._id}
                className={styles.cardContainer}
                onMouseOver={() => {
                  if (!isMobile) setHoveredCardId(painting._id);
                }}
              >
                <Card
                  theme={theme}
                  name={painting.name}
                  details={painting.yearOfCreation}
                  imageSrc={painting.image.src}
                  type="painting"
                  onClick={() => {
                    setIsSliderOpen(true);
                    setCurrentIndex(index);
                  }}
                />
                {isAuth && (isMobile || hoveredCardId === painting._id) && (
                  <SettingPaintButton
                    theme={theme}
                    onEdit={() => {
                      setEditModal(true);
                      setCurrentIndex(index);
                    }}
                    onDelete={() => {
                      setDeleteModal(true);
                      setCurrentIndex(index);
                    }}
                    onSetMainPaint={() => handleSetMainPainting(painting._id)}
                  />
                )}
              </div>
            ))}
          </Grid>
        ) : (
          <EmptyPaintings
            theme={theme}
            onAddPaint={() => setEditModal(true)}
            isPaintModalOpen={false}
          />
        )}
      </div>
      {paintings.length >= 6 && (
        <Pagination
          currentIndex={currentIndex ?? 0}
          setCurrentIndex={setCurrentIndex}
          totalPages={paintings.length}
          theme={theme}
        />
      )}

      {isEditModal && (
        <Modal variant="painting" closeModal={() => setEditModal(false)}>
          <PaintModal
            theme={theme}
            artistId={artist._id}
            closeModal={() => setEditModal(false)}
            editingPainting={
              currentIndex !== null ? paintings[currentIndex] : undefined
            }
          />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal variant="deleteArtist" closeModal={() => setDeleteModal(false)}>
          <DeleteModal
            theme={theme}
            closeModal={() => setDeleteModal(false)}
            artist={artist}
            type="painting"
            painting={
              currentIndex !== null ? paintings[currentIndex] : undefined
            }
          />
        </Modal>
      )}
      {isSliderOpen && (
        <SliderPaintings
          theme={theme}
          artist={artist}
          openSlider={() => {
            setCurrentIndex(null);
            setIsSliderOpen(false);
          }}
          onDeleteModal={() => setDeleteModal(true)}
          onPaintModal={() => setEditModal(true)}
          onSetMainPaint={() => {
            if (currentPainting?._id) {
              handleSetMainPainting(currentPainting._id);
            }
          }}
          currentIndex={currentIndex}
          onSlideChange={setCurrentIndex}
        />
      )}
    </>
  );
};

export default PaintingsGallery;

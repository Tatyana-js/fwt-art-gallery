import useTheme from '@/hooks/index';
import { useGetArtistByIdQuery } from '@/store/api/artistsApi';
import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ArtistProfile.module.scss';

import Artist from '@/components/Artist';
import DeleteModal from '@/components/DeleteModal';
import PaintModal from '@/components/PaintModal';
import SliderPaintings from '@/components/SliderPaintings';

import type { IMainPainting } from '@/types/Artist';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card';
import Grid from '@/ui_kit/Grid';
import Modal from '@/ui_kit/Modal';

import PlusIcon from '@/assets/icons/PlusIcon';
import EmptyImage from '@/assets/image/EmptyImage';

interface IArtistProfile {
  artistModal?: () => void;
}

const ArtistProfile: FC<IArtistProfile> = ({ artistModal }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isPaintModal, setIsPaintModal] = useState<boolean>(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [deleteModalType, setDeleteModalType] = useState<'artist' | 'painting'>(
    'artist'
  );
  const { theme } = useTheme();
  const { id } = useParams();
  const { data: artist } = useGetArtistByIdQuery(id);
  const isAuth = useSelector(selectIsAuth);

  if (!artist) return null;
  const { paintings } = artist;

  return (
    <div className={clsx(styles[`containerArtist--${theme}`])}>
      <Artist
        theme={theme}
        artist={artist}
        artistModal={artistModal}
        openDeleteModal={() => {
          setIsOpenDeleteModal(true);
          setDeleteModalType('artist');
        }}
      />
      {isOpenDeleteModal && (
        <Modal
          theme={theme}
          variant="deleteArtist"
          closeModal={setIsOpenDeleteModal}
        >
          <DeleteModal
            theme={theme}
            artist={deleteModalType === 'artist' ? artist : undefined}
            painting={
              deleteModalType === 'painting' && currentIndex !== null
                ? paintings[currentIndex]
                : undefined
            }
            closeModal={() => setIsOpenDeleteModal(false)}
            artistId={artist._id}
            type={deleteModalType}
            // openSlider={() => setIsSliderOpen(false)}
            // paintingsCount={paintings.length}
          />
        </Modal>
      )}
      {isPaintModal && (
        <Modal theme={theme} variant="painting" closeModal={setIsPaintModal}>
          <PaintModal
            theme={theme}
            artistId={artist._id}
            closeModal={setIsPaintModal}
            editingPainting={
              currentIndex !== null ? paintings[currentIndex] : undefined
            }
          />
        </Modal>
      )}
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
              onClick={() => {
                setCurrentIndex(null);
                setIsPaintModal(true);
              }}
            >
              <PlusIcon />
              ADD PICTURE
            </Button>
          </div>
        )}
        {isSliderOpen && (
          <SliderPaintings
            theme={theme}
            paintings={paintings}
            openSlider={() => setIsSliderOpen(false)}
            onDeleteModal={() => {
              setDeleteModalType('painting');
              setIsOpenDeleteModal(true);
            }}
            onPaintModal={() => setIsPaintModal(true)}
            currentIndex={currentIndex!}
            onSlideChange={(index) => setCurrentIndex(index)}
          />
        )}
        {paintings?.length > 0 ? (
          <Grid>
            {paintings.map(
              ({ _id, name, yearOfCreation, image }: IMainPainting, index) => (
                <Card
                  key={_id}
                  theme={theme}
                  name={name}
                  details={yearOfCreation}
                  imageSrc={image.src}
                  type="painting"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsSliderOpen(true);
                  }}
                />
              )
            )}
          </Grid>
        ) : (
          <>
            <div className={styles.paintings}>
              <div
                className={clsx(
                  styles.emptyContainer,
                  styles[`emptyContainer--${theme}`]
                )}
              >
                <EmptyImage />
                <div
                  className={clsx(
                    styles.addButton,
                    styles[`addButton--${theme}`]
                  )}
                >
                  {!isPaintModal && (
                    <Button
                      theme={theme}
                      variant="circleIcon"
                      onClick={() => setIsPaintModal(true)}
                    >
                      <PlusIcon />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.messageContainer}>
              <div
                className={clsx(styles.line, styles[`line--${theme}`])}
              ></div>
              <p className={clsx(styles.message)}>
                The paintings of this artist have not been uploaded yet.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;

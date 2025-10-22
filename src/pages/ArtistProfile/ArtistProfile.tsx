import { useGetArtistByIdQuery } from '@/api/artistsApi';
import useTheme from '@/hooks/index';
import clsx from 'clsx';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ArtistProfile.module.scss';

import Artist from '@/components/Artist';

import type { IMainPainting } from '@/types/Artist';

import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';

import EmptyImage from '@/assets/image/EmptyImage';

interface IArtistProfile {
  openMоdal?: () => void;
}

const ArtistProfile: FC<IArtistProfile> = ({ openMоdal }) => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { data: artist } = useGetArtistByIdQuery(id);

  if (!artist) return null;

  const { paintings } = artist;
  return (
    <div
      className={clsx(
        styles.containerArtist,
        styles[`containerArtist--${theme}`]
      )}
    >
      <Artist theme={theme} artist={artist} openMоdal={openMоdal} />
      <div className="container">
        <h3 className={clsx(styles.workTitle, styles[`workTitle--${theme}`])}>
          Artworks
        </h3>
        <Grid>
          {paintings?.length > 0 ? (
            paintings.map(
              ({ _id, name, yearOfCreation, image }: IMainPainting) => (
                <Card
                  key={_id}
                  theme={theme}
                  name={name}
                  details={yearOfCreation}
                  imageSrc={image.src}
                  type="painting"
                />
              )
            )
          ) : (
            <div className={styles.emptyPhoto}>
              <EmptyImage />
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
};
export default ArtistProfile;

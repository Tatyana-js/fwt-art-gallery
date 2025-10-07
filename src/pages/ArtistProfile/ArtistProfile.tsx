import { FC } from 'react';
import useTheme from '@/hooks/index';
import { useParams } from 'react-router-dom';
import styles from './ArtistProfile.module.scss';
import { useGetArtistByIdQuery } from '@/api/artistsApi';
import clsx from 'clsx';
import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';
import type { IMainPainting } from '@/types/Artist';
import Artist from '@/ui_kit/Artist';

const ArtistProfile: FC = () => {
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
      <Artist theme={theme} artist={artist} />
      <div className="container">
        <h3 className={clsx(styles.workTitle, styles[`workTitle--${theme}`])}>
          Artworks
        </h3>
        <Grid>
          {paintings.map(
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
          )}
        </Grid>
      </div>
    </div>
  );
};
export default ArtistProfile;

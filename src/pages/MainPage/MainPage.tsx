import { useGetArtistsQuery } from '@/api/artistsApi';
import useTheme from '@/hooks/index';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

import type IArtist from '@/types/Artist.ts';

import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';

import router from '@/utils/routes';

const MainPage: FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCardClick = (artistId: string) => {
    navigate(router.artist_profile(artistId));
  };

  const { data: artists } = useGetArtistsQuery();

  return (
    <div className={clsx(styles.mainPage, styles[`mainPage--${theme}`])}>
      <div className="container">
        <Grid>
          {artists?.map(({ _id, mainPainting }: IArtist) => (
            <Card
              key={mainPainting._id}
              theme={theme}
              name={mainPainting.name}
              details={mainPainting.yearOfCreation}
              imageSrc={mainPainting.image.src}
              type="painting"
              onClick={() => handleCardClick(_id)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default MainPage;

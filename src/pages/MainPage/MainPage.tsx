import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import router from '@/utils/routes';
import styles from './MainPage.module.scss';
import useTheme from '@/hooks/index';
import Grid from '@/ui_kit/Grid/Grid';
import Card from '@/ui_kit/Card/Card';
import type IArtist from '@/types/Artist.ts';
import { useGetArtistsQuery } from '@/api/artistsApi';

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

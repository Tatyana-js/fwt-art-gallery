import { useGetArtistsQuery } from '@/api/artistsApi';
import useTheme from '@/hooks/index';
import { selectIsAuth } from '@/init';
import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

import type IArtist from '@/types/Artist.ts';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';

import router from '@/utils/routes';

import PlusIcon from '@/assets/icons/PlusIcon';

interface IMainPage {
  openMоdal: () => void;
}

const MainPage: FC<IMainPage> = ({ openMоdal }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const { data: artistsData } = useGetArtistsQuery();
  console.log(artistsData);
  const artists =
    ((artistsData && typeof artistsData === 'object' && 'data' in artistsData
      ? artistsData.data
      : artistsData) as IArtist[]) || [];

  const handleCardClick = (artistId: string) => {
    navigate(router.artist_profile(artistId));
  };

  return (
    <div className={clsx(styles.mainPage, styles[`mainPage--${theme}`])}>
      <div className="container">
        {isAuth && (
          <div
            className={clsx(
              styles.addArtistButton,
              styles[`addArtistButton--${theme}`]
            )}
          >
            <Button variant="text" theme={theme} onClick={openMоdal}>
              <PlusIcon />
              ADD ARTISTS
            </Button>
          </div>
        )}
        <Grid>
          {artists?.map((artist: IArtist) => (
            <Card
              key={artist._id}
              theme={theme}
              name={artist.name}
              details={artist.yearsOfLife}
              imageSrc={artist.mainPainting?.image?.src ?? ''}
              type="painting"
              onClick={() => handleCardClick(artist._id)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;

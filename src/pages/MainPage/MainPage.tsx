import useTheme from '@/hooks/index';
import { useGetArtistsQuery } from '@/store/api/artistsApi';
import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

import type IArtist from '@/types/Artist.ts';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';

import router from '@/utils/routes';

import FilterIcon from '@/assets/icons/FilterIcon';
import PlusIcon from '@/assets/icons/PlusIcon';

interface IMainPage {
  openMоdal: () => void;
}

const MainPage: FC<IMainPage> = ({ openMоdal }) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const { data: artistsData } = useGetArtistsQuery();

  const artists =
    ((artistsData && typeof artistsData === 'object' && 'data' in artistsData
      ? artistsData.data
      : artistsData) as IArtist[]) || [];

  const handleCardClick = (artistId: string) => {
    navigate(router.artist_profile(artistId));
  };

  const visibleArtists = artists.slice(0, visibleCount);
  const hasMoreArtists = visibleCount < artists.length;

  const handleLoadMore = () => {
    setVisibleCount((prev: number) => prev + 8);
  };

  return (
    <div className={clsx(styles.mainPage, styles[`mainPage--${theme}`])}>
      <div className="container">
        {isAuth && (
          <>
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
            <div
              className={clsx(
                styles.filterButton,
                styles[`filterButton--${theme}`]
              )}
            >
              <Button variant="icon" theme={theme}>
                <FilterIcon />
              </Button>
            </div>
          </>
        )}
        <Grid>
          {visibleArtists?.map((artist: IArtist) => (
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
        {hasMoreArtists && (
          <div
            className={clsx(styles.loadButton, styles[`loadButton--${theme}`])}
          >
            <Button variant="text" theme={theme} onClick={handleLoadMore}>
              LOAD MORE
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

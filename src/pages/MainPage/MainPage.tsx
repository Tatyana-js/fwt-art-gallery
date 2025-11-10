import useTheme from '@/hooks/index';
import { useGetArtistsQuery } from '@/store/api/artistsApi';
import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

import type IArtist from '@/types/Artist.ts';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';
import Search from '@/ui_kit/Search';

import router from '@/utils/routes';

import FilterIcon from '@/assets/icons/FilterIcon';
import PlusIcon from '@/assets/icons/PlusIcon';

interface IMainPage {
  openMоdal: () => void;
  value: string;
  onChange: (value: string) => void;
}

const MainPage: FC<IMainPage> = ({ openMоdal, value, onChange }) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const { data: artistsData } = useGetArtistsQuery();

  useEffect(() => {
    setVisibleCount(6);
  }, [value]);

  console.log(value);

  const artists =
    ((artistsData && typeof artistsData === 'object' && 'data' in artistsData
      ? artistsData.data
      : artistsData) as IArtist[]) || [];

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(value.toLowerCase().trim())
  );

  const handleCardClick = (artistId: string) => {
    navigate(router.artist_profile(artistId));
  };

  const visibleArtists = filteredArtists.slice(0, visibleCount);
  const hasMoreArtists = visibleCount < filteredArtists.length;

  const handleLoadMore = () => {
    const nextCount = Math.min(visibleCount + 6, filteredArtists.length);
    setVisibleCount(nextCount);
  };

  return (
    <div className={clsx(styles.mainPage, styles[`mainPage--${theme}`])}>
      <div className="container">
        {isAuth && (
          <>
            <div
              className={clsx(
                styles.buttonContainer,
                styles[`buttonContainer--${theme}`]
              )}
            >
              <div className={styles.addArtistButton}>
                <Button variant="text" theme={theme} onClick={openMоdal}>
                  <PlusIcon />
                  ADD ARTISTS
                </Button>
              </div>

              <div className={styles.buttons}>
                <div className={styles.searchButton}>
                  <Search theme={theme} value={value} onChange={onChange} />
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
              </div>
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
          {value && filteredArtists.length === 0 && (
            <div className={styles.messageContainer}>
              <p
                className={clsx(
                  styles.noResults,
                  styles[`noResults--${theme}`]
                )}
              >
                No matches for{' '}
                <span className={styles.searchValue}>{value}</span>
              </p>
              <p className={styles.message}>
                Please try again with a different spelling or keywords.
              </p>
            </div>
          )}
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

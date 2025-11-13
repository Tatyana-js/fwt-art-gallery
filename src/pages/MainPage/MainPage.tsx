import useTheme from '@/hooks/useTheme';
import { useGetArtistsQuery } from '@/store/api/artistsApi';
import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.scss';

import AuthSection from '@/components/AuthSection';
import FilterCopmponent from '@/components/Filter';

import type IArtist from '@/types/Artist.ts';
import { ArtistsQueryParams } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';
import Grid from '@/ui_kit/Grid/Grid';

import router from '@/utils/routes';

interface IMainPage {
  openMоdal: () => void;
  value: string;
  onChange: (value: string) => void;
}

export interface IFilterModalState {
  isOpen: boolean;
  genres: {
    isListOpen: boolean;
    selectedGenres: string[];
  };
  sort: {
    isSortOpen: boolean;
    selected: string | null;
  };
}

const MainPage: FC<IMainPage> = ({ openMоdal, value, onChange }) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [filterState, setFilterState] = useState<IFilterModalState>({
    isOpen: false,
    genres: {
      isListOpen: false,
      selectedGenres: [],
    },
    sort: {
      isSortOpen: false,
      selected: null,
    },
  });

  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const { genres, sort } = filterState;

  const queryParams = useMemo((): ArtistsQueryParams => {
    const params: ArtistsQueryParams = {};

    if (value) {
      params.name = value.trim();
    }
    if (genres.selectedGenres.length > 0) {
      params.genres = genres.selectedGenres;
    }
    return params;
  }, [value, genres.selectedGenres]);

  const { data: artistsData } = useGetArtistsQuery(
    Object.keys(queryParams).length > 0 ? queryParams : undefined
  );

  const artists = useMemo(
    () =>
      ((artistsData && typeof artistsData === 'object' && 'data' in artistsData
        ? artistsData.data
        : artistsData) as IArtist[]) || [],
    [artistsData]
  );

  // сортировка на клиенте
  const sortedArtists = useMemo(() => {
    if (!artists) return [];

    if (sort.selected === 'a_to_z') {
      return [...artists].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort.selected === 'z_to_a') {
      return [...artists].sort((a, b) => b.name.localeCompare(a.name));
    }
    return artists;
  }, [artists, sort.selected]);

  useEffect(() => {
    setVisibleCount(6);
  }, [value, genres.selectedGenres, sort.selected]);

  const handleCardClick = (artistId: string) => {
    navigate(router.artist_profile(artistId));
  };

  const visibleArtists = sortedArtists.slice(0, visibleCount);
  const hasMoreArtists = visibleCount < sortedArtists.length;

  const handleLoadMore = () => {
    const nextCount = Math.min(visibleCount + 6, artists.length);
    setVisibleCount(nextCount);
  };

  const handleCloseModal = () => {
    setFilterState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };
  const handleApplyFilters = () => {
    setFilterState((prev) => ({ ...prev, isOpen: false }));
    setVisibleCount(6);
  };

  return (
    <div className={clsx(styles.mainPage, styles[`mainPage--${theme}`])}>
      <div className="container">
        {isAuth && (
          <AuthSection
            theme={theme}
            value={value}
            onChange={onChange}
            onAddArtist={openMоdal}
            onOpenFilter={() =>
              setFilterState((prev) => ({
                ...prev,
                isOpen: true,
              }))
            }
          />
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
          {visibleArtists.length === 0 && (
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
        {filterState.isOpen && (
          <FilterCopmponent
            theme={theme}
            closeModal={handleCloseModal}
            filterState={filterState}
            setFilterState={setFilterState}
            onApplyFilters={handleApplyFilters}
          />
        )}
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

// Сортировка на сервере не работает.
//   if (sort.selected && sort.selected !== 'recently_added') {
//     if (sort.selected === 'a_to_z') {
//       params.orderBy = 'name';
//       params.direction = 'asc';
//     } else if (sort.selected === 'z_to_a') {
//       params.orderBy = 'name';
//       params.direction = 'desc';
//     }
//   }

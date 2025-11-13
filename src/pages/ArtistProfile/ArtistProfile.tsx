import useTheme from '@/hooks/useTheme';
import { useGetArtistByIdQuery } from '@/store/api/artistsApi';
import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ArtistProfile.module.scss';

import Artist from '@/components/Artist';
import PaintingsGallery from '@/components/PaintingGallery';

const ArtistProfile: FC = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { data: artist } = useGetArtistByIdQuery(id);
  const isAuth = useSelector(selectIsAuth);

  if (!artist) return null;

  return (
    <div className={clsx(styles[`containerArtist--${theme}`])}>
      <Artist theme={theme} artist={artist} />
      <PaintingsGallery theme={theme} artist={artist} isAuth={isAuth} />
    </div>
  );
};

export default ArtistProfile;

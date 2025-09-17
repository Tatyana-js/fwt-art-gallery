import { FC } from 'react';
import styles from './MainPage.module.scss';
import type { theme } from '@/types/types';
import artists from '@/ui_kit/Grid/mock';
import Grid from '@/ui_kit/Grid/Grid';
import Card from '@/ui_kit/Card/Card';
import IArtist from '@/types/Artist.ts';
import Footer from '@/components/Footer/Footer';

export interface IMainPage {
  theme: theme;
}

const MainPage:FC<IMainPage> = ({ theme }) => {
  return (
    <div className={styles.container}>
      <Grid>
        {artists.map((item: IArtist) => (
          <Card key={item._id} theme={theme} artist={item} />
        ))}
      </Grid>
    </div>
  )
}

export default MainPage;
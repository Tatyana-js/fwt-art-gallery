import { FC } from 'react';
import styles from './MainPage.module.scss';
import type { theme } from '@/types/types';
import artists from '@/ui_kit/Grid/mock';
import Grid from '@/ui_kit/Grid/Grid';
import Card from '@/ui_kit/Card/Card';
import type { IMainPainting } from '@/types/Artist.ts';

export interface IMainPage {
  theme: theme;
}

const MainPage: FC<IMainPage> = ({ theme }) => {
  const mainPaintings = artists.map((artist) => artist.mainPainting);
  return (
    <div className={styles.container}>
      <Grid>
        {mainPaintings.map(
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
  );
};
export default MainPage;

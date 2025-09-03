import type Artist from "../../types/types";
import styles from "./GalleryList.module.scss";
import "../../styles/global.scss";
import Card from "../Card/Card";
import { FC } from "react";

export interface IGalleryListProps {
  artists: Artist[];
}

const GalleryList: FC<IGalleryListProps> = ({ artists }) => {
  const mainPaintings = artists.map((artist) => artist.mainPainting);

  return (
    <div className={styles.galleryList}>
      {mainPaintings.map((item) => (
        <div key={item._id} className={styles.galleryList}>
          <Card mainPainting={item} />
        </div>
      ))}
    </div>
  );
};

export default GalleryList;

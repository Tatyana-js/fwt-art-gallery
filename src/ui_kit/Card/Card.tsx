import { FC } from "react";
import type IArtist from "../../types/Artist";
import styles from "./Card.module.scss";
import getImageSrc from "@/utils/getImageSrc";

const Card: FC<IArtist> = ({ ...artist }) => {
  const { name, yearOfCreation, image } = artist.mainPainting;
  return (
    <div className={styles.painting}>
      <a href="#" className={styles.linkboxOverlay}></a>
      <img src={getImageSrc(image.src)} alt={name} />
      <div className={styles.container}>
        <div>
          <p>{name}</p>
          <p className={styles.created}>{yearOfCreation}</p>
        </div>
        {/* <div className={styles.line}></div> */}
      </div>
    </div>
  );
};

export default Card;

import type ICard from "./types";
import styles from "./Card.module.scss";
import "../../styles/global.scss";

const Card = ({ name, yearOfCreation }: ICard) => {
  return (
    <div className={styles.painting}>
      <a href="#" className={styles.linkboxOverlay}></a>
      <img
        src="https://internship-front.framework.team/images/6895b1b57f43dbbf6fcac008/image.jpg"
        alt={name}
      />
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

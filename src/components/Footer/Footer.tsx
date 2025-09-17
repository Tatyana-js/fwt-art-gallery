import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import VkIcon from '@/assets/icons/VkIcon';
import InstagrammIcon from '@/assets/icons/InstagrammIcon';
import FacebookIcon from '@/assets/icons/FacebookIcon';

export interface IFooter {
  theme: theme;
}

const Footer: FC<IFooter> = ({ theme }) => {
  return (
    <div
      className={clsx(
        styles.containerBorder,
        styles[`containerBorder--${theme}`]
      )}
    >
      <div className="container">
        <div className={clsx(styles.info, styles[`info--${theme}`])}>
          <div className={styles.footerContent}>
            <p
              className={clsx(
                styles.footerText,
                styles[`footerText--${theme}`]
              )}
            >
              Проект реализован в рамках стажировки <br />
              для Frontend-разработчиков от компании{' '}
              <a href="#" className={styles.frameworkTeam}>
                Framework Team
              </a>
            </p>
            <div className={styles.name}>Андреева Татьяна, 2025</div>
          </div>
          <div className={styles.connectionIcons}>
            <div className={styles.iconContainer}>
              <VkIcon />
            </div>
            <div className={styles.iconContainer}>
              <InstagrammIcon />
            </div>
            <div className={styles.iconContainer}>
              <FacebookIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

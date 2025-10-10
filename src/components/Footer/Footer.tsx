import useTheme from '@/hooks/index';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './Footer.module.scss';

import FacebookIcon from '@/assets/icons/FacebookIcon';
import InstagrammIcon from '@/assets/icons/InstagrammIcon';
import VkIcon from '@/assets/icons/VkIcon';

const Footer: FC = () => {
  const { theme } = useTheme();
  return (
    <footer className={clsx(styles.footer, styles[`footer--${theme}`])}>
      <div
        className={clsx(
          styles.containerBorder,
          styles[`containerBorder--${theme}`]
        )}
      ></div>
      <div className={clsx('container', `container--${theme}`, 'position')}>
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
              <a
                href="https://framework.team/"
                className={styles.frameworkTeam}
              >
                Framework Team
              </a>
            </p>
            <div className={styles.name}>Андреева Татьяна, 2025</div>
          </div>
          <div className={styles.connectionIcons}>
            <a
              href="https://vk.com/frameworkteam?from=groups"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK Framework Team"
              className={clsx(styles.iconLink, styles[`iconLink--${theme}`])}
            >
              <VkIcon />
            </a>
            <a
              href="https://vk.com/frameworkteam?from=groups"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK Framework Team"
              className={clsx(styles.iconLink, styles[`iconLink--${theme}`])}
            >
              <InstagrammIcon />
            </a>
            <a
              href="https://vk.com/frameworkteam?from=groups"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK Framework Team"
              className={clsx(styles.iconLink, styles[`iconLink--${theme}`])}
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

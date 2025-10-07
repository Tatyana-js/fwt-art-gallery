import { FC } from 'react';
import clsx from 'clsx';
import type { theme } from '@/types/types';
import styles from './AuthModal.module.scss';
import Input from '../Input';
import Button from '../Buttons';

export interface IAuthModal {
  theme: theme;
}

const Authorization: FC<IAuthModal> = ({ theme }) => {
  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <h3 className={clsx(styles.title, styles[`title--${theme}`])}>
        Welcome back
      </h3>
      <div className={styles.inputContainer}>
        <Input label="Email" theme={theme} type="email" />
        <Input label="Password" theme={theme} type="password" />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="defaultButton" theme={theme}>
          LOG IN
        </Button>
      </div>
      <p className={clsx(styles.signUpMessage, styles[`signUpMessage--${theme}`])}>
        If you don't have an account yet, please{' '}
        <a
          href="#"
          className={clsx(styles.signUpLink, styles[`signUpLink--${theme}`])}
        >
          sign up
        </a>
      </p>
    </div>
  );
};

export default Authorization;

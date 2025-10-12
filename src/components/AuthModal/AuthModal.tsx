import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthModal.module.scss';

import type { theme } from '@/types/types';

import router from '@/utils/routes';

import AuthImage from '@/assets/image/AuthImage';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

export interface IAuthModal {
  theme: theme;
}

const AuthModal: FC<IAuthModal> = ({ theme }) => {
  return (
    <>
      <div className={clsx(styles.authImage)}>
        <AuthImage />
      </div>
      <div
        className={clsx(
          styles.containerInfo,
          styles[`containerInfo--${theme}`]
        )}
      >
        <h3 className={clsx(styles.title, styles[`title--${theme}`])}>
          Welcome back
        </h3>
        <form className={styles.inputContainer}>
          <Input label="Email" theme={theme} type="email" />
          <Input label="Password" theme={theme} type="password" />
        </form>
        <div className={styles.buttonContainer}>
          <Button variant="defaultButton" theme={theme}>
            LOG IN
          </Button>
        </div>
        <p
          className={clsx(
            styles.signUpMessage,
            styles[`signUpMessage--${theme}`]
          )}
        >
          If you don't have an account yet, please{' '}
          <Link
            to={router.signUp()}
            state={{
              background: {
                pathname: '/',
              },
            }}
            className={clsx(styles.signUpLink, styles[`signUpLink--${theme}`])}
          >
            sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthModal;

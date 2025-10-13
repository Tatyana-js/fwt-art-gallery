import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './RegisterModal.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';

import RegisterImage from '@/assets/image/RegisterImage';

export interface IRegisterModal {
  theme: theme;
}

const RegisterModal: FC<IRegisterModal> = ({ theme }) => {
  return (
    <>
      <div className={clsx(styles.authImage)}>
        <RegisterImage />
      </div>
      <div
        className={clsx(
          styles.containerInfo,
          styles[`containerInfo--${theme}`]
        )}
      >
        <h3 className={clsx(styles.title, styles[`title--${theme}`])}>
          Create your profile
        </h3>
        <form className={styles.inputContainer}>
          <Input label="Email" theme={theme} type="email" />
          <Input label="Password" theme={theme} type="password" />
        </form>
        <div className={styles.buttonContainer}>
          <Button variant="defaultButton" theme={theme}>
            SIGN UP
          </Button>
        </div>
        <p
          className={clsx(
            styles.signUpMessage,
            styles[`loginMessage--${theme}`]
          )}
        >
          If you already have an account, please{' '}
          <Link
            to={router.login()}
            state={{
              background: {
                pathname: '/',
              },
            }}
            className={clsx(styles.loginLink, styles[`loginLink--${theme}`])}
          >
            log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterModal;

import clsx from 'clsx';
import { FC } from 'react';

import styles from './RegisterModal.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

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
            LOG IN
          </Button>
        </div>
        <p
          className={clsx(
            styles.signUpMessage,
            styles[`signUpMessage--${theme}`]
          )}
        >
          If you already have an account, please{' '}
          <a
            href="#"
            className={clsx(styles.signUpLink, styles[`signUpLink--${theme}`])}
          >
            log in
          </a>
        </p>
      </div>
    </>
  );
};

export default RegisterModal;

import clsx from 'clsx';
import styles from './Modal.module.scss';
import Input from '../Input/Input';
import type { theme } from '@/types/types.ts';
import SingFormImage from '@/assets/SingFormImage';
import { Button } from '../Buttons';

interface IModalProps {
  theme: theme;
}

const Modal = ({ theme }: IModalProps) => {
  return (
    <div className={clsx(styles.container, styles[`container--${theme}`])}>
      <div className={styles.desktopImage}>
        <SingFormImage />
      </div>
      <div
        className={clsx(
          styles.formContainer,
          styles[`formContainer--${theme}`]
        )}
      >
        <h2 className={styles.formTitle}>Welcome back</h2>
        <p className={styles.signUpMessage}>
          If you don't have an account yet, please{' '}
          <a
            href="#"
            className={clsx(styles.signUpLink, styles[`signUpLink--${theme}`])}
          >
            sign up
          </a>
        </p>
        <div className={styles.inputContainer}>
          <Input label="Email" theme={theme} type="email" />
          <Input label="Password" theme={theme} type="password" />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="defaultButton" theme={theme}>
            LOG IN
        </Button>
        </div>
 
      </div>
    </div>
  );
};

export default Modal;

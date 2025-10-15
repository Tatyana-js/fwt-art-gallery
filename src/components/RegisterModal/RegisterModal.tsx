import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './RegisterModal.module.scss';

import type { AuthFormData, theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import { BASE_URL } from '@/utils/getImageSrc';
import router from '@/utils/routes';

import RegisterImage from '@/assets/image/RegisterImage';

import userSchema from './validate';

export interface IRegisterModal {
  theme: theme;
}
interface UseFormData {
  email: string;
  password: string;
}

const RegisterModal: FC<IRegisterModal> = ({ theme }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    reset,
    setError,
    getFieldState,
    trigger,
  } = useForm<UseFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const isFormReady =
    emailValue &&
    passwordValue &&
    touchedFields.email &&
    touchedFields.password;

  useEffect(() => {
    const emailState = getFieldState('email');
    const passwordState = getFieldState('password');

    if (emailState.isTouched && emailState.invalid) {
      trigger('email');
    }

    if (passwordState.isTouched && passwordState.invalid) {
      trigger('password');
    }
  }, [emailValue, passwordValue, trigger, getFieldState]);

  const onSubmit = async (formData: AuthFormData) => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;

      const requestData = {
        username: formData.email,
        password: formData.password,
        fingerprint: visitorId,
      };

      const url = `${BASE_URL}${router.signUp()}`;

      const { data } = await axios.post(url, requestData);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      reset();
      navigate(router.artists());
    } catch (err) {
      if (err instanceof Error) {
        setError('root.serverError', {
          type: 'server',
          message: err.message || 'Registration failed',
        });
      }
    }
  };

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
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="Email"
            theme={theme}
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            theme={theme}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <div className={styles.buttonContainer}>
            <Button
              variant="defaultButton"
              theme={theme}
              type="submit"
              disabled={
                Object.keys(errors).length > 0 || isSubmitting || !isFormReady
              }
            >
              SIGN UP
            </Button>
          </div>
        </form>
        <p
          className={clsx(
            styles.loginMessage,
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

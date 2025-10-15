import { useLoginMutation } from '@/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './AuthModal.module.scss';

import type { AuthFormData, theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';

import AuthImage from '@/assets/image/AuthImage';
import userSchema from '@/components/RegisterModal/validate';


export interface IAuthModal {
  theme: theme;
}
interface UseFormData {
  email: string;
  password: string;
}

const AuthModal: FC<IAuthModal> = ({ theme }) => {
  const { login } = useAuth();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
  } = useForm<UseFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

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

      const response = await loginMutation(requestData).unwrap();

      login({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        fingerprint: visitorId,
      });
      reset();
      navigate(router.artists());
    } catch (err) {
      if (err instanceof Error) {
        setError('root.serverError', {
          type: 'server',
          message: err.message || 'Authorization failed',
        });
      }
    }
  };

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
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
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
              type="submit"
              variant="defaultButton"
              theme={theme}
              disabled={isSubmitting || !emailValue || !passwordValue}
            >
              LOG IN
            </Button>
          </div>
        </form>
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

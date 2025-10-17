import { useLoginMutation } from '@/api/authApi';
import { login } from '@/slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './AuthModal.module.scss';

import type { AuthFormData, theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';

import AuthImage from '@/assets/image/AuthImage';

import userSchema from './validate';

export interface IAuthModal {
  theme: theme;
}
interface UseFormData {
  email: string;
  password: string;
}

const AuthModal: FC<IAuthModal> = ({ theme }) => {
  const dispatch = useDispatch();
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

  const { email, password } = watch();
  const isAllUserData = !!(email && password);

  const onSubmit = async (formData: AuthFormData) => {
    try {
      const response = await loginMutation({
        username: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(
        login({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
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
              disabled={isSubmitting || !isAllUserData}
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

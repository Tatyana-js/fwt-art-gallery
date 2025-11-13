import useTheme from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { useLoginMutation } from '@/store/api/authApi';
import { login } from '@/store/slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './AuthModal.module.scss';

import type { AuthFormData } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';

import AuthImage from '@/assets/image/AuthImage';

import userSchema from './validate';

interface UseFormData {
  email: string;
  password: string;
}

const AuthModal: FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  const { showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<UseFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onSubmit',
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
      if (err && typeof err === 'object' && 'data' in err) {
        const errorData = err.data as {
          statusCode?: number;
          message?: string;
          error?: string;
        };

        if (errorData.statusCode === 409) {
          showError('Неверный email или пароль');
        } else if (errorData.statusCode === 404) {
          showError('Пользователь с таким email не существует');
        } else {
          showError(errorData.message || 'Ошибка авторизации');
        }
      } else {
        showError('Ошибка авторизации');
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

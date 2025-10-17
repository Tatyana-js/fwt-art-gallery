import { useRegisterMutation } from '@/api/authApi';
import { authSlice } from '@/slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './RegisterModal.module.scss';

import type { AuthFormData, theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';
import { setTokens } from '@/utils/tokenStorage';

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
  const [registerMutation] = useRegisterMutation();
  const dispatch = useDispatch();
  const { login } = authSlice.actions;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
  } = useForm<UseFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { email, password } = watch();
  const isFormReady = !!(email && password);

  const onSubmit = async (formData: AuthFormData) => {
    try {
      const response = await registerMutation({
        username: formData.email,
        password: formData.password,
      }).unwrap();

      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
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

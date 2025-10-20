// import { useLoginMutation } from '@/api/authApi';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';

import styles from './AddArtistModal.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';

import router from '@/utils/routes';

import AddArtistPhoto from '@/assets/image/AddArtistPhoto';
import TextArea from '@/ui_kit/Textarea';
import MultiSelect from '@/ui_kit/MultiSelect';

export interface IAddArtistModal {
  theme: theme;
}

const AddArtistModal: FC<IAddArtistModal> = ({ theme }) => {
  //   const dispatch = useDispatch();
  // const [loginMutation] = useLoginMutation();
  // const navigate = useNavigate();

  const {
    register,
    // handleSubmit,
    formState: { isSubmitting },
    watch,
    // reset,
    // setError,
  } = useForm({
    mode: 'onChange',
  });

  const { email, password } = watch();
  const isAllUserData = !!(email && password);

  // const onSubmit = async (formData: { email: string; password: string; }) => {
  //   try {
  //     const response = await loginMutation({
  //       username: formData.email,
  //       password: formData.password,
  //     }).unwrap();

  //     dispatch(
  //       login({
  //         accessToken: response.accessToken,
  //         refreshToken: response.refreshToken,
  //       })
  //     );
  //     reset();
  //     navigate(router.artists());
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError('root.serverError', {
  //         type: 'server',
  //         message: err.message || 'Authorization failed',
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <div
        className={clsx(
          styles.containerInfo,
          styles[`containerInfo--${theme}`]
        )}
      >
        <div className={styles.containerPhoto}>
          <AddArtistPhoto />
        </div>
        <Button variant="text" theme={theme}>
          BROWSE PROFILE PHOTO
        </Button>
        <form
          className={styles.formContainer}
          // onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name*"
            theme={theme}
            type="name"
            {...register('name')}
            placeholder="Ivan Aivazovsky"
            // error={errors.email?.message}
          />
          <Input
            label="Years of life"
            theme={theme}
            type="text"
            {...register('Years of life')}
            // error={errors.password?.message}
          />
          <Input
            label="Location"
            theme={theme}
            type="text"
            {...register('Location')}
            // error={errors.password?.message}
          />
          <TextArea label='Description' theme={theme} value=''/>
          <MultiSelect genres={[]} selectedGenres={[]} theme={theme} />
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

export default AddArtistModal;

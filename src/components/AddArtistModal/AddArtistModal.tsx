import { useCreateArtistMutation, useGetGenresQuery } from '@/api/artistsApi';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './AddArtistModal.module.scss';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';
import MultiSelect from '@/ui_kit/MultiSelect';
import TextArea from '@/ui_kit/Textarea';

import router from '@/utils/routes';

import AddArtistPhoto from '@/assets/image/AddArtistPhoto';

import addArtistSchema, { IAddArtistSchema } from './validate';

interface IAddArtistModal {
  theme: theme;
}

const AddArtistModal: FC<IAddArtistModal> = ({ theme }) => {
  const [createArtistMutation] = useCreateArtistMutation();
  const { data: genresData } = useGetGenresQuery();
  const genres = useMemo(() => genresData || [], [genresData]);
  console.log(genres);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    // watch,
    reset,
    // setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addArtistSchema),
  });

  const onSubmit = async (formData: IAddArtistSchema) => {
    console.log('Form data:', formData);
    try {
      await createArtistMutation({
        name: formData.name,
        yearsOfLife: formData.yearsOfLife,
        description: formData.description,
        genres: formData.genres,
      }).unwrap();

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
      <div
        className={clsx(
          styles.containerInfo,
          styles[`containerInfo--${theme}`]
        )}
      >
        <div className={styles.columnLeft}>
          <div
            className={clsx(
              styles.containerPhoto,
              styles[`containerPhoto--${theme}`]
            )}
          >
            <AddArtistPhoto />
          </div>
          <Button variant="text" theme={theme}>
            BROWSE PROFILE PHOTO
          </Button>
        </div>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name*"
            theme={theme}
            type="name"
            {...register('name')}
            placeholder="Ivan Aivazovsky"
            error={errors.name?.message}
          />
          <Input
            label="Years of life"
            theme={theme}
            type="text"
            {...register('yearsOfLife')}
            error={errors.yearsOfLife?.message}
          />
          <Input
            label="Location"
            theme={theme}
            type="text"
            {...register('location')}
          />
          <TextArea label="Description" theme={theme} />
          <MultiSelect genres={genres || []} theme={theme} />
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="defaultButton" theme={theme}>
              SAVE
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddArtistModal;

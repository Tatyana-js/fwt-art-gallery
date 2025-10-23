import { useCreateArtistMutation, useGetGenresQuery } from '@/api/artistsApi';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './AddArtistModal.module.scss';

import EmptyCard from '@/components/EmptyCard';

import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Input from '@/ui_kit/Input';
import MultiSelect from '@/ui_kit/MultiSelect';
import TextArea from '@/ui_kit/Textarea';

import router from '@/utils/routes';

import addArtistSchema, { IAddArtistSchema } from './validate';

interface IAddArtistModal {
  theme: theme;
}

const AddArtistModal: FC<IAddArtistModal> = ({ theme }) => {
  const [createArtistMutation] = useCreateArtistMutation();
  const { data: genresData } = useGetGenresQuery();
  const genres = useMemo(() => genresData || [], [genresData]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addArtistSchema),
  });

  const selectedGenreIds = watch('genres') || [];

  const onSubmit = async (formData: IAddArtistSchema) => {
    console.log('Form data:', formData);
    try {
      const responceArtist = await createArtistMutation({
        name: formData.name,
        yearsOfLife: formData.yearsOfLife,
        description: formData.description,
        genres: formData.genres,
      }).unwrap();

      reset();
      navigate(router.artist_profile(responceArtist._id));
    } catch (err) {
      if (err instanceof Error) {
        setError('root.serverError', {
          type: 'server',
          message: err.message || 'Authorization failed',
        });
      }
    }
  };

  const handleGenresChange = (genreIds: string[]) => {
    setValue('genres', genreIds, { shouldValidate: true });
  };

  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <EmptyCard theme={theme} />
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
        <TextArea
          label="Description"
          theme={theme}
          {...register('description')}
          error={errors.description?.message}
        />
        <MultiSelect
          genres={genres || []}
          theme={theme}
          selectedGenres={selectedGenreIds}
          onGenresChange={handleGenresChange}
        />
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="defaultButton" theme={theme}>
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddArtistModal;

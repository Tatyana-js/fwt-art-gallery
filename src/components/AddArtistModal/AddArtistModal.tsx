import { useCreateArtistMutation } from '@/api/artistsApi';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './AddArtistModal.module.scss';

import EmptyCard from '@/components/EmptyCard';

import { ICreateArtistRequest } from '@/types/Artist';
import type { theme } from '@/types/types';

import router from '@/utils/routes';

import AddArtistForm from './AddArtistForm/AddArtistForm';
import addArtistSchema, { IAddArtistSchema } from './validate';

interface IAddArtistModal {
  theme: theme;
  closeModal: (value: boolean) => void;
}

const AddArtistModal: FC<IAddArtistModal> = ({ theme, closeModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [createArtistMutation] = useCreateArtistMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
    watch,
  } = useForm<IAddArtistSchema>({
    mode: 'onChange',
    resolver: yupResolver(addArtistSchema),
  });

  const onSubmit = async (formData: ICreateArtistRequest) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('yearsOfLife', formData.yearsOfLife);
      formDataToSend.append('description', formData.description);

      formData.genres.forEach((genreId) => {
        formDataToSend.append('genres', genreId);
      });
      if (selectedFile) {
        formDataToSend.append('avatar', selectedFile);
      }
      const responceArtist = await createArtistMutation(
        formDataToSend as unknown as ICreateArtistRequest
      ).unwrap();

      reset();
      closeModal(false);
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

  const handleFilesDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleClearImage = () => {
  setSelectedFile(null);
  setPreviewUrl(null);
};

  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
      onDragOver={handleDragOver}
    >
      <EmptyCard
        theme={theme}
        onFilesDrop={handleFilesDrop}
        previewUrl={previewUrl}
        selectedFile={selectedFile}
        isDragOver={isDragOver}
        setIsDragOver={setIsDragOver}
        handleClearImage={handleClearImage}
      />
      <AddArtistForm
        theme={theme}
        setValue={setValue}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default AddArtistModal;

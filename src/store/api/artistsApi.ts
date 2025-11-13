import { baseQueryWithReauth } from '@/store/api/basequery';
import { createApi } from '@reduxjs/toolkit/query/react';

import IArtist, { IGenre, IPainting } from '@/types/Artist';
import { ArtistsQueryParams } from '@/types/types';

export const artistsApi = createApi({
  reducerPath: 'artistsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Artist', 'Painting', 'Genres'],
  endpoints: (builder) => ({
    // Получение всех артистов
    getArtists: builder.query<IArtist[], ArtistsQueryParams | void>({
      query: (params) => {
        const token = localStorage.getItem('accessToken');
        const baseUrl = token ? '/artists' : '/artists/static/';

        if (!params) return baseUrl;
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach((item) => {
                searchParams.append(key, item.toString());
              });
            } else {
              searchParams.append(key, value.toString());
            }
          }
        });
        const queryString = searchParams.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
      },
      providesTags: (_result, _error, arg) => [
        'Artist',
        { type: 'Artist', id: `FILTERS-${JSON.stringify(arg || 'ALL')}` },
      ],
      keepUnusedDataFor: 60 * 60,
    }),
    // Получение артиста по _id
    getArtistById: builder.query<IArtist, string | undefined>({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return token ? `artists/${id}` : `artists/static/${id}`;
      },
      providesTags: (result, _error, id) => [
        { type: 'Artist' as const, id },
        { type: 'Painting' as const, id },
        ...(result?.paintings || []).map(({ _id }) => ({
          type: 'Painting' as const,
          id: _id,
        })),
      ],
    }),
    // Создание артиста
    createArtist: builder.mutation<IArtist, FormData>({
      query: (formData) => ({
        url: 'artists',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Artist'],
    }),
    // Редактирование артиста
    updateArtist: builder.mutation<IArtist, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `artists/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Artist', id }, 'Artist'],
    }),
    // Удаление артиста
    deleteArtist: builder.mutation<void, string>({
      query: (id) => ({
        url: `artists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Artist'],
    }),

    // === PAINTINGS ===
    // Получение всех картин артиста
    getArtistPaintings: builder.query<IPainting[], string>({
      query: (id) => `artists/${id}/paintings`,
      providesTags: (result, _error, artistId) => [
        { type: 'Painting' as const, id: artistId },
        ...(result
          ? result.map(({ _id }) => ({ type: 'Painting' as const, id: _id }))
          : []),
        'Painting' as const,
      ],
    }),
    // Добавление картины артисту
    addArtistPainting: builder.mutation<
      IPainting,
      {
        id: string;
        data: FormData;
      }
    >({
      query: ({ id, data }) => ({
        url: `artists/${id}/paintings`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Painting' as const, id },
        { type: 'Artist' as const, id },
        'Painting' as const,
      ],
    }),
    // Редактирование картины
    updateArtistPainting: builder.mutation<
      IPainting,
      {
        id: string;
        data: FormData;
        paintingId: string;
      }
    >({
      query: ({ id, paintingId, data }) => ({
        url: `artists/${id}/paintings/${paintingId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id, paintingId }) => [
        { type: 'Painting' as const, id },
        { type: 'Painting' as const, id: paintingId },
        'Painting' as const,
      ],
    }),
    // Удаление картины
    deleteArtistPainting: builder.mutation<
      void,
      { id: string; paintingId: string }
    >({
      query: ({ id, paintingId }) => ({
        url: `artists/${id}/paintings/${paintingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id, paintingId }) => [
        { type: 'Painting' as const, id },
        { type: 'Artist' as const, id },
        { type: 'Painting' as const, id: paintingId },
        'Painting' as const,
      ],
    }),
    //  Получение главной картины у артиста
    getArtistMainPainting: builder.query<IPainting, string>({
      query: (id) => `artists/${id}/main-painting`,
    }),
    // Редактирование главной картины у артиста
    updateArtistMainPainting: builder.mutation<
      IArtist,
      {
        id: string;
        paintingId: string;
      }
    >({
      query: ({ id, paintingId }) => ({
        url: `artists/${id}/main-painting`,
        method: 'PATCH',
        body: { mainPainting: paintingId },
      }),
      invalidatesTags: (_result, _error, { id, paintingId }) => [
        { type: 'Artist', id },
        { type: 'Painting', id: paintingId },
        'Artist',
        'Painting',
      ],
    }),
    //  Получение жанров
    getGenres: builder.query<IGenre[], void>({
      query: () => 'genres',
      providesTags: ['Genres'],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetArtistByIdQuery,
  useCreateArtistMutation,
  useDeleteArtistMutation,
  useUpdateArtistMutation,
  useGetArtistPaintingsQuery,
  useAddArtistPaintingMutation,
  useUpdateArtistPaintingMutation,
  useDeleteArtistPaintingMutation,
  useUpdateArtistMainPaintingMutation,
  useGetArtistMainPaintingQuery,
  useGetGenresQuery,
} = artistsApi;

import { createApi } from '@reduxjs/toolkit/query/react';
// import { authInterceptor } from '@/interceptors/interceptors';
import IArtist, { IPainting } from '@/types/Artist';
import baseQuery from '@/api/basequery';

export const artistsApi = createApi({
  reducerPath: 'artistsApi',
  baseQuery: baseQuery,
  tagTypes: ['Artist', 'User', 'Auth', 'Painting'],
  endpoints: (builder) => ({
    getArtists: builder.query<IArtist[], void>({
      query: () => {
        const token = localStorage.getItem('accessToken');
        return token ? '/artists' : '/artists/static/';
      },
      providesTags: ['Artist'],
    }),
    // Получение артиста по _id
    getArtistById: builder.query<IArtist, string | undefined>({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return token ? `artists/${id}` : `artists/static/${id}`;
      },
      providesTags: (_, __, _id) => [{ type: 'Artist', _id }],
    }),
    // Создание артиста
    createArtist: builder.mutation<IArtist, Partial<IArtist>>({
      query: (artistData) => ({
        url: 'artists',
        method: 'POST',
        body: artistData,
      }),
      invalidatesTags: ['Artist'],
    }),
    // Редактирование артиста
    updateArtist: builder.mutation<
      IArtist,
      { id: string; data: Partial<IArtist> }
    >({
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
      providesTags: ['Painting'],
    }),
    // Добавление картины артисту

    // Редактирование картины
    updateArtistPainting: builder.mutation<
      IPainting,
      { id: string; paintingId: string; data: Partial<IPainting> }
    >({
      query: ({ id, paintingId, data }) => ({
        url: `artists/${id}/paintings/${paintingId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { paintingId }) => [
        { type: 'Painting', id: paintingId },
        'Painting',
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
      invalidatesTags: ['Painting'],
    }),
    //  Получение главной картины у артиста
    getArtistMainPainting: builder.query<IPainting, string>({
      query: (id) => `artists/${id}/main-painting`,
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
  useUpdateArtistPaintingMutation,
  useDeleteArtistPaintingMutation,
  useGetArtistMainPaintingQuery,
} = artistsApi;

export default {
  artistsStatic: () => '/artists/static/',
  artists: () => '/artists',
  artist_profile: (id: string) => `/artists/${id}`,
  artist_profileStatic: (id: string) => `/artists/static/${id}`,
  login: () => '/auth/login',
  signUp: () => '/auth/register',
};

export default {
  artists: () => '/',
  artist_profile: (id: string) => `/artists/${id}`,
  login: () => 'auth/login',
  signUp: () => '/auth/register',
};

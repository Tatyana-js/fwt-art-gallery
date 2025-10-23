import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { clearTokens, setTokens } from '@/utils/tokenStorage';

export interface AuthState {
  isAuth: boolean;
}
console.log(
  'Auth slice initialized, localStorage token:',
  localStorage.getItem('accessToken')
);

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('accessToken'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      setTokens(action.payload);
      state.isAuth = true;
    },
    logout: (state) => {
      clearTokens();
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

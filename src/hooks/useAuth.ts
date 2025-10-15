import { useRefreshTokenMutation } from '@/api/authApi';
import { useCallback, useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [refreshToken] = useRefreshTokenMutation();

  const login = useCallback(
    (tokens: {
      accessToken: string;
      refreshToken: string;
      fingerprint: string;
    }) => {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('fingerprint', tokens.fingerprint);
      setIsAuthenticated(true);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('fingerprint');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (accessToken) {
        setIsAuthenticated(true);
        return;
      }
      if (refreshTokenValue) {
        try {
          const result = await refreshToken({
            refreshToken: refreshTokenValue,
          }).unwrap(); // unwrap для прямого доступа к данным как .json()
          localStorage.setItem('accessToken', result.accessToken);
          setIsAuthenticated(true);
        } catch (error: unknown) {
          logout();
          console.log((error as Error).message);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [refreshToken, logout]);

  return { isAuthenticated, login, logout };
};

export default useAuth;

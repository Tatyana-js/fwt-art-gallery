import useTheme from '@/hooks/index';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import './styles/global.scss';
import './styles/mixins.scss';
import './styles/variables.scss';

import Header from './components/Header';
import Footer from '@/components/Footer';

import AuthModal from './components/AuthModal';
import RegisterModal from './components/RegisterModal';
import MenuModal from '@/ui_kit/MenuModal';
import Modal from '@/ui_kit/Modal';

import router from './utils/routes';

import ArtistProfile from './pages/ArtistProfile';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const background = location.state?.background;
  console.log('background pathname:', background?.pathname);
  console.log('background type:', typeof background?.pathname);
  console.log('background full:', background);
  return (
    <>
      <Header setIsOpen={setIsOpen} theme={theme} toggleTheme={toggleTheme} />
      <Routes location={background || location}>
        <Route path={router.artists()} element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route
          path={router.artist_profile(':id')}
          element={<ArtistProfile />}
        />
      </Routes>
      {isOpen && (
        <Modal theme={theme} variant="menuModal" closeModal={setIsOpen}>
          <MenuModal
            theme={theme}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              toggleTheme();
            }}
          />
        </Modal>
      )}
      {background && (
        <Routes key={location.pathname}>
          <Route
            path={router.login()}
            element={
              <Modal
                theme={theme}
                variant="authorization"
                closeModal={setIsOpen}
              >
                <AuthModal theme={theme} />
              </Modal>
            }
          />
          <Route
            path={router.signUp()}
            element={
              <Modal theme={theme} variant="register" closeModal={setIsOpen}>
                <RegisterModal theme={theme} />
              </Modal>
            }
          />
        </Routes>
      )}
      <Footer />
    </>
  );
}

export default App;

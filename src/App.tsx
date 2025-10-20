import useTheme from '@/hooks/index';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import './styles/global.scss';
import './styles/mixins.scss';
import './styles/variables.scss';

import AuthModal from './components/AuthModal';
import Header from './components/Header';
import RegisterModal from './components/RegisterModal';
import AddArtistModal from '@/components/AddArtistModal';
import Footer from '@/components/Footer';
import MenuModal from '@/components/MenuModal';

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
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(false);
  const [isAddArtistModalOpen, setIsAddArtistModalOpen] =
    useState<boolean>(false);

    console.log(isAddArtistModalOpen);
    
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const background = location.state?.background;

  return (
    <>
      <Header
        setMenuIsOpen={setMenuIsOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Routes location={background || location}>
        <Route
          path={router.artists()}
          element={<MainPage openMоdal={() => setIsAddArtistModalOpen(true)} />}
        />
        <Route
          path={router.artist_profile(':id')}
          element={<ArtistProfile />}
        />
        <Route
          path={router.artist_profileStatic(':id')}
          element={<ArtistProfile />}
        />
        <Route path={router.login()} element={null} />
        <Route path={router.signUp()} element={null} />
      </Routes>
      {isMenuOpen && (
        <Modal theme={theme} variant="menuModal" closeModal={setMenuIsOpen}>
          <MenuModal
            theme={theme}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              toggleTheme();
            }}
          />
        </Modal>
      )}
      {isAddArtistModalOpen && (
        <Modal
          theme={theme}
          variant="addArtist"
          closeModal={setIsAddArtistModalOpen}
        >
          <AddArtistModal theme={theme} />
        </Modal>
      )}
      {background && (
        <Routes>
          <Route
            path={router.login()}
            element={
              <Modal theme={theme} variant="authorization">
                <AuthModal theme={theme} />
              </Modal>
            }
          />
          <Route
            path={router.signUp()}
            element={
              <Modal theme={theme} variant="register">
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

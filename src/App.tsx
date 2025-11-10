import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import './styles/global.scss';
import './styles/mixins.scss';
import './styles/variables.scss';

import AuthModal from './components/AuthModal';
import Header from './components/Header';
import RegisterModal from './components/RegisterModal';
import ArtistModal from '@/components/ArtistModal';
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
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [searchState, setSearchState] = useState({
    value: '',
    isSearch: false,
  });

  const location = useLocation();
  const background = location.state?.background;

  const toggleSearch = () => {
    setSearchState((prev) => ({ ...prev, isSearch: !prev.isSearch }));
  };

  const handleSetValue = (value: string) => {
    setSearchState((prev) => ({ ...prev, value }));
  };

  return (
    <>
      <Header
        setMenuIsOpen={setMenuIsOpen}
        isSearch={searchState.isSearch}
        value={searchState.value}
        onSearch={toggleSearch}
        onChange={handleSetValue}
      />
      <Routes location={background || location}>
        <Route
          path={router.artists()}
          element={
            <MainPage
              openMоdal={() => setIsArtistModalOpen(true)}
              value={searchState.value}
              onChange={handleSetValue}
            />
          }
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
        <Modal variant="menuModal" closeModal={() => setMenuIsOpen(false)}>
          <MenuModal />
        </Modal>
      )}
      {isArtistModalOpen && (
        <Modal
          variant="addArtist"
          closeModal={() => setIsArtistModalOpen(false)}
        >
          <ArtistModal closeModal={() => setIsArtistModalOpen(false)} />
        </Modal>
      )}
      {background && (
        <Routes>
          <Route
            path={router.login()}
            element={
              <Modal variant="authorization">
                <AuthModal />
              </Modal>
            }
          />
          <Route
            path={router.signUp()}
            element={
              <Modal variant="register">
                <RegisterModal />
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

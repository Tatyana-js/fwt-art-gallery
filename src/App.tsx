import './styles/global.scss';
import './styles/variables.scss';
import './styles/mixins.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import ArtistProfile from './pages/ArtistProfile';
import Header from './components/Header';
import Footer from '@/components/Footer';
import router from './utils/routes';
import AuthModal from './ui_kit/AuthModal';
import useTheme from '@/hooks/index';
import Modal from '@/ui_kit/Modal';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  const location = useLocation();
  const background = location.state?.background;
  const { theme } = useTheme();
console.log(2)
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path={router.artists()} element={<MainPage />} />
          <Route
            path={router.artist_profile(':id')}
            element={<ArtistProfile />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/auth/login"
            element={
              <Modal
                theme={theme}
                variant="authorization"
                closeModal={() => window.history.back()}
                isOpen={true}
              >
                <AuthModal theme={theme} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;

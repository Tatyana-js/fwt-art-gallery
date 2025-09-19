import './styles/global.scss';
import './styles/variables.scss';
import './styles/mixins.scss';
import MainPage from './pages/MainPage/MainPage.tsx';
import Header from './components/Header/Header.tsx';
import Footer from '@/components/Footer/Footer';
import Modal from './ui_kit/Modal/Modal.tsx';
import ModalInfo from './ui_kit/ModalInfo/ModalInfo.tsx';


// const genres = [
//   {
//     _id: '66d70a64b123431edba12cc3',
//     name: 'Realism',
//   },
//   {
//     _id: '66d70a64b123431edba12cd7',
//     name: 'Modernism',
//   },
//   {
//     _id: '66d70a64b123431edba12cd9',
//     name: 'Expressionism',
//   },
//   {
//     _id: '66d70a64b123431edba12cdb',
//     name: 'Cubism',
//   },
// ];
// const selectedGenres = [
//   {
//     _id: '66d70a64b123431edba12cc3',
//     name: 'Realism',
//   },
//   // {
//   //   _id: '66d70a64b123431edba12cd7',
//   //   name: 'Modernism',
//   // },
//   {
//     _id: '66d70a64b123431edba12cd9',
//     name: 'Expressionism',
//   },
//   //   {
//   //   _id: '66d70a64b123431edba12cdb',
//   //   name: 'Cubism',
//   // },
// ];

function App() {
  const theme = 'light';
  return (
    <>
      <Header theme={theme} />
      <MainPage theme={theme} />
      <Footer theme={theme} />
      <Modal theme={theme}>
        <ModalInfo theme={theme} onClick={() => {}}/>
      </Modal>
    </>
  );
}

export default App;

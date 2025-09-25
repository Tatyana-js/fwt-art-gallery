import './styles/global.scss';
import './styles/variables.scss';
import './styles/mixins.scss';

// import MainPage from './pages/MainPage/MainPage.tsx';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile.tsx';
import artist from './pages/ArtistProfile/mock.ts';
import Header from './components/Header/Header.tsx';
import Footer from '@/components/Footer/Footer';
// import MultiSelect from './ui_kit/MultiSelect/MultiSelect.tsx';
// import Label from './ui_kit/Label/Label.tsx';
// import Modal from './ui_kit/Modal/Modal.tsx';
// import ModalInfo from './ui_kit/ModalInfo/ModalInfo.tsx';
// import Search from './ui_kit/Search/Search';
// import Input from './ui_kit/Input/Input.tsx';

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
//   {
//     _id: '66d70a64b123431edba12cd7',
//     name: 'Modernism',
//   },
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
      {/* <MainPage theme={theme} /> */}
      <ArtistProfile theme={theme} onClick={() => {}} artist={artist} />
      <Footer theme={theme} />
      {/* <Modal theme={theme}>
        <ModalInfo theme={theme} onClick={() => {}} />
      </Modal> */}
      {/* <Search theme={theme} error={false} />
<Input theme={theme} placeholder='placefolder' error={true} /> */}
    </>
  );
}

export default App;

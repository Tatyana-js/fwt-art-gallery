import './styles/global.scss';
import './styles/variables.scss';
import './styles/mixins.scss';
import Card from './ui_kit/Card/Card.tsx';

import Grid from '@/ui_kit/Grid/Grid.tsx';
// import artist from './ui_kit/Card/mock';
import IArtist from './types/Artist.ts';
import artists from './ui_kit/Grid/mock.ts';
// import Label from "./ui_kit/Labels/Label.tsx";
// import Checkbox from './ui_kit/Checkbox/Checkbox.tsx'
// import Button from './ui_kit/Buttons/Button.tsx';
// import Input from './ui_kit/Input/Input.tsx';
// import Textarea from './ui_kit/Textarea/Textarea.tsx';
// import Search from './ui_kit/Search/Search.tsx';
// import Label from './ui_kit/Label/Label.tsx';
import Checkbox from './ui_kit/Checkbox/Checkbox.tsx';
import MultiSelect from './ui_kit/MultiSelect/MultiSelect.tsx';
// const text =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const genres = [
  {
    _id: '66d70a64b123431edba12cc3',
    name: 'Realism',
  },
  {
    _id: '66d70a64b123431edba12cd7',
    name: 'Modernism',
  },
  {
    _id: '66d70a64b123431edba12cd9',
    name: 'Expressionism',
  },
  {
    _id: '66d70a64b123431edba12cdb',
    name: 'Cubism',
  },
];
const selectedGenres = [
  {
    _id: '66d70a64b123431edba12cc3',
    name: 'Realism',
  },
  {
    _id: '66d70a64b123431edba12cd7',
    name: 'Modernism',
  },
  {
    _id: '66d70a64b123431edba12cd9',
    name: 'Expressionism',
  },
  //   {
  //   _id: '66d70a64b123431edba12cdb',
  //   name: 'Cubism',
  // },
];

function App() {
  return (
    <div className="container">
      <Grid>
        {artists.map((item: IArtist) => (
          <Card key={item._id} theme="dark" artist={item} />
        ))}
      </Grid>
      {/* <Card artist={artist} theme='dark'/>
      <Button variant="defaultButton" theme="dark">
        BUTTON
      </Button> */}
      {/* <Checkbox theme="light" /> */}
      {/* <Input label="Field name" theme="dark" error={false}/> */}
      {/* <Textarea label="Description" text={text} theme="dark" error={false} /> */}
      {/* <Search theme="dark" error={true} /> */}
      {/* <Label theme="light">Romantism</Label> */}
      <Checkbox theme="dark" />
      <MultiSelect
        genres={genres}
        theme="light"
        selectedGenres={selectedGenres}
      ></MultiSelect>
    </div>
  );
}

export default App;

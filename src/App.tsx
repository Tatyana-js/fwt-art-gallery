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
// import Input from './ui_kit/Input/InputForm.tsx';
// import Textarea from './ui_kit/Textarea/Textarea.tsx';
import Search from './ui_kit/Search/Search.tsx';

// const text =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

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
      {/* <Input label="Field name" theme="dark" error={true}/> */}
      {/* <Textarea label="Description" text={text} theme="dark" error={false} /> */}
      <Search theme='dark' error={true} />
    </div>
  );
}

export default App;

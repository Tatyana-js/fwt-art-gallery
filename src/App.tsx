import "./styles/global.scss";
import "./styles/variables.scss";
import "./styles/mixins.scss";
import Card from "./ui_kit/Card/Card.tsx";
import Icon from "./assets/icons/ArrowIcon.tsx";

import Grid from "@/ui_kit/Grid/Grid.tsx";
import artist from "./ui_kit/Card/mock";
import Button from "./ui_kit/Buttons/Button.tsx";
import InputForm from "./ui_kit/Input/InputForm.tsx";

const artists = Array(6).fill(artist); //TODO: убрать

function App() {
  return (
    <div className="container">
      <Grid>
        {artists.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </Grid>
      <Button variant="circleIcon" theme="dark">
        <Icon />
        {/* BUTTON TEXT */}
      </Button>
      <InputForm label="Field name"/>
    </div>
  );
}

export default App;

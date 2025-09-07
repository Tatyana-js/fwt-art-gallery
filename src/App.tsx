import "./styles/global.scss";
import "./styles/variables.scss";
import "./styles/mixins.scss";
import Card from "./ui_kit/Card/Card.tsx";
import Icon from "./assets/icons/PlusIconLight.tsx";

import Grid from "@/ui_kit/Grid/Grid.tsx";
import artist from "./ui_kit/Card/mock";
import Button from "./ui_kit/Buttons/Button.tsx";

const artists = Array(6).fill(artist); //TODO: убрать

function App() {
  return (
    <div className="container">
      <Grid>
        {artists.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </Grid>
      <Button variant="text" type="submit">
        <Icon />
        BUTTON TEXT
      </Button>
    </div>
  );
}

export default App;

import "./styles/global.scss";
import "./styles/variables.scss";
import "./styles/mixins.scss";
import Card from "./ui_kit/Card/Card.tsx";
import Icon from "./assets/icons/ArrowIconLight.tsx";

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
      <Button variant="circleIcon" type="submit">
        <Icon />
      </Button>
    </div>
  );
}

export default App;

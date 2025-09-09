import './styles/global.scss'
import './styles/variables.scss'
import './styles/mixins.scss'
import Card from './ui_kit/Card/Card.tsx'

import Grid from '@/ui_kit/Grid/Grid.tsx'
import { artists } from './ui_kit/Card/mock'
import IArtist from './types/Artist.ts'
// import Label from "./ui_kit/Labels/Label.tsx";
// import Checkbox from './ui_kit/Checkbox/Checkbox.tsx'
import Button from './ui_kit/Buttons/Button.tsx'
import InputForm from './ui_kit/Input/InputForm.tsx'

function App() {
    return (
        <div className="container">
            <Grid>
                {artists.map((item: IArtist) => (
                    <Card key={item._id} theme='dark' artist={item} />
                ))}
            </Grid>
            <Button variant="defaultButton" theme="dark">
                BUTTON
            </Button>
            {/* <Checkbox theme="light" /> */}
            <InputForm label="Field name" theme='dark'/>
        </div>
    )
}

export default App

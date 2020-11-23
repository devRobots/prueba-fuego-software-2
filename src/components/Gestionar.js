import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';

import Home from "./Home";
import Citas from "./Citas";

const Gestionar = () => {
    const panes = [
        {
            menuItem: 'Sesiones',
            render: () => <Tab.Pane attached={false}><Home /></Tab.Pane>,
        },
        {
            menuItem: 'Citas',
            render: () => <Tab.Pane attached={false}><Citas /> </Tab.Pane>,
        },
        {
            menuItem: 'Terapeutas',
            render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
        },
    ]

    return (
        <Grid centered columns={1} container>
            <Grid.Row centered>
                <Grid.Column>
                    <Tab menu={{ attached: false, color: 'blue', secondary: true, pointing: true }} panes={panes} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Gestionar;
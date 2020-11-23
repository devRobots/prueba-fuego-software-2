import React from 'react';
import {Segment, Image, Header} from 'semantic-ui-react';

const HeaderMaster = ({name}) => {
    return(
        <Segment inverted color="blue">
            <Header as="h2">MasTer</Header>
            <Image centered src='MasTer logo.png' size='tiny'/>
            <Header as="h5">{name}</Header>
        </Segment>
    )
}
export default HeaderMaster;
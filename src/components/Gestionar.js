import React, { useState } from 'react';
import {Segment, Header, Label, Input, Button, Grid, Divider, Icon} from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";
import Home from "./Home";
import CreateSecretary from "./CreateSecretary";
import Citas from "./Citas";

const Gestionar = () =>{

    return(
        <Router>
            
        </Router>
    );
}

export default Gestionar;
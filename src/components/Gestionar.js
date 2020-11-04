import React, { useState } from 'react';
import {Segment, Header, Label, Input, Button, Grid, Divider, Icon} from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom"
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";
import Home from "./Home";
import Citas from "./Citas";
import Clientes from "./SearchUser";

const Gestionar = () =>{

    return(
        <Router>
            <div className ="container">
                <div className="btn-group">
                    <Link to = "/Home" >
                        Sesiones
                    </Link>
                    <Link to = "/Citas" >
                        Citas
                    </Link>
                    <Link to = "/SearchUser">
                        Clientes
                    </Link>
                </div>
                <h1>SECRETARIO HOME</h1>
                <hr/>
                <Switch>
                    <Route path = "/Home">
                        <Home />
                    </Route>
                    <Route path = "/Citas">
                        <Citas />
                    </Route>
                    <Route path = "/SearchUser">
                        <Clientes />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Gestionar;
import React, {Component} from 'react';
import './App.css';
import HeaderMaster from "./components/HeaderMaster";
import Login from "./components/Login";
import CreateTherapist from "./components/CreateTherapist";
import Home from "./components/Home";

import { BrowserRouter as Routers, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    var loggedIn = sessionStorage.getItem("usuario") != null;
    return (
      <Routers>
        <Switch>
          <div className="App">
            <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
            <Route exact path = "/" component = {Login}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/createTherapist" component = {CreateTherapist}/>
            <Route path = "/home" component = {Home}/>
          </div>
        </Switch>
      </Routers>
    );
  }
}
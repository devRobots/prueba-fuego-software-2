import React, {Component} from 'react';
import './App.css';
import HeaderMaster from "./components/HeaderMaster";
import Login from "./components/Login";
import CreateTherapist from "./components/CreateTherapist";
import Home from "./components/Home";
import CreateSecretary from "./components/CreateSecretary";
import Citas from "./components/Citas"

import { BrowserRouter as Routers, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Routers>
          <Switch>
            <Route exact path = "/" component = {Login}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/createTherapist" component = {CreateTherapist}/>
            <Route path = "/createSecretary" component = {CreateSecretary}/>
            <Route path = "/Citas" component = {Citas}/>
            <Route path = "/home" component = {Home}/>
          </Switch>
        </Routers>
      </div>
    );
  }
}
import React, {Component} from 'react';
import './App.css';
import HeaderMaster from "./components/HeaderMaster";
import Login from "./components/Login";
import CreateTherapist from "./components/CreateTherapist";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";

import { BrowserRouter as Routers, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    // var loggedIn = sessionStorage.getItem("usuario") != null;
    return (

      <div className="App">
            <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Routers>
          <Switch>
            <Route exact path = "/" component = {Login}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/createTherapist" component = {CreateTherapist}/>
            <Route path = "/home" component = {Home}/>
            <Route path = "/createUser" component = {CreateUser}/>
      
          </Switch>
        </Routers>
        </div>
      
    );
  }
}

/**
 * 
 * 
 
 <div className="App">
        <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Home />
      </div>

 * Todo esto va dentro del return
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
 */
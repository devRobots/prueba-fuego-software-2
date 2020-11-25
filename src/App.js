import React, { Component, useContext } from 'react';
import './App.css';
import HeaderMaster from "./components/HeaderMaster";
import Login from "./components/Login";
import CreateSecretary from "./components/CreateSecretary";
import SearchUser from "./components/SearchUser";
import Gestionar from "./components/Gestionar"
import { UserContextProvider } from './components/userContext'
import { BrowserRouter as Routers, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <UserContextProvider>
        <div className="App">
          <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
          <Routers>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/createSecretary" component={CreateSecretary} />
              <Route path="/Gestionar" component={Gestionar} />
              <Route path="/searchUser" component={SearchUser} />
            </Switch>
          </Routers>
        </div>
      </UserContextProvider>
    );
  }
}
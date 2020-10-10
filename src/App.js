import React from 'react';
import './App.css';
//import Login from "./components/Login";
import HeaderMaster from "./components/HeaderMaster";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home"


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Home />
      </div>
    );
  }
}

/**
  <Login /> 
  
  <CreateUser/>
  <Login/>
  <Home />

 */
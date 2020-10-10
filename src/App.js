import React from 'react';
import './App.css';
import HeaderMaster from "./components/HeaderMaster";
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
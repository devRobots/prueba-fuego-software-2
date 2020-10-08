import React from 'react';

import './App.css';
import Login from "./components/Login";
import HeaderMaster from "./components/HeaderMaster";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">

        <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Login />

      </div>
    );
  }
}

import React from 'react';
import './App.css';
import Login from "./components/Login";
import HeaderMaster from "./components/HeaderMaster";
import CreateUser from "./components/CreateUser"
import Firebase from "./database/firebase"

export default class App extends React.Component {
  render() {
    var db = new Firebase()
    var method = function(snapshot) {
      console.log(snapshot);
    };
    db.read("Clientes", method)

    return (
      <div className="App">
        <HeaderMaster name={"Centro de Masajes y Terapias Alternativas"} />
        <Login /> 
      </div>
    );
  }
}

/**
  <CreateUser/>
 */
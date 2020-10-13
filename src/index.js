import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCRDX9KkLo9u2GbpXr50mH0QbobAwU4Cno",
  authDomain: "master--proyectois.firebaseapp.com",
  databaseURL: "https://master--proyectois.firebaseio.com",
  projectId: "master--proyectois",
  storageBucket: "master--proyectois.appspot.com",
  messagingSenderId: "881180107267",
  appId: "1:881180107267:web:1b7adde64373ab4b30a436",
  measurementId: "G-E5R9SSE45M"
});
ReactDOM.render(
  <App />, document.getElementById('root')
);
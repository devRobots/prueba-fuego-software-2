import firebase from 'firebase';
import 'firebase/auth';

class Firebase {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCRDX9KkLo9u2GbpXr50mH0QbobAwU4Cno",
      authDomain: "master--proyectois.firebaseapp.com",
      databaseURL: "https://master--proyectois.firebaseio.com",
      projectId: "master--proyectois",
      storageBucket: "master--proyectois.appspot.com",
      messagingSenderId: "881180107267",
      appId: "1:881180107267:web:a0b806e3b175b4d930a436",
      measurementId: "G-J0TZJZWXDE"
    };

    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = this.app.auth();
    this.db = this.app.database();
    
  }

  authenticationUser(email, password){
    this.auth.signInWithEmailAndPassword(email, password)
    .then((res)=> alert('Usuario registrado'))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
   this.auth.onAuthStateChanged(function(user){
      if(user){
        console.log(user.email);
      }
    });
  }

  RegisterUser(email, password){
    this.auth.createUserWithEmailAndPassword(email, password)
    .then((res)=> alert('Registro exitoso'))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  write(path, object) {
    var key = this.db.ref(path).push().key;
    this.db.ref(path).child(key).set(object);
  }

  read(path, method) {
    this.db.ref(path).once('value').then((snapshot) => method(snapshot.val()));
  }

  readList(path, method) {
    this.db.ref(path).on('value', function(snapshot) {
      var list = []
      snapshot.forEach(function(childsnapshot) {
        var childData = childsnapshot.val();
        list.push(childData)
      });
      method(list)
    })
  }

}

export default Firebase;
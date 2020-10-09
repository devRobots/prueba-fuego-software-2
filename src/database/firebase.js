import firebase from 'firebase';

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
    this.db = this.app.database();
  }

  write(path, object) {
    var key = this.db.ref(path).push().key;
    this.db.ref(path).child(key).set(object);
  }

  read(path, method) {
    this.db.ref(path).once('value').then((snapshot) => method(snapshot.val()));
  }

}

export default Firebase;
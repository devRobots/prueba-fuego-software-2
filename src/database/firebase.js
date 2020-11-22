import firebase from 'firebase';

class Firebase {
  static login(email, password, method, meth) {
    var flagTerapeuta = false;
    var flagSecretario = false;
    firebase.database().ref('Terapeutas').on('value', function(snapshot) {
      snapshot.forEach(function(childsnapshot) {
        var childData = childsnapshot.val();
        // eslint-disable-next-line
        if (childData.email == email) { 
          // eslint-disable-next-line
          if (childData.password == password) { 
            flagTerapeuta = true;
            sessionStorage.setItem('user', childData)
            meth(childData)
          }
        }
      });
    })
    firebase.database().ref('Secretario').on('value', function(snapshot) {
      snapshot.forEach(function(childsnapshot) {
        var childData = childsnapshot.val();
        // eslint-disable-next-line
        if (childData.email == email) { 
          // eslint-disable-next-line
          if (childData.password == password) { 
            flagSecretario = true;
            sessionStorage.setItem('user', childData)
            meth(childData)
          }
        }
      });
    })
    method(flagTerapeuta,flagSecretario)
  }

  static write(path, object) {
    var key = firebase.database().ref(path).push().key;
    firebase.database().ref(path).child(key).set(object);
  }

  static read(path, method) {
    firebase.database().ref(path).once('value').then((snapshot) => method(snapshot.val()));
  }

  static readList(path, method) {
    firebase.database().ref(path).on('value', function(snapshot) {
      var list = []
      snapshot.forEach(function(childsnapshot) {
        var childData = childsnapshot.val();
        list.push(childData)
      });
      method(list)
    })
  }

  static remove(path,objeto){
    var hola = firebase.database()
    var meth = function(snapshot){
      var cosa = function(childsnapshot){
        var key = childsnapshot.key;
          var childData = childsnapshot.val();
          // eslint-disable-next-line
          if(childData.id == objeto.id){
            hola.ref(path).child(key).remove()
          }
      }
      snapshot.forEach(cosa)
    }
    hola.ref(path).once('value', meth)
  }

  static put(path,objeto){
    var hola = firebase.database()
    var meth = function(snapshot){
      var cosa = function(childsnapshot){
        var key = childsnapshot.key;
          var childData = childsnapshot.val();
          // eslint-disable-next-line
          if(childData.id == objeto.id){
            hola.ref(path).child(key).set(objeto)
          }
      }
      snapshot.forEach(cosa)
    }
    hola.ref(path).once('value', meth)
  }

  static getObjectById(path,id,method){
    var hola = firebase.database()
    var meth = function(snapshot){
      var cosa = function(childsnapshot){
        var key = childsnapshot.key;
          var childData = childsnapshot.val();
          // eslint-disable-next-line
          if(childData.id == id){
            method(childData)
          }
      }
      snapshot.forEach(cosa)
    }
    hola.ref(path).once('value', meth)
  }

  static obtenerSesion(method) {
    var db = new Firebase()
    db.read("Clientes", method) 
  }
}

export default Firebase;
import Firebase from "./firebase"

class Queries {
    static obtenerSesion(method) {
        var db = new Firebase()
        db.read("Clientes", method) 
    }
}

export default Queries;
//LLamamos el compomente que usaremos para conectamos a la base de datos de sqlite
const sqlite3 = require("sqlite3").verbose();

class DB {
    static #db;

    //Abrmos la coneccion a la base de datos
    static open(){
        if(this.#db == undefined){
            //Nos conectamos a la base de datos que tenemos en la carpeta raiz que se llama prueba
            this.#db = new sqlite3.Database("./prueba.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_FULLMUTEX, (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Coneccion a la base de datos exitosa!")
                }
            });
        }
        return this.#db;
    }   

    //Cerramos la coneccion a la base de datos
    static close() {
        if(this.#db != undefined){
            this.#db.close();
            this.#db = undefined;
        }
    }
}

module.exports = DB;
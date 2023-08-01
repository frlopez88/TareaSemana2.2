const pgp = require('pg-promise')();

const cn = "postgrestql://postgres:Hola12$@localhost:5432/postgres";

const db = pgp(cn);

db.connect()
.then( ()=> {
    console.log("Conexion Exitosa ");
})
.catch((error)=>{
    console.log(error);
});

module.exports = db;
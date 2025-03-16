const express = require("express");
const router = express.Router();
//Llamamos el archivo de coneccion a la base de datos
const db = require('../db/conecction');

//Creamos el servicio que nos va a retornar todas las tareas
router.get('/getTask', (req,res) => {
    //Abrimos la coneccion a la base de datos
    const conn = db.open();
    //Ejecutamos el query que nos va a traer todas las tareas
    conn.all(`SELECT * FROM TASK`, function(err, rows) {
        if(err){
            console.log(err.message);
            res.json(err.message);
        } else {
            //Retornamos un estado 200 de exito
            res.status(200);
            //Retornamos los datos que nos trae la consulta
            res.json(rows);
        }
    });
    db.close();
})

//Creamos el servicio que nos va a crear una tarea
router.post('/createTask', (req,res) => {
    //Abrimos la coneccion a la base de datos
    const conn = db.open();
    //Guardamos en una variable el body que nos envia el front con los datos de la tarea
    let tarea = req.body;
    //Ejecutamos el query que nos va a insertar una nueva tarea
    conn.run("INSERT INTO task VALUES ('"+tarea.title+"','"+tarea.description+"',"+tarea.state+")", function(err, rows){
        if(err){
            console.log(err.message);
            res.json(err.message);
        } else {
            //Retornamos un estado 200 de exito
            res.status(200);
            //Retornamos un mensaje de exito en la creacion de la tarea
            res.json("Creación Exitosa");
        }
    });
    db.close();
});

//Creamos el servicio que nos va a actualizar el estado de una tarea
router.put('/updateTask', (req,res) => {
    const conn = db.open();
    //Guardamos los datos que nos envia por parametros desde el front para actualizar
    let state = req.query.state;
    let title = req.query.title;
    //Ejecutamos el query que nos va a actualizar una tarea
    conn.run("UPDATE task SET state = "+state+" WHERE title = '"+title+"'", function(err, rows){
        if(err){
            console.log(err.message);
            res.json(err.message);
        } else {
            //Retornamos un estado 200 de exito
            res.status(200);
            //Retornamos un mensaje de exito en la actualizacion de la tarea
            res.json("Actualización Exitosa");
        }
    });
    db.close();
});

//Creamos el servicio que nos va a eliminar una tarea
router.delete('/deleteTask', (req,res) => {
    const conn = db.open();
    //Guardamos los datos que nos envia por parametros desde el front para eliminar una tarea
    let title = req.query.title;
    //Ejecutamos el query que nos va a eliminar una tarea
    conn.run("DELETE FROM task WHERE title = '"+title+"'", function(err, rows){
        if(err){
            console.log(err.message);
            res.json(err.message);
        } else {
            //Retornamos un estado 200 de exito
            res.status(200);
            //Retornamos un mensaje de exito en la eliminacion de la tarea
            res.json("Eliminación Exitosa");
        }
    });
    db.close();
})

module.exports = router;
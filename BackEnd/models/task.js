const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el esquema para la tarea

const taskSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Boolean, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
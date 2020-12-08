const mongoose = require('mongoose')

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    matricula:{
        type: Number,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    appaterno:{
        type: String,
        required: [true, 'El Apellido Paterno es necesario'],
    },
    apmaterno:{
        type: String,
        required: [true, 'La Apellido Materno es necesaria']
    },
    nombre:{
        type: String,
        required: [true, 'El nombres es required']
    },
    email:{
        type: String,
        required: [true, 'El email es required']
    },
    telefono:{
        type: Number,
    },
    carrera:{
        type: String,
       required: [true, 'la carrera es necesaria']
    },
    semestre:{
        type:String,
        required: [true, 'El semestre tambien es necesario']
    },
    grupo:{
        type: String,
        required: [true,'El grupo es necesario']
    },
    estado:{
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Usuario',usuarioSchema)
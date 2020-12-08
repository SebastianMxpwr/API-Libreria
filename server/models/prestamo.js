const mongoose =  require('mongoose');
const Schema = mongoose.Schema

let prestamoSchema = new Schema({

    matricula:{
        type: Schema.Types.Number,
        ref: 'Usuario',
        required: [true, 'Es necesaria la matricula del alumno']
    },
    clave:{
        type: Schema.Types.Number,
        ref: 'Libro',
        required: [true, 'Es necesaria la clave del libro']

    },
    fechasalida:{
        type: Date,
        required: [true, 'La fecha de salida es necesaria'],
        
        
    },
    fechadevolucion:{
        type: Date,
        required: [true, 'La fecha de salida es necesaria'],

    },
    estadoprestamo:{
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Prestamos', prestamoSchema);


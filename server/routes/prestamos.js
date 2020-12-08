const express = require('express');
const Prestamos = require('../models/prestamo')
const app = express()
const _ = require('underscore')


app.get('/prestamos', function(req, res){

    let desde = req.query.desde || 0
    let hasta = req.query.hasta || 5

    Prestamos.find({estadoprestamo: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, productos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un error... osea la cagaste',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Todos los prestamos',
            conteo: productos.length,
            productos
        })
    })
})


app.post('/prestamos', (req, res)=>{

    
    let prod = new Prestamos({ 
        matricula: req.body.matricula,
        clave: req.body.clave,
        fechasalida: req.body.fechasalida,
        fechadevolucion: req.body.fechadevolucion

    })
    prod.save((err, proBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un problema',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Prestamo exitoso',
            proBD
        })
    })
    
})

app.put('/prestamos/:id', (req, res)=>{
    let id = req.params.id
    let body = _.pick(req.body, ['matricula', 'clave', 'fechasalida', 'fechadevolucion'])

    Prestamos.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'},(err,proBD)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Algo esta mal, pinche menso',
                    err
                })
            }

        res.json({
            ok: true,
            msg: 'Se actualizo el prestamo',
            proBD
        })
    })
})


app.delete('/prestamos/:id', (req, res)=>{
    let id = req.params.id

//     Productos.findOneAndRemove(id, {context:'query'}, (err, proBD)=>{
//         if(err){
//             return res.status(400).json({
//                 ok:false,
//                 msg: 'Ocuarrio un error... Cual es? quien sabe',
//                 err
//             })
//         }
//         res.json({
//             ok: true,
//             msg: 'Si se elimino',
//             proBD
//         })
//     })

Prestamos.findByIdAndUpdate(id,{estadoprestamo: false},
    { new: true , runValidators: true, context: 'query'}, (err ,proBD) =>{
        if(err){
            return res.status(400).json({
            ok: false,
            msg: 'Algo hiciste mal...Pinche pendejo',
            err
            })
        }
        res.json({
            ok: true,
            msg: 'Prestamo terminado con exito',
            proBD
            })
    })
})


module.exports = app
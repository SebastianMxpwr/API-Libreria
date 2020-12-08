const express = require('express');
const Libros = require('../models/libro');
const app = express();
const _ = require('underscore');
const { has } = require('underscore');

app.get('/libro', (req, res)=>{

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Libros.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err ,categorias)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocurrio un error al.. ya la cagaste pues',
                err
            })
        }

        res.json({ 
            ok: true,
            msg: 'Los libros son: ',
            conteo: categorias.length,
            categorias
        })
    })
})

app.post('/libro', (req, res)=>{

    let cat = new Libros({
        clave: req.body.clave,
        nombre: req.body.nombre,
        isbn: req.body.isbn,
        editorial: req.body.editorial,
        autor: req.body.autor,
        anio: req.body.anio

    })
    cat.save((err, catDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Vete, por que ya la cagaste',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Libro insertado con exito',
            catDB
        })
    })
    
})

app.put('/libro/:id', (req, res)=>{
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'isbn','editorial','autor','autor','anio'])

    Libros.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'},(err,catDB)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Algo paso mal',
                    err
                })
            }

        res.json({
            ok: true,
            msg: 'Se actualizo.. el Libro',
            catDB
        })
    })
})


app.delete('/libro/:id', (req, res)=>{
    let id = req.params.id

    Libros.findOneAndRemove(id, {context:'query'}, (err, catDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocuarrio un error... Cual es? quien sabe',
                err
            })
        }
        res.json({
            ok: true,
            msg: 'Si se elimino',
            catDB
        })
    })
})
module.exports = app
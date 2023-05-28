const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// Obtenemos todos los datos directamente de la base d edatos mongo de la colección libros.
router.get('/', async (req, res) => {
    try {
        const arrayLibrosDB = await Libro.find();
        // console.log(arrayLibrosDB);
        res.json(arrayLibrosDB);
    } catch (error) {
        console.log(error);
    }
});

// para insertar un elemento en la base de datos de mongo
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        await Libro.create(body);
        res.json({estado: 'Elemento insertado'});
    } catch (error) {
        console.log(error);
    }
});

// Para eliminar un solo elemento de mongo.
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const libroDB = await Libro.findOneAndDelete({isbn: id});
        if(libroDB) {
            res.json({
                estado: true,
                mensaje: 'Libro eliminado'
            });
        } else {
            res.json({
                estado: false,
                mensaje: 'No se pudo eliminar el libro solicitado'
            });
        }
    } catch (error) {
        console.log(error);
    }
});

// Para actualizar un solo elemento de mongo.
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const libroDB = await Libro.findOneAndUpdate({isbn: id}, body, {useFindAndModify: false});
        console.log(libroDB);
        res.json({
            estado: true,
            mensaje: 'El libro ha sido actualizado'
        });
    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Los datos del libro no fueron actualizados'
        });
    }
});

// Para obtener un solo elemento de mongo.
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const libroDB = await Libro.findOne({isbn: id});
        res.json(libroDB);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
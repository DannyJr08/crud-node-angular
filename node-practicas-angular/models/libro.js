const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libroSchema = new Schema({ 
    isbn: Number,   
    titulo: String,
    autor: String,
    anio: Number,
    editorial: String,
});

// Creamos el modelo del libro
const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
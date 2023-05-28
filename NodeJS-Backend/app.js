const express = require('express');
const {dirname} = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Esto es muy importante para el paso de datos entre los módulos, componentees y servicios.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Conexión a la base de datos de MongoDB a través de Mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/biblio',
{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Base de datos de MongoDB conectada correctamente'))
.catch(e => console.log(e));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas de la API
app.use('/libros', require('./router/Libros'));

app.listen(port, () => {
    console.log('The server is listening on port -->', port);
});
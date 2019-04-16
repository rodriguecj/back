'use strict'

const express = require('express');
const body_parser = require('body-parser');

var app = express();

//cargar archivos de rutas

var project_routes = require('./routes/project');

//midelware
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas

app.use('/api', project_routes)

/*
app.get('/', (req, res)=>{
    res.status(200).send(
        '<h1>Hola mundo desde mi API desde Node.JS</h1>'
    )
})

app.get('/test', (req, res)=>{
    res.status(200).send({
        message: 'Hola mundo desde mi API desde Node.JS'
    })
})*/



//Exportarlo

module.exports = app;


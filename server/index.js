const express = require('express');
const app = express();
const path = require('path');
const { mongoose } = require('./database.js');

//settings
app.set('port', process.env.PORT || 3001);

//middlewars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routers
app.use('/task', require(path.join(__dirname, 'routers', 'task.js')))

app.listen(app.get('port'), ()=>{
    console.log('Servidor escuchando en el puerto 3001')
});
const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/tasks';

mongoose.connect(URI)
    .catch(error => console.log(error))

mongoose.connection.on('open', ()=>{
    console.log('database is connected and open');
})

module.exports = mongoose;
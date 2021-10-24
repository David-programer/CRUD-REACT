const { model, Schema } = require('mongoose');

module.exports = model('task', Schema({
    text: {type: String, require: true}
}));
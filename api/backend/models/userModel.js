const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    _id: String,
    nombre: String,
    apellido: String,
    clave: String
}); 

const User = mongoose.model('User', userSchema);
module.exports = User;
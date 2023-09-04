const mongoose = require('mongoose')

//creating schema
const userSchema = new mongoose.Schema({
    name:{type:String , required: true},
    email:{type:String, required: true},
    address:{type:String, required: true}

});


// model 
const userData =  mongoose.model('users', userSchema);

module.exports = userData;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName:String,
  designation:String,
  expertIn:String
}) //This is how the structure of data is stored in a database


const userModel = mongoose.model("users",userSchema) //it is a collection of users, user = name of the collection.

module.exports = userModel
const mongoose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.MONGO_URL

function connectToDB() {
    mongoose.connect(mongourl)
        .then(() => {
            console.log("connected to DB")
        })
        .catch(err => console.error('MongoDB connection error:', err));
}


module.exports = connectToDB
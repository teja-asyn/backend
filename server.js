const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectToDB = require('./src/db/db');
const userModel = require('./src/models/user.model')

const app = express();
app.use(express.json())

// app.use(cors());

// app.use(cors({
//   origin: 'https://nalaland.com/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

const allowedOrigins = ['https://nalaland.com/', 'http://localhost:8080'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.post('/users',async (req,res)=>{
    const {userName,designation,expertIn} = req.body
    console.log(userName,designation,expertIn)

    await userModel.create({
        userName,designation,expertIn
    })

    res.json({
        message:"user created succesfully"
    })
})

app.get('/users', async (req,res)=>{
    const users = await userModel.find()

    res.json({
        message:"users fetched succesfully",
        users
    })
})

app.delete('/users/:id', async (req,res)=>{
    const userId = req.params.id

    await userModel.findOneAndDelete({
        _id : userId
    })

    res.json({
        message:"user deleted"
    })
})

app.patch('/users/:id',async (req,res)=>{
    const userId = req.params.id
    const {userName,designation} = req.body

    await userModel.findOneAndUpdate({
        _id:userId
    },{
        userName:userName,
        designation:designation
    })

    res.json({
        message:"user updated"
    })
})

connectToDB()
app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})

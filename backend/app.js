const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db')
const userRoutes = require('./routes/user.routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


connectDB();

app.get('/', (req,res)=>{
    res.send("hi")
});

app.use('/users', userRoutes)

module.exports = app ;
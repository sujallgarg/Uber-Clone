const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to db");
        
    }).catch(err => console.log('connection is failed',err)
);
}

module.exports = connectDB
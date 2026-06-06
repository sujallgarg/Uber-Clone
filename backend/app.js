const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
const connectDB = require('./db/db')
const userRoutes = require('./routes/user.routes')
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

connectDB();

app.use('/users', userRoutes)

// Serve frontend static assets if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("hi (frontend build not found in backend/dist)");
    });
}

module.exports = app ;
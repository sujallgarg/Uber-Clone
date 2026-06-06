const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Define the User Schema Structure
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  socketId:{
    type: String,
  }
}, {
  // Automatically creates 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
    
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel
const userModel = require('../models/user.model')

module.exports.createUser = async ({
    firstname, email, password
}) =>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required')
    }
    const user = userModel.create({
        firstname,
        email,
        password
    })

    return user;
}
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {type: String,required: true,unique: true},
    userEmail: {type: String,required: true, unique:true},
    passWord:{type: String,required: true},
    refreshToken: {type: String,unique: true},
    isAdmin: {type: Boolean}
},{timeStamps: true})

mongoose.models={}

export default mongoose.model("UserLogin",UserSchema)
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {type: Number,required: true},
    userEmail: {type: String,required: true, unique:true},
    passWord:{type: String,required: true},
    isAdmin: {type: Boolean}
},{timeStamps: true})

mongoose.models={}

export default mongoose.model("UserLogin",UserSchema)
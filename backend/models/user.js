const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:["employee","hr","admin","guide"],
        default:"employee"
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

module.exports = mongoose.model("User",userSchema);
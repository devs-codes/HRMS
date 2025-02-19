const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    designation:{
        type:String,
        required:true,
        trim:true
    },
    dateOfJoinig:{
        type:Date,
        default:Date.now()
    },
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:["Active","In-active"],
        default:"Active"
    }
},{timestamps:true})

module.exports = mongoose.model("Employee",employeeSchema)
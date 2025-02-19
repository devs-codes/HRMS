const mongoose = require("mongoose")
const attendanceSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    date:{
        type:Date
    },
    checkIn:{
        type:Date
    },
    checkOut:{
        type:Date
    },
    status:{
        type:String,
        enum:["Present","Absent","Half-day"],
        default:"Absent"
    }
},{timestamps:true})

module.exports = mongoose.model("Attendance",attendanceSchema)
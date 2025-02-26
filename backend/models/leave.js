const mongoose = require("mongoose")
const leaveSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    leaveType:{
        type:String,
        enum:["Sick-Leave","Casual-Leave","Paid-Leave"]
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"   
    },
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Leave",leaveSchema)
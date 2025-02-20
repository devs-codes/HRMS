const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const newUser = await userSchema.create(req.body)
        const token = jwt.sign({ _id: newUser.id, role: newUser.role }, process.env.JWT_SECRET)
        return res.status(201).json({
            message: "User register successfully",
            success: true,
            data: newUser,
            token: `Bearer ${token}`
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ _id: user.id, role: user.role }, process.env.JWT_SECRET)
        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            token: `Bearer ${token}`,
            data: user
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

// Admin access only
exports.getAllUsers = async(req,res)=>{ 
    try {
     const users = await userSchema.find().select("-password -__v");
        if(!users){
            return res.status(404).json({
                message:"No user found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Users found successfully",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}

// Admin,HR and Guide access only
exports.getUser = async(req,res)=>{
    try {
        const user = await userSchema.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"User found successfully",
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}

// Get user his own profile
exports.getProfile = async(req,res)=>{
    try {
        const users = await userSchema.findById(req.user._id).select("-password -__v");
        if(!users){
            return res.status(404).json({
                message:"No user found",
                success:false
            })
        }
        return res.status(200).json({
            message:"User found successfully",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:"Internal server Error"
        })  
    }
}

// Ask this to sir
// Employee can update his own profile
exports.updateUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const user = await userSchema.findOneAndUpdate({_id:req.user._id},{name,email,password},{new:true})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        return res.status(200).json({
            message:"user updated successfully",
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}

// Admin access only
exports.updateUserData = async(req,res)=>{
    try {
        const user = await userSchema.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"user updated successfully",
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:"Internal server Error",
            success : false
        })
    }
}

// Admin, HR, Guide access only
exports.deleteUser = async(req,res)=>{
    try {
        const user = await userSchema.findOneAndDelete({_id:req.params.id})
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"user deleted successfully",
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server Error",
            success : false
        })
    }
}
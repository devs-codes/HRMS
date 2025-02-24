const userSchema = require("../models/user")
const employeeSchema = require("../models/employee");

// Create Employee
//HR and Admin can create employee
exports.createEmployee = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userSchema.findById(userId);
        if(!user ){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const employee = await employeeSchema.create(req.body);
        return res.status(201).json({
            message:"Employee created successfully",
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

// Get all Employees
//HR and Admin can get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeSchema.find()
        .populate("userId","name email role");
        return res.status(200).json({
            message:"Employees found successfully",
            success: true,
            data: employees
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

// Get Employee by ID
//HR and Admin can get employee by id
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeSchema.findById(req.params.id)
        .populate("userId","name email role")
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Employee found successfully",
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

//Get Employee Profile (Self-access only)
exports.getEmployeeProfile = async (req, res) => { 
    try {
        const employee = await employeeSchema.findOne({userId: req.user._id})
        .populate("userId","name email role");
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Employee found successfully",
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
 }

//Get employee under guide
exports.getEmployeeUnderGuide = async (req, res) => {
    try {
        console.log(req.user._id)
        const employee = await employeeSchema.find({reportTo: req.user._id})
        .populate("userId","name email role")
        .select("-password -__v");

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Employee found successfully",
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}


//Hr and Admin can change employee certain things
// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await employeeSchema.findByIdAndUpdate({_id: req.params.id},req.body,{new:true})
        .populate("userId","name email role");
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Employee updated successfully",
            success: true,
            data: employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

// Delete Employee
//HR and Admin can delete employee
exports.removeEmployee = async (req, res) => {
    try {
        const employee = await employeeSchema.findByIdAndDelete(req.params.id)
        .populate("userId","name email role");
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            })
        }
        return res.status(200).json({
        message: "Employee deleted successfully",
        success: true,
        data: employee
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}
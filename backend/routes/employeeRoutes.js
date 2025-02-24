const router = require('express').Router();
const employeeRoutes = require("../controllers/employeeController");
const { verifyUser, verifyRole } = require("../middlewares/auth")

//Create Employee
router.post("/create-employee", verifyUser, verifyRole(["admin", "hr"]), employeeRoutes.createEmployee); 

//Get all Employees
router.get("/get-all-employees", verifyUser, verifyRole(["admin", "hr"]), employeeRoutes.getAllEmployees); 

 //Get Employee by ID
router.get("/get-employee/:id", verifyUser, verifyRole(["admin", "hr"]), employeeRoutes.getEmployeeById);

//Get Employee-Profile
router.get("/get-employee-profile", verifyUser, verifyRole(["employee"]), employeeRoutes.getEmployeeProfile);

//Get Employee under Guide
router.get("/get-employee-by-guide", verifyUser, verifyRole(["guide"]), employeeRoutes.getEmployeeUnderGuide);

 //Update Employee by ID
router.put("/update-employee/:id", verifyUser, verifyRole(["admin", "hr"]), employeeRoutes.updateEmployee);

//Delete Employee by ID
router.delete("/delete-employee/:id", verifyUser, verifyRole(["admin", "hr"]), employeeRoutes.removeEmployee); 

module.exports = router;
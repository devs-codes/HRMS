const router = require('express').Router();
const userRoutes = require("../controllers/userController");
const { verifyUser, verifyRole } = require("../middlewares/auth")

//User registration
router.post('/register', userRoutes.registerUser);

//User login
router.post('/login', userRoutes.loginUser);

//Get all users
router.get('/get-all-users', verifyUser, verifyRole(["admin"]), userRoutes.getAllUsers);

//Get user by id
router.get('/get-user/:id', verifyUser, verifyRole(["admin", "hr"]), userRoutes.getUser);

//Get user his profile
router.get('/get-profile', verifyUser, verifyRole(["employee"]), userRoutes.getProfile);

//Update user his profile
router.put('/update-user', verifyUser, verifyRole(["employee"]), userRoutes.updateUser);

//Update role By Admin
router.put("/update-role/:id", verifyUser, verifyRole(["admin", "hr"]), userRoutes.updateUserData);

//Delete user By Admin or Hr only
router.delete('/delete-user/:id', verifyUser, verifyRole(["admin", "hr"]), userRoutes.deleteUser);

module.exports = router;
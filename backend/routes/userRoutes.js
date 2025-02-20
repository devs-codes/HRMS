const router = require('express').Router();
const userRoutes = require("../controllers/userController");
const { verifyUser, verifyRole } = require("../middlewares/auth")

router.post('/register', userRoutes.registerUser);
router.post('/login', userRoutes.loginUser);
router.get('/get-all-users',verifyUser, verifyRole(["admin"]),userRoutes.getAllUsers);

router.get('/get-profile', verifyUser, userRoutes.getProfile);
router.put('/update-user', verifyUser, userRoutes.updateUser);
router.put("/update-role", verifyUser, verifyRole(["admin"]), userRoutes.updateRole);
router.delete('/delete-user', verifyUser, verifyRole(["admin","hr","guide"]),userRoutes.deleteUser);

module.exports = router;
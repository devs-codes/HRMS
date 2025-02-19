const router = require('express').Router();
const userRoutes = require("../controllers/userController");

router.post('/register',userRoutes.registerUser);
router.post('/login',userRoutes.loginUser);
router.get('/get-user',userRoutes.getUser);
router.put('/update-user',userRoutes.updateUser);
router.delete('/delete-user',userRoutes.deleteUser);

module.exports = router;
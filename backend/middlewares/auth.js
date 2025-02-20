const jwt = require("jsonwebtoken")

exports.verifyUser = (req,res,next)=>{
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log("user",error.message)
        return res.status(401).json({
            message:"Auth failed"
        })
    }
}

exports.verifyRole = (allowedRoles) => (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    } catch (error) {
        console.error("Role verification error:", error); // Log error for debugging
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


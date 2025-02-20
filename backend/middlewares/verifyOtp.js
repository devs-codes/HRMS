const userSchema = require("../models/user");   

exports.verifyOtp = async (req,res) => {
    try {
        const {email,otp} = req.body
        const user = await userSchema.findOne({
            email,
            otp
        })          
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        if(!user.otp || user.otp !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({
                message:"Invalid or expired OTP",
                success:false
            })
        }
}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"Internal server Error"
    })  
}
}
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_USER
    }
})

const sendMail = async (email,otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP for login into the system",
            text: `Your OTP is ${otp}`
        })
        console.log("OTP sent successfully", email)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sendMail;
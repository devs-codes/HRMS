const mongoose = require('mongoose')

exports.dbConnection = async()=>{
    try {
        const connectDb = await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.table("Database connected successfully");
        })
    } catch (error) {
        console.log(error)
    }
}
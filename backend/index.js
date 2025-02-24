const express = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;
const dbConnection = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require("./routes/employeeRoutes")

dbConnection.dbConnection();

app.use(express.json());

app.get("/",(req,res)=>{
    return res.send("Server is running")
})

app.use('/api/user',userRoutes)
app.use('/api/employee',employeeRoutes)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
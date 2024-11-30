const express =require("express");
const mongoose= require("mongoose");
const cors=require("cors");
const bodyParser = require("body-parser");
require('events').EventEmitter.defaultMaxListeners = 20;

require('dotenv').config();

const EmployeeRouter=require('./Routes/EmployeeRoutes')

const port= process.env.PORT || 4000 ;


const app =express();
require('./models/db')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));  // For parsing form data with files



app.get('/',(req,res)=>{
    res.send("project server is running successfully")
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.use('/api/employees',EmployeeRouter);

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
});
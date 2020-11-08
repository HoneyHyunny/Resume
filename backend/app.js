// express server use 

//import
const express = require('express');

//middleware 
const bodyParser = require('body-parser');

//instance
const app = express();

//mongo db connect 
const mongoose = require('mongoose');

//board routings
const boardRoutes = require('./routes/board');
//user routings 
const userRoutes = require('./routes/user');


mongoose.connect(
    "mongodb+srv://projectStakeholder:" + process.env.MONGO_ATLAS_PW + "@resumeprojectcluster.oekdh.mongodb.net/resume-project?retryWrites=true&w=majority"
    )
    .then(()=>{
        console.log("mongodb connected with server successfully!");
    })
    .catch(()=>{
        console.log("Failed to connect mongodb.");
    })
//body parser    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//set headers 

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    // for using next middleware
    next();
});

//board routes module 
app.use("/resume/boards", boardRoutes);
app.use("/user", userRoutes);


//export express module

module.exports = app;
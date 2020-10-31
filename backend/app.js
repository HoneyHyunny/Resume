// express server use 

//import
const express = require('express');

//middleware 
const bodyParser = require('body-parser');

//instance
const app = express();

//mongo db connect 
const mongoose = require('mongoose');

//post model 
const Board = require('./models/board');

const boardRoutes = require('./routes/board');


mongoose.connect("mongodb+srv://projectStakeholder:rxTtgxs8yb8DgXoi@resumeprojectcluster.oekdh.mongodb.net/node-angular?retryWrites=true&w=majority")
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
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    // for using next middleware
    next();
});

//board routes module 
app.use("/resume/boards", boardRoutes);


//export express module

module.exports = app;
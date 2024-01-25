const mongoose = require("mongoose");

const DBUrl = process.env.DATABASEURL;

mongoose.connect(DBUrl).then(()=>{
    console.log("Database Connection Successful");
}).catch((err) => console.log("Database Connection Error"));
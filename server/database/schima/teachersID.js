const mongoose = require("mongoose");

const PreTid = new mongoose.Schema({
    teacherID: {
        type: String,
        required: true
    },
    TID: {
        type: String,
        required: true
    }
})


const PreTid_Schima = mongoose.model("pretids", PreTid);
module.exports = PreTid_Schima;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Teacher = new mongoose.Schema({
    profileIMG: {
        type: String
    },
    teacherName: {
        type: String
    },
    teacherID: {
        type: String
    },
    batchName: [{
        id: {
            type: String,
        }
    }],
    teacherMobileNumber: {
        type: Number
    },
    teacherEmail: {
        type: String
    },
    teacherPassword: {
        type: String
    },
    teacherAddress: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

Teacher.pre('save', async function (next) {
    if (this.isModified('teacherPassword')) {
        this.teacherPassword = await bcrypt.hash(this.teacherPassword, 12);
    }
    next();
});

Teacher.methods.generateAuthToken = async function () {
    try {
        let makeToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: makeToken });
        await this.save();
        return makeToken;
    }
    catch (err) {
        console.log(err);
    }
}

const Teacher_Schima = mongoose.model("teachers", Teacher);
module.exports = Teacher_Schima;
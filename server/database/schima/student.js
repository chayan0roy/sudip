const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = new mongoose.Schema({
    profileIMG: {
        type: String
    },
    studentName: {
        type: String
    },
    studentID: {
        type: Number
    },
    batchName: {
        type: String,
        required: true
    },
    studentMobileNumber: {
        type: String
    },
    studentWhatsappNumber: {
        type: Number
    },
    studentEmail: {
        type: String
    },
    studentPassword: {
        type: String
    },
    session: {
        type: String
    },
    learningPurpus: {
        type: String
    },
    studentAddress: {
        type: String
    },
    dueFees: {
        type: Number
    },
    paymentHistory: [{
        screenshort: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    isApprove: {
        type: Boolean
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

Student.pre('save', async function (next) {
    if (this.isModified('studentPassword')) {
        this.studentPassword = await bcrypt.hash(this.studentPassword, 12);
    }
    next();
});

Student.methods.generateAuthToken = async function () {
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

const Student_Schima = mongoose.model("students", Student);
module.exports = Student_Schima;
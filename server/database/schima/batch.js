const mongoose = require("mongoose");

const Batch = new mongoose.Schema({
    batchName: {
        type: String
    },
    batchPassword: {
        type: String
    },
    session: {
        type: String
    },
    courseName: {
        type: String
    },
    admissionFees: {
        type: Number,
    },
    monthlyFees: {
        type: Number,
    },
    studentDataList: [{
        studentID: {
            type: String,
        },
        result: {
            type: String,
        }
    }],
    teacherDataList: [{
        teacherID: {
            type: String,
        }
    }],
    studentIdCounter: {
        type: Number
    },
    classTime: {
        type: String
    },
    examTime: [{
        examName: {
            type: String,
        },
        date: {
            type: String,
        }
    }],
    homeWorkList: [{
        date: {
            type: String,
        },
        work: {
            type: String,
        }
    }],
    studyMAterialList: [{
        date: {
            type: String,
        },
        material: {
            type: String,
        }
    }],
    noticeList: [{
        date: {
            type: String,
        },
        notice: {
            type: String,
        }
    }],
    comments: [{
        userID: {
            type: String,
        },
        comment: {
            type: String,
        }
    }],
})

const Batch_Schima = mongoose.model("batches", Batch);
module.exports = Batch_Schima;
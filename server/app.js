const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotdev = require('dotenv');
const bcrypt = require('bcryptjs');

const PreTid_Schima = require("./database/schima/teachersID");
const Teacher_Schima = require("./database/schima/teacher");
const Student_Schima = require("./database/schima/student");
const Batch_Schima = require("./database/schima/batch");

dotdev.config({ path: './config.env' });
require("./database/connection");
const app = express();
app.use(express.json());
app.use("/files", express.static("files"));
app.use(cors());

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./files");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now();
		cb(null, uniqueSuffix + file.originalname);
	},
});

const upload = multer({ storage: storage });



// ==================== Get Token ====================
// ==================== Get Token ====================

app.post("/getToken", upload.single("file"), async (req, res) => {
	const { token } = req.body;
	try {
		const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });

		if (isStudentToken == null) {
			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });

			if (isTeacherToken == null) {
				return res.send({ status: false });
			} else {
				return res.send({ status: true });
			}
		} else {
			return res.send({ status: true });
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});



// ==================== Check Who ====================
// ==================== Check Who ====================

app.post("/checkWho", upload.single("file"), async (req, res) => {
	const { token } = req.body;
	try {
		const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });
		if (isStudentToken == null) {
			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
			return res.send({ "who": "teacher" });
		} else {
			return res.send({ "who": "student" });
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});



// ==================== Registration ====================
// ==================== Registration ====================


app.post('/register', upload.single("file"), async (req, res) => {
	const profileIMG = req.file.filename;
	const { getCatagory } = req.body;
	try {
		if (getCatagory == "student") {
			const { studentName, batchName, studentMobileNumber, studentWhatsappNumber, studentEmail, studentPassword, learningPurpus, studentAddress } = req.body;
			const studentExist = await Student_Schima.findOne({ studentEmail: studentEmail });
			const batchExist = await Batch_Schima.findOne({ batchName: batchName });
			if (studentExist || !batchExist) {
				res.send({ status: false });
			} else {
				const studentID = batchExist.studentIdCounter + 1;
				batchExist.studentIdCounter = studentID;
				await batchExist.save();
				const session = batchExist.session;
				const dueFees = batchExist.monthlyFees + batchExist.admissionFees;
				const student = new Student_Schima({ profileIMG, studentName, batchName, studentID, studentMobileNumber, session, dueFees, studentWhatsappNumber, studentEmail, studentPassword, learningPurpus, studentAddress });
				await student.save();
				batchExist.studentDataList = batchExist.studentDataList.concat({ studentID: student._id.toString() });
				await batchExist.save();
				res.send({ status: true });
			}
		} else if (getCatagory == "teacher") {
			const { teacherName, teacherID, teacherMobileNumber, teacherEmail, teacherPassword, teacherAddress } = req.body;
			const teacherExist = await Teacher_Schima.findOne({ teacherEmail: teacherEmail });
			const teacherIDExist = await PreTid_Schima.findOne({ teacherID: teacherID });
			if (teacherExist || teacherIDExist.TID) {
				res.send({ status: false });
			} else {
				const teacher = new Teacher_Schima({ profileIMG, teacherName, teacherID, teacherMobileNumber, teacherEmail, teacherPassword, teacherAddress });
				await teacher.save();
				teacherIDExist.TID = teacher._id.toString();
				await teacherIDExist.save();
				res.send({ status: true });
			}
		}
	} catch (err) {
		res.json({ status: err });
	}
});


// ==================== Login ====================
// ==================== Login ====================

app.post("/login", upload.single("file"), async (req, res) => {
	const { getCatagory } = req.body;
	try {
		if (getCatagory == "student") {
			const { studentEmail, studentPassword } = req.body;
			const studentExist = await Student_Schima.findOne({ studentEmail: studentEmail });
			if (studentExist) {
				const isPasordMatch = await bcrypt.compare(studentPassword, studentExist.studentPassword);
				if (isPasordMatch) {
					let auth_token = await studentExist.generateAuthToken();
					return res.json({ "auth_token": auth_token, status: true });
				} else {
					return res.send({ status: false });
				}
			} else {
				res.send({ status: "not" });
			}
		} else if (getCatagory == "teacher") {
			const { teacherEmail, teacherPassword, } = req.body;
			const teacherExist = await Teacher_Schima.findOne({ teacherEmail: teacherEmail });
			if (teacherExist) {
				const isPasordMatch = await bcrypt.compare(teacherPassword, teacherExist.teacherPassword);
				if (isPasordMatch) {
					let auth_token = await teacherExist.generateAuthToken();
					return res.json({ "auth_token": auth_token, status: true });
				} else {
					return res.send({ status: false });
				}
			} else {
				res.send({ status: "not" });
			}
		}
	} catch (err) {
		res.json({ status: err });
	}
})



// ==================== Get Account Left Data ====================
// ==================== Get Account Left Data ====================

app.post("/getAccountLeftData", upload.single("file"), async (req, res) => {
	const { token, who } = req.body;
	try {
		if (who == "student") {
			const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });
			res.send(
				{
					profileIMG: isStudentToken.profileIMG,
					studentName: isStudentToken.studentName
				}
			);
		} else if (who == "teacher") {
			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
			res.send(
				{
					profileIMG: isTeacherToken.profileIMG,
					teacherName: isTeacherToken.teacherName
				}
			);
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});



// ==================== Get Account Right Data ====================
// ==================== Get Account Right Data ====================

app.post("/getAccountRightData", upload.single("file"), async (req, res) => {
	const { token, who } = req.body;
	try {
		if (who == "student") {
			const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });
			const studentExist = await Batch_Schima.findOne({ "studentDataList.studentID": isStudentToken._id });
			if (studentExist) {
				res.send(
					{
						profileIMG: isStudentToken.profileIMG,
						studentName: isStudentToken.studentName,
						studentID: isStudentToken.studentID,
						studentMobileNumber: isStudentToken.studentMobileNumber,
						studentWhatsappNumber: isStudentToken.studentWhatsappNumber,
						studentEmail: isStudentToken.studentEmail,
						learningPurpus: isStudentToken.learningPurpus,
						studentAddress: isStudentToken.studentAddress,
						batchName: isStudentToken.batchName,
						session: isStudentToken.session
					}
				);
			}

		} else if (who == "teacher") {
			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
			res.send(
				{
					profileIMG: isTeacherToken.profileIMG,
					teacherName: isTeacherToken.teacherName,
					teacherMobileNumber: isTeacherToken.teacherMobileNumber,
					teacherEmail: isTeacherToken.teacherEmail,
					teacherAddress: isTeacherToken.teacherAddress
				}
			);
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});




// ==================== Get Batch Id ====================
// ==================== Get Batch Id ====================

app.post("/getBatchId", upload.single("file"), async (req, res) => {
	const { token } = req.body;
	try {
		const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
		if (isTeacherToken.batchName.length == 0) {
			res.send({ status: false });
		} else {
			res.send({ status: true, batchList: isTeacherToken.batchName });
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});





// ==================== Make Batch ====================
// ==================== Make Batch ====================

app.post("/makeBatch", upload.single("file"), async (req, res) => {
	const { token, batchName, batchPassword, session, courseName, admissionFees, monthlyFees, studentIdCounter, classTime } = req.body;

	try {
		const isBatchName = await Batch_Schima.findOne({ batchName: batchName });
		if (isBatchName) {
			res.send({ status: false });
		} else {
			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
			isTeacherToken.batchName = isTeacherToken.batchName.concat({ id: batchName });
			await isTeacherToken.save();
			const batch = new Batch_Schima({ batchName, batchPassword, session, courseName, admissionFees, monthlyFees, studentIdCounter, classTime });
			await batch.save();
			batch.teacherDataList = batch.teacherDataList.concat({ teacherID: isTeacherToken._id.toString() });
			await batch.save();
			res.send({ status: true });
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});




// ==================== Get Student Fees Payment Details ====================
// ==================== Get Student Fees Payment Details ====================

app.post("/getStudentFeesPaymentDetails", upload.single("file"), async (req, res) => {
	const { token } = req.body;
	try {
		const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });
		const isbatchName = await Batch_Schima.findOne({ batchName: isStudentToken.batchName });
		res.send(
			{
				monthlyFees: isbatchName.monthlyFees,
				admissionFees: isbatchName.admissionFees,
				dueFees: isStudentToken.dueFees,
				paymentHistory: isStudentToken.paymentHistory
			}
		);
	}
	catch (err) {
		res.json({ status: err });
	}
});


// ==================== Get Student Details Admin ====================
// ==================== Get Student Details Admin ====================

app.post("/getStudentDetailsAdmin", upload.single("file"), async (req, res) => {
	const { token, batchID } = req.body;
	const arr = [];
	try {
		const isTeacher = await Teacher_Schima.findOne({ "tokens.token": token });
		if (isTeacher) {
			const isBatch = await Batch_Schima.findOne({ "batchName": batchID });
			for (let r of isBatch.studentDataList) {
				const students = await Student_Schima.findOne({ _id: r.studentID });
				arr.push(
					{
						id : students._id,
						studentName : students.studentName,
						dueFees : students.dueFees
					}
				)
			}
		}
		res.send(arr);
	}
	catch (err) {
		res.json({ status: err });
	}
});




// ==================== getPaymentHistorysAdmin ====================
// ==================== getPaymentHistorysAdmin ====================

app.post("/getPaymentHistorysAdmin", upload.single("file"), async (req, res) => {
	const { ID } = req.body;
	try {
		const isStudentExst = await Student_Schima.findOne({ _id : ID });
		res.send(isStudentExst.paymentHistory);
	}
	catch (err) {
		res.json({ status: err });
	}
});



// ==================== approve ====================
// ==================== approve ====================

app.post("/approve", upload.single("file"), async (req, res) => {
	const { ID, amount } = req.body;
	try {
		const isStudentExst = await Student_Schima.findOne({ _id : ID });
		if(isStudentExst) {
			isStudentExst.dueFees = isStudentExst.dueFees - amount;
			isStudentExst.isApprove = false;
			await isStudentExst.save();
			res.json({ status: true });
		} else {
			res.json({ status: false });
		}
	}
	catch (err) {
		res.json({ status: err });
	}
});




// ==================== Screenshort Uploaad ====================
// ==================== Screenshort Uploaad ====================

app.post("/uploadFiles", upload.single("file"), async (req, res) => {
	const { token, amount } = req.body;
	const fileName = req.file.filename;
	try {
		const isStudentExist = await Student_Schima.findOne({ "tokens.token": token });
		if (isStudentExist) {
			isStudentExist.paymentHistory = isStudentExist.paymentHistory.concat({ screenshort: fileName, amount: amount });
			isStudentExist.isApprove = true;
			await isStudentExist.save();
			res.send({ status: true });
		}
	} catch (error) {
		res.json({ status: error });
	}
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log("Server Start");
});

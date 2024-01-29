import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import defaultAccountImg from "../../assets/accont.png";

export default function Register() {

	const navigate = useNavigate();
	const allCatagory = ["আমি শিখে ফ্রিলান্সিং করে ইনকাম চাই", "আমি নিজের বিসনেসের জন্য শিখছি", "আমার ডিজিটাল এজেন্সি খুলতে চাই"];
	const allBatch = ["12"];

	const [viewImage, setViewImage] = useState(defaultAccountImg);
	const [getCatagory, setGetCatagory] = useState("student");
	const [file, setFile] = useState("");

	// student
	const [batchName, setBatchName] = useState(allBatch[0]);
	const [studentName, setStudentName] = useState("");
	const [studentMobileNumber, setStudentMobileNumber] = useState("");
	const [studentWhatsappNumber, setStudentWhatsappNumber] = useState("");
	const [learningPurpus, setLearningPurpus] = useState(allCatagory[0]);
	const [studentAddress, setStudentAddress] = useState("");
	const [studentEmail, setStudentEmail] = useState("");
	const [studentPassword, setStudentPassword] = useState("");

	// teacher
	const [teacherName, setTeacherName] = useState("");
	const [teacherID, setTeacherID] = useState("");
	const [teacherMobileNumber, setTeacherMobileNumber] = useState("");
	const [teacherAddress, setTeacherAddress] = useState("");
	const [teacherEmail, setTeacherEmail] = useState("");
	const [teacherPassword, setTeacherPassword] = useState("");

	const convertUserIMG = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setViewImage(fileReader.result);
		}
	}

	const handleRegister = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("file", file);
		formData.append("getCatagory", getCatagory);
		
		if (getCatagory == "student") {
			formData.append("batchName", batchName);
			formData.append("studentName", studentName);
			formData.append("studentMobileNumber", studentMobileNumber);
			formData.append("studentWhatsappNumber", studentWhatsappNumber);
			formData.append("learningPurpus", learningPurpus);
			formData.append("studentAddress", studentAddress);
			formData.append("studentEmail", studentEmail);
			formData.append("studentPassword", studentPassword);
		} else if ((getCatagory == "teacher")) {
			formData.append("teacherName", teacherName);
			formData.append("teacherID", teacherID);
			formData.append("teacherMobileNumber", teacherMobileNumber);
			formData.append("teacherAddress", teacherAddress);
			formData.append("teacherEmail", teacherEmail);
			formData.append("teacherPassword", teacherPassword);
		}
		
		const result = await axios.post("https://student.chayan.online/register", formData);
		if (result.data.status == true) {
			alert("Account Created!!!");
			navigate('/');
		} else if (result.data.status == false) {
			alert("Account Exist or batch not exist");
			navigate('/');
		}
	};

	return (
		<form className="Login_Register Register" onSubmit={handleRegister}>
			<div className='input_image_box flex'>
				<img src={viewImage} />
				<input type="file" className="image_input" required onChange={convertUserIMG} />
			</div>
			<div className="input_text_box_Area flex">
				<div className="form-check">
					<input type="radio" className="form-check-input" name="role" id="studentRadio" value={"student"} onChange={(e) => setGetCatagory(e.target.value)} defaultChecked />
					<label htmlFor="studentRadio" className="form-check-label">Student</label>
				</div>
				<div className="form-check ms-2">
					<input type="radio" className="form-check-input" name="role" id="teacherRadio" value={"teacher"} onChange={(e) => setGetCatagory(e.target.value)} />
					<label htmlFor="teacherRadio" className="form-check-label">Teacher</label>
				</div>
			</div>
			{
				getCatagory == "student"
					?
					<>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার পুরো নাম' type='text' required onChange={(e) => setStudentName(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<select className='input_box' onChange={(c) => setBatchName(c.target.value)}>
								{
									allBatch.map((c) => {
										return (
											<option value={c}>{c}</option>
										)
									})
								}
							</select>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার ফোন নাম্বার' type='number' required onChange={(e) => setStudentMobileNumber(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার Whatsapp নাম্বার' type='number' required onChange={(e) => setStudentWhatsappNumber(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<select className='input_box' onChange={(c) => setLearningPurpus(c.target.value)}>
								{
									allCatagory.map((c) => {
										return (
											<option value={c}>{c}</option>
										)
									})
								}
							</select>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='পিন কোড সমেত পুরো ঠিকানা' type='text' required onChange={(e) => setStudentAddress(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার ইমেল আইডি' type='email' required onChange={(e) => setStudentEmail(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Enter Your Password' type='password' required onChange={(e) => setStudentPassword(e.target.value)}></input>
						</div>
					</>
					:
					<>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার পুরো নাম' type='text' required onChange={(e) => setTeacherName(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Teacher ID' type='text' required onChange={(e) => setTeacherID(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার ফোন নাম্বার' type='number' required onChange={(e) => setTeacherMobileNumber(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার ইমেল আইডি' type='email' required onChange={(e) => setTeacherEmail(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Enter Your Password' type='password' required onChange={(e) => setTeacherPassword(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Enter Your Address' type='text' required onChange={(e) => setTeacherAddress(e.target.value)}></input>
						</div>
					</>
			}
			<div className='submitBtnArea flex'>
				<button className='btn' type='submit'>Submit</button>
				<Link className='link' to="/">Login your Account</Link>
			</div>
		</form>
	)
}

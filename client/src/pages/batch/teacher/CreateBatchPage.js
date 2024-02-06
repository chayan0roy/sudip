import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function CreateBatchPage() {
	const navigate = useNavigate();

	const [batchName, setBatchName] = useState();
	const [batchPassword, setBatchPassword] = useState();
	const [session, setSession] = useState();
	const [courseName, setCourseName] = useState();
	const [admissionFees, setAdmissionFees] = useState();
	const [monthlyFees, setMonthlyFees] = useState();
	const [studentIdCounter, setStudentIdCounter] = useState();
	const [classTime, setClassTime] = useState();

	const createBatch = async (e) => {
		e.preventDefault();
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			formData.append("batchName", batchName);
			formData.append("batchPassword", batchPassword);
			formData.append("session", session);
			formData.append("courseName", courseName);
			formData.append("admissionFees", admissionFees);
			formData.append("monthlyFees", monthlyFees);
			formData.append("studentIdCounter", studentIdCounter);
			formData.append("classTime", classTime);
			
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/makeBatch", formData,);
			if (result.data.status == true) {
				alert("Your Batch Creation Successful!!!")
				navigate('/Batch');
			} else if(result.data.status == false) {
				alert("This Batch is already Exist!!!")
			}
		}
	}

	return (
		<form className="Login_Register Register" onSubmit={createBatch}>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার batch Name' type='text' required onChange={(e) => setBatchName(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার password' type='password' required onChange={(e) => setBatchPassword(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার session' type='text' required onChange={(e) => setSession(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার Course' type='text' required onChange={(e) => setCourseName(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার admission fees' type='number' required onChange={(e) => setAdmissionFees(e.target.value)}></input>
				<input className='input_box' placeholder='আপনার monthlyFees fees' type='number' required onChange={(e) => setMonthlyFees(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার Student id' type='number' required onChange={(e) => setStudentIdCounter(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার Class day' type='text' required onChange={(e) => setClassTime(e.target.value )}></input>
			</div>
			<div className='submitBtnArea flex'>
				<button className='btn' type='submit'>Submit</button>
			</div>
		</form>
	)
}

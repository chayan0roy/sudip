import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import defaultAccountImg from '../../assets/accont.png';

export default function Login({ setIsLogin }) {
	const navigate = useNavigate();

	const [getCatagory, setGetCatagory] = useState("student");

	const [studentEmail, setStudentEmail] = useState("");
	const [studentPassword, setStudentPassword] = useState("");
	const [teacherEmail, setTeacherEmail] = useState("");
	const [teacherPassword, setTeacherPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("getCatagory", getCatagory);

		if (getCatagory == "student") {
			formData.append("studentEmail", studentEmail);
			formData.append("studentPassword", studentPassword);
		} else if ((getCatagory == "teacher")) {
			formData.append("teacherEmail", teacherEmail);
			formData.append("teacherPassword", teacherPassword);
		}

		const result = await axios.post("http://localhost:5000/login", formData);
		if (result.data.status == true) {
			Cookies.set('auth_token', result.data.auth_token, { expires: 7 });
			alert("Login Successfull !!!");
			setIsLogin(true);
			navigate('/');
		} else if (result.data.status == false) {
			alert("Invalid Data !!!");
			navigate('/');
		} else if (result.data.status == "not") {
			alert("No Account Found !!!");
			navigate('/Register');
		}
	};

	return (
		<form className="Login_Register Login" onSubmit={handleLogin}>
			<div className='input_image_box flex'>
				<img src={defaultAccountImg}></img>
			</div>
			<div className="input_text_box_Area flex">
				<div className="form-check">
					<input type="radio" className="form-check-input" name="role" id="studentRadio" value={"student"} onChange={(e) => setGetCatagory(e.target.value)} defaultChecked />
					<label htmlFor="studentRadio" className="form-check-label">Stdent</label>
				</div>
				<div className="form-check ms-2">
					<input type="radio" className="form-check-input" name="role" id="teacherRadio" value={"teacher"} onChange={(e) => setGetCatagory(e.target.value)} />
					<label htmlFor="teacherRadio" className="form-check-label">Teacher </label>
				</div>
			</div>
			{
				(getCatagory == "student")
					?
					<>
						<div class="input_text_box_Area flex">
							<input className='input_box flex' placeholder='Enter Your Email' type='email' required onChange={(e) => setStudentEmail(e.target.value)}></input>
						</div>
						<div class="input_text_box_Area flex">
							<input className='input_box flex' placeholder='Enter Your Password' type='pssword' required onChange={(e) => setStudentPassword(e.target.value)}></input>
						</div>
					</>
					:
					<>
						<div class="input_text_box_Area flex">
							<input className='input_box flex' placeholder='Enter Your Email' type='email' required onChange={(e) => setTeacherEmail(e.target.value)}></input>
						</div>
						<div class="input_text_box_Area flex">
							<input className='input_box flex' placeholder='Enter Your Password' type='pssword' required onChange={(e) => setTeacherPassword(e.target.value)}></input>
						</div>
					</>
			}
			<div className='submitBtnArea flex'>
				<button className='btn' type='submit'>Submit</button>
				<Link className='link' to="/Register">Create a new account</Link>
			</div>
		</form>
	)
}

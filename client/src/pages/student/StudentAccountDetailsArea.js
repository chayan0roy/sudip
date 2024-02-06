import './StudentAccountDetailsArea.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function StudentAccountDetailsArea({ who, setIsLogin }) {
	const navigate = useNavigate();

	const [rightData, setRightData] = useState();

	useEffect(() => {
		getAccountRightData();
	}, []);

	const getAccountRightData = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			formData.append("who", who);
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/getAccountRightData", formData,);
			setRightData(result.data);
		}
	}

	const handleLogout = async () => {
		setIsLogin(false);
		Cookies.remove("auth_token");
		navigate('/');
	}

	return (
		<>
			{
				rightData
					?
					<div className='studentDetailsArea'>
						<div className='studentDetailsAreaTop flex'>
							<img src={`https://student-management-backend-lkly.onrender.com/files/`+rightData.profileIMG}></img>
							<h1>{rightData.studentName}</h1>
						</div>
						<div className='studentDetailsAreaBottom flex'>
						<button onClick={handleLogout}>Logout</button>
							<div className='studentDetails'>
								<h3><span>Student Name :</span><span className='DetailsText'>{rightData.studentName}</span></h3>
								<h3><span>Student ID :</span><span className='DetailsText'>{rightData.studentID}</span></h3>
								<h3><span>Batch Name :</span><span className='DetailsText'>B{rightData.batchName}</span></h3>
								<h3><span>Session :</span><span className='DetailsText'>{rightData.session}</span></h3>
								<h3><span>Mobile Number :</span><span className='DetailsText'>{rightData.studentMobileNumber}</span></h3>
								<h3><span>Whatsapp Number :</span><span className='DetailsText'>{rightData.studentWhatsappNumber}</span></h3>
								<h3><span>Email Address :</span><span className='DetailsText'>{rightData.studentEmail}</span></h3>
								<h3><span>Learning Purpus :</span><span className='DetailsText'>{rightData.learningPurpus}</span></h3>
								<h3><span>Address :</span><span className='DetailsText'>{rightData.studentAddress}</span></h3>
							</div>
							<div className='instituteDetails'>
								<h3><span>Institute Name :</span><span className='DetailsText'>Biswas Compny</span></h3>
								<h3><span>Institute Address :</span><span className='DetailsText'>Bagdah, North 24 Pargonas, 743232</span></h3>
								<h3><span>Helpline Number :</span><span className='DetailsText'>7003103509</span></h3>
								<h3><span>Helpline Email Address :</span><span className='DetailsText'>chayanthe01guy@gmail.com</span></h3>
							</div>
						</div>
					</div>
					:
					<></>
			}
		</>
	)
}


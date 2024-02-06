import './TeacherAccountDetailsArea.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function TeacherAccountDetailsArea({ who, setIsLogin }) {
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


	const logout = () => {
		
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
							<h1>{rightData.teacherName}</h1>
						</div>
						<div className='studentDetailsAreaBottom flex'>
							<button onClick={handleLogout}>Logout</button>
							<div className='studentDetails'>
								<h3><span>Teacher Name :</span><span className='DetailsText'>{rightData.teacherName}</span></h3>
								<h3><span>Mobile Number :</span><span className='DetailsText'>{rightData.teacherMobileNumber}</span></h3>
								<h3><span>Email Address :</span><span className='DetailsText'>{rightData.teacherEmail}</span></h3>
								<h3><span>Address :</span><span className='DetailsText'>{rightData.teacherAddress}</span></h3>
							</div>
						</div>
					</div>
					:
					<></>
			}
		</>
	)
}


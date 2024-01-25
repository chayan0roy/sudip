import './StudentAccountDetailsArea.css'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function StudentAccountDetailsArea({ who }) {

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
			const result = await axios.post("http://localhost:5000/getAccountRightData", formData,);
			setRightData(result.data);
		}
	}


	return (
		<>
			{
				rightData
					?
					<div className='studentDetailsArea'>
						<div className='studentDetailsAreaTop flex'>
							<img src={`http://localhost:5000/files/`+rightData.profileIMG}></img>
							<h1>{rightData.studentName}</h1>
						</div>
						<div className='studentDetailsAreaBottom flex'>
							<div className='studentDetails'>
								<h3><span>Student Name :</span><span className='DetailsText'>{rightData.studentName}</span></h3>
								<h3><span>Student ID :</span><span className='DetailsText'>35441654</span></h3>
								<h3><span>Batch Name :</span><span className='DetailsText'>Batch 12</span></h3>
								<h3><span>Session :</span><span className='DetailsText'>2023-2024</span></h3>
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


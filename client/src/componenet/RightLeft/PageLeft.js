import './PageLeft.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'

export default function PageLeft({ who }) {

	const [leftData, setLeftData] = useState();

	useEffect(() => {
		getAccountLeftData();
	}, []);

	const getAccountLeftData = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			formData.append("who", who);
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/getAccountLeftData", formData,);
			setLeftData(result.data);
		}
	}

	return (
		<div className='dashboardLeft'>
			{
				leftData ?
					<>
						<div className='profileImageArea flex'>
							<img src={`https://student-management-backend-lkly.onrender.com/files/`+leftData.profileIMG} />
						</div>
						<div className='profileShortDetails'>
							{
								(who == "student")
									?
									<>
										<h1>{leftData.studentName}</h1>
										<h3>Batch 12 Student of Biswas Company</h3>
									</>
									:
									<h1>{leftData.teacherName}</h1>
							}

						</div>
					</>
					:
					<></>
			}
			<div className='linkArea'>
				{
					who == "student" ?
						<>
							<Link className='navLink' to="/">Account</Link>
							<Link className='navLink' to="/Institute">Institute</Link>
						</>
						:
						<>
							<Link className='navLink' to="/">Account</Link>
							<Link className='navLink' to="/Batch">Batch</Link>
						</>
				}
			</div>
		</div>
	)
}
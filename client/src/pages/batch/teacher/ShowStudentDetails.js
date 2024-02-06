import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ShowStudentDetails() {
	const params = useParams();
	const navigate = useNavigate();
	const [showStdtDetails, setShowStdtDetails] = useState();

	useEffect(() => {
		GetStudentDetails();
	}, []);

	const GetStudentDetails = async () => {
		const token = Cookies.get("auth_token");
		const batchID = params.selectBatchID;
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			formData.append("batchID", batchID);
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/getStudentDetailsAdmin", formData,);
			setShowStdtDetails(result.data);
		}
	}


	return (
		<ul>
			{
				showStdtDetails
				?
				showStdtDetails.map((sd) => {
					return (
						<Link className='link' to={`/ShowFeesPaymentHistoryList/${sd.id}`}><h1>{sd.studentName}</h1><span>Due Fees {sd.dueFees}</span></Link>
					);
				})
				:
				<></>
			}
		</ul>
	)
}


import React from 'react'
import UnderDeveloping from '../../UnderDeveloping'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowFeesPaymentHistoryList() {
	const params = useParams();
	const [showPaymentHistory, setShowPaymentHistory] = useState();
	const [amount, setAmount] = useState();

	useEffect(() => {
		GetPaymentHistorys();
	}, []);

	const GetPaymentHistorys = async () => {
		const ID = params.studentID;
		const formData = new FormData();
		formData.append("ID", ID);
		const result = await axios.post("https://student-management-backend-lkly.onrender.com/getPaymentHistorysAdmin", formData,);
		setShowPaymentHistory(result.data);
	}

	const handleApprove = async() => {
		const formData = new FormData();
		const ID = params.studentID;
		formData.append("ID", ID);
		formData.append("amount", amount);
		const result = await axios.post("https://student-management-backend-lkly.onrender.com/approve", formData,);
		if(result.data.status == true) {
			alert("Approved!!!");
		} else {
			alert("Not Approved!!!");
		}
	}



	return (
		<div>
<ul>
			{
				showPaymentHistory
					?
					showPaymentHistory.map((sd) => {
						return (
							<>
								<img src={`https://student-management-backend-lkly.onrender.com/files/` + sd.screenshort} />
								<h3>Payment Amount {sd.amount}</h3>
							</>
						);
					})
					:
					<></>
			}
		</ul>
		<div>
			<input type='number' required placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)}/>
			<button onClick={handleApprove}>Approve</button>
		</div>
		</div>
		
	)
}

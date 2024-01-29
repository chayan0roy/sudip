import './PrivatePage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PageLeft from '../RightLeft/PageLeft';
import PageRight from '../RightLeft/PageRight'

export default function PrivatePage({setIsLogin}) {

	const [who, setWho] = useState();

	useEffect(() => {
		check_Who();
	}, []);

	const check_Who = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/checkWho", formData,);
			setWho(result.data.who);
		}
	}

	return (
		<div className='dashboard flex'>
			{
				who ?
					<>
						<PageLeft who={who} />
						<PageRight who={who} setIsLogin={setIsLogin}/>
					</>
					:
					<></>
			}
		</div>
	)
}

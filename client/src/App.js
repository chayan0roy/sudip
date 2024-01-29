import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import PrivatePage from './componenet/PrivatePage/PrivatePage';
import Register from './pages/LoginRegister/Register';
import Login from './pages/LoginRegister/Login';

function App() {

	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		check_Auth_Token();
	}, []);

	const check_Auth_Token = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			const result = await axios.post("https://student-management-backend.netlify.app/getToken", formData,);
			if (result.data.status == true) {
				setIsLogin(true);
			} else {
				Cookies.remove("auth_token");
				setIsLogin(false);
			}
		} else {
			Cookies.remove("auth_token");
			setIsLogin(false);
		}
	}


	return (
		<div className='app'>
			{
				isLogin
					?
					<BrowserRouter>
						<PrivatePage setIsLogin={setIsLogin}/>
					</BrowserRouter>
					:
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Login setIsLogin={setIsLogin} />} />
							<Route path='/Register' element={<Register />} />
						</Routes>
					</BrowserRouter>
			}
		</div>
	);
}

export default App;

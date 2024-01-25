import "./FeesPaymentArea.css"
import formData from 'form-data';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultAccountImg from '../../assets/accont.png'

export default function FeesPaymentArea({ who }) {

	const [feesPaymentDetails, setFeesPaymentDetails] = useState();
	const [file, setFile] = useState("");
	const [userNumber, setUserNumber] = useState();
	const [viewImage, setViewImage] = useState(defaultAccountImg);

	useEffect(() => {
		if(who == 'user') {
			getStudentFeesPaymentDetails();
		} else {
			getFeesPaymentDetails();
		}
	}, []);

	const getStudentFeesPaymentDetails = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			const result = await axios.post("http://localhost:5000/getStudentFeesPaymentDetails", formData,);
			setFeesPaymentDetails(result.data);
		}
	}


	const getFeesPaymentDetails = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			const result = await axios.post("http://localhost:5000/getFeesPaymentDetails", formData,);
			setFeesPaymentDetails(result.data);
		}
	}


	const convertUserIMG = (e) => {
		setFile(e.target.files[0])
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setViewImage(fileReader.result);
		}
	}

	const submitImage = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("userNumber", userNumber);
		formData.append("file", file);

		const result = await axios.post("http://localhost:5000/upload-files", formData);
		if (result.data.status == "ok") {
			setViewImage(defaultAccountImg);
			setUserNumber();
			setFile("");
			alert("Uploaded Successfully!!!");
		}
	};

	return (
		<>
			{
				(who == 'user')
					?
					<div className='FeesPaymentArea flex'>
						<div className='leftArea'>
							<h3><span>Your Course Fees :</span><span className='DetailsText'>5000</span></h3>
							<h3><span>Your Due Fees :</span><span className='DetailsText'>3000</span></h3>
							<h3><span>Your Total Fees :</span><span className='DetailsText'>2000</span></h3>
						</div>
						<div className='rightArea'>
							<form className="flex" onSubmit={submitImage}>
								<h4>Upload Payment Screenshot</h4>
								<div className="input_image_box flex">
									<img src={viewImage} />
									<input type="file" class="image_input" required onChange={convertUserIMG} />
								</div>
								<div className="input_text_box_Area flex">
									<input type="number" className="input_box" placeholder="Enter paid amount" required onChange={(e) => setUserNumber(e.target.value)} />
								</div>
								<div className="submitBtnArea flex">
									<button class="" type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>
					:
					<div className='FeesPaymentArea flex'>
						
					</div>
			}
		</>

	)
}

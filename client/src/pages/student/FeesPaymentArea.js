import "./FeesPaymentArea.css";
import formData from "form-data";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultAccountImg from "../../assets/accont.png";

export default function FeesPaymentArea() {
	const [feesPaymentDetails, setFeesPaymentDetails] = useState();
	const [file, setFile] = useState("");
	const [amount, setAmount] = useState();
	const [viewImage, setViewImage] = useState(defaultAccountImg);


	useEffect(() => {
		getStudentFeesPaymentDetails();
	}, []);

	const getStudentFeesPaymentDetails = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			const formData = new FormData();
			formData.append("token", token);
			const result = await axios.post("https://student-management-backend-lkly.onrender.com/getStudentFeesPaymentDetails", formData,);
			setFeesPaymentDetails(result.data);
		}
	}

	console.log(feesPaymentDetails);
	const convertUserIMG = (e) => {
		setFile(e.target.files[0]);
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setViewImage(fileReader.result);
		};
	};

	const submitImage = async (e) => {
		e.preventDefault();
		const token = Cookies.get("auth_token");
		const formData = new FormData();
		formData.append("token", token);
		formData.append("amount", amount);
		formData.append("file", file);

		const result = await axios.post("https://student-management-backend-lkly.onrender.com/uploadFiles", formData);
		setFile();
		setAmount();
		if (result.data.status == true) {
			setViewImage(defaultAccountImg);
			alert("Uploaded Successfully!!!");
		}
	};

	return (
		<div className="FeesPaymentArea flex">
			{
				feesPaymentDetails
					?
					<>
						<div className="leftArea">
							<h3>
								<span>Your Admission Fees :</span>
								<span className="DetailsText">{feesPaymentDetails.admissionFees}</span>
							</h3>
							<h3>
								<span>Your Monthly Fees :</span>
								<span className="DetailsText">{feesPaymentDetails.monthlyFees}</span>
							</h3>
							<h3>
								<span>Your Due Fees :</span>
								<span className="DetailsText">{feesPaymentDetails.dueFees}</span>
							</h3>
						</div>
					</>
					:
					<></>
			}
			<div className="rightArea">
				<form className="flex" onSubmit={submitImage}>
					<h4>Upload Payment Screenshot</h4>
					<div className="input_image_box flex">
						<img src={viewImage} />
						<input
							type="file"
							class="image_input"
							required
							onChange={convertUserIMG}
						/>
					</div>
					<div className="input_text_box_Area flex">
						<input
							type="number"
							className="input_box"
							placeholder="Enter paid amount"
							required
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div className="submitBtnArea flex">
						<button class="" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}


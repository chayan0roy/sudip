import './Batch.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Card from '../../../componenet/Card';


export default function Batch() {

    const [selectBatchID, setSelectBatchID] = useState();
    const [isBatchID, setIsBatchID] = useState();

    useEffect(() => {
        GetBatchId();
    }, []);

    const GetBatchId = async () => {
        const token = Cookies.get("auth_token");
        if (token) {
            const formData = new FormData();
            formData.append("token", token);
            const result = await axios.post("https://student-management-backend-lkly.onrender.com/getBatchId", formData,);
            if (result.data.status == true) {
                setIsBatchID(result.data.batchList);
                setSelectBatchID(result.data.batchList[0].id)
            }
        }
    }


    return (
        <div className='Batch'>
            <div className='BatchTop'>
                {
                    isBatchID ?
                        <>
                            <div className="input_text_box_Area flex">
                                <select className='input_box' onChange={(c) => setSelectBatchID(c.target.value)}>
                                    {
                                        isBatchID.map((c) => {
                                            return (
                                                <option value={c.id}>{c.id}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </>
                        :
                        <></>
                }
            </div>
            <div className='BatchBotom flex1'>
                {
                    isBatchID
                        ?
                        <>
                            <Card heading={"Create New Batch"} link={"/CreateBatchPage"} />
                            <Card heading={"Show Student Details"} link={`/ShowStudentDetails/${selectBatchID}`}/>
                            <Card heading={"Create Class Time Table"} link={"/CreateClassTimeTable"} />
                            <Card heading={"Create Study Material"} link={"/CreateStudyMaterial"} />
                            <Card heading={"Create Admit Card"} link={"/CreateAdmitCard"} />
                            <Card heading={"Create Certificate"} link={"/CreateCertificate"} />
                            <Card heading={"Create Exam Result"} link={"/CreateExamResult"} />
                            <Card heading={"Create Exam Time Table"} link={"/CreateExamTimeTable"} />
                            <Card heading={"Create Notice"} link={"/CreateNotice"} />
                            <Card heading={"Comments"} link={"/Comments"}/>
                            <Card heading={"Show Fees Payment History List"} link={"/ShowFeesPaymentHistoryList"} />
                        </>
                        :
                        <>
                            <Card heading={"Create New Batch"} link={"/CreateBatchPage"} />
                        </>
                }
            </div>
        </div>
    )
}
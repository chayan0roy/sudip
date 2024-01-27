import './PageRight.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Comments from '../../pages/batch/Comments';
// Student
import StudentAccountDetailsArea from '../../pages/student/StudentAccountDetailsArea';
import Institute from '../../pages/batch/student/Institute';
import FeesPaymentArea from '../../pages/student/FeesPaymentArea';
import ShowAdmitCard from '../../pages/batch/student/ShowAdmitCard';
import ShowCertificate from '../../pages/batch/student/ShowCertificate';
import ShowClassTimeTable from '../../pages/batch/student/ShowClassTimeTable';
import ShowExamResult from '../../pages/batch/student/ShowExamResult';
import ShowExamTimeTable from '../../pages/batch/student/ShowExamTimeTable';
import ShowFeesPaymentHistory from '../../pages/batch/student/ShowFeesPaymentHistory';
import ShowFeesPaymentStructure from '../../pages/batch/student/ShowFeesPaymentStructure';
import ShowNotice from '../../pages/batch/student/ShowNotice';
import ShowStudyMaterial from '../../pages/batch/student/ShowStudyMaterial';

// Teacher
import TeacherAccountDetailsArea from '../../pages/teacher/TeacherAccountDetailsArea';
import Batch from '../../pages/batch/teacher/Batch';
import ShowStudentDetails from '../../pages/batch/teacher/ShowStudentDetails';
import CreateAdmitCard from '../../pages/batch/teacher/CreateAdmitCard';
import CreateBatchPage from '../../pages/batch/teacher/CreateBatchPage';
import CreateCertificate from '../../pages/batch/teacher/CreateCertificate';
import CreateClassTimeTable from '../../pages/batch/teacher/CreateClassTimeTable';
import CreateExamResult from '../../pages/batch/teacher/CreateExamResult';
import CreateExamTimeTable from '../../pages/batch/teacher/CreateExamTimeTable';
import CreateNotice from '../../pages/batch/teacher/CreateNotice';
import CreateStudyMaterial from '../../pages/batch/teacher/CreateStudyMaterial';
import ShowFeesPaymentHistoryList from '../../pages/batch/teacher/ShowFeesPaymentHistoryList';



export default function PageRight({ who, setIsLogin }) {

	return (
		<div className='dashboardRight'>
			{
				who == "student" ?
					<Routes>
						<Route path='/' element={<StudentAccountDetailsArea who={who} setIsLogin={setIsLogin}/>} />
						<Route path='/Institute' element={<Institute />} />
						<Route path='/FeesPaymentArea' element={<FeesPaymentArea />} />
						<Route path='/ShowAdmitCard' element={<ShowAdmitCard />} />
						<Route path='/ShowCertificate' element={<ShowCertificate />} />
						<Route path='/ShowClassTimeTable' element={<ShowClassTimeTable />} />
						<Route path='/ShowExamResult' element={<ShowExamResult />} />
						<Route path='/ShowExamTimeTable' element={<ShowExamTimeTable />} />
						<Route path='/ShowFeesPaymentHistory' element={<ShowFeesPaymentHistory />} />
						<Route path='/ShowFeesPaymentStructure' element={<ShowFeesPaymentStructure />} />
						<Route path='/ShowNotice' element={<ShowNotice />} />
						<Route path='/ShowStudyMaterial' element={<ShowStudyMaterial />} />
						<Route path='/Comments' element={<Comments who={who} />} />
					</Routes>
					:
					<Routes>
						<Route path='/' element={<TeacherAccountDetailsArea who={who} setIsLogin={setIsLogin} />} />
						<Route path='/Batch' element={<Batch />} />
						<Route path='/ShowStudentDetails/:selectBatchID' element={<ShowStudentDetails />} />
						<Route path='/CreateAdmitCard' element={<CreateAdmitCard />} />
						<Route path='/CreateBatchPage' element={<CreateBatchPage />} />
						<Route path='/CreateCertificate' element={<CreateCertificate />} />
						<Route path='/CreateClassTimeTable' element={<CreateClassTimeTable />} />
						<Route path='/CreateExamResult' element={<CreateExamResult />} />
						<Route path='/CreateExamTimeTable' element={<CreateExamTimeTable />} />
						<Route path='/CreateNotice' element={<CreateNotice />} />
						<Route path='/CreateStudyMaterial' element={<CreateStudyMaterial />} />
						<Route path='/ShowFeesPaymentHistoryList/:studentID' element={<ShowFeesPaymentHistoryList />} />
						<Route path='/Comments' element={<Comments who={who} />} />
					</Routes>
			}
		</div>
	)
}
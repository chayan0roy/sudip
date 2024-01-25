import './Institute.css'
import React, { useState } from 'react'
import Card from '../../../componenet/Card'

export default function Institute() {
    return (
        <div className='Institute flex1'>
            <Card heading={"FeesPaymentArea"} link={"/FeesPaymentArea"} />
            <Card heading={"ShowFeesPaymentStructure"} link={"/ShowFeesPaymentStructure"} />
            <Card heading={"ShowFeesPaymentHistory"} link={"/ShowFeesPaymentHistory"} />
            <Card heading={"ShowStudyMaterial"} link={"/ShowStudyMaterial"} />
            <Card heading={"ShowClassTimeTable"} link={"/ShowClassTimeTable"} />
            <Card heading={"ShowAdmitCard"} link={"/ShowAdmitCard"} />
            <Card heading={"ShowExamTimeTable"} link={"/ShowExamTimeTable"} />
            <Card heading={"ShowExamResult"} link={"/ShowExamResult"} />
            <Card heading={"ShowCertificate"} link={"/ShowCertificate"} />
            <Card heading={"Create Notice"} link={"/CreateNotice"} />
            <Card heading={"Comments"} link={"/Comments"} />
            <Card heading={"ShowNotice"} link={"/ShowNotice"} />
        </div>
    )
}
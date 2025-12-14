
'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import EvaluationformReg from '../../components/EvaluationformReg';
function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
      {
        field: "id",
        headerName: "شناسه rangePackID",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
      {
        field: "tblevaluator.lname",
        headerName: "ارزیابی کننده",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "tblevaluated.Lname",
        headerName: "ارزیابی شونده",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "tblevaluation_baseform.name",
        headerName: "کد فرم",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "managerID",
        headerName: "شناسه مدیریت",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "name",
        headerName: "نام",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
    
      {
        field: "evaluatorSignatureDate",
        headerName: "تاریخ امضاء ارزیابی کننده",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
     
      {
        field: "evaluatedSignatureDate",
        headerName: "تاریخ امضاء ارزیابی شونده",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
     
      {
        field: "createdate",
        headerName: "تاریخ ایجاد",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluation_form`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluationformReg/>}></BaseGrid>
        </div>
    );
}

export default page;
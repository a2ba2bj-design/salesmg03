'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import evalDetailFormLink  from "../../components/evalDetailFormLink.tsx";
import EvaluationbaseformReg from '../../components/EvaluationbaseformReg'

function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
       {
        field: "id",
        headerName: "ایجاد فرم ارزیابی ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 0.8,
        headerClass: "header-center",
       cellRenderer: evalDetailFormLink
      },
       {
        field:  "name",
        headerName: "نام",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
    
      {
        field: "tblevaluation_rang_pack.name",
        headerName: "سیستم ارزشیابی ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
     
     
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluation_baseform`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluationbaseformReg/>}></BaseGrid>
        </div>
    );
}

export default page;
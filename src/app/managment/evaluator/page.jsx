'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import EvaluatorReg from '../../components/EvaluatorReg';
function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
      {
        field: "id",
        headerName: "شناسه",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 0.8,
        headerClass: "header-center"
      },
      {
        field: "mobile",
        headerName: "شماره همراه",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
      {
        field: "lname",
        headerName: "نام خانوادگی",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "fname",
        headerName: "نام",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluator`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluatorReg/>}></BaseGrid>
        </div>
    );
}

export default page;
'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import EvaluationrangReg from '../../components/EvaluationrangReg';
function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
      {
        field: "packID",
        headerName: "شناسه packID",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
      {
        field: "value",
        headerName: "مقدار",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      
      {
        field: "id",
        headerName: "شناسه",
        checkboxSelection: true,
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 0.8,
        headerClass: "header-center"
      },
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluation_rang`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluationrangReg/>}></BaseGrid>
        </div>
    );
}

export default page;
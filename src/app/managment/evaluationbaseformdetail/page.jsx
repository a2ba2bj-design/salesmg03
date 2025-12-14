'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import EvaluationbaseformdetailReg from '../../components/EvaluationbaseformdetailReg';
function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
      {
        field: "evaluation_baseformID",
        headerName: "شناسه evaluation_baseformID ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
      {
        field: "criteriaID",
        headerName: "شناسه criteriaID",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "creatorMemberID",
        headerName: "شناسه creatorMemberID",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "createDate",
        headerName: "شناسه createDate",
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
         axios.get(`${BASE_URL}/tblevaluation_baseform_detail`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluationbaseformdetailReg/>}></BaseGrid>
        </div>
    );
}

export default page;
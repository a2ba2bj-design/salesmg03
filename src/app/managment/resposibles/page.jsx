'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import ResposiblesReg from '../../components/ResposiblesReg'
function page() {
    const [evals,setEvals]=useState([]);
    const [colDefs] = useState([
      {
        field: "mobile",
        headerName: "شماره همراه",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1.2,
        headerClass: "header-center"
      },
      {
        field: "fname",
        headerName: "نام خانوادگی",
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
        field: "id",
        headerName: "شناسه",
      
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 0.8,
        headerClass: "header-center"
      },
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblresponsible`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<ResposiblesReg/>}></BaseGrid>
        </div>
    );
}

export default page;
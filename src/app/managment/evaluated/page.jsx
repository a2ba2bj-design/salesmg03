'use client'
import BaseGrid from  '../../components/BaseGrid'
import axios  from 'axios';
import { BASE_URL } from '../../lib/util';
import { useState,useEffect } from 'react';
import EvaluatedReg from '../../components/EvaluatedReg';
function page() {
    const [evals,setEvals]=useState([]);
    function fullNameGetter(params) {
    return  params.data.tblresponsible.fname + ' ' + params.data.tblresponsible.name;
   
  }//for attaching fname and lname

    const [colDefs] = useState([
        {
        field: "id",
        headerName: "شناسه",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 0.8,
        headerClass: "header-center"
      },
      {
        field: "Lname",
        headerName: " نام خانوادگی ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "name",
        headerName: " نام ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "code",
        headerName: "کد پرسنلی ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "phone",
        headerName: " تلفن",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
       {
        field: "fullname",
        headerName: " موسس  ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center",
        valueGetter: fullNameGetter
      },
      {
        field: "address",
        headerName: " آدرس ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "manageID",
        headerName: " مدیریت ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "vilageID",
        headerName: " روستا ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "cityID",
        headerName: " شهر ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
      {
        field: "provinceID",
        headerName: " استان  ",
        cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flex: 1,
        headerClass: "header-center"
      },
     
      
      
    
    ]);
    useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluated`).then(res=>setEvals(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
        <div>
         <BaseGrid colDefs={colDefs} rowData={evals} popup={<EvaluatedReg/>}></BaseGrid>
        </div>
    );
}

export default page;
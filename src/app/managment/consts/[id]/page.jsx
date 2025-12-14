'use client'
import axios from "axios"
import BaseGrid from  '../../../components/BaseGrid'
import EvaluationrangReg from '../../../components/EvaluationrangReg';
import { useState,useEffect } from "react"
import { BASE_URL } from '../../../lib/util';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useParams } from 'next/navigation';
ModuleRegistry.registerModules([AllCommunityModule]);
function page()  {
    
  const { id } = useParams();
  const [details,setDetails]=useState([]);
  const [colDefs] = useState([
        {
            field: "value",
            headerName: "مقدار ",
            cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            flex: 1.2,
            headerClass: "header-center"
          },
        
        
       
      ]);
   
	  
 useEffect(()=>
    {
         axios.get(`${BASE_URL}/tblevaluation_rang`,{
  params: {
    id: id,
  },
}).then(res=>setDetails(res.data)).catch(err=>console.log(err));
    },[]
    )
    return (
    
   
     <div>
         <BaseGrid colDefs={colDefs} rowData={details} popup={<EvaluationrangReg id={id}/>}></BaseGrid>
        </div>
 
    );
    
}

export default page;
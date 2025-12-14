'use client'
import axios from "axios"
import { useState,useCallback,useEffect } from "react"
import { useRouter } from "next/navigation";
import { BASE_URL } from '../../../lib/util';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams } from 'next/navigation';
import criteriaStatus from '../../../components/criteriaStatus'
ModuleRegistry.registerModules([AllCommunityModule]);
function page()  {
	  const router = useRouter()
	const formData = new FormData()
  const { id } = useParams();
  const [details,setDetails]=useState([]);
  const [gridApi, setGridApi] = useState(null);
  const defaultColDef = {
		 
		  flex: 1,
		  minWidth: 100,
		  filter: true,
		 editable:false
		  };
	  const gridOption = {
		// all rows assigned CSS class 'my-green-class'
	  rowClass: 'my-green-class',
		  rowSelection: { 
			mode: 'multiRow' 
		},
	
		// all even rows assigned 'my-shaded-effect'
		getRowClass: params => {
			if (params.node.rowIndex % 2 === 0) {
				return 'my-shaded-effect';
			}
		},
	
	
		// other grid options ...
	}    
    const [colDefs] = useState([
		{
			field: "catName",
			headerName: "گروه معیار ",
			cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
			flex: 1.2,
			headerClass: "header-center"
		  },
		 {
		  field:  "criteriaName",
		  headerName: "نام",
		  cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
		  flex: 1,
		  headerClass: "header-center"
		},
	  
		{
		  field: "factor",
		  headerName: "ضریب اثر ",
		  cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
		  flex: 1.2,
		  headerClass: "header-center"
		},
		{
			field: "criteriaExist",
			headerName: "وضعیت ",
			cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
			flex: 1.2,
			headerClass: "header-center",
			  cellRenderer: criteriaStatus
		  },
	   
	  ]);
	const onGridReady = useCallback((params) => {
		setGridApi(params.api);
	  
	  }, []);
const onReg=()=>{
   let selectedData = gridApi.getSelectedRows();
   formData.append("masterid",id)
  selectedData.map((item)=>formData.append('id',item.id))
  console.log(formData.getAll('id'))
   console.log(formData.getAll('masterid'))
  axios.post(`${BASE_URL}/viwCriteriaBaseForm`, formData ).then(res=>window.alert(res.status==201?"با موفقیت ثبت شد":"دوباره تلاش کنید")).catch(err=>console.log(err));
}	  
 useEffect(()=>
    {
         axios.get(`${BASE_URL}/viwCriteriaBaseForm`,{
  params: {
    id: id,
  },
}).then(res=>setDetails(res.data)).catch(err=>console.log(err));
    },[]
    )
	return (
	
   
     <div className="bg-white p-4 rounded-lg shadow-md">
		     <div className="flex justify-between mb-2">
          {/* دکمه‌های سمت راست */}
          <div className="flex gap-2">
            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={onReg}
            >
              <img src="/tick.png" alt="add" className="w-4 h-4" />
             ثبت
            </button>

           

           
          </div>

          {/* دکمه بازگشت سمت چپ */}
          <button
            dir="ltr"
            className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-red-700 text-red-700 bg-amber-50 hover:bg-red-300"
            onClick={() =>   router.back()}
          >
            <img src="/flash.png" alt="delete" className="w-4 h-4" />
            بازگشت
          </button>
        </div>

		   {/* جدول */}
		   <div className="ag-theme-alpine" style={{ height: 400 }}>
			 <AgGridReact
			   rowData={details}
			   columnDefs={colDefs}
			   defaultColDef={defaultColDef}
			   enableRtl={true}
			   gridOptions={gridOption}
			 
			   onGridReady={onGridReady}
			 />
		   </div>
		 </div>
     
 
	);
	
}

export default page;
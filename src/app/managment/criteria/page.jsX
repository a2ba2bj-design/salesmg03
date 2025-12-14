'use client'
import React, { useState ,useEffect,useCallback} from 'react';
import axios from 'axios';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { BASE_URL } from '../../lib/util';
import { useRouter  } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select'
ModuleRegistry.registerModules([AllCommunityModule]);

function Page() {
  // کنت
  // رل باز شدن فرم
const [showForm, setShowForm] = useState(false);
const formData = new FormData()
   const router = useRouter()
// state های فرم
const [criterias, setCriterias] = useState([])
const [reflaws, setReflaw] = useState([])
const [cats, setCats] = useState([])
const [catID, setCatID] = useState('')
const [reflawID, setreflawID] = useState('')
const [criteriaName, setCriteriaName] = useState('')
const [factor, setFactor] = useState('')
 const [gridApi, setGridApi] = useState(null);

 const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  
  }, []);
async function handleSubmit(){
    formData.append("catID",catID)
    formData.append("lawRefID",reflawID)
    formData.append("criteriaName",criteriaName)
      formData.append("factor",factor)
    axios.post(`${BASE_URL}/criteria`,formData).then(res=>{window.alert(res.status==201?"معیار شما اضافه شد":"دوباره تلاش کنید"); setShowForm(false)}).catch(err=>(window.alert(err)))

  }
  
  // داده‌های گرید
   useEffect(() => {
      axios.get(`${BASE_URL}/criteria`).then(res=>setCriterias(res.data)).catch(err=>console.log(err));
       axios.get(`${BASE_URL}/cat`).then(res=>setCats(res.data)).catch(err=>console.log(err));
    axios.get(`${BASE_URL}/tbllawref`).then(res=>setReflaw(res.data)).catch(err=>console.log(err));
  
    }, []);

  const [colDefs] = useState([
    { field: "id", headerName: "ردیف",  cellClass: 'ag-header-cell-label'  },
    { field: "criteriaName", headerName: "نام", cellClass: 'ag-header-cell-label' },
    { field: "tbllawref.refName", headerName: "الزام قانونی", cellClass: 'ag-header-cell-label'  },
    { field: "tblcat.catName", headerName: "طبقه بندی",  headerClass: 'ag-header-cell-label', cellClass: 'ag-header-cell-label' },
    { field: "factor", headerName: "ضریب اثر", cellClass: 'ag-header-cell-label' ,cellClassRules: {
            
            'rag-red-outer': params => params.value > 3,
        } }
  ]);
const onRemoveSelected=()=>{
   let selectedData = gridApi.getSelectedRows();
  // formData.append("id",JSON.stringify(selectedData))
  selectedData.map((item)=>formData.append('id',item.id))
//   selectedData.map((item)=>{formData.append("id",item.id)   })
  axios.delete(`${BASE_URL}/criteria`,{ data: formData }).then().catch(err=>console.log(err));
}
  const defaultColDef = {
     
      flex: 1,
      minWidth: 100,
      filter: true,
     editable:false
      };
  const gridOptions = {
    // all rows assigned CSS class 'my-green-class'
   // rowClass: 'my-green-class',
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
 
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* گرید */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-2">
          {/* دکمه‌های سمت راست */}
          <div className="flex gap-2">
            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={()=> setShowForm(true)}
            >
              <img src="/plus.png" alt="add" className="w-4 h-4" />
              ایجاد
            </button>

            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={()=>setShowForm(true)}
            >
              <img src="/edit.png" alt="edit" className="w-4 h-4" />
              ویرایش
            </button>

            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={onRemoveSelected}
            >
              <img src="/delete.png" alt="delete" className="w-4 h-4" />
              حذف
            </button>
          </div>

          {/* دکمه بازگشت سمت چپ */}
          <button
            dir="ltr"
            className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-red-700 text-red-700 bg-amber-50 hover:bg-red-300"
            onClick={() =>   router.push('/')}
          >
            <img src="/flash.png" alt="delete" className="w-4 h-4" />
            بازگشت
          </button>
        </div>

        <div  style={{ height: 400 }}>
         
          <AgGridReact
            rowData={criterias}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            enableRtl={true}
            gridOptions={gridOptions}   
            onGridReady={onGridReady}
         //  onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>

      {/* Modal فرم */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
              معیار ها
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="نام"
                 value={criteriaName}
                onChange={(e) => setCriteriaName( e.target.value )}
                className="w-full h-12 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4 mb-6"
              />

              {/* الزام قانونی */}
               <div className="relative mb-6">
        <Select 
          name="reflaw"
          value={reflawID}
          onValueChange={setreflawID}
          dir='rtl'
          
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            { reflaws.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.refName}</SelectItem>
)}
          </SelectContent>
        </Select>
              </div>

              {/* طبقه بندی */}
              <div className="relative mb-6">
                 <Select 
          name="cat"
          value={catID}
          onValueChange={setCatID}
          dir='rtl'
          
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            { cats.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.catName}</SelectItem>
)}
          </SelectContent>
        </Select>
              </div>

              <input
                type="text"
                maxLength={10}
                placeholder="ضریب اثر"
                pattern="\d{1,10}"
                   value={factor}
                onChange={(e) => setFactor( e.target.value )}
                className="w-full h-12 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4 mb-6"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 rounded-full h-10 hover:bg-emerald-400 text-white font-bold"
                >
                  ثبت 
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-400 rounded-full h-10 text-white font-bold"
                  onClick={() => setShowForm(false)}
                >
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
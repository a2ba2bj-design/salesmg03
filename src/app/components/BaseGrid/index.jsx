'use client'
import axios from "axios";
import { BASE_URL } from '../../lib/util';
import React, { useState,useCallback } from 'react';
import { useRouter  } from "next/navigation";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const BaseGrid=({ colDefs, rowData,popup }) =>{
  const formData = new FormData()
  // کنترل باز شدن فرم
  const [showForm, setShowForm] = useState(false);
   const [gridApi, setGridApi] = useState(null);
  // تعریف ستون‌ها (از چپ به راست)
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
   const router = useRouter()
   // تابع باز کردن فرم
  const handleAdd = () => setShowForm(true);
const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  
  }, []);
  // تابع ویرایش
  const updateItems = () => {
    alert("اینجا می‌تونی لاجیک ویرایش رو بنویسی");
  };

  // تابع حذف
  const onRemoveSelected = () => {
  let selectedData = gridApi.getSelectedRows();
  selectedData.map((item)=>formData.append('id',item.id))
  //console.log(popup.type.name)
  axios.delete(`${BASE_URL}/${popup.type.name}`,{ data: formData }).then(router.forward()).catch(err=>console.log(err));
  
  };
/*    <main>
     { React.cloneElement(popup,{setShowForm:handleDataFromChild})}
    </main> */
  return ( 
    <div className="bg-gray-100 min-h-screen p-6">

      {/* گرید */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        
        {/* دکمه‌ها */}
        <div className="flex justify-between mb-2">
          {/* دکمه‌های سمت راست */}
          <div className="flex gap-2">
            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={handleAdd}
            >
              <img src="/plus.png" alt="add" className="w-4 h-4" />
              ایجاد
            </button>

            <button
              dir="ltr"
              className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
              onClick={updateItems}
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
            onClick={() =>   router.push("/")}
          >
            <img src="/flash.png" alt="delete" className="w-4 h-4" />
            بازگشت
          </button>
        </div>

        {/* جدول */}
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            enableRtl={true}
            gridOptions={gridOption}
          
            onGridReady={onGridReady}
          />
        </div>
      </div>

      {/* Modal فرم */}
      {showForm && (
        
            <form >
             <>{popup }</>

             
            </form>
        
      )}
    </div>
  );
}

export default BaseGrid;
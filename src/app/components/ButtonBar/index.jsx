'use client'
import React, { useState } from 'react';
import { useRouter  } from "next/navigation";
import { AllCommunityModule, ModuleRegistry,gridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const ButtonBar=({ colDefs, rowData,gridOptionsIn,popup }) =>{
  // کنترل باز شدن فرم
  const [showForm, setShowForm] = useState(false);
   function handleDataFromChild(data) {
    setShowForm(data);
  }
  // تعریف ستون‌ها (از چپ به راست)
  const defaultColDef = { flex: 1 };
   const router = useRouter()
   // تابع باز کردن فرم
  const handleAdd = () => setShowForm(true);

  // تابع ویرایش
  const updateItems = () => {
    alert("اینجا می‌تونی لاجیک ویرایش رو بنویسی");
  };

  // تابع حذف
  const onRemoveSelected = () => {
    alert("اینجا می‌تونی لاجیک حذف رو بنویسی");
  };

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
            onClick={() =>   router.push('/')}
          >
            <img src="/flash.png" alt="delete" className="w-4 h-4" />
            بازگشت
          </button>
        </div>

      
      </div>

    
    </div>
  );
}

export default ButtonBar;
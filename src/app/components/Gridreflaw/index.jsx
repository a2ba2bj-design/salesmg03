"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowApiModule,
  RowSelectionModule,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelApiModule,
  RowSelectionModule,
  RowApiModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

let newCount = 1;

function printResult(res) {
  console.log("---------------------------------------");
  if (res.add) res.add.forEach((rowNode) => console.log("Added Row Node", rowNode));
  if (res.remove) res.remove.forEach((rowNode) => console.log("Removed Row Node", rowNode));
  if (res.update) res.update.forEach((rowNode) => console.log("Updated Row Node", rowNode));
}

const Gridreflaw = ({ columnDefs, rowData,activeTab }) => {
  const gridRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ col1: "", col2: "" }); // state فرم
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => ({ flex: 1 }), []);
  const rowSelection = useMemo(() => ({ mode: "multiRow" }), []);
  const catformData = new FormData()
/*  const enumformData = new FormData()
  const reflawformData = new FormData()
  const packformData = new FormData()*/
async function addCat(){
    catformData.append("catName",formData.col1)
    axios.post(`${BASE_URL}/cat`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید"); setShowPopup(false)}).catch(err=>(window.alert(err)))

  }
  async function addEnum(){
   catformData.append("groupname",formData.col2)
    catformData.append("name",formData.col1)
    axios.post(`${BASE_URL}/enum`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید"); setShowPopup(false)}).catch(err=>(window.alert(err)))
  }
  async function addreflaw(){
   catformData.append("name",formData.col1)
    axios.post(`${BASE_URL}/tbllawref`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید"); setShowPopup(false)}).catch(err=>(window.alert(err)))
  }
  async function addrangepack(){
      catformData.append("name",formData.col1)
    catformData.append("packType",formData.col2)
  
    axios.post(`${BASE_URL}/tblevaluation_rang_pack`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید"); setShowPopup(false)}).catch(err=>(window.alert(err)))
  }
  const addFromForm = useCallback(() => {
    const newItem = {
      id: newCount++,
      col1: formData.col1,
      col2: formData.col2,
    };
    const res = gridRef.current.api.applyTransaction({ add: [newItem] });
    printResult(res);
    setShowPopup(false);
    setFormData({ col1: "", col2: "" });
  }, [formData]);

  const updateItems = useCallback(() => {
    const itemsToUpdate = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      if (index >= 2) return;
      const data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    printResult(res);
  }, []);

  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({ remove: selectedData });
    printResult(res);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "4px" }} className="flex flex-row">
          <button
            dir="ltr"
            className="flex items-center gap-2 box-border border-2 p-2 rounded-2xl border-b-emerald-700 text-emerald-700 bg-amber-50 hover:bg-green-300"
            onClick={() => setShowPopup(true)}
          >
            <img src="/plus.png" alt="add" dir="rtl" className="w-4 h-4" />
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

        <div style={{ flexGrow: "1" }}>
          <div style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              enableRtl={true}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelection}
            />
          </div>
        </div>

        {/*enum پاپ‌آپ */}
        {showPopup && activeTab==='enum' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h5 className="text-green-500 text-xl font-semibold mb-8">
             تعریف ثابت ها
            </h5>
              <input
                type="text"
                placeholder="نام"
                value={formData.col1}
                onChange={(e) => setFormData({ ...formData, col1: e.target.value })}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input
                type="text"
                placeholder=" نام گروه"
                value={formData.col2}
                onChange={(e) => setFormData({ ...formData, col2: e.target.value })}
                className="w-full h-12 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEnum}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowPopup(false)}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
         {/*cat پاپ‌آپ */}
        {showPopup && activeTab==='cat' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h3 className="text-green-500 text-xl font-semibold mb-8">
             تعریف طبقه معیار
            </h3>
              <input
                type="text"
                placeholder="نام گروه"
                value={formData.col1}
                onChange={(e) => setFormData({col1:e.target.value,col2:''})}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addCat}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() =>{ setShowPopup(false)}}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
{/*reflaw پاپ‌آپ */}
        {showPopup && activeTab==='reflaw' && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
           <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
             <h3 className="text-green-500 text-xl font-semibold mb-8">
             افزودن مرجع قانونی معیار
             </h3>
              <input
                type="text"
                placeholder="نام مرحع قانونی "
                value={formData.col1}
                onChange={(e) => setFormData({col1:e.target.value,col2:''})}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addreflaw}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() =>{ setShowPopup(false)}}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
         {/*rangepack پاپ‌آپ */}
        {showPopup && activeTab==='rangepack' && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
           <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
             <h3 className="text-green-500 text-xl font-semibold mb-8">
              تعریف سیستم های ارزشیابی
             </h3>
              <input
                type="text"
                placeholder="نام"
                value={formData.col1}
                onChange={(e) => setFormData({ ...formData, col1: e.target.value })}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input
                type="text"
                placeholder="نوع سیستم"
                value={formData.col2}
                 onChange={(e) => setFormData({ ...formData, col2: e.target.value })}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addrangepack}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() =>{ setShowPopup(false)}}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gridreflaw;
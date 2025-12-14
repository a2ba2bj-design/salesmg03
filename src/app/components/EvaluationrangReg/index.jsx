"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo,  useState} from "react";

const tblevaluation_rang = ({id}) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  //const [packID,setPackID]=useState(id)
 console.log(id)
  const [value,setValue]=useState("")
   const catformData = new FormData()
  async function addEvaluationrang(){
      catformData.append("packID",id)
      catformData.append("value",value)
      
    axios.post(`${BASE_URL}/tblevaluation_rang`,catformData).then(res=>{window.alert(res.status==201?"آیتم شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
       
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
              ایجاد  
            </h2>
              
              
                <input
                type="text"
                placeholder="مقدار"
                value={value}
                onChange={(e) =>  setValue( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                             
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEvaluationrang}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={()=>{}}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
     
      </div>
      </div>
  );
};

export default tblevaluation_rang;
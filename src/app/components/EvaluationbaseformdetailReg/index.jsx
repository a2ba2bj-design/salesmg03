"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo,  useState} from "react";

 
const EvaluationbaseformdetailReg = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [evaluation_baseformID,setEvaluation_baseformID]=useState('')
  const [criteriaID,setCriteriaID]=useState("")
  const [creatorMemberID,setCreatorMemberID]=useState("")
  const [createDate,setCreateDate]=useState("")
  const catformData = new FormData()
  async function addEvaluationbaseformdetail  (){
  catformData.append("evaluation_baseformID",evaluation_baseformID)
  catformData.append("criteriaID",criteriaID)
  catformData.append("creatorMemberID",creatorMemberID)
  catformData.append("createDate",createDate)
  axios.post(`${BASE_URL}/tblevaluation_baseform_detail`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
       
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
              ارزیابی
            </h2>
             
                <input
                type="text"
                placeholder="ارزیاب evaluation_baseformID"
                value={evaluation_baseformID}
                onChange={(e) => setEvaluation_baseformID( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
                <input
                type="text"
                placeholder="شناسه criteriaID"
                value={criteriaID}
                onChange={(e) =>  setCriteriaID( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                <input
                type="text"
                placeholder="شناسه creatorMemberID"
                value={creatorMemberID}
                onChange={(e) =>  setCreatorMemberID( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input
                type="text"
                placeholder="تاریخ ایجاد"
                value={createDate}
                onChange={(e) =>  setCreateDate( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                                       
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEvaluationbaseformdetail}
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

export default EvaluationbaseformdetailReg;
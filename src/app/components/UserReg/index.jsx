"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo,  useState} from "react";

 
const UserReg = () => {

  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [fName,setFname]=useState('')
  const [lName,setlName]=useState("")
   const [phone,setPhone]=useState("")
   const [address,serAddress]=useState("")
   const [birthDate,setBirthDate]=useState("")
  // const [createdAt,setCreatedAt]=useState("")
   //const [isActive,setIsActive]=useState("")
  const catformData = new FormData()
  async function addUser(){
  catformData.append("fName",fName)
  catformData.append("lName",lName)
  catformData.append("phone",phone)
  catformData.append("address",address)
  catformData.append("birthDate",birthDate)
  //catformData.append("createdAt",createdAt)
  //catformData.append("isActive",isActive)
  axios.post(`${BASE_URL}/tbluser`,catformData).then(res=>{window.alert(res.status==201?"آیتم شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
       
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
                 کاربران
            </h2>
             
                <input
                type="text"
                placeholder="نام"
                value={fName}
                onChange={(e) => setFname( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
                <input
                type="text"
                placeholder="نام خانوادگی"
                value={lName}
                onChange={(e) =>  setlName( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                <input
                type="text"
                placeholder="شماره همراه"
                value={phone}
                onChange={(e) =>  setPhone( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input 
                 type="text"
                 placeholder="آدرس"
                 value={address}
                 onChange={(e)=> serAddress(e.target.value)}
                  className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input
                type="text"
                placeholder="تولد"
                value={birthDate}
                onChange={(e) =>  setBirthDate( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
                                                     
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addUser}
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

export default ManagerReg;
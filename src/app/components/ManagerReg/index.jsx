"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo,  useState} from "react";

 
const ManagerReg = () => {
// const [showForm, setShowForm] = useState(true);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [name,setName]=useState('')
  const [lname,setLname]=useState("")
   const [mobile,setMobile]=useState("")
   const [nationalCode,setNationalCode]=useState("")
  const catformData = new FormData()
  async function addManager(){
  catformData.append("name",name)
  catformData.append("lname",lname)
  catformData.append("mobile",mobile)
  catformData.append("nationalCode",nationalCode)
  axios.post(`${BASE_URL}/tblmanager`,catformData).then(res=>{window.alert(res.status==201?"آیتم شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
       
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
              مدیریت موسسه
            </h2>
             
                <input
                type="text"
                placeholder="نام"
                value={name}
                onChange={(e) => setName( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
                <input
                type="text"
                placeholder="نام خانوادگی"
                value={lname}
                onChange={(e) =>  setLname( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                <input
                type="text"
                placeholder="شماره همراه"
                value={mobile}
                onChange={(e) =>  setMobile( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              <input 
                 type="text"
                 placeholder="کدملی"
                 value={nationalCode}
                 onChange={(e)=> setNationalCode(e.target.value)}
                  className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                                       
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addManager}
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
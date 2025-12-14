"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo, useEffect, useState} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
const EvaluationformReg = () => {
// const [showForm, setShowForm] = useState(true);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  //const [rangePackID,setRangePackID]=useState('')
  const [evaluatorID,setEvaluatorID]=useState("")
  const [evaluators , setEvaluators]=useState([])
   const [evaluatedID,setEvaluatedID]=useState("")
   const [evaluateds , setEvaluateds]=useState([])
  const [baseFormID,setBaseFormID]=useState("")
  const [baseForms ,setBaseForms]=useState([])
  const [name,setName]=useState("")
 
  const catformData = new FormData()
  useEffect(() => {
      axios.get(`${BASE_URL}/tblevaluated`).then(res=>setEvaluateds(res.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/tblevaluator`).then(res=>setEvaluators(res.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/tblevaluation_baseform`).then(res=>setBaseForms(res.data)).catch(err=>console.log(err));
  
     
      }, []);
  async function addEvaluationform(){
   const person = evaluateds.find(item => item.id == evaluatedID);
const managerID = person.manageID

      catformData.append("managerID",managerID)
      catformData.append("evaluatorID",evaluatorID)
      catformData.append("evaluatedID",evaluatedID)
      catformData.append("baseFormID",baseFormID)
      catformData.append("name",name)
     
     
      axios.post(`${BASE_URL}/tblevaluation_form`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
     
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
             فرم ارزیابی
            </h2>
            <div className="relative mb-6 text-black">
                      <input
                type="text"
                placeholder="نام"
                value={name}
                onChange={(e) => setName( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
                     </div>
                             
               <div className="relative mb-6 text-black">
                    <Select 
                         name="evaluator"
                         value={evaluatorID}
                         onValueChange={setEvaluatorID}
                         dir='rtl'
                                                  
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="ارزیابی کننده" />
                         </SelectTrigger>
                         <SelectContent>
                           { evaluators.map((item)=>
                           <SelectItem  key={item.id} value={String(item.id)}> {item.lname}</SelectItem>
               )}
                         </SelectContent>
                       
                     </Select>
                     </div>
                     <div className="relative mb-6 text-black">
                    <Select 
                         name="evaluated"
                         value={evaluatedID}
                         onValueChange={setEvaluatedID}
                         dir='rtl'
                                                  
                       >
                         <SelectTrigger>
                           <SelectValue placeholder=" ارزیابی شونده" />
                         </SelectTrigger>
                         <SelectContent>
                           { evaluateds.map((item)=>
                           <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
               )}
                         </SelectContent>
                       
                     </Select>
                     </div>

                      <div className="relative mb-6 text-black">
                    <Select 
                         name="evaluation_baseform"
                         value={baseFormID}
                         onValueChange={setBaseFormID}
                         dir='rtl'
                                                  
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="فرم اصلی" />
                         </SelectTrigger>
                         <SelectContent>
                           { baseForms.map((item)=>
                           <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
               )}
                         </SelectContent>
                       
                     </Select>
                     </div>
                     
                
           <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEvaluationform}
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

export default EvaluationformReg;
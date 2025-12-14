"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {useEffect,  useMemo,  useState} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select'
const EvaluationbaseformReg  = () => {
// const [showForm, setShowForm] = useState(true);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [name,setName]=useState('')
  const [rangePackID ,setrangePackID ]=useState("")
  const [rangePacks, setRangepacks] = useState([])
  const catformData = new FormData()
  async function addEvaluationbaseform  (){
    catformData.append("name",name)
    catformData.append("rangePackID",rangePackID)
   
    axios.post(`${BASE_URL}/tblevaluation_baseform`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
  }
 useEffect(() => {
      axios.get(`${BASE_URL}/tblevaluation_rang_pack`).then(res=>setRangepacks(res.data)).catch(err=>console.log(err));
    
    }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
       
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-xl font-semibold mb-8">
              ایجاد فرم ارزیابی پایه
            </h2>
                <input
                type="text"
                placeholder="نام"
                value={name}
                onChange={(e) => setName( e.target.value )}
                className="w-full h-12 mb-3 text-gray-600 shadow-md rounded-full border border-gray-200 pr-4"
              />
              
                     <div className="relative mb-6">
        <Select 
          name="reflaw"
          value={rangePackID}
          onValueChange={setrangePackID}
          dir='rtl'
          
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            { rangePacks.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        </Select>
              </div>
                                
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEvaluationbaseform}
                >
                  ذخیره
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={()=>{} }
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

export default EvaluationbaseformReg;
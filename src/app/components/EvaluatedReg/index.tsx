"use client"
import axios from "axios";
import { BASE_URL } from "../../lib/util";
import React, {  useMemo,  useState , useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
const EvaluatedReg :  React.FC = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [name,setName]=useState('')
  const[lname , setLname] = useState('')
  const [code ,setCode ]=useState("")
  const [signatureSrc, setSignatureSrc] =  useState<File | null>(null)
  const [responsibles ,setResponsibles ]=useState([])
   const [enum1 ,setEnum1 ]=useState([])
  const [responsibleID ,setResponsibleID ]=useState("")
  const [provinceID ,setProvinceID ]=useState("")
   const [provinces ,setProvinces ]=useState([])
  const [cityID ,setCityID]=useState("")
  const [citys ,setCitys]=useState([])
  const [vilageID ,setVilageID ]=useState("")
  const [vilages ,setVilages ]=useState([])
  const [manageID ,setManageID ]=useState("")
   const [manages ,setManages ]=useState([])
  const [address ,setAddress ]=useState("")
  const [phone ,setPhone]=useState("")
 
  
  const catformData = new FormData()
    useEffect(() => {
      axios.get(`${BASE_URL}/tblresponsible`).then(res=>setResponsibles(res.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/enum`,{params: {groupname: 'city', },})
      .then(city=>setCitys(city.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/enum`,{params:{groupname:'vilage',},})
      .then(vilage =>setVilages(vilage.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/enum`,{params:{groupname:'province',},})
      .then(province =>setProvinces(province.data)).catch(err=>console.log(err));
      axios.get(`${BASE_URL}/tblmanager`).then(manage=>setManages(manage.data)).catch(err=>console.log(err));
    }, []);

  async function addEvaluated  (){
          catformData.append("name",name)
          catformData.append("lname",lname)
          catformData.append("code",code)
          catformData.append("responsibleID",responsibleID)
          catformData.append("provinceID",provinceID)
          catformData.append("cityID",cityID)
          catformData.append("vilageID",vilageID)
          catformData.append("manageID",manageID)
          catformData.append("address",address)
          catformData.append("phone",phone)
          catformData.append("signature",signatureSrc)
          axios.post(`${BASE_URL}/tblevaluated`,catformData).then(res=>{window.alert(res.status==201?"گروه شما اضافه شد":"دوباره تلاش کنید")}).catch(err=>(window.alert(err)))
          
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
         {/*rangepack پاپ‌آپ */}
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white pt-2 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-green-500 text-3xl font-semibold mb-8">
              ایجاد ارزیابی شونده
            </h2>
            
                <input 
                type="text"
                placeholder="نام"
                value={name}
                onChange={(e) => setName( e.target.value )}
                className="w-full h-12 mb-3 text-black shadow-md rounded-full border border-b-black pr-4"
              />
                <input
                type="text"
                placeholder="نام خانوادگی"
                value={lname}
                onChange={(e) => setLname(e.target.value) }
                className="w-full h-12 mb-3 text-black shadow-md rounded-full border border-black pr-4"
              />
                <input
                type="text"
                placeholder="شماره پرسنلی"
                value={code}
                onChange={(e) =>  setCode( e.target.value )}
                className="w-full h-12 mb-3 text-black shadow-md rounded-full border border-black pr-4"
              />
              <div className="relative mb-6 text-black">
               <Select 
          name="res"
          value={responsibleID}
          onValueChange={setResponsibleID}
          dir='rtl'
          
          
        >
          <SelectTrigger>
            <SelectValue placeholder="موسس" />
          </SelectTrigger>
          <SelectContent>
            { responsibles.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        
      </Select>
      </div>
       <div className="relative mb-6 text-black">
         <Select 
          name="province"
          value={provinceID}
          onValueChange={setProvinceID}
          dir='rtl'
          
          
        >
          <SelectTrigger>
            <SelectValue placeholder="استان"/>
          </SelectTrigger>
          <SelectContent>
            { provinces.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        </Select>
    </div>
    <div className="relative mb-6 text-black">
             <Select 
          name="city"
          value={cityID}
          onValueChange={setCityID}
          dir='rtl'
          
          
        >
          <SelectTrigger>
            <SelectValue placeholder="شهر"/>
          </SelectTrigger>
          <SelectContent>
            { citys.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        </Select>
          </div>
           <div className="relative mb-6 text-black">
              <Select 
          name="vilage"
          value={vilageID}
          onValueChange={setVilageID}
          dir='rtl'
          
          
        >
          <SelectTrigger>
            <SelectValue placeholder="روستا"/>
          </SelectTrigger>
          <SelectContent>
            { vilages.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        </Select>
       </div>
       <div className="relative mb-6 text-black">
        <Select 
          name="manage"
          value={manageID}
          onValueChange={setManageID}
          dir='rtl'
          
          
        >
          <SelectTrigger>
            <SelectValue placeholder="مدیر"/>
          </SelectTrigger>
          <SelectContent>
            { manages.map((item)=>
            <SelectItem  key={item.id} value={String(item.id)}> {item.name}</SelectItem>
)}
          </SelectContent>
        </Select>
        </div>
              <input
                type="text"
                placeholder="آدرس"
                value={address}
                onChange={(e) =>  setAddress( e.target.value )}
                className="w-full h-12 mb-3 text-black shadow-md rounded-full border border-black pr-4"
              />
              <input
                type="text"
                placeholder="تلفن"
                value={phone}
                onChange={(e) =>  setPhone( e.target.value )}
                className="w-full h-12 mb-3 text-black shadow-md rounded-full border border-black pr-4"
              />
<div className="w-full mb-4 flex items-center justify-between">
  {/* متن سمت راست */}
  <label htmlFor="signatureUpload" className="text-gray-700 font-semibold">
    امضاء
  </label>

  <div className="flex items-center gap-3">
    {/* input مخفی */}
    <input
      id="signatureUpload"
      type="file"
      accept="image/*"
      onChange={(e) => setSignatureSrc(e.target.files[0])}
      className="hidden"
    />

    {/* دکمه سفارشی */}
    <label
      htmlFor="signatureUpload"
      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
    >
      انتخاب امضاء
    </label>

    {/* نمایش اسم فایل انتخاب شده */}
    {signatureSrc && (
      <span className="text-gray-700 text-sm">{signatureSrc.name}</span>
    )}
  </div>
</div>
                                       
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded ml-2"
                  onClick={addEvaluated}
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

export default EvaluatedReg ;


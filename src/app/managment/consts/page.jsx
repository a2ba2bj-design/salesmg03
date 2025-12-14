  'use client'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Gridreflaw from '../../components/Gridreflaw'
import evalDetailFormLink  from "../../components/evalDetailFormLink.tsx";
import { BASE_URL } from '../../lib/util';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
export default function TabsPage() {
  const [activeTab, setActiveTab] = useState('enum')
  const [enums, setEnums] = useState([])
  const [cats, setCats] = useState([])
  const [reflaws, setReflaws] = useState([])
  const [rangepack, setRangepack] = useState([])

  ////// قوانین مرجع
  const columnDefsreflaw=[
    { headerName: 'شناسه',field: "id", editable:false },
    { headerName: 'مرجع قانونی ',field: "refName" },
  ];

  ////// ثابت‌ها
  const columnDefsGroup=[
    { headerName: 'شناسه',field: "id", editable:false },
    { headerName: 'گروه ',field: "groupname" },
    { headerName: 'نام',field: "name" },
  ];

  ////// طبقه‌بندی‌ها
  const columnDefsCat=[
    { headerName: 'شناسه',field: "id", editable:false },
    { headerName: 'گروه ',field: "catName" },
  ];
  ////// سیستم ارزش یابی
  const columnDefsRangepack=[
    {field: "id", 
        headerName: "تعریف مقادیر ",
              cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
              flex: 0.8,
              headerClass: "header-center",
             cellRenderer: evalDetailFormLink
    },
    { headerName: 'نام سیستم ',field: "name" ,cellClass: 'ag-header-cell-label'},
    { headerName: 'نوع (کیفی/کمی) ',field: "packType",cellClass: 'ag-header-cell-label' }
  ];

  // گرفتن داده‌ها
  useEffect(() => {
    axios.get(`${BASE_URL}/enum`).then(res=>setEnums(res.data)).catch(err=>console.log(err));
    axios.get(`${BASE_URL}/cat`).then(res=>setCats(res.data)).catch(err=>console.log(err));
    axios.get(`${BASE_URL}/tbllawref`).then(res=>setReflaws(res.data)).catch(err=>console.log(err));
    axios.get(`${BASE_URL}/tblevaluation_rang_pack`).then(res=>setRangepack(res.data)).catch(err=>console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8" dir="rtl">
      <div className="w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl p-8 flex flex-col">
        
        {/* تب‌ها */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { key: 'enum', label: 'تعریف ثابت ها' },
            { key: 'cat', label: 'طبقه بندی ها' },
            { key: 'reflaw', label: 'قوانین مرجع' },
            { key: 'rangepack', label: 'سیستم های ارزشی' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 text-lg font-bold rounded-lg transition-all ${
                activeTab === tab.key
                  ? 'bg-[#355e50] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* محتوای تب‌ها */}
        <div className="flex-1 overflow-y-auto p-6 border rounded-xl border-gray-200 bg-gray-50">
          {activeTab === 'enum' && (
            <Gridreflaw columnDefs={columnDefsGroup} rowData={enums} activeTab={activeTab} />
          )}
          {activeTab === 'cat' && (
            <Gridreflaw columnDefs={columnDefsCat} rowData={cats} activeTab={activeTab} />
          )}
          {activeTab === 'reflaw' && (
            <Gridreflaw columnDefs={columnDefsreflaw} rowData={reflaws} activeTab={activeTab} />
          )}
          {activeTab === 'rangepack' && (
            <Gridreflaw columnDefs={columnDefsRangepack} rowData={rangepack} activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  )
}
'use client'
import { report } from 'process';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const mainMenu = [
    { title: 'مدیریت', key: 'admin' },
    { title: 'گزارشات',key:'report' },
    { title: 'درباره ما' },
    { title: 'تماس با ما' },
  ];

  const megaMenu = {
    admin: [
      {
        title: 'ثابت‌ها',
        items: [['معیار','/managment/criteria'],[' تعریف ثابت ها','/managment/consts'],['ثبت موسس','/managment/resposibles'],['ثبت مدیر','/managment/manager'],['فرم ارزیابی شونده','/managment/evaluated'],['فرم ارزیاب ها','/managment/evaluator']],
      },
      {
        title: 'فرم‌ها',
        items: [['تعریف فرم ارزیابی پایه','/managment/evaluationbaseform'], ['تعریف فرم ارزیابی','/managment/evaluationform']],
     
      },
    ],
    
    report:[
      {
      title :'ساخت گزارش',
      items:[['تعریف گزارش  پایه','/managment/report-designer']],
    }],
  };

  const handleSubmenuToggle = (key) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  // 👇 کلاس مشترک برای لینک‌های زیرمنو در هر دو حالت (با افکت دسکتاپ + موبایل)
  const submenuLinkClass = `
    relative block px-3 py-2 text-sm text-gray-800 rounded transition-all duration-300 ease-in-out
    hover:text-green-1000 focus:text-green-1000
    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
    hover:after:w-full focus:after:w-full active:after:w-full
    after:bg-green-800 after:transition-all after:duration-300
    hover:bg-green-100 focus:bg-green-100 active:bg-green-100 active:scale-[0.97]
    bg-white shadow-sm
  `;

  return (
    <nav className="bg-green-500 text-white font-sans"> {/* تغییر: از bg-slate-900 به bg-green-500 */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6 rtl:space-x-reverse">
            {/* مدیریت با مگا منو */}
            <div className="relative group">
              <button className="py-3 px-4 hover:bg-green-600">مدیریت</button> {/* تغییر: hover:bg-neutral-700 به hover:bg-green-600 */}

              <div className="absolute right-0 top-full mt-0 hidden group-hover:flex bg-white text-gray-800 shadow-lg p-6 w-[800px] z-50 space-x-8 rtl:space-x-reverse">
                {megaMenu.admin.map((col, i) => (
                  <div key={i}>
                    <h4 className="font-bold mb-2 text-sm">{col.title}</h4>
                    <ul className="text-sm space-y-1">
                      {col.items.map((item, idx) => (
                        <li key={idx}>
                          <a href={item[1]} className={submenuLinkClass}>{item[0]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
           
            </div>
              <div className="relative group">
              <button className="py-3 px-4 hover:bg-green-600">گزارشات</button> {/* تغییر: hover:bg-neutral-700 به hover:bg-green-600 */}

          
                 <div className="absolute right-0 top-full mt-0 hidden group-hover:flex bg-white text-gray-800 shadow-lg p-6 w-[800px] z-50 space-x-8 rtl:space-x-reverse">
                {megaMenu.report.map((col, i) => (
                  <div key={i}>
                    <h4 className="font-bold mb-2 text-sm">{col.title}</h4>
                    <ul className="text-sm space-y-1">
                      {col.items.map((item, idx) => (
                        <li key={idx}>
                          <a href={item[1]} className={submenuLinkClass}>{item[0]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            

            {/* سایر آیتم‌های منو */}
            {mainMenu.slice(2).map((item, i) => (
              <a key={i} href="#" className="py-3 px-4 hover:bg-green-600"> {/* تغییر: hover:bg-neutral-700 به hover:bg-green-600 */}
                {item.title}
              </a>
            ))}
          </div>

          {/* Search Desktop */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="جستجو..."
              className="rounded-md px-10 py-1 text-black bg-amber-50 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-green-500 text-white p-4 space-y-2 transition-all"> {/* تغییر: از bg-neutral-900 به bg-green-500 */}
            {mainMenu.map((item, i) => (
              <div key={i}>
                {item.key ? (
                  <>
                    <button
                      className="w-full text-right py-2 px-3 bg-green-600 rounded hover:bg-green-700" /* تغییر: bg-neutral-800 به bg-green-600 و hover:bg-neutral-700 به hover:bg-green-700 */
                      onClick={() => handleSubmenuToggle(item.key)}
                    >
                      {item.title}
                    </button>
                    {activeSubmenu === item.key && (
                      <div className="bg-white text-black mt-2 rounded p-4">
                        {megaMenu[item.key].map((col, j) => (
                          <div key={j} className="mb-4">
                            <h4 className="font-bold mb-2 text-sm">{col.title}</h4>
                            <ul className="text-sm space-y-2">
                              {col.items.map((subItem, k) => (
                                <li key={k}>
                                  <a href={subItem[1]} className={submenuLinkClass}>{subItem[0]}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href="#" className="block py-2 px-3 hover:bg-green-600 rounded"> {/* تغییر: hover:bg-neutral-700 به hover:bg-green-600 */}
                    {item.title}
                  </a>
                )}
              </div>
            ))}

            {/* Search Mobile */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full rounded-md px-3 py-2 text-black text-sm focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
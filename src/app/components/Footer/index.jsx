import tel from "../../../../public/tel.png"
import eitaa from "../../../../public/eitaa.png"
import ins from "../../../../public/ins.png"
function index() {
    return (
  <div>
  <footer className="relative text-gray-300 mt-0 overflow-hidden">
    {/* 🔹 موج بالای فوتر */}
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
      <svg
        className="relative block w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#0f172a"
          fillOpacity="1"
          d="M0,224L60,229.3C120,235,240,245,360,240C480,235,600,213,720,186.7C840,160,960,128,1080,133.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
    </div>

    {/* 🔹 پس‌زمینه گرادینتی متحرک */}
    <div className="absolute inset-0 animate-gradient bg-[linear-gradient(-45deg,#0f172a,#334155,#1e293b,#0f172a)] bg-[length:400%_400%] z-[-1]" />

    {/* 🔹 محتوای اصلی فوتر */}
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-20">
      {/* درباره ما */}
      <div>
        <h4 className="text-white font-bold mb-4">درباره ما</h4>
        <p className="text-sm leading-6">
          ما در تلاش هستیم تا با ارائه‌ی ابزارهای دقیق و کارآمد، کیفیت آموزش و ارزیابی مدارس را ارتقاء دهیم.
        </p>
      </div>

      {/* لینک‌ها */}
      <div>
        <h4 className="text-white font-bold mb-4">لینک‌ها</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-blue-400">خانه</a></li>
          <li><a href="#" className="hover:text-blue-400">گزارشات</a></li>
          <li><a href="#" className="hover:text-blue-400">تماس با ما</a></li>
          <li><a href="#" className="hover:text-blue-400">درباره ما</a></li>
        </ul>
      </div>

      {/* شبکه‌های اجتماعی */}
   <div>
  <h4 className="text-white font-bold mb-4">ما را دنبال کنید</h4>
  <ul className="flex flex-col space-y-3 text-sm">
    <li>
      <a href="#" className="flex items-center  rtl:space-x-reverse text-2xl font-bold hover:text-blue-400">
        <img src={ins.src} alt="Instagram" className="w-18 h-18 " />
        <span>اینستاگرام</span>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center  pr-1 hover:text-blue-400 rtl:space-x-reverse text-2xl font-bold">
        <img src={tel.src} alt="Telegram" className="w-14 h-14 " />
        <span>تلگرام</span>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center pl-1 rtl:space-x-reverse text-2xl font-bold  hover:text-blue-400">
        <img src={eitaa.src} alt="Eitaa" className="w-18 h-18 " />
        <span>ایتا</span>
      </a>
    </li>
  </ul>
</div>
      {/* تماس با ما */}
      <div>
        <h4 className="text-white font-bold mb-4">تماس با ما</h4>
        <ul className="text-sm space-y-2">
          <li>ایمیل: info@example.com</li>
          <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
          <li>آدرس: تهران، خیابان آزادی</li>
        </ul>
      </div>
    </div>

    {/* 🔹 کپی‌رایت */}
    <div className="text-center text-xs py-4 border-t border-white/20 relative z-20">
      © {new Date().getFullYear()} تمام حقوق محفوظ است.
    </div>
  </footer>
</div>
    );
}

export default index;
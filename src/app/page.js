'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import WEB from "../../public/WEB.jpeg"
import SMbg from "../../public/SMbg.png"
import Menu from "./components/Menu";
import Footer from "./components/Footer"
export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 450); // Example breakpoint
        

        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener('resize', handleResize);
      }, []);

     return (
   <>
<div className="min-h-screen flex flex-col">
  {/* منو بالا */}
  <div className="relative z-50">
    <Menu />
  </div>

  {/* تصویر در وسط - grow */}
  <div className="relative w-full flex-grow h-screen z-0">
    <Image
      src={isMobile ? SMbg : WEB}
      alt="Background image"
      fill
      sizes="100vw"
      className="object-cover object-bottom"
      priority
    />
  </div>
<Footer></Footer>
  {/* فوتر پایین و بدون فاصله */}
  <div>
   
  </div>
</div>

  </>
);

}

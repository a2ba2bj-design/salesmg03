import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../public/Styles/style.css"
/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata = {
  title: "سایت فروشگاهی",
  description: "هدف جلب رضایت شماست",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl"
       
      >
        {children}
      </body>
    </html>
  );
}

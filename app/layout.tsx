import type { Metadata, Viewport } from 'next';
import './globals.css';
import localFont from 'next/font/local';
const playball=localFont({src:'../public/fonts/Playball-Regular.ttf',variable:'--font-brand',display:'swap',weight:'400'});
export const metadata: Metadata = { title: 'Marry Delicious | جودة البيت في كل طبق', description: 'أكل بيتي معمول بحب. تصفح منيو Marry Delicious واطلب عبر واتساب قبل موعدك بيومين.', manifest:'/manifest.webmanifest', appleWebApp:{capable:true,title:'Marry Delicious',statusBarStyle:'default'}, icons:{icon:'/icon-192.png',apple:'/icon-192.png'} };
export const viewport: Viewport = { themeColor:'#153f3d', width:'device-width',initialScale:1 };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="ar" dir="rtl" className={playball.variable}><body>{children}</body></html> }

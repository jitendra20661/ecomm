import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import Link from 'next/link';
import toast, { Toaster } from "react-hot-toast"



export const metadata = {
  title: 'GECommerce',
  description: 'Clone of GECbazaar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
          <div className='max-w-3xl mx-auto p-4'>
            <Navbar/>
            <Toaster /> 
            {children}
            <Footer/>
          </div>
        </body>
    </html>
  )
}

'use client'
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { totalmem } from "os";


export default function Navbar(){
    const router = useRouter(); 

    const handleLogout = async()=>{
        try {
            let response = await fetch('http://localhost:5000/logout', {
                method: 'GET',
                credentials: 'include'
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Server error occurred');
            }

            response = await response.json()
            console.log("log out result: ", response);
            // toast.success("Logged Out Successfull")
            // router.push('/login')

        } catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error(error.message);
        }
    }

    return(
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">

            <Link className="text-white font-bold" href={'/'}>GECommerce</Link>
            <div>
            {/* <Link className="text-white p-2" href={'/login'}>login</Link> */}
            <Link className="text-white p-2" href={'/add_product'}>Sell</Link>
            {/* <Link className="text-white p-2" href={'/logout'}>logout</Link> */}
            <button className="btn btn-primary" onClick={handleLogout}>log out</button>

            <Link className="bg-white p-2" href={'/signin'} style={{borderRadius: '10px'}}>sign in</Link>

            </div>
        </nav>
    )
}
import Link from "next/link"
export default function Navbar(){
    return(
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">

            <Link className="text-white font-bold" href={'/'}>GECommerce</Link>
            <div>
            {/* <Link className="text-white p-2" href={'/login'}>login</Link> */}
            <Link className="text-white p-2" href={'/add_product'}>Sell</Link>
            <Link className="text-white p-2" href={'/logout'}>logout</Link>
            <Link className="bg-white p-2" href={'../signin'} style={{borderRadius: '10px'}}>sign in</Link>

            </div>
        </nav>
    )
}
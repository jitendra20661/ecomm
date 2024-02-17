"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast';


// import useNavigate 


export default function signup(){

  //[NOTE] when using useRouter hook inside app, import from "next/navigation" instead from "next/router" 
  const router = useRouter(); 

  const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
  })
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
      try 
      {
        setLoading(true);
        let result = await fetch('http://localhost:5000/signin', {
          method: 'post',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password
          }),
        });

        //  Check if response is successful
         if (!result.ok) {
          // Handle server-side error
          const errorData = await result.json();
          throw new Error(errorData.message || 'Server error occurred');
        }

        result = await result.json();
        toast.success('Sign-up successful!');
        console.log("Signup result: ", result);
        // localStorage.setItem("user@GEComm", JSON.stringify(result));
        router.push("/login");

      } catch (error:any) 
      {
        console.log("Signup failed", error.message);
        toast.error(error.message);
      }
      finally {
          setLoading(false);
      }
    }


  //   useEffect(() => {
  //     if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
  //         setButtonDisabled(false);
  //     } else {
  //         setButtonDisabled(true);
  //     }
  // }, [user]);


    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="alt_company_image"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in 
            {/* to your account */}
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={user.username}
                  onChange={(e)=>setUser({...user, username: e.target.value})}/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={user.email}
                  onChange={(e)=>setUser({...user, email: e.target.value})}/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-slate-600 hover:text-slate-500">
                    Forgot password? to be removed
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={user.password}
                  onChange={(e)=>setUser({...user, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link href={'/login'} className="font-semibold leading-6 text-slate-800 hover:text-slate-600">login</Link>
          </p>
        </div>
      </div>
        
        
    )
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


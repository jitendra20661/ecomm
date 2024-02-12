"use client"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
 
export default function LoginPage(){
  const router = useRouter()
 
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
 
    try {
      let response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
   
      if (!response.ok) {
        // Handle server-side error
        const errorData = await response.json();  //converts error obj to string
        throw new Error(errorData.message || 'Server error occurred');
      }
      const result = await response.json();
      // localStorage.setItem("user@GEComm_token", response.message);  // put this in cookie maybe from backend
      // localStorage.setItem("user@GEComm_token", JSON.stringify(result.token));
      toast.success('Login Success! Welcome.');
      router.push('/')
      
    }catch (error:any) 
    {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
    finally {
        // setLoading(false);
    }
  }
 
  return (
    <form onSubmit={handleLogin}>
    {/* <form onSubmit={handleSubmit}> */}

      <input type="name" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
} 
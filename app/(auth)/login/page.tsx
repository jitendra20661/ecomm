"use server"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage(){
  const router = useRouter()
 
  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
 
    // const formData = new FormData(event.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')
 
    // const response = await fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
 
    // if (response.ok) {
    //   router.push('/')
    // } else {
      
    // }
  // }
 
  return (
    <form >
    {/* <form onSubmit={handleSubmit}> */}

      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}
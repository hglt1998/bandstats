"use client"
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const signupResponse = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        fullname: formData.get('fullname'),
        password: formData.get('password')
      })

      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: formData.get('password'),
        redirect: false
      })

      if (res?.ok) return router.push("/dashboard")
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }

  }
  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w-3/12'>
        {error && (<div className='bg-red-500 text-white p-2 mb-2'>{error}</div>)}
        <h1 className='text-4xl font-bold mb-7'>Sign up</h1>
        <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="text" placeholder="John Doe" name="fullname" />
        <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="email" placeholder="email@email.com" name="email" />
        <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="password" placeholder="*******" name="password" />
        <button className="bg-indigo-500 px-4 py2">Register</button>
      </form>
    </div>
  )
}
"use client"
import { MusicalNoteIcon } from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)


    const res = await signIn('credentials', {
      email: formData.get("email"),
      password: formData.get('password'),
      redirect: false
    })

    if (res?.error) return setError(res.error as string)
    if (res?.ok) return router.push("/dashboard")

  }

  const handleChange = () => {
    setError('')
  }

  document.querySelector('nav')?.setAttribute('display', 'none')
  return (
    <div className='container relative hidden h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900'></div>
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <MusicalNoteIcon className='size-6' /> Mezzo
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote>
            <p className='text-lg'>La red social para músicos y bandas</p>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Ingresa en tu cuenta</h1>
            <p className='text-sm text-muted-foreground'>Introduce tu correo electrónico</p>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <div className='grid gap-2'>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only' htmlFor="email">Email</label>
                  <input placeholder='nombre@ejemplo.com' name='email' type="email" className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only' htmlFor="password">Contraseña</label>
                  <input placeholder='*******' name='password' type="password" className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
                </div>
              </div>
              <div className='grid gap-1'>
                <button className=' bg-zinc-900 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2'>Ingresa</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
    // <div className='justify-center h-[calc(100vh-4rem)] flex flex-col items-center'>
    //   <form onSubmit={handleSubmit} onChange={handleChange} className='bg-neutral-950 px-8 py-10 w-3/12 my-4'>
    //     {error && (<div className='bg-red-500 text-white p-2 mb-2'>{error}</div>)}
    //     <h1 className='text-4xl font-bold mb-7'>Sign in</h1>
    //     <input className="bg-white dark:bg-zinc-800 px-4 py-2 block mb-2 w-full" type="email" placeholder="email@email.com" name="email" />
    //     <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="password" placeholder="*******" name="password" />
    //     <button className="bg-indigo-500 px-4 py-2 rounded-lg">Login</button>
    //   </form>
    //   <Link className='w-3/12 text-right text-indigo-200' href={'/forgot-password'}>Reestablecer contraseña</Link>
    // </div>
  )
}
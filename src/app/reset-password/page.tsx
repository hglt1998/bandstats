'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden')
      return
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })

    const data = await res.json();
    setMessage(data.message)
    if (res.ok) {
      router.push('/login')
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
        {message && (<div className="bg-red-500 text-white p-2 mb-2">{message}</div>)}
        <h1 className="text-4xl font-bold mb-7">Restablecer contraseña</h1>
        <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="bg-zinc-800 px-4 py-2 block mb-2 w-full" type="password" placeholder="Confirma la nueva contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="bg-indigo-500 px-4 py-2">Restrablecer</button>
      </form>
    </div>
  )
}
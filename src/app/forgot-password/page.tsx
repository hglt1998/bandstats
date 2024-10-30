// app/forgot-password/page.tsx
"use client"
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al intentar enviar el correo de recuperación')
      console.error('ERROR: ', err)
    }
  }

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/6 my-4">
        <h1 className="text-4xl font-bold mb-7">Recuperar Contraseña</h1>
        {message && <p className="bg-green-500 text-white p-2 mb-2">{message}</p>}
        {error && <p className="bg-red-500 text-white p-2 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="bg-indigo-500 px-4 py2">
          Enviar enlace de recuperación
        </button>
      </form>
    </div>
  )
}

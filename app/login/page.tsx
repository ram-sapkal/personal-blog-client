'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { setToken } from '@/lib/auth'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, password })
      setToken(res.data.token)
      router.push('/dashboard')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="bg-black text-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="block w-full mb-4 p-2 sm:p-3 rounded border border-gray-600 bg-black text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              className="block w-full p-2 sm:p-3 pr-10 rounded border border-gray-600 bg-black text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="bg-blue-600 w-full text-white px-4 py-2 sm:py-3 rounded hover:bg-blue-700 transition text-sm sm:text-base">
            Login
          </button>
        </form>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          <span className="text-gray-300">New User? </span>
          <Link href="/signup" className="text-blue-400 underline hover:text-blue-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

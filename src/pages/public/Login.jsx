import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'

export default function Login() {
  const { login } = useAuth()
  const { pushToast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(form.email, form.password)
      setLoading(false)
      if (!result.success) {
        setError(result.message)
        return
      }
      pushToast(`Welcome back, ${result.user.fullName.split(' ')[0]}!`)
      navigate(result.user.role === 'owner' ? '/owner' : '/dashboard')
    }, 500)
  }

  const fillDemo = (role) => {
    if (role === 'traveler') setForm({ email: 'aarav@example.com', password: 'password123' })
    else setForm({ email: 'sita@example.com', password: 'password123' })
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-sand-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <Link to="/" className="font-display text-xl font-semibold text-teal-900">
            Trip<span className="text-terracotta-500">AI</span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-medium text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Log in to view your recommendations and bookings.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500/50" size={14} />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink-900/10 py-2.5 pl-11 pr-4 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500/50" size={14} />
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink-900/10 py-2.5 pl-11 pr-4 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" loading={loading} fullWidth className="mt-2">
            Login
          </Button>
        </form>

        <div className="mt-5 flex items-center gap-2 text-xs text-ink-500">
          <div className="h-px flex-1 bg-ink-900/10" />
          Try a demo account
          <div className="h-px flex-1 bg-ink-900/10" />
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => fillDemo('traveler')} className="flex-1 rounded-xl border border-ink-900/10 py-2 text-xs font-medium text-ink-700 hover:bg-sand-100">
            Traveler demo
          </button>
          <button onClick={() => fillDemo('owner')} className="flex-1 rounded-xl border border-ink-900/10 py-2 text-xs font-medium text-ink-700 hover:bg-sand-100">
            Owner demo
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-teal-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

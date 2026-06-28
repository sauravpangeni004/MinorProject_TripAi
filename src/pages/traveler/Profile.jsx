import { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { pushToast } = useApp()
  const [form, setForm] = useState({ fullName: user.fullName, email: user.email })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleAvatarChange = () => {
    const seed = Math.floor(Math.random() * 70) + 1
    updateProfile({ avatar: `https://i.pravatar.cc/150?img=${seed}` })
    pushToast('Profile photo updated')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      updateProfile(form)
      setSaving(false)
      pushToast('Profile updated')
    }, 500)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink-900">Profile</h1>
      <p className="mt-1 text-sm text-ink-500">Manage your personal information.</p>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatar} alt={user.fullName} className="h-20 w-20 rounded-full object-cover" />
            <button
              onClick={handleAvatarChange}
              aria-label="Change avatar"
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-teal-900 text-white shadow"
            >
              <FaCamera size={11} />
            </button>
          </div>
          <div>
            <p className="font-display text-lg font-medium text-ink-900">{user.fullName}</p>
            <p className="text-sm capitalize text-ink-500">{user.role} · joined {user.joinedDate}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Full name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <Button type="submit" loading={saving} className="self-start">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  )
}

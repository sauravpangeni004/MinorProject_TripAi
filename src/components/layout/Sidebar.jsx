import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaBars, FaMoon, FaSignOutAlt, FaSun, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function Sidebar({ links, title = 'Dashboard' }) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" className="font-display text-lg font-semibold text-white">
          Trip<span className="text-terracotta-400">AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80"
          >
            {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>
          <button className="text-white/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {user && (
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <img src={user.avatar} alt={user.fullName} className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user.fullName}</p>
            <p className="truncate text-xs capitalize text-white/50">{user.role}</p>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-white/40">{title}</p>
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <link.icon size={16} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-3 pb-5 pt-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <FaSignOutAlt size={16} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-teal-900 px-4 py-3 lg:hidden">
        <Link to="/" className="font-display text-lg font-semibold text-white">
          Trip<span className="text-terracotta-400">AI</span>
        </Link>
        <button className="text-white" onClick={() => setOpen(true)} aria-label="Open menu">
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-teal-900">{content}</div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 bg-teal-900 lg:sticky lg:top-0 lg:flex">{content}</aside>
    </>
  )
}

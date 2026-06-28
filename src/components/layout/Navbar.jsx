import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import Button from '../shared/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/homestays', label: 'Homestays' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dashboardPath = user?.role === 'owner' ? '/owner' : '/dashboard'

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-sand-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-xl font-semibold text-teal-900">
          Trip<span className="text-terracotta-500">AI</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-teal-900' : 'text-ink-500 hover:text-teal-900'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className="flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-teal-900">
                <FaUserCircle size={18} /> {user.fullName.split(' ')[0]}
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-teal-900">
                Login
              </Link>
              <Button size="sm" onClick={() => navigate('/register')}>
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          className="text-ink-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-900/5 bg-sand-50 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-teal-900' : 'text-ink-700'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-900/5 pt-3">
              {user ? (
                <>
                  <Link to={dashboardPath} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                    Dashboard
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                    Login
                  </Link>
                  <Button size="sm" onClick={() => { setOpen(false); navigate('/register') }}>
                    Get started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

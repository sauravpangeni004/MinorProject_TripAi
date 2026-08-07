import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-100 text-ink-900 transition-colors duration-200 dark:bg-teal-950 dark:text-sand-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

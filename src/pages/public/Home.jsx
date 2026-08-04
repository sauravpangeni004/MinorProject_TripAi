import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch, FaMagic, FaShieldAlt, FaLeaf, FaComments } from 'react-icons/fa'
import DestinationCard from '../../components/cards/DestinationCard'
import HomestayCard from '../../components/cards/HomestayCard'
import Button from '../../components/shared/Button'
import { destinations } from '../../data/destinations'
import { homestays } from '../../data/homestays'
import { reviews } from '../../data/reviews'

const popularDestinations = destinations.slice(0, 3)
const featuredHomestays = homestays.slice(0, 3)
const testimonials = reviews.slice(0, 3)

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(query ? `/destinations?q=${encodeURIComponent(query)}` : '/destinations')
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/80 to-teal-900/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
              <FaMagic size={12} className="text-terracotta-400" /> AI-matched destinations & homestays
            </p>
            <h1 className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
              Find a place that feels like it was picked just for you.
            </h1>
            <p className="mt-4 text-base text-sand-100/80 sm:text-lg">
              Tell TripAI your travel style and budget — we'll match you to destinations and homestays across Nepal that fit, backed by real traveler reviews.
            </p>

            {/* Premium Multi-line Integrated Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSearch}
              className="mt-8 flex flex-col gap-3 rounded-3xl bg-white/95 dark:bg-ink-900/95 p-3.5 sm:p-4 shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-sm sm:flex-row sm:items-end w-full max-w-2xl sm:max-w-3xl transition-all duration-300 focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-within:border-teal-500/40"
            >
              <div className="relative flex-1 flex items-start">
                <FaSearch className="pointer-events-none absolute left-5 top-5 text-ink-500/40 dark:text-sand-100/40" size={18} />
                <textarea
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`
                  }}
                  rows={2}
                  placeholder="Search by destination, region, or tell TripAI your travel plans in detail…"
                  className="w-full bg-transparent rounded-xl py-3.5 pl-14 pr-4 text-base text-ink-900 dark:text-sand-50 placeholder:text-ink-500/50 dark:placeholder:text-sand-100/40 focus:outline-none resize-none min-h-[56px] max-h-[180px] overflow-y-auto leading-relaxed align-top"
                />
              </div>
              <Button type="submit" size="lg" className="px-8 py-3.5 text-base font-semibold sm:mb-1.5">
                Search
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-terracotta-500">Handpicked</p>
            <h2 className="font-display text-2xl font-medium text-ink-900 sm:text-3xl">Popular destinations</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/destinations')}>
            View all →
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-terracotta-500">Stay local</p>
            <h2 className="font-display text-2xl font-medium text-ink-900 sm:text-3xl">Featured homestays</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/homestays')}>
            View all →
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHomestays.map((h) => (
            <HomestayCard key={h.id} homestay={h} />
          ))}
        </div>
      </section>

      {/* AI Recommendation Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-teal-900">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                <FaMagic size={12} className="text-terracotta-400" /> Powered by your preferences
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-white sm:text-3xl">
                Not sure where to go? Let TripAI suggest it.
              </h2>
              <p className="mt-3 text-sm text-sand-100/80">
                Answer a few quick questions about your budget, travel style, and the activities you enjoy. We'll rank destinations and homestays that actually fit — with the reasoning shown, not just a list.
              </p>
              <Button className="mt-6" onClick={() => navigate('/recommendations')}>
                Get my recommendations
              </Button>
            </div>
            <div className="h-64 lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1606298855672-3efb63017af8?w=900&q=80"
                alt="Traveler planning a trip"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TripAI */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-terracotta-500">Why TripAI</p>
          <h2 className="font-display text-2xl font-medium text-ink-900 sm:text-3xl">Built for how you actually plan trips</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: FaMagic, title: 'Personalized matching', text: 'Recommendations based on your budget, travel style, and activities — not generic top-10 lists.' },
            { icon: FaShieldAlt, title: 'Verified homestays', text: 'Every homestay is reviewed by real travelers, with ratings you can actually trust.' },
            { icon: FaLeaf, title: 'Local, sustainable stays', text: 'Stay with local families and small hosts instead of large chain hotels.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <item.icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-medium text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-terracotta-500">Traveler stories</p>
          <h2 className="font-display text-2xl font-medium text-ink-900 sm:text-3xl">What travelers are saying</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((review) => (
            <div key={review.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <FaComments className="text-terracotta-400" size={20} />
              <p className="mt-4 text-sm text-ink-700">"{review.comment}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={review.avatar} alt={review.travelerName} className="h-9 w-9 rounded-full object-cover" />
                <p className="text-sm font-medium text-ink-900">{review.travelerName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-terracotta-500 p-10 text-center sm:p-14">
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">Ready to find your next stay?</h2>
          <p className="max-w-md text-sm text-white/90">
            Create a free account and get personalized destination and homestay recommendations in under a minute.
          </p>
          <Button variant="secondary" onClick={() => navigate('/register')}>
            Create free account
          </Button>
        </div>
      </section>
    </div>
  )
}

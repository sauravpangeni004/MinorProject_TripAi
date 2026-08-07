import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaCheckCircle, FaHeart, FaRegHeart } from 'react-icons/fa'
import StarRating from '../../components/shared/StarRating'
import HomestayCard from '../../components/cards/HomestayCard'
import ReviewCard from '../../components/cards/ReviewCard'
import Button from '../../components/shared/Button'
import EmptyState from '../../components/shared/EmptyState'
import ImageWithFallback from '../../components/shared/ImageWithFallback'
import { getDestinations } from '../../services/destinationService'
import { getHomestays } from '../../services/homestayService'
import { getReviews } from '../../services/reviewService'
import { useApp } from '../../context/AppContext'

const destinations = getDestinations()
const homestays = getHomestays()
const allReviews = getReviews()

export default function DestinationDetails() {
  const { id } = useParams()
  const destination = destinations.find((d) => d.id === id)
  const { favoriteDestinations, toggleFavoriteDestination } = useApp()
  const [activeImage, setActiveImage] = useState(0)

  const safeDestination = {
    id: destination?.id || '',
    name: destination?.name || 'Destination',
    region: destination?.region || 'Nepal',
    rating: destination?.rating || 0,
    reviewCount: destination?.reviewCount || 0,
    estimatedBudget: destination?.estimatedBudget || 0,
    bestSeason: destination?.bestSeason || 'Year-round',
    travelType: Array.isArray(destination?.travelType) ? destination.travelType : [],
    description: destination?.description || 'A memorable destination to explore.',
    thingsToDo: Array.isArray(destination?.thingsToDo) ? destination.thingsToDo : [],
    image: destination?.image || '/images/default-destination.jpg',
    gallery: Array.isArray(destination?.gallery) && destination.gallery.length ? destination.gallery : [destination?.image || '/images/default-destination.jpg'],
  }

  if (!destination) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Destination not found" description="This destination may have been removed." action={<Link to="/destinations"><Button>Back to destinations</Button></Link>} />
      </div>
    )
  }

  const nearbyHomestays = homestays.filter((h) => h.destinationId === safeDestination.id)
  const destinationReviews = allReviews.filter((r) => r.targetType === 'destination' && r.targetId === safeDestination.id)
  const isFavorite = favoriteDestinations.includes(safeDestination.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Image gallery */}
      <div className="overflow-hidden rounded-3xl border border-ink-900/5 bg-white shadow-sm dark:border-white/10 dark:bg-teal-950/70">
        <ImageWithFallback src={safeDestination.gallery[activeImage]} alt={safeDestination.name} className="h-72 w-full object-cover sm:h-96" />
      </div>
      {safeDestination.gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {safeDestination.gallery.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={() => setActiveImage(i)}
              className={`h-16 overflow-hidden rounded-xl border-2 ${activeImage === i ? 'border-teal-500' : 'border-transparent'}`}
            >
              <ImageWithFallback src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink-900 dark:text-sand-50">{safeDestination.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500 dark:text-sand-300">
            <FaMapMarkerAlt size={12} /> {safeDestination.region}
          </p>
          <div className="mt-2">
            <StarRating rating={safeDestination.rating} reviewCount={safeDestination.reviewCount} />
          </div>
        </div>
        <button
          onClick={() => toggleFavoriteDestination(safeDestination.id)}
          className="flex items-center gap-2 rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm font-medium text-terracotta-500 hover:bg-sand-100 dark:border-white/10 dark:hover:bg-white/10"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />} {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Quick facts */}
      <div className="mt-6 flex flex-wrap gap-4 rounded-2xl border border-ink-900/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-teal-950/70">
        <div className="flex items-center gap-2 text-sm text-ink-700 dark:text-sand-200">
          <FaWallet className="text-teal-700" /> Est. budget: <span className="font-medium">${safeDestination.estimatedBudget}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-700 dark:text-sand-200">
          <FaCalendarAlt className="text-teal-700" /> Best time: <span className="font-medium">{safeDestination.bestSeason}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {safeDestination.travelType.map((t) => (
            <span key={t} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/70 dark:text-teal-100">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-medium text-ink-900 dark:text-sand-50">About {safeDestination.name}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-sand-300">{safeDestination.description}</p>
      </div>

      {/* Things to do */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-medium text-ink-900 dark:text-sand-50">Things to do</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {safeDestination.thingsToDo.map((thing) => (
            <div key={thing} className="flex items-center gap-2 rounded-xl border border-ink-900/5 bg-white p-3 text-sm text-ink-700 shadow-sm dark:border-white/10 dark:bg-teal-950/70 dark:text-sand-200">
              <FaCheckCircle className="shrink-0 text-forest-500" size={14} />
              {thing}
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-medium text-ink-900 dark:text-sand-50">Location</h2>
        <div className="mt-3 flex h-56 items-center justify-center rounded-2xl bg-sand-200 text-sm text-ink-500 dark:bg-teal-900/80 dark:text-sand-300">
          <FaMapMarkerAlt className="mr-2" /> Map placeholder — {safeDestination.region}
        </div>
      </div>

      {/* Nearby homestays */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-medium text-ink-900 dark:text-sand-50">Nearby homestays</h2>
        {nearbyHomestays.length === 0 ? (
          <p className="mt-3 text-sm text-ink-500">No homestays listed near this destination yet.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {nearbyHomestays.map((h) => (
              <HomestayCard key={h.id} homestay={h} />
            ))}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-medium text-ink-900 dark:text-sand-50">Traveler reviews</h2>
        {destinationReviews.length === 0 ? (
          <p className="mt-3 text-sm text-ink-500">No reviews yet for this destination.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {destinationReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>

      {/* Book CTA */}
      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-teal-900 p-8 text-center">
        <h3 className="font-display text-xl font-medium text-white">Ready to visit {safeDestination.name}?</h3>
        <Link to="/homestays">
          <Button>Book a nearby homestay</Button>
        </Link>
      </div>
    </div>
  )
}

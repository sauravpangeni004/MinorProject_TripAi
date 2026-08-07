import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa'
import StarRating from '../shared/StarRating'
import ImageWithFallback from '../shared/ImageWithFallback'
import { useApp } from '../../context/AppContext'

export default function DestinationCard({ destination }) {
  const { favoriteDestinations, toggleFavoriteDestination } = useApp()

  const safeDestination = {
    name: destination?.name || 'Destination',
    region: destination?.region || 'Nepal',
    rating: destination?.rating || 0,
    reviewCount: destination?.reviewCount || 0,
    description: destination?.description || 'A memorable destination to explore.',
    image: destination?.image || '/images/default-destination.jpg',
    travelType: destination?.travelType || [],
    id: destination?.id || '',
  }

  const isFavorite = favoriteDestinations.includes(safeDestination.id)

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-teal-950/80">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={safeDestination.image}
          alt={safeDestination.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavoriteDestination(safeDestination.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-terracotta-500 shadow-sm transition-transform hover:scale-110"
        >
          {isFavorite ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-medium text-ink-900 dark:text-sand-50">{safeDestination.name}</h3>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-500 dark:text-sand-300">
          <FaMapMarkerAlt size={11} /> {safeDestination.region}
        </p>
        <div className="mt-2.5">
          <StarRating rating={safeDestination.rating} reviewCount={safeDestination.reviewCount} />
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-ink-500 dark:text-sand-300">{safeDestination.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {safeDestination.travelType.slice(0, 2).map((type) => (
            <span key={type} className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-teal-700 dark:bg-teal-900/70 dark:text-teal-100">
              {type}
            </span>
          ))}
        </div>
        <Link
          to={`/destination/${safeDestination.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-teal-900/15 px-4 py-2.5 text-sm font-medium text-teal-900 transition-colors hover:bg-teal-900 hover:text-white dark:border-white/10 dark:text-sand-50"
        >
          View details
        </Link>
      </div>
    </div>
  )
}

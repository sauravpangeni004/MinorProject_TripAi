import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa'
import StarRating from '../shared/StarRating'
import { useApp } from '../../context/AppContext'

export default function DestinationCard({ destination }) {
  const { favoriteDestinations, toggleFavoriteDestination } = useApp()
  const isFavorite = favoriteDestinations.includes(destination.id)

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavoriteDestination(destination.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-terracotta-500 shadow-sm transition-transform hover:scale-110"
        >
          {isFavorite ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-medium text-ink-900">{destination.name}</h3>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-500">
          <FaMapMarkerAlt size={11} /> {destination.region}
        </p>
        <div className="mt-2.5">
          <StarRating rating={destination.rating} reviewCount={destination.reviewCount} />
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-ink-500">{destination.description}</p>
        <Link
          to={`/destination/${destination.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-teal-900/15 px-4 py-2.5 text-sm font-medium text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
        >
          View details
        </Link>
      </div>
    </div>
  )
}

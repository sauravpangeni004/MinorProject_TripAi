import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import StarRating from '../shared/StarRating'
import Badge from '../shared/Badge'
import ImageWithFallback from '../shared/ImageWithFallback'
import { useApp } from '../../context/AppContext'

export default function HomestayCard({ homestay, showBookButton = true, onBook }) {
  const { favoriteHomestays, toggleFavoriteHomestay } = useApp()

  const safeHomestay = {
    name: homestay?.name || 'Homestay',
    location: homestay?.location || 'Nepal',
    ownerName: homestay?.ownerName || 'Local host',
    rating: homestay?.rating || 0,
    reviewCount: homestay?.reviewCount || 0,
    image: homestay?.image || '/images/default-destination.jpg',
    amenities: homestay?.amenities || [],
    availability: homestay?.availability || 'Available',
    price: homestay?.price || 0,
    id: homestay?.id || '',
  }

  const isFavorite = favoriteHomestays.includes(safeHomestay.id)

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-teal-950/80">
      <div className="relative h-44 overflow-hidden">
        <ImageWithFallback
          src={safeHomestay.image}
          alt={safeHomestay.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavoriteHomestay(safeHomestay.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-terracotta-500 shadow-sm transition-transform hover:scale-110"
        >
          {isFavorite ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
        </button>
        <div className="absolute left-3 top-3">
          <Badge status={safeHomestay.availability}>{safeHomestay.availability}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-medium text-ink-900 dark:text-sand-50">{safeHomestay.name}</h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-sand-300">{safeHomestay.location}</p>
        <p className="mt-1 text-xs text-ink-500 dark:text-sand-400">Hosted by {safeHomestay.ownerName}</p>
        <div className="mt-2.5">
          <StarRating rating={safeHomestay.rating} reviewCount={safeHomestay.reviewCount} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {safeHomestay.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-sand-200 px-2.5 py-1 text-xs text-ink-700 dark:bg-sand-800 dark:text-sand-200">
              {a}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-medium text-ink-900">
            ${safeHomestay.price}
            <span className="text-sm font-normal text-ink-500 dark:text-sand-300"> / night</span>
          </p>
          {showBookButton && (
            onBook ? (
              <button
                onClick={onBook}
                className="rounded-xl bg-teal-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                Book now
              </button>
            ) : (
              <Link
                to={`/homestays?book=${safeHomestay.id}`}
                className="rounded-xl bg-teal-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                Book now
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import StarRating from '../shared/StarRating'
import Badge from '../shared/Badge'
import { useApp } from '../../context/AppContext'

export default function HomestayCard({ homestay, showBookButton = true, onBook }) {
  const { favoriteHomestays, toggleFavoriteHomestay } = useApp()
  const isFavorite = favoriteHomestays.includes(homestay.id)

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-44 overflow-hidden">
        <img
          src={homestay.image}
          alt={homestay.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavoriteHomestay(homestay.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-terracotta-500 shadow-sm transition-transform hover:scale-110"
        >
          {isFavorite ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
        </button>
        <div className="absolute left-3 top-3">
          <Badge status={homestay.availability}>{homestay.availability}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-medium text-ink-900">{homestay.name}</h3>
        <p className="mt-1 text-sm text-ink-500">{homestay.location}</p>
        <p className="mt-1 text-xs text-ink-500">Hosted by {homestay.ownerName}</p>
        <div className="mt-2.5">
          <StarRating rating={homestay.rating} reviewCount={homestay.reviewCount} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {homestay.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-sand-200 px-2.5 py-1 text-xs text-ink-700">
              {a}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-medium text-ink-900">
            ${homestay.price}
            <span className="text-sm font-normal text-ink-500"> / night</span>
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
                to={`/homestays?book=${homestay.id}`}
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

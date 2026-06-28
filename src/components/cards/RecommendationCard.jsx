import { Link } from 'react-router-dom'
import { FaLightbulb, FaCalendarAlt, FaWallet } from 'react-icons/fa'
import StarRating from '../shared/StarRating'

export default function RecommendationCard({ recommendation }) {
  const { destination, reason, suggestedHomestays } = recommendation

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-44 overflow-hidden">
        <img src={destination.image} alt={destination.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-medium text-ink-900">{destination.name}</h3>
          <StarRating rating={destination.rating} size={12} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-500">
          <span className="flex items-center gap-1">
            <FaWallet size={11} /> ~${destination.estimatedBudget}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt size={11} /> {destination.bestSeason}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink-500">{destination.description}</p>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-teal-50 p-3">
          <FaLightbulb className="mt-0.5 shrink-0 text-teal-600" size={14} />
          <p className="text-xs text-teal-700">{reason}</p>
        </div>

        {suggestedHomestays.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-ink-500">Suggested homestays</p>
            <div className="flex flex-col gap-2">
              {suggestedHomestays.map((h) => (
                <div key={h.id} className="flex items-center gap-3 rounded-xl bg-sand-100 p-2">
                  <img src={h.image} alt={h.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900">{h.name}</p>
                    <p className="text-xs text-ink-500">${h.price}/night · {h.rating}★</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/destination/${destination.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-terracotta-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta-600"
        >
          Explore {destination.name}
        </Link>
      </div>
    </div>
  )
}

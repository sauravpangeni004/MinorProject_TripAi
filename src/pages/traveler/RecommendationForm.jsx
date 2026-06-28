import { useState } from 'react'
import { FaMagic } from 'react-icons/fa'
import Button from '../../components/shared/Button'
import RecommendationCard from '../../components/cards/RecommendationCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import EmptyState from '../../components/shared/EmptyState'
import { travelTypes, regions } from '../../data/destinations'
import { getRecommendations } from '../../data/recommendations'

const activityOptions = ['hiking', 'food', 'culture', 'wildlife', 'relaxation']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const initialForm = {
  budget: 250,
  duration: 4,
  travelType: 'Nature',
  region: 'Any',
  activities: [],
  month: 'October',
  travelers: 2,
}

export default function RecommendationForm() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const toggleActivity = (activity) => {
    setForm((f) => ({
      ...f,
      activities: f.activities.includes(activity)
        ? f.activities.filter((a) => a !== activity)
        : [...f.activities, activity],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    // Simulated processing delay — in a real system this is where an
    // NLP/intent-extraction + sentiment-ranked backend call would happen.
    setTimeout(() => {
      setResults(getRecommendations(form))
      setLoading(false)
    }, 900)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta-500/10 text-terracotta-500">
          <FaMagic size={18} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-medium text-ink-900">AI Recommendation</h1>
          <p className="text-sm text-ink-500">Tell us your preferences and we'll rank the best-fit destinations.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-5 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Budget (USD)</label>
          <input
            type="range"
            min={50}
            max={600}
            step={10}
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: Number(e.target.value) }))}
            className="w-full accent-teal-700"
          />
          <p className="mt-1 text-sm font-medium text-teal-900">${form.budget}</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Travel duration (days)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: Number(e.target.value) }))}
            className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Travel type</label>
          <select
            value={form.travelType}
            onChange={(e) => setForm((f) => ({ ...f, travelType: e.target.value }))}
            className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          >
            {travelTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Preferred region</label>
          <select
            value={form.region}
            onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
            className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          >
            <option value="Any">Any region</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Preferred activities</label>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => toggleActivity(a)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  form.activities.includes(a) ? 'bg-teal-900 text-white' : 'bg-sand-200 text-ink-700 hover:bg-sand-200/70'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Travel month</label>
          <select
            value={form.month}
            onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))}
            className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Number of travelers</label>
          <input
            type="number"
            min={1}
            max={20}
            value={form.travelers}
            onChange={(e) => setForm((f) => ({ ...f, travelers: Number(e.target.value) }))}
            className="w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <Button type="submit" fullWidth loading={loading} icon={<FaMagic />}>
            Get recommendations
          </Button>
        </div>
      </form>

      <div className="mt-10">
        {loading && <LoadingSpinner label="Matching destinations to your preferences…" />}

        {!loading && results && results.length === 0 && (
          <EmptyState title="No strong matches found" description="Try widening your budget or region preference." />
        )}

        {!loading && results && results.length > 0 && (
          <>
            <h2 className="font-display text-lg font-medium text-ink-900">Recommended for you</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => (
                <RecommendationCard key={r.destination.id} recommendation={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

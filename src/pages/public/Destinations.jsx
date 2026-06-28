import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaMapMarkedAlt } from 'react-icons/fa'
import DestinationCard from '../../components/cards/DestinationCard'
import SearchBar from '../../components/shared/SearchBar'
import FilterSelect from '../../components/shared/FilterSelect'
import Pagination from '../../components/shared/Pagination'
import EmptyState from '../../components/shared/EmptyState'
import { CardSkeletonGrid } from '../../components/shared/SkeletonLoader'
import { destinations, travelTypes, regions } from '../../data/destinations'
import { useDelayedLoading } from '../../hooks/useDelayedLoading'

const PAGE_SIZE = 6

export default function Destinations() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [travelType, setTravelType] = useState('All')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('rating')
  const [page, setPage] = useState(1)
  const loading = useDelayedLoading([query, travelType, region, sort])

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchesQuery =
        !query ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.region.toLowerCase().includes(query.toLowerCase())
      const matchesType = travelType === 'All' || d.travelType.includes(travelType)
      const matchesRegion = region === 'All' || d.region === region
      return matchesQuery && matchesType && matchesRegion
    })

    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    if (sort === 'budget-low') result = [...result].sort((a, b) => a.estimatedBudget - b.estimatedBudget)
    if (sort === 'budget-high') result = [...result].sort((a, b) => b.estimatedBudget - a.estimatedBudget)

    return result
  }, [query, travelType, region, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilterChange = (setter) => (value) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-medium text-terracotta-500">Explore Nepal</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-ink-900 sm:text-4xl">Destinations</h1>
        <p className="mt-2 text-sm text-ink-500">Browse by region, travel style, or budget.</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-end">
        <SearchBar value={query} onChange={handleFilterChange(setQuery)} placeholder="Search destinations or regions…" className="flex-1" />
        <FilterSelect
          label="Travel type"
          value={travelType}
          onChange={handleFilterChange(setTravelType)}
          options={['All', ...travelTypes]}
        />
        <FilterSelect
          label="Region"
          value={region}
          onChange={handleFilterChange(setRegion)}
          options={['All', ...regions]}
        />
        <FilterSelect
          label="Sort by"
          value={sort}
          onChange={setSort}
          options={[
            { value: 'rating', label: 'Highest rated' },
            { value: 'budget-low', label: 'Budget: low to high' },
            { value: 'budget-high', label: 'Budget: high to low' },
          ]}
        />
      </div>

      <p className="mt-6 text-sm text-ink-500">{filtered.length} destination{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="mt-4">
        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : paginated.length === 0 ? (
          <EmptyState
            icon={<FaMapMarkedAlt />}
            title="No destinations match your filters"
            description="Try adjusting your search or clearing a filter."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </div>

      {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  )
}

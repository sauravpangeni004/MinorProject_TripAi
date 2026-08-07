import destinationsData from '../data/destinations.json'

const { destinations = [], travelTypes = [], regions = [] } = destinationsData

export function getDestinations() {
  return destinations
}

export function getDestinationById(id) {
  return destinations.find((destination) => destination.id === id) || null
}

export function getTravelTypes() {
  return travelTypes
}

export function getRegions() {
  return regions
}

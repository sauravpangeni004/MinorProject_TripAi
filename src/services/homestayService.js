import homestaysData from '../data/homestays.json'

export function getHomestays() {
  return homestaysData
}

export function getHomestayById(id) {
  return homestaysData.find((homestay) => homestay.id === id) || null
}

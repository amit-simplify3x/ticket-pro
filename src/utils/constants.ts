export const CITIES = [
  'Dubai', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Kochi', 'Goa',
  'Srinagar', 'Amritsar', 'Chandigarh', 'Lucknow', 'Varanasi',
  'Bhopal', 'Indore', 'Nagpur', 'Aurangabad', 'Nashik'
]

export const TRAVEL_CLASSES = {
  ECONOMY: { name: 'Economy', multiplier: 1, description: 'Standard seating with basic amenities' },
  BUSINESS: { name: 'Business', multiplier: 1.8, description: 'Premium seating with enhanced comfort' },
  FIRST: { name: 'First Class', multiplier: 2.5, description: 'Luxury seating with full service' }
} as const

export const ID_TYPES = [
  'Passport',
  'National ID', 
  'Driving License',
  'Voter ID',
  'Aadhaar Card'
] as const

export const BASE_FARE = 5000

export const BOOKING_STATUS = {
  CONFIRMED: 'CONFIRMED',
  PENDING: 'PENDING', 
  CANCELLED: 'CANCELLED'
} as const

export const GENDER_OPTIONS = [
  'Male',
  'Female', 
  'Other'
] as const

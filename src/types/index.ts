export interface Passenger {
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  idType: 'Passport' | 'National ID' | 'Driving License'
  idNumber: string
}

export interface Ticket {
  id: string
  serialNumber: string
  passengerName: string
  passportNumber: string
  age: number
  from: string
  to: string
  date: string
  time: string
  returnDate?: string
  returnTime?: string
  tripType: 'ONE_WAY' | 'ROUND_TRIP'
  class: 'ECONOMY' | 'BUSINESS' | 'FIRST'
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED'
  seatNumber?: string
  fare: number
  bookingDate: string
  passengers: Passenger[]
}

export interface TicketContextType {
  tickets: Ticket[]
  addTicket: (ticket: Omit<Ticket, 'id' | 'serialNumber' | 'bookingDate'>) => string
  getTicket: (id: string) => Ticket | undefined
  updateTicket: (id: string, updates: Partial<Ticket>) => void
}

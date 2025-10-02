import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Ticket, TicketContextType } from '../types'

// Re-export types for convenience
export type { Passenger, Ticket } from '../types'

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export const useTickets = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider')
  }
  return context
}

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with a test ticket for debugging
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'test-123',
      serialNumber: 'TKT123456',
      passengerName: 'John Doe',
      passportNumber: 'P123456789',
      age: 35,
      from: 'Mumbai',
      to: 'Delhi',
      date: '2024-12-01',
      time: '10:00',
      returnDate: '',
      returnTime: '',
      tripType: 'ONE_WAY',
      class: 'ECONOMY',
      status: 'CONFIRMED',
      fare: 5000,
      bookingDate: new Date().toISOString(),
      passengers: [
        {
          name: 'Jane Doe',
          age: 32,
          gender: 'Female',
          idType: 'Passport',
          idNumber: 'P987654321'
        },
        {
          name: 'Bob Smith',
          age: 28,
          gender: 'Male',
          idType: 'National ID',
          idNumber: 'N123456789'
        }
      ]
    }
  ])

  const generateId = () => Math.random().toString(36).substr(2, 9)
  const generateSerialNumber = () => `TKT${Date.now().toString().slice(-6)}`

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'serialNumber' | 'bookingDate'>) => {
    const id = generateId()
    const serialNumber = generateSerialNumber()
    const bookingDate = new Date().toISOString()
    
    const newTicket: Ticket = {
      ...ticketData,
      id,
      serialNumber,
      bookingDate
    }
    
    setTickets(prev => [...prev, newTicket])
    return id
  }

  const getTicket = (id: string) => {
    return tickets.find(ticket => ticket.id === id)
  }

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    )
  }

  return (
    <TicketContext.Provider value={{ tickets, addTicket, getTicket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  )
}

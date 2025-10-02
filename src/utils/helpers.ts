import { format, isValid } from 'date-fns'

export const formatDate = (dateString: string, formatStr: string = 'dd/MM/yyyy'): string => {
  const date = new Date(dateString)
  return isValid(date) ? format(date, formatStr) : 'Invalid Date'
}

export const formatTime = (timeString: string): string => {
  if (!timeString) return ''
  
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  
  return `${displayHour}:${minutes} ${ampm}`
}

export const generateTicketId = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}

export const generateSerialNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 3).toUpperCase()
  return `TKT${timestamp}${random}`
}

export const calculateFare = (
  basefare: number, 
  classMultiplier: number, 
  passengerCount: number
): number => {
  return Math.round(basefare * classMultiplier * passengerCount)
}

export const validatePassportNumber = (passport: string): boolean => {
  // Basic passport validation (can be enhanced based on country)
  const passportRegex = /^[A-Z0-9]{6,12}$/
  return passportRegex.test(passport.toUpperCase())
}

export const validateAge = (age: number): boolean => {
  return age >= 1 && age <= 120
}

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/
  return nameRegex.test(name.trim())
}

export const getMinDate = (): string => {
  return new Date().toISOString().split('T')[0]
}

export const getMaxDate = (): string => {
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  return maxDate.toISOString().split('T')[0]
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const downloadFile = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

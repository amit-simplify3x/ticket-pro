import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTickets } from '../context/TicketContext'
import type { Passenger } from '../types'
import { Calendar, Clock, MapPin, User, Plus, Trash2 } from 'lucide-react'
import { CITIES, TRAVEL_CLASSES, BASE_FARE } from '../utils/constants'
import { getMinDate } from '../utils/helpers'

const BookTicket = () => {
  const navigate = useNavigate()
  const { addTicket } = useTickets()
  
  const [formData, setFormData] = useState({
    passengerName: '',
    passportNumber: '',
    age: '',
    from: '',
    to: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    tripType: 'ONE_WAY' as 'ONE_WAY' | 'ROUND_TRIP',
    class: 'ECONOMY' as 'ECONOMY' | 'BUSINESS' | 'FIRST',
    fare: 0
  })

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      name: '',
      age: 0,
      gender: 'Male' as 'Male' | 'Female' | 'Other',
      idType: 'Passport' as 'Passport' | 'National ID' | 'Driving License',
      idNumber: ''
    }
  ])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const cities = CITIES

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.passengerName.trim()) newErrors.passengerName = 'Passenger name is required'
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required'
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required'
    if (!formData.from) newErrors.from = 'Departure city is required'
    if (!formData.to) newErrors.to = 'Destination city is required'
    if (formData.from === formData.to) newErrors.to = 'Destination must be different from departure'
    if (!formData.date) newErrors.date = 'Travel date is required'
    if (!formData.time) newErrors.time = 'Travel time is required'
    
    if (formData.tripType === 'ROUND_TRIP') {
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required'
      if (!formData.returnTime) newErrors.returnTime = 'Return time is required'
      if (formData.returnDate && formData.date && formData.returnDate < formData.date) {
        newErrors.returnDate = 'Return date must be after departure date'
      }
    }

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) newErrors[`passenger_${index}_name`] = 'Passenger name is required'
      if (!passenger.age || passenger.age < 1) newErrors[`passenger_${index}_age`] = 'Valid age is required'
      if (!passenger.idNumber.trim()) newErrors[`passenger_${index}_id`] = 'ID number is required'
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateFare = () => {
    const classMultiplier = TRAVEL_CLASSES[formData.class].multiplier
    const passengerCount = passengers.length
    const tripMultiplier = formData.tripType === 'ROUND_TRIP' ? 1.8 : 1
    return Math.round(BASE_FARE * classMultiplier * passengerCount * tripMultiplier)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const fare = calculateFare()
    
    const ticketId = addTicket({
      passengerName: formData.passengerName,
      passportNumber: formData.passportNumber,
      age: parseInt(formData.age),
      from: formData.from,
      to: formData.to,
      date: formData.date,
      time: formData.time,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
      tripType: formData.tripType,
      class: formData.class,
      status: 'CONFIRMED',
      fare,
      passengers
    })

    navigate(`/ticket/${ticketId}`)
  }

  const addPassenger = () => {
    setPassengers([...passengers, {
      name: '',
      age: 0,
      gender: 'Male',
      idType: 'Passport',
      idNumber: ''
    }])
  }

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index))
    }
  }

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers]
    updated[index] = { ...updated[index], [field]: value }
    setPassengers(updated)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Your Ticket</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Primary Passenger Details */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="mr-2" />
              Primary Passenger Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.passengerName}
                  onChange={(e) => setFormData({...formData, passengerName: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.passengerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.passengerName && <p className="text-red-500 text-sm mt-1">{errors.passengerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Number *
                </label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.passportNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter passport number"
                />
                {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter age"
                  min="1"
                  max="120"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" />
              Journey Details
            </h2>
            
            {/* Trip Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="tripType"
                    value="ONE_WAY"
                    checked={formData.tripType === 'ONE_WAY'}
                    onChange={(e) => setFormData({...formData, tripType: e.target.value as any, returnDate: '', returnTime: ''})}
                    className="mr-2"
                  />
                  <span className="font-medium">One Way</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="tripType"
                    value="ROUND_TRIP"
                    checked={formData.tripType === 'ROUND_TRIP'}
                    onChange={(e) => setFormData({...formData, tripType: e.target.value as any})}
                    className="mr-2"
                  />
                  <span className="font-medium">Round Trip</span>
                </label>
              </div>
            </div>
            
            {/* Departure Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From *
                </label>
                <select
                  value={formData.from}
                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.from ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select departure</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To *
                </label>
                <select
                  value={formData.to}
                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.to ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select destination</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Departure Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={getMinDate()}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Departure Time *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Return Details - Only show for Round Trip */}
            {formData.tripType === 'ROUND_TRIP' && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Return Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Return Date *
                    </label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                      min={formData.date || getMinDate()}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.returnDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Return Time *
                    </label>
                    <input
                      type="time"
                      value={formData.returnTime}
                      onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.returnTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.returnTime && <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['ECONOMY', 'BUSINESS', 'FIRST'] as const).map((classType) => (
                  <label key={classType} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="class"
                      value={classType}
                      checked={formData.class === classType}
                      onChange={(e) => setFormData({...formData, class: e.target.value as any})}
                      className="mr-2"
                    />
                    <span className="font-medium">{classType}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Passengers */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="mr-2" />
                Passengers ({passengers.length})
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Passenger
              </button>
            </div>

            {passengers.map((passenger, index) => (
              <div key={index} className="bg-white p-4 rounded-lg mb-4 border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Passenger {index + 1}</h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`passenger_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Full name"
                    />
                    {errors[`passenger_${index}_name`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_name`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                    <input
                      type="number"
                      value={passenger.age || ''}
                      onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`passenger_${index}_age`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Age"
                      min="1"
                    />
                    {errors[`passenger_${index}_age`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_age`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                    <select
                      value={passenger.idType}
                      onChange={(e) => updatePassenger(index, 'idType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Passport">Passport</option>
                      <option value="National ID">National ID</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number *</label>
                    <input
                      type="text"
                      value={passenger.idNumber}
                      onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`passenger_${index}_id`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ID number"
                    />
                    {errors[`passenger_${index}_id`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_id`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fare Summary */}
          {formData.from && formData.to && formData.class && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Fare Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Route: {formData.from} → {formData.to}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trip Type: {formData.tripType === 'ROUND_TRIP' ? 'Round Trip' : 'One Way'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class: {formData.class}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers: {passengers.length}</span>
                </div>
                {formData.tripType === 'ROUND_TRIP' && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Return Journey: {formData.to} → {formData.from}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Fare:</span>
                  <span>₹{calculateFare().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookTicket

import { X, User, Calendar, MapPin, CreditCard } from 'lucide-react'
import type { Ticket } from '../types'
import { formatDate, formatTime } from '../utils/helpers'

interface TicketDetailsModalProps {
  ticket: Ticket | null
  isOpen: boolean
  onClose: () => void
}

const TicketDetailsModal = ({ ticket, isOpen, onClose }: TicketDetailsModalProps) => {
  console.log('TicketDetailsModal - isOpen:', isOpen, 'ticket:', ticket)
  
  if (!isOpen) {
    console.log('TicketDetailsModal - Modal not open')
    return null
  }
  
  if (!ticket) {
    console.log('TicketDetailsModal - No ticket provided')
    return null
  }

  // Debug logging
  console.log('TicketDetailsModal - Rendering modal with ticket:', ticket)
  console.log('TicketDetailsModal - passengers:', ticket.passengers)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-[10000]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-blue-600 text-white rounded-t-lg">
          <div>
            <h2 className="text-2xl font-semibold">🎫 Complete Passenger Details</h2>
            <p className="text-blue-100">Barcode: {ticket.serialNumber} | 
              {ticket.passengers && ticket.passengers.length > 0 ? 
                ` ${ticket.passengers.length + 1} Total Passengers` : 
                ' 1 Passenger'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
              ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {ticket.status}
            </span>
            <span className="text-sm text-gray-500">
              Booked on {formatDate(ticket.bookingDate)}
            </span>
          </div>

          {/* Journey Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Journey Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="text-xl font-semibold">{ticket.from} → {ticket.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trip Type</p>
                  <p className="font-semibold">
                    {ticket.tripType === 'ROUND_TRIP' ? 'Round Trip' : 'One Way'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-semibold">{ticket.class}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Departure
                  </p>
                  <p className="font-semibold">{formatDate(ticket.date)} at {formatTime(ticket.time)}</p>
                </div>
                {ticket.tripType === 'ROUND_TRIP' && ticket.returnDate && (
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Return
                    </p>
                    <p className="font-semibold">
                      {formatDate(ticket.returnDate)} at {formatTime(ticket.returnTime || '')}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <CreditCard className="mr-1 h-4 w-4" />
                    Total Fare
                  </p>
                  <p className="text-xl font-bold text-green-600">₹{ticket.fare.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Passenger */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Primary Passenger
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{ticket.passengerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold">{ticket.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Passport Number</p>
                <p className="font-semibold font-mono">{ticket.passportNumber}</p>
              </div>
            </div>
          </div>

          {/* All Passengers - Enhanced Display */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Complete Passenger Details 
              {ticket.passengers && ticket.passengers.length > 0 ? 
                ` (${ticket.passengers.length} Passenger${ticket.passengers.length > 1 ? 's' : ''})` : 
                ' (Primary Passenger Only)'
              }
            </h3>
            
            {/* Always show primary passenger */}
            <div className="space-y-4 mb-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-800 text-lg">Primary Passenger</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Main Booker
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                    <p className="font-bold text-gray-900 text-lg">{ticket.passengerName}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Age</p>
                    <p className="font-bold text-gray-900 text-lg">{ticket.age} years</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Passport Number</p>
                    <p className="font-bold text-gray-900 font-mono text-sm">{ticket.passportNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional passengers */}
            {ticket.passengers && ticket.passengers.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-800 border-b pb-2">Additional Passengers</h4>
                {ticket.passengers.map((passenger, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-gray-800 text-lg">Passenger {index + 1}</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {passenger.gender}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                        <p className="font-bold text-gray-900 text-lg">{passenger.name || 'Not provided'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Age</p>
                        <p className="font-bold text-gray-900 text-lg">{passenger.age || 'Not provided'} years</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">ID Type</p>
                        <p className="font-bold text-gray-900">{passenger.idType || 'Not provided'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">ID Number</p>
                        <p className="font-bold text-gray-900 font-mono text-sm">{passenger.idNumber || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Show message if no additional passengers */}
            {(!ticket.passengers || ticket.passengers.length === 0) && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <User className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                <p className="text-blue-800 font-medium">No additional passengers</p>
                <p className="text-blue-600 text-sm">Only the primary passenger is registered for this ticket.</p>
              </div>
            )}
          </div>


          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Ticket ID</p>
                <p className="font-mono font-semibold">{ticket.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Serial Number</p>
                <p className="font-mono font-semibold">{ticket.serialNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Booking Date</p>
                <p className="font-semibold">{formatDate(ticket.bookingDate)}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Passengers</p>
                <p className="font-semibold">{ticket.passengers?.length || 1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4 rounded-b-lg">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => window.open(`/ticket/${ticket.id}`, '_blank')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              View Full Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailsModal

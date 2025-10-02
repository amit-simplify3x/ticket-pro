import { Link } from 'react-router-dom'
import { useTickets } from '../context/TicketContext'
import { Calendar, MapPin, Users, Eye, Download } from 'lucide-react'
import { formatDate } from '../utils/helpers'

const BookingHistory = () => {
  const { tickets } = useTickets()

  const formatDateDisplay = (dateString: string) => {
    return formatDate(dateString, 'dd MMM yyyy')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Bookings Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't made any bookings yet. Start your journey by booking your first ticket!
          </p>
          <Link
            to="/book"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Your First Ticket
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Booking History</h1>
        <Link
          to="/book"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Book New Ticket
        </Link>
      </div>

      <div className="grid gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Left Section - Trip Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">{ticket.from}</span>
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-2xl font-bold text-gray-800">{ticket.to}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Passenger</p>
                      <p className="font-semibold">{ticket.passengerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Travel Date</p>
                      <p className="font-semibold">{formatDateDisplay(ticket.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-semibold">{ticket.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Class</p>
                      <p className="font-semibold">{ticket.class}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{ticket.passengers?.length || 1} Passenger{(ticket.passengers?.length || 1) > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Booked on {formatDateDisplay(ticket.bookingDate)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600">₹{ticket.fare.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-2">
                  <Link
                    to={`/ticket/${ticket.id}`}
                    className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Ticket
                  </Link>
                  <button
                    onClick={() => {
                      // This would trigger PDF download directly
                      window.open(`/ticket/${ticket.id}`, '_blank')
                    }}
                    className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Ticket Serial Number */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Ticket Serial: <span className="font-mono font-semibold">{ticket.serialNumber}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingHistory

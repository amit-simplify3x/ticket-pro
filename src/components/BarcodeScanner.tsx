import { useState } from 'react'
import { useTickets } from '../context/TicketContext'
import { Scan, X, Search } from 'lucide-react'
import type { Ticket } from '../types'

interface BarcodeScannerProps {
  isOpen: boolean
  onClose: () => void
  onTicketFound: (ticket: Ticket) => void
}

const BarcodeScanner = ({ isOpen, onClose, onTicketFound }: BarcodeScannerProps) => {
  const [scannedCode, setScannedCode] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const { tickets } = useTickets()

  const handleScan = async () => {
    if (!scannedCode.trim()) {
      setError('Please enter a barcode')
      return
    }

    setIsSearching(true)
    setError('')

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const searchCode = scannedCode.trim()
    
    try {
      // Try to parse as JSON first (new format with complete data)
      const barcodeData = JSON.parse(searchCode)
      
      if (barcodeData.serial && barcodeData.primary && barcodeData.passengers) {
        console.log('Scanned complete barcode data:', barcodeData)
        
        // Create a ticket object from the barcode data
        const scannedTicket = {
          id: barcodeData.serial,
          serialNumber: barcodeData.serial,
          passengerName: barcodeData.primary.name,
          passportNumber: barcodeData.primary.passport,
          age: barcodeData.primary.age,
          from: barcodeData.journey.from,
          to: barcodeData.journey.to,
          date: barcodeData.journey.date,
          time: barcodeData.journey.time,
          returnDate: barcodeData.journey.returnDate || '',
          returnTime: barcodeData.journey.returnTime || '',
          tripType: barcodeData.journey.tripType || 'ONE_WAY',
          class: barcodeData.journey.class,
          status: barcodeData.status,
          fare: barcodeData.fare,
          bookingDate: new Date().toISOString(),
          passengers: barcodeData.passengers || []
        }
        
        console.log('Created ticket from barcode:', scannedTicket)
        console.log('Passengers from barcode:', scannedTicket.passengers)
        
        onTicketFound(scannedTicket)
        setScannedCode('')
        onClose()
        setIsSearching(false)
        return
      }
    } catch {
      // Not JSON, try as serial number (old format)
      console.log('Not JSON barcode, trying as serial number')
    }

    // Search for ticket by serial number (case insensitive) - fallback for old format
    const searchCodeUpper = searchCode.toUpperCase()
    const foundTicket = tickets.find(ticket => 
      ticket.serialNumber.toUpperCase() === searchCodeUpper || 
      ticket.id.toUpperCase() === searchCodeUpper
    )

    if (foundTicket) {
      console.log('Found ticket by serial:', foundTicket)
      console.log('Passengers in ticket:', foundTicket.passengers)
      onTicketFound(foundTicket)
      setScannedCode('')
      onClose()
    } else {
      console.log('No ticket found. Searched for:', searchCodeUpper)
      console.log('Available ticket serials:', tickets.map(t => t.serialNumber))
      setError(`No ticket found with barcode: ${scannedCode}. Available tickets: ${tickets.length}. Try one of the test buttons below.`)
    }

    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-2">
            <Scan className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Scan Barcode</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Scan className="h-12 w-12 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-2">
              Scan or enter the barcode from any TicketPro ticket to view complete passenger details
            </p>
            <p className="text-sm text-blue-600 font-medium mb-1">
              ✅ Shows ALL passenger information (names, ages, ID numbers)
            </p>
            <p className="text-xs text-green-600 font-medium">
              📱 New PDF barcodes contain complete passenger data - no internet required!
            </p>
          </div>

          {/* Manual Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode / Ticket Serial Number
              </label>
              <input
                type="text"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter barcode number (e.g., TKT123456)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSearching}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleScan}
                disabled={isSearching || !scannedCode.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Ticket
                  </div>
                )}
              </button>
              
              {/* Test buttons for debugging */}
              {tickets.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      console.log('Test button clicked - calling onTicketFound with first ticket')
                      onTicketFound(tickets[0])
                      onClose()
                    }}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                  >
                    🧪 Test: Show First Ticket Details
                  </button>
                  
                  <button
                    onClick={() => {
                      // Create test JSON barcode data matching your screenshot
                      const testBarcodeData = {
                        serial: 'TKT211934',
                        primary: {
                          name: 'afdmanwf',
                          age: 23,
                          passport: '1234567'
                        },
                        journey: {
                          from: 'Jaipur',
                          to: 'Chandigarh',
                          date: '2025-10-21',
                          time: '17:24',
                          class: 'ECONOMY',
                          tripType: 'ONE_WAY'
                        },
                        passengers: [
                          {
                            name: 'afdmanwf',
                            age: 23,
                            gender: 'Male',
                            idType: 'National ID',
                            idNumber: '1234567'
                          }
                        ],
                        fare: 5000,
                        status: 'CONFIRMED'
                      }
                      
                      const jsonString = JSON.stringify(testBarcodeData)
                      setScannedCode(jsonString)
                    }}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm"
                  >
                    🧪 Test: Your Screenshot Data (TKT211934)
                  </button>
                  
                  <button
                    onClick={() => {
                      // Test with just the serial number from screenshot
                      setScannedCode('TKT211934')
                    }}
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 text-sm"
                  >
                    🧪 Test: Serial Only (TKT211934)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Demo Codes */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Available Ticket Barcodes:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {tickets.slice(0, 5).map((ticket, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-3 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-sm font-mono text-gray-800 font-semibold">{ticket.serialNumber}</div>
                    <div className="text-xs text-gray-500">
                      {ticket.passengerName} • {ticket.from} → {ticket.to}
                      {ticket.passengers && ` • ${ticket.passengers.length} passenger${ticket.passengers.length > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <button
                    onClick={() => setScannedCode(ticket.serialNumber)}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors font-medium"
                  >
                    Scan
                  </button>
                </div>
              ))}
              {tickets.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-2">No tickets available.</p>
                  <p className="text-xs text-gray-400 mb-3">Create a booking first to test the barcode scanner.</p>
                  <button
                    onClick={() => {
                      onClose()
                      window.location.href = '/book'
                    }}
                    className="text-xs bg-green-100 text-green-700 px-3 py-2 rounded hover:bg-green-200 transition-colors"
                  >
                    Go to Book Ticket
                  </button>
                </div>
              )}
              {tickets.length > 5 && (
                <p className="text-xs text-gray-500 text-center py-2">
                  Showing first 5 tickets. Total: {tickets.length}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarcodeScanner

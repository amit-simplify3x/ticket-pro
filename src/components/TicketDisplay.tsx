import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import type { Ticket } from '../types'
import { formatDate, formatTime } from '../utils/helpers'

interface TicketDisplayProps {
  ticket: Ticket
  showPrintButton?: boolean
  onPrint?: () => void
}

const TicketDisplay = ({ ticket, showPrintButton = false, onPrint }: TicketDisplayProps) => {
  const barcodeRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (barcodeRef.current) {
      // Create comprehensive barcode data with all passenger details
      const barcodeData = {
        serial: ticket.serialNumber,
        primary: {
          name: ticket.passengerName,
          age: ticket.age,
          passport: ticket.passportNumber
        },
        journey: {
          from: ticket.from,
          to: ticket.to,
          date: ticket.date,
          time: ticket.time,
          class: ticket.class,
          tripType: ticket.tripType
        },
        passengers: ticket.passengers?.map(p => ({
          name: p.name,
          age: p.age,
          gender: p.gender,
          idType: p.idType,
          idNumber: p.idNumber
        })) || [],
        fare: ticket.fare,
        status: ticket.status
      }
      
      // Convert to compact JSON string for barcode
      const barcodeString = JSON.stringify(barcodeData)
      
      JsBarcode(barcodeRef.current, barcodeString, {
        format: "CODE128",
        width: 1,
        height: 50,
        displayValue: false, // Hide the long JSON string
        fontSize: 8,
        margin: 3
      })
      
      // Log the barcode data for debugging
      console.log('Generated barcode for ticket:', ticket.serialNumber)
      console.log('Barcode contains JSON:', barcodeString.substring(0, 100) + '...')
    }
  }, [ticket])


  return (
    <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg print:shadow-none print:border-black print:max-w-none">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 print:p-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold print:text-base">TICKET BOOKING CONFIRMATION</h1>
            <p className="text-blue-100 text-sm print:text-xs">TicketPro - Your Travel Partner</p>
          </div>
          <div className="text-right">
            <p className="text-sm print:text-xs">Ticket Serial: <span className="font-bold">{ticket.serialNumber}</span></p>
            <p className="text-sm print:text-xs">Booking Date: {formatDate(ticket.bookingDate)}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 print:p-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 print:gap-2">
          {/* Left Section - Passenger Details */}
          <div className="lg:col-span-2 space-y-4 print:space-y-2">
            {/* Primary Passenger */}
            <div className="border border-gray-300 rounded-lg p-3 print:p-2">
              <h3 className="font-bold text-base mb-2 text-gray-800 border-b pb-1 print:text-sm print:mb-1">PRIMARY PASSENGER</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Passenger Name:</p>
                  <p className="font-semibold">{ticket.passengerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age:</p>
                  <p className="font-semibold">{ticket.age}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Passport No:</p>
                  <p className="font-semibold">{ticket.passportNumber}</p>
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="border border-gray-300 rounded-lg p-3 print:p-2">
              <h3 className="font-bold text-base mb-2 text-gray-800 border-b pb-1 print:text-sm print:mb-1">JOURNEY DETAILS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">From:</p>
                  <p className="font-semibold text-lg">{ticket.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">To:</p>
                  <p className="font-semibold text-lg">{ticket.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-semibold">{formatDate(ticket.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time:</p>
                  <p className="font-semibold">{formatTime(ticket.time)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trip Type:</p>
                  <p className="font-semibold">{ticket.tripType === 'ROUND_TRIP' ? 'Round Trip' : 'One Way'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class:</p>
                  <p className="font-semibold">{ticket.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p className={`font-semibold ${
                    ticket.status === 'CONFIRMED' ? 'text-green-600' : 
                    ticket.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {ticket.status}
                  </p>
                </div>
                {ticket.tripType === 'ROUND_TRIP' && ticket.returnDate && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Return Date:</p>
                      <p className="font-semibold">{formatDate(ticket.returnDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Return Time:</p>
                      <p className="font-semibold">{formatTime(ticket.returnTime || '')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Passengers - Compact for PDF */}
            {ticket.passengers && ticket.passengers.length > 0 && (
              <div className="border border-gray-300 rounded-lg p-3 print:p-2">
                <h3 className="font-bold text-base mb-2 text-gray-800 border-b pb-1 print:text-sm print:mb-1">
                  ALL PASSENGERS ({ticket.passengers.length})
                </h3>
                <div className="space-y-2 print:space-y-1">
                  {ticket.passengers.map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded border print:p-1">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs print:text-xs">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <p className="font-semibold">{passenger.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <p className="font-semibold">{passenger.age}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Gender:</span>
                          <p className="font-semibold">{passenger.gender}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{passenger.idType}:</span>
                          <p className="font-semibold text-xs">{passenger.idNumber}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Barcode and Fare */}
          <div className="space-y-4 print:space-y-2">
            {/* Barcode */}
            <div className="border border-gray-300 rounded-lg p-3 text-center print:p-2">
              <h3 className="font-bold text-base mb-2 text-gray-800 print:text-sm print:mb-1">TICKET BARCODE</h3>
              <div className="bg-white p-2 border rounded print:p-1">
                <svg ref={barcodeRef}></svg>
              </div>
              <div className="mt-2 text-xs text-gray-600 print:text-xs">
                <p className="font-semibold text-blue-600">📱 Scan for Complete Details</p>
                <p>Contains all passenger information</p>
                <p className="font-mono text-xs mt-1">{ticket.serialNumber}</p>
                {!showPrintButton && (
                  <button
                    onClick={() => {
                      const barcodeData = {
                        serial: ticket.serialNumber,
                        primary: {
                          name: ticket.passengerName,
                          age: ticket.age,
                          passport: ticket.passportNumber
                        },
                        journey: {
                          from: ticket.from,
                          to: ticket.to,
                          date: ticket.date,
                          time: ticket.time,
                          class: ticket.class,
                          tripType: ticket.tripType
                        },
                        passengers: ticket.passengers?.map(p => ({
                          name: p.name,
                          age: p.age,
                          gender: p.gender,
                          idType: p.idType,
                          idNumber: p.idNumber
                        })) || [],
                        fare: ticket.fare,
                        status: ticket.status
                      }
                      
                      const barcodeString = JSON.stringify(barcodeData)
                      navigator.clipboard.writeText(barcodeString)
                      alert('Barcode data copied to clipboard! Paste it in the scanner to test.')
                    }}
                    className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    📋 Copy Barcode Data
                  </button>
                )}
              </div>
            </div>

            {/* Fare Details */}
            <div className="border border-gray-300 rounded-lg p-3 print:p-2">
              <h3 className="font-bold text-base mb-2 text-gray-800 border-b pb-1 print:text-sm print:mb-1">FARE DETAILS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Passengers:</span>
                  <span className="font-semibold">{ticket.passengers?.length || 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold">{ticket.class}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-lg">Total Fare:</span>
                  <span className="font-bold text-lg text-green-600">₹{ticket.fare.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Print Button */}
            {showPrintButton && (
              <button
                onClick={onPrint}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors print:hidden"
              >
                Print Ticket
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Terms & Conditions - Compact for PDF */}
      <div className="bg-yellow-50 p-3 text-center text-xs border-t print:p-2 print:text-xs">
        <div className="mb-2">
          <h4 className="font-bold text-sm mb-1 print:text-xs">TERMS & CONDITIONS</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div>
              <p className="font-semibold">Travel Requirements:</p>
              <p>• Valid ID proof mandatory</p>
              <p>• Arrive 30 min before departure</p>
            </div>
            <div>
              <p className="font-semibold">Cancellation Policy:</p>
              <p>• 24hrs before: Full refund</p>
              <p>• 12hrs before: 50% refund</p>
            </div>
            <div>
              <p className="font-semibold">Contact Support:</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ support@ticketpro.com</p>
            </div>
          </div>
        </div>
        <div className="border-t pt-2 text-xs">
          <p className="text-gray-700 mb-1">
            <strong>Important Notice:</strong> This ticket is subject to the terms and conditions established by TicketPro.
          </p>
          <p className="text-gray-600">
            Passengers are prohibited from carrying alcoholic beverages. Any passenger found carrying prohibited items will be denied travel. 
            Ticket is non-transferable and must be presented with valid photo ID. Company reserves the right to cancel or reschedule services due to unforeseen circumstances.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-2 text-center text-xs text-gray-600 border-t print:p-1">
        <p>&copy; 2024 TicketPro. All rights reserved. | Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default TicketDisplay

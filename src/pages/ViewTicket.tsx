import { useParams, Navigate } from 'react-router-dom'
import { useTickets } from '../context/TicketContext'
import { TicketDisplay } from '../components'
import { Download, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const ViewTicket = () => {
  const { id } = useParams<{ id: string }>()
  const { getTicket } = useTickets()
  
  if (!id) return <Navigate to="/" />
  
  const ticket = getTicket(id)
  
  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ticket Not Found</h2>
        <p className="text-gray-600 mb-6">The ticket you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    )
  }

  const generatePDF = async () => {
    const element = document.getElementById('ticket-content')
    if (!element) return

    try {
      // Hide print button during PDF generation
      const printButtons = element.querySelectorAll('.print\\:hidden')
      printButtons.forEach(btn => {
        (btn as HTMLElement).style.display = 'none'
      })

      // Apply print styles to match preview exactly
      document.body.classList.add('print-preview')
      
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        logging: false,
        onclone: (clonedDoc) => {
          // Apply print styles to cloned document
          const clonedElement = clonedDoc.getElementById('ticket-content')
          if (clonedElement) {
            clonedElement.style.maxWidth = 'none'
            clonedElement.style.margin = '0'
            clonedElement.style.padding = '20px'
          }
        }
      })

      // Restore print buttons and remove print mode
      printButtons.forEach(btn => {
        (btn as HTMLElement).style.display = ''
      })
      document.body.classList.remove('print-preview')

      const imgData = canvas.toDataURL('image/png', 1.0) // Full quality
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = 210 // A4 width in mm
      const pdfHeight = 297 // A4 height in mm
      const imgWidth = pdfWidth - 10 // 5mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      // Calculate if we need to split across pages (max 2 pages)
      const maxHeightPerPage = pdfHeight - 10 // 5mm margin top/bottom
      
      if (imgHeight <= maxHeightPerPage) {
        // Fits in one page
        pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight)
      } else {
        // Split into two pages
        const firstPageHeight = maxHeightPerPage
        
        // First page - show top portion
        pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight)
        
        // Second page - show bottom portion
        pdf.addPage()
        const yOffset = -firstPageHeight + 5
        pdf.addImage(imgData, 'PNG', 5, yOffset, imgWidth, imgHeight)
      }

      pdf.save(`ticket-${ticket.serialNumber}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <Link 
          to="/history" 
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
        
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Print
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Ticket Display */}
      <div id="ticket-content" className="print:max-w-none print:w-full">
        <TicketDisplay 
          ticket={ticket} 
          showPrintButton={true}
          onPrint={handlePrint}
        />
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 print:hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Booking Confirmed!
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Your ticket has been successfully booked. Please save or print this ticket for your records.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTicket

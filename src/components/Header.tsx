import { Link, useLocation } from 'react-router-dom'
import { Plane, Menu, X, LogOut, User, Scan } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import BarcodeScanner from './BarcodeScanner'
import TicketDetailsModal from './TicketDetailsModal'
import type { Ticket } from '../types'

const Header = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [scannedTicket, setScannedTicket] = useState<Ticket | null>(null)
  const [showTicketModal, setShowTicketModal] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Book Ticket', href: '/book' },
    { name: 'Booking History', href: '/history' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleTicketFound = (ticket: Ticket) => {
    console.log('Header - handleTicketFound called with ticket:', ticket)
    console.log('Header - ticket passengers:', ticket.passengers)
    setScannedTicket(ticket)
    setShowTicketModal(true)
    console.log('Header - showTicketModal set to true')
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8" />
            <span className="text-xl font-bold">TicketPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Barcode Scanner Button */}
            <button
              onClick={() => setShowScanner(true)}
              className="flex items-center space-x-2 text-blue-100 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              <Scan className="h-5 w-5" />
              <span className="text-sm font-medium">Scan</span>
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-blue-100 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{user?.username}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setShowUserMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Scan Button */}
            <button
              onClick={() => {
                setShowScanner(true)
                setIsMenuOpen(false)
              }}
              className="flex items-center w-full px-3 py-2 text-blue-100 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
            >
              <Scan className="h-4 w-4 mr-2" />
              Scan Barcode
            </button>
            
            <div className="border-t border-blue-500 mt-4 pt-4">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-blue-100">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false)
                }}
                className="flex items-center w-full px-3 py-2 text-blue-100 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onTicketFound={handleTicketFound}
      />

      {/* Ticket Details Modal */}
      <TicketDetailsModal
        ticket={scannedTicket}
        isOpen={showTicketModal}
        onClose={() => {
          setShowTicketModal(false)
          setScannedTicket(null)
        }}
      />
    </header>
  )
}

export default Header

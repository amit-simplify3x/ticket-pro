const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TicketPro</h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for hassle-free ticket booking. 
              Fast, secure, and reliable service.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/book" className="hover:text-white">Book Ticket</a></li>
              <li><a href="/history" className="hover:text-white">Booking History</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">Contact Info</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ support@ticketpro.com</p>
              <p>📍 123 Business Ave, City</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 TicketPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

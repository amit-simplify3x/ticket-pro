import { Link } from 'react-router-dom'
import { Plane, Clock, Shield, Star } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Plane className="h-8 w-8 text-blue-600" />,
      title: 'Easy Booking',
      description: 'Book your tickets in just a few clicks with our intuitive interface'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Instant Confirmation',
      description: 'Get instant booking confirmation with digital tickets'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Secure Payment',
      description: 'Your transactions are protected with bank-level security'
    },
    {
      icon: <Star className="h-8 w-8 text-blue-600" />,
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees or charges'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Fast, secure, and reliable ticket booking service
          </p>
          <Link
            to="/book"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Book Ticket Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose TicketPro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/book"
            className="flex items-center p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Plane className="h-12 w-12 text-blue-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Book New Ticket</h3>
              <p className="text-gray-600">Start your journey by booking a new ticket</p>
            </div>
          </Link>
          
          <Link
            to="/history"
            className="flex items-center p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Clock className="h-12 w-12 text-green-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">View Bookings</h3>
              <p className="text-gray-600">Check your booking history and tickets</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

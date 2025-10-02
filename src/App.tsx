import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Home, BookTicket, ViewTicket, BookingHistory, Login } from './pages'
import { TicketProvider } from './context/TicketContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/book" element={
            <ProtectedRoute>
              <Layout>
                <BookTicket />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/ticket/:id" element={
            <ProtectedRoute>
              <Layout>
                <ViewTicket />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <Layout>
                <BookingHistory />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </TicketProvider>
    </AuthProvider>
  )
}

export default App
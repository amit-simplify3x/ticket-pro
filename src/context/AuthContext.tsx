import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ticketpro_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('ticketpro_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo users for testing
    const demoUsers: Record<string, { password: string; user: User }> = {
      'admin': {
        password: 'admin123',
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@ticketpro.com',
          role: 'admin'
        }
      },
      'user': {
        password: 'user123',
        user: {
          id: '2',
          username: 'user',
          email: 'user@ticketpro.com',
          role: 'user'
        }
      },
      'demo': {
        password: 'demo123',
        user: {
          id: '3',
          username: 'demo',
          email: 'demo@ticketpro.com',
          role: 'user'
        }
      }
    }

    const userCredentials = demoUsers[username.toLowerCase()]
    
    if (userCredentials && userCredentials.password === password) {
      setUser(userCredentials.user)
      localStorage.setItem('ticketpro_user', JSON.stringify(userCredentials.user))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ticketpro_user')
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

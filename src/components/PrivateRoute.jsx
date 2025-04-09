import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <div className="text-center p-8">Checking authentication...</div>
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(window.location.pathname)}`} />
  }

  return children
}

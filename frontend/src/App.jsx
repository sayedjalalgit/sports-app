import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { useSelector } from 'react-redux'
import LoginScreen from './features/auth/LoginScreen'
import OtpScreen from './features/auth/OtpScreen'
import HomeScreen from './features/home/HomeScreen'
import HighlightsScreen from './features/highlights/HighlightsScreen'
import ProfileScreen from './features/profile/ProfileScreen'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        } />
        <Route path="/highlights" element={
          <ProtectedRoute>
            <HighlightsScreen />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}
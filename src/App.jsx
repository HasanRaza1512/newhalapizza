import AppLayout from './components/AppLayout'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App

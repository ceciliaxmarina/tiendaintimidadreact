import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import { AppProvider } from './context/AppContext'
import CartPage from './components/CartPage'
import ProductDetail from './components/ProductDetail'

function App() {

  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </AppProvider>
    </>
  )
}

export default App

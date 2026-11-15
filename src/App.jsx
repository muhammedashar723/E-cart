import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'

import Cart from './pages/Cart'
import Home from './pages/Home'
import View from './pages/View'
import Wishlist from './pages/Wishlist'

function App() {
  
  return (
    <>
     
     <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='wishlist' element={<Wishlist/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='view/:id' element={<View/>}/>
      {/* redirect to home when invalid requesr */}
      <Route path='/*' element={<Navigate to={<Home/>}/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
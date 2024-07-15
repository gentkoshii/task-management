import React from 'react'
import Homepage from './pages/Homepage.jsx'
import Navbar from './assets/Navbar.jsx'
import Footer from './assets/Footer.jsx'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  )
}

export default App
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CollectionPage from './pages/CollectionPage'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

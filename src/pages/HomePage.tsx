import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ValueProps from '../components/ValueProps'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedCollection from '../components/FeaturedCollection'
import LifestyleBanner from '../components/LifestyleBanner'
import Testimonials from '../components/Testimonials'
import EmailSignup from '../components/EmailSignup'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function HomePage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <ValueProps />
      <CategoryGrid />
      <FeaturedCollection />
      <LifestyleBanner />
      <Testimonials />
      <EmailSignup />
    </motion.div>
  )
}

/**
 * EmailSignup
 * Full-width newsletter capture section with a warm background.
 * Includes inline form with validation state and success confirmation.
 */

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    // In a real app: call your email service API here
  }

  return (
    <section className="py-16 md:py-24 bg-blush">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-mid-gray mb-3">
            Join the Community
          </p>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
            Get 15% Off Your First Order
          </h2>

          {/* Sub-copy */}
          <p className="font-sans text-base text-mid-gray leading-relaxed mb-10">
            Subscribe for exclusive access to new arrivals, interior inspiration,
            and early-bird sale notifications.
          </p>

          {submitted ? (
            /* Success state */
            <div className="flex items-center justify-center gap-3 py-5">
              <CheckCircle size={22} className="text-sage" />
              <p className="font-sans font-medium text-charcoal">
                You're in! Check your inbox for your 15% off code.
              </p>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <label htmlFor="email-signup" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Your email address"
                  className={`w-full px-5 py-4 bg-ivory border font-sans text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-charcoal transition-shadow duration-150 ${
                    error ? 'border-terracotta focus:ring-terracotta' : 'border-light-border'
                  }`}
                />
                {error && (
                  <p className="mt-1.5 text-left text-xs text-terracotta font-sans">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary flex-shrink-0 flex items-center gap-2"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Fine print */}
          <p className="mt-5 font-sans text-xs text-stone">
            No spam. Unsubscribe at any time. By subscribing you agree to our{' '}
            <a href="#" className="underline hover:text-charcoal transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

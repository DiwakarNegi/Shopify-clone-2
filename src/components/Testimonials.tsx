/**
 * Testimonials
 * Three-column grid of customer review cards.
 * Each card shows: star rating, quote excerpt, reviewer name + location,
 * and a small user-generated-style product thumbnail.
 *
 * On mobile collapses to a single-column stack.
 */

import { Star, Quote } from 'lucide-react'

interface Review {
  id: string
  rating: number
  quote: string
  author: string
  location: string
  product: string
  imageUrl: string
}

const reviews: Review[] = [
  {
    id: '1',
    rating: 5,
    quote:
      '"I spilled an entire glass of red wine on this rug during a dinner party and I just... washed it. I cannot overstate how life-changing this is."',
    author: 'Priya S.',
    location: 'Austin, TX',
    product: 'Margot 8×10 in Terracotta',
    imageUrl: 'https://placehold.co/80x80/c9b49a/3d3530?text=UGC',
  },
  {
    id: '2',
    rating: 5,
    quote:
      '"We have two Labs and a toddler. This is the only rug that has survived our house. It looks brand new after 18 months. Worth every penny."',
    author: 'Marcus & Jen T.',
    location: 'Portland, OR',
    product: 'Isla 9×12 in Natural',
    imageUrl: 'https://placehold.co/80x80/d4c8b8/3d3530?text=UGC',
  },
  {
    id: '3',
    rating: 5,
    quote:
      '"The pattern is so much better in person than online — rich, textured, and the colors are exactly as shown. Delivery was faster than expected too."',
    author: 'Aisha N.',
    location: 'Chicago, IL',
    product: 'Odette 5×8 in Sage',
    imageUrl: 'https://placehold.co/80x80/b5c4b0/3d3530?text=UGC',
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col bg-ivory border border-light-border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-terracotta text-terracotta" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote size={24} strokeWidth={1} className="text-light-border mb-3" />

      {/* Review text */}
      <p className="font-sans text-[15px] leading-relaxed text-mid-gray italic flex-1 mb-6">
        {review.quote}
      </p>

      {/* Reviewer row */}
      <div className="flex items-center gap-4 pt-5 border-t border-light-border">
        <img
          src={review.imageUrl}
          alt={`${review.author}'s rug`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <p className="font-sans font-semibold text-sm text-charcoal">
            {review.author}
          </p>
          <p className="font-sans text-xs text-stone">{review.location}</p>
          <p className="font-sans text-xs text-mid-gray mt-0.5 italic">
            {review.product}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-warm-gray">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-stone mb-3">
            50,000+ Happy Homes
          </p>
          <h2 className="font-serif text-3xl md:text-display-md font-medium text-charcoal">
            Don't Take Our Word For It
          </h2>
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-terracotta text-terracotta" />
              ))}
            </div>
            <span className="font-sans font-semibold text-charcoal">4.8</span>
            <span className="font-sans text-sm text-stone">· 52,000+ reviews</span>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="#" className="btn-ghost font-sans font-medium text-sm">
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  )
}

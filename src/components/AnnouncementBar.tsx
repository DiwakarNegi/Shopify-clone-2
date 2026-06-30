/**
 * AnnouncementBar
 * Scrolling marquee ticker at the very top of the page.
 * Duplicated text creates the seamless infinite-scroll illusion.
 */

const messages = [
  'Free Shipping on Orders $89+',
  'Machine Washable & Certified Safe',
  'New Arrivals: Summer Collection Now Live',
  'Free Returns Within 30 Days',
  'Rated 4.8 Stars by 50,000+ Customers',
]

export default function AnnouncementBar() {
  const ticker = [...messages, ...messages] // duplicate for seamless loop

  return (
    <div className="bg-charcoal text-ivory py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {ticker.map((msg, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 mx-8 font-sans text-xs tracking-widest uppercase font-medium"
          >
            {msg}
            {/* Decorative separator dot */}
            <span className="text-stone text-lg leading-none select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

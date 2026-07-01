import '../index.css'
import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'RugCo | Premium Washable Rugs',
  description: 'Machine-washable, pet-friendly, and designer-forward area rugs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-charcoal font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

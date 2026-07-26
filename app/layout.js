import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: 'OKAZI — Organisez votre événement de A à Z',
    template: '%s | OKAZI'
  },
  description: 'OKAZI est la plateforme de réservation événementielle qui vous permet de trouver, comparer et réserver tous vos prestataires en un seul endroit. Mariage, anniversaire, baby shower, séminaire.',
  keywords: ['événement', 'prestataire', 'mariage', 'anniversaire', 'traiteur', 'photographe', 'DJ', 'réservation', 'okazi'],
  authors: [{ name: 'OKAZI', url: 'https://www.okazi.fr' }],
  creator: 'OKAZI',
  publisher: 'OKAZI',
  metadataBase: new URL('https://www.okazi.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.okazi.fr',
    siteName: 'OKAZI',
    title: 'OKAZI — Organisez votre événement de A à Z',
    description: 'Trouvez, comparez et réservez tous vos prestataires événementiels en un seul endroit. Mariage, anniversaire, baby shower, séminaire.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OKAZI — La plateforme événementielle',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OKAZI — Organisez votre événement de A à Z',
    description: 'Trouvez, comparez et réservez tous vos prestataires événementiels en un seul endroit.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'À_COMPLÉTER_AVEC_GOOGLE_SEARCH_CONSOLE',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
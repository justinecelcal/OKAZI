import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      <Link href="/" className="text-lg font-semibold tracking-widest text-gray-900">
        OKAZI
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
        <Link href="/recherche" className="hover:text-gray-900 transition">
          Prestataire
        </Link>
        <Link href="/creer-evenement" className="hover:text-gray-900 transition">
          Créer mon évenement
        </Link>
        <Link href="/inscription-prestataire" className="hover:text-gray-900 transition">
          Je suis prestataire
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/connexion"
          className="text-sm text-gray-500 hover:text-gray-900 transition">
          Connexion
        </Link>
        <Link href="/creer-evenement"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Commencer →
        </Link>
      </div>
    </nav>
  )
}
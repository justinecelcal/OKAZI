import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white px-6 py-3 flex items-center justify-between sticky top-0 z-50"
      style={{borderBottom: '1px solid rgba(255,100,0,0.15)'}}>

      {/* Logo */}
      <Link href="/" className="text-lg font-semibold tracking-widest"
  style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
  OKAZI
</Link>

{/* Navigation centrale */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <Link href="/inscription-prestataire"
          style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Je suis prestataire
        </Link>
        <Link href="/recherche"
          style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Trouver un prestataire
        </Link>
        <Link href="/creer-evenement"
          style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Créer mon événement
        </Link>
      </div>

      {/* Bouton connexion */}
      <div className="flex items-center">
        <Link href="/connexion"
          className="text-sm px-4 py-2 rounded-full font-semibold"
          style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', color: 'white'}}>
          Connexion
        </Link>
      </div>
      </nav>
  )
}

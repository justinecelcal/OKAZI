import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function NotFound() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      <div className="text-center">
        <p className="text-8xl font-bold text-white mb-4">404</p>
        <h1 className="text-2xl font-semibold text-white mb-3">Page introuvable</h1>
        <p className="text-sm mb-8" style={{color: 'rgba(255,255,255,0.8)'}}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/"
            className="px-6 py-3 rounded-full font-semibold text-sm"
            style={{background: 'white', color: '#FF1493'}}>
            Retour à l'accueil →
          </Link>
          <Link href="/recherche"
            className="px-6 py-3 rounded-full font-semibold text-sm"
            style={{border: '1.5px solid white', color: 'white'}}>
            Trouver un prestataire
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <p className="font-semibold tracking-widest mb-4 text-2xl"
  style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
  OKAZI
</p>
          <p className="text-sm font-medium"
            style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            La plateforme événementielle de A à Z.
          </p>
        </div>

        <div>
          <p className="font-medium text-sm mb-3"
            style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Clients
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/creer-evenement" style={{color: '#FF1493'}}>Créer un événement</Link>
            <Link href="/recherche" style={{color: '#FF1493'}}>Trouver un prestataire</Link>
            <Link href="/dashboard" style={{color: '#FF1493'}}>Mon espace</Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3"
            style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Prestataires
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/inscription-prestataire" style={{color: '#FF1493'}}>Rejoindre OKAZI</Link>
            <Link href="/tarifs" style={{color: '#FF1493'}}>Nos formules</Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3"
            style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Légal
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/cgu" style={{color: '#FF1493'}}>CGU</Link>
            <Link href="/confidentialite" style={{color: '#FF1493'}}>Confidentialité</Link>
            <Link href="/mentions-legales" style={{color: '#FF1493'}}>Mentions légales</Link>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 text-center text-xs"
        style={{background: 'linear-gradient(135deg, #FF6000, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
        OKAZI © 2025 — Tous droits réservés
      </div>
    </footer>
  )
}
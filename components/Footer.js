import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <p className="font-semibold tracking-widest mb-4">OKAZI</p>
          <p className="text-sm text-gray-400">
            La plateforme événementielle de A à Z.
          </p>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Clients</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/creer-evenement">Créer un événement</Link>
            <Link href="/recherche">Trouver un prestataire</Link>
            <Link href="/dashboard">Mon espace</Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Prestataires</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/inscription-prestataire">Rejoindre OKAZI</Link>
            <Link href="/tarifs">Nos formules</Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Légal</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/cgu">CGU</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
          </div>
        </div>

      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-300">
        OKAZI © 2025 — Tous droits réservés
      </div>
    </footer>
  )
}
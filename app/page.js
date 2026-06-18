import Link from 'next/link'

const TYPES_EVENTS = [
  { nom: 'Mariage', icon: '💍' },
  { nom: 'Anniversaire', icon: '🎂' },
  { nom: 'Baby shower', icon: '🍼' },
  { nom: 'EVJF / EVG', icon: '🥂' },
  { nom: 'Baptême', icon: '✨' },
  { nom: 'Séminaire', icon: '💼' },
]

const CATEGORIES = [
  'Traiteur', 'Photographe', 'DJ & Musique', 'Lieu de réception',
  'Fleuriste', 'Coiffure & Maquillage', 'Pâtisserie', 'Transport',
  'Vidéaste', 'Animateur', 'Location matériel', 'Autre',
]

export default function HomePage() {
  return (
    <div>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          Organisez votre événement
          <span className="block text-gray-400">de A à Z</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Trouvez, comparez et réservez tous vos prestataires
          en un seul endroit. Planning automatique inclus.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/creer-evenement"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition">
            Créer mon événement →
          </Link>
          <Link href="/recherche"
            className="border border-gray-200 text-gray-600 px-6 py-3 rounded-xl text-sm hover:border-gray-400 transition">
            Voir les prestataires
          </Link>
        </div>
      </section>

      {/* TYPES D'ÉVÉNEMENTS */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-medium mb-6 text-center">
          Pour quel événement ?
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {TYPES_EVENTS.map(e => (
            <Link key={e.nom} href={`/creer-evenement?type=${e.nom}`}
              className="border border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition cursor-pointer bg-white">
              <div className="text-2xl mb-2">{e.icon}</div>
              <div className="text-xs text-gray-600">{e.nom}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-medium mb-6 text-center">
            Tous les prestataires dont vous avez besoin
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/recherche?categorie=${cat}`}
                className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition bg-white">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl font-medium mb-10 text-center">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n:'1', t:'Décrivez votre événement', d:"Type, date, budget, nombre d'invités" },
            { n:'2', t:'Comparez les prestataires', d:'Filtrez par gamme, note et disponibilité' },
            { n:'3', t:'Réservez en un clic', d:'Confirmez et planifiez vos RDV directement' },
            { n:'4', t:'Suivez tout en temps réel', d:'Planning, budget et rappels automatiques' },
          ].map(step => (
            <div key={step.n} className="text-center">
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium mx-auto mb-3">
                {step.n}
              </div>
              <p className="font-medium text-sm mb-1">{step.t}</p>
              <p className="text-xs text-gray-400">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
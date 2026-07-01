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
  'Lieux & Espaces',
  'Traiteurs & plus',
  'Décoration & personnalisation',
  'Ambiance & Divertissement',
  'Image & Souvenirs',
  'Mode & Beauté',
  'Transport & Mobilité',
  'Technique & Équipement',
  'Sécurité & Assurance',
]


const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function HomePage() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh'}}>

      {/* HERO */}
      <section className="px-6 pt-20 pb-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-tight mb-4 text-white">
          Organisez votre événement
          <span className="block" style={{color: 'rgba(255,255,255,0.85)'}}>de A à Z</span>
        </h1>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{color: 'rgba(255,255,255,0.9)'}}>
          Trouvez, comparez et réservez tous vos prestataires
          en un seul endroit. Planning automatique inclus.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/creer-evenement"
            className="px-6 py-3 rounded-full text-sm font-semibold"
            style={{background: 'white', color: '#FF1493'}}>
            Créer mon événement →
          </Link>
          <Link href="/recherche"
            className="px-6 py-3 rounded-full text-sm font-semibold"
            style={{border: '1.5px solid white', color: 'white'}}>
            Voir les prestataires
          </Link>
        </div>
      </section>

      {/* SÉPARATEUR */}
      <div style={{height: '0.5px', background: 'rgba(255,255,255,0.2)', margin: '0 1.5rem'}}></div>

      {/* TYPES D'ÉVÉNEMENTS */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-medium mb-6 text-center text-white">
          Pour quel événement ?
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {TYPES_EVENTS.map(e => (
            <Link key={e.nom} href={`/creer-evenement?type=${e.nom}`}
              className="rounded-xl p-4 text-center transition"
              style={{background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)'}}>
              <div className="text-2xl mb-2">{e.icon}</div>
              <div className="text-xs font-medium text-white">{e.nom}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SÉPARATEUR */}
      <div style={{height: '0.5px', background: 'rgba(255,255,255,0.2)', margin: '0 1.5rem'}}></div>

      {/* CATEGORIES */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-medium mb-6 text-center text-white">
          Tous les prestataires dont vous avez besoin
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <Link key={cat} href={`/recherche?categorie=${cat}`}
              className="text-sm px-4 py-2 rounded-full font-medium transition"
              style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* SÉPARATEUR */}
      <div style={{height: '0.5px', background: 'rgba(255,255,255,0.2)', margin: '0 1.5rem'}}></div>

      {/* COMMENT ÇA MARCHE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl font-medium mb-10 text-center text-white">
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium mx-auto mb-3"
                style={{background: 'rgba(255,255,255,0.25)', color: 'white', border: '1.5px solid white'}}>
                {step.n}
              </div>
              <p className="font-medium text-sm mb-1 text-white">{step.t}</p>
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.75)'}}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA PRESTATAIRE */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="rounded-2xl p-8 text-center"
          style={{background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="text-xl font-medium mb-3 text-white">Vous êtes prestataire ?</h2>
          <p className="text-sm mb-6" style={{color: 'rgba(255,255,255,0.85)'}}>
            Rejoignez OKAZI et accédez à des milliers de clients qui organisent leurs événements.
          </p>
          <Link href="/inscription-prestataire"
            className="px-6 py-3 rounded-full text-sm font-semibold inline-block"
            style={{background: 'white', color: '#FF1493'}}>
            Rejoindre OKAZI →
          </Link>
        </div>
      </section>

    </div>
  )
}
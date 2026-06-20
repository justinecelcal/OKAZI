'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['Traiteur', 'Photographe', 'Vidéaste', 'DJ & Musique', 'Lieu de réception', 'Fleuriste', 'Coiffure & Maquillage', 'Pâtisserie', 'Transport', 'Animateur', 'Location matériel', 'Autre']

const GAMMES = [
  { id: 'economique', label: 'Économique' },
  { id: 'milieu', label: 'Milieu de gamme' },
  { id: 'haut', label: 'Haut de gamme' },
  { id: 'luxe', label: 'Luxe' },
]

export default function InscriptionPrestataire() {
  const router = useRouter()
  const [etape, setEtape] = useState(1)
  const [data, setData] = useState({
    nom: '', categorie: '', gamme: '', description: '',
    ville: '', email: '', telephone: '',
    capacite_min: '', capacite_max: '',
  })

  function update(champ, valeur) {
    setData({ ...data, [champ]: valeur })
  }

  async function valider() {
    const { error } = await supabase.from('prestataires').insert([{
      nom: data.nom,
      categorie: data.categorie,
      gamme: data.gamme,
      description: data.description,
      ville: data.ville,
      zone: data.ville,
      email: data.email,
      telephone: data.telephone,
      capacite_min: parseInt(data.capacite_min) || 0,
      capacite_max: parseInt(data.capacite_max) || 0,
      note: 0,
      nb_avis: 0,
      verifie: false,
      plan: 'starter',
    }])

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      setEtape(4)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {etape < 4 && (
        <div className="flex items-center mb-10">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${etape >= n ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {n}
              </div>
              {n < 3 && <div className={`flex-1 h-px mx-2 ${etape > n ? 'bg-gray-900' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* ÉTAPE 1 */}
      {etape === 1 && (
        <div>
          <h1 className="text-2xl font-semibold mb-2">Votre activité</h1>
          <p className="text-gray-500 mb-6">Parlez-nous de votre entreprise.</p>
          <div className="space-y-4 mb-8">
            <input placeholder="Nom de votre entreprise"
              value={data.nom} onChange={e => update('nom', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <select value={data.categorie} onChange={e => update('categorie', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
              <option value="">Choisir une catégorie</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input placeholder="Ville"
              value={data.ville} onChange={e => update('ville', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
          </div>
          <button onClick={() => setEtape(2)} disabled={!data.nom || !data.categorie}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium disabled:opacity-30">
            Suivant →
          </button>
        </div>
      )}

      {/* ÉTAPE 2 */}
      {etape === 2 && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Votre gamme & profil</h1>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {GAMMES.map(g => (
              <button key={g.id} onClick={() => update('gamme', g.id)}
                className={`border rounded-xl p-4 text-left transition
                  ${data.gamme === g.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                {g.label}
              </button>
            ))}
          </div>
          <textarea placeholder="Décrivez votre activité..."
            value={data.description} onChange={e => update('description', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-24 mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-8">
            <input type="number" placeholder="Capacité min"
              value={data.capacite_min} onChange={e => update('capacite_min', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="number" placeholder="Capacité max"
              value={data.capacite_max} onChange={e => update('capacite_max', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEtape(1)} className="border border-gray-200 px-6 py-3 rounded-xl text-sm">← Retour</button>
            <button onClick={() => setEtape(3)} disabled={!data.gamme}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium disabled:opacity-30">
              Suivant →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 */}
      {etape === 3 && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Vos coordonnées</h1>
          <div className="space-y-4 mb-8">
            <input type="email" placeholder="Email professionnel"
              value={data.email} onChange={e => update('email', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="tel" placeholder="Téléphone"
              value={data.telephone} onChange={e => update('telephone', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEtape(2)} className="border border-gray-200 px-6 py-3 rounded-xl text-sm">← Retour</button>
            <button onClick={valider} className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium">
              Finaliser mon inscription ✓
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — SUCCÈS */}
      {etape === 4 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-semibold mb-2">Inscription envoyée !</h1>
          <p className="text-gray-500 mb-8">Votre dossier est en cours de vérification.</p>
          <button onClick={() => router.push('/recherche')}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium">
            Voir les prestataires →
          </button>
        </div>
      )}

    </div>
  )
}

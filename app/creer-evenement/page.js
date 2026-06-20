'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const TYPES = ['Mariage', 'Anniversaire', 'Baby shower', 'EVJF / EVG', 'Baptême', 'Séminaire', 'Autre']

export default function CreerEvenement() {
  const router = useRouter()
  const [etape, setEtape] = useState(1)
  const [data, setData] = useState({
    type: '',
    nom: '',
    date_evenement: '',
    lieu: '',
    nb_invites: '',
    budget: 5000,
  })

  function update(champ, valeur) {
    setData({ ...data, [champ]: valeur })
  }

  async function valider() {
    const { error } = await supabase.from('evenements').insert([{
      nom: data.nom || data.type,
      type: data.type,
      date_evenement: data.date_evenement,
      lieu: data.lieu,
      nb_invites: parseInt(data.nb_invites) || 0,
      budget: data.budget,
    }])

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      router.push('/recherche')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* BARRE DE PROGRESSION */}
      <div className="flex items-center mb-10">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${etape >= n ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {n}
            </div>
            {n < 4 && <div className={`flex-1 h-px mx-2 ${etape > n ? 'bg-gray-900' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* ÉTAPE 1 — TYPE */}
      {etape === 1 && (
        <div>
          <h1 className="text-2xl font-semibold mb-2">Quel type d'événement ?</h1>
          <p className="text-gray-500 mb-6">Choisissez la catégorie qui correspond le mieux.</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {TYPES.map(t => (
              <button key={t} onClick={() => update('type', t)}
                className={`border rounded-xl p-4 text-left transition
                  ${data.type === t ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setEtape(2)} disabled={!data.type}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium disabled:opacity-30">
            Suivant →
          </button>
        </div>
      )}

      {/* ÉTAPE 2 — DÉTAILS */}
      {etape === 2 && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Les détails</h1>
          <div className="space-y-4 mb-8">
            <input placeholder="Nom de l'événement (ex : Mariage Sophie & Marc)"
              value={data.nom} onChange={e => update('nom', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="date"
              value={data.date_evenement} onChange={e => update('date_evenement', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input placeholder="Lieu (ville)"
              value={data.lieu} onChange={e => update('lieu', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="number" placeholder="Nombre d'invités"
              value={data.nb_invites} onChange={e => update('nb_invites', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEtape(1)} className="border border-gray-200 px-6 py-3 rounded-xl text-sm">← Retour</button>
            <button onClick={() => setEtape(3)} className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium">Suivant →</button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — BUDGET */}
      {etape === 3 && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Votre budget</h1>
          <div className="mb-8">
            <p className="text-3xl font-semibold mb-4">{data.budget.toLocaleString()} €</p>
            <input type="range" min="500" max="50000" step="500"
              value={data.budget} onChange={e => update('budget', parseInt(e.target.value))}
              className="w-full" />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>500 €</span>
              <span>50 000 €</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEtape(2)} className="border border-gray-200 px-6 py-3 rounded-xl text-sm">← Retour</button>
            <button onClick={() => setEtape(4)} className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium">Suivant →</button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — RÉCAPITULATIF */}
      {etape === 4 && (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Récapitulatif</h1>
          <div className="border border-gray-200 rounded-xl p-6 mb-8 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium">{data.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Nom</span><span className="font-medium">{data.nom || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{data.date_evenement || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Lieu</span><span className="font-medium">{data.lieu || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Invités</span><span className="font-medium">{data.nb_invites || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-medium">{data.budget.toLocaleString()} €</span></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEtape(3)} className="border border-gray-200 px-6 py-3 rounded-xl text-sm">← Retour</button>
            <button onClick={valider} className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium">
              Créer mon événement ✓
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
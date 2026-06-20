'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GAMMES = [
  { id: 'economique', label: 'Économique', color: 'bg-green-50 text-green-700' },
  { id: 'milieu', label: 'Milieu de gamme', color: 'bg-blue-50 text-blue-700' },
  { id: 'haut', label: 'Haut de gamme', color: 'bg-purple-50 text-purple-700' },
  { id: 'luxe', label: 'Luxe', color: 'bg-amber-50 text-amber-700' },
]

export default function Recherche() {
  const [prestataires, setPrestataires] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtreGamme, setFiltreGamme] = useState(null)

  useEffect(() => {
    chargerPrestataires()
  }, [])

  async function chargerPrestataires() {
    setLoading(true)
    const { data, error } = await supabase.from('prestataires').select('*')
    if (!error) setPrestataires(data)
    setLoading(false)
  }

  const filtres = filtreGamme
    ? prestataires.filter(p => p.gamme === filtreGamme)
    : prestataires

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-2xl font-semibold mb-2">Trouver un prestataire</h1>
      <p className="text-gray-500 mb-8">{filtres.length} prestataires disponibles</p>

      {/* FILTRES GAMME */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setFiltreGamme(null)}
          className={`text-sm px-4 py-2 rounded-full border transition
            ${!filtreGamme ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600'}`}>
          Tous
        </button>
        {GAMMES.map(g => (
          <button key={g.id} onClick={() => setFiltreGamme(g.id)}
            className={`text-sm px-4 py-2 rounded-full border transition
              ${filtreGamme === g.id ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600'}`}>
            {g.label}
          </button>
        ))}
      </div>

      {/* LISTE */}
      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtres.map(p => {
            const gamme = GAMMES.find(g => g.id === p.gamme)
            return (
              <Link key={p.id} href={`/prestataire/${p.id}`}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{p.nom}</p>
                    <p className="text-sm text-gray-500">{p.categorie} · {p.ville}</p>
                  </div>
                  {gamme && (
                    <span className={`text-xs px-2 py-1 rounded-full ${gamme.color}`}>
                      {gamme.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{p.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-500">★ {p.note} <span className="text-gray-400">({p.nb_avis} avis)</span></span>
                  {p.verifie && <span className="text-green-600 text-xs">✓ Vérifié</span>}
                </div>
              </Link>
            )
          })}
        </div>
      )}

    </div>
  )
}
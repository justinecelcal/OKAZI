'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GAMME_LABELS = {
  economique: { label: 'Économique', color: 'bg-green-50 text-green-700' },
  milieu: { label: 'Milieu de gamme', color: 'bg-blue-50 text-blue-700' },
  haut: { label: 'Haut de gamme', color: 'bg-purple-50 text-purple-700' },
  luxe: { label: 'Luxe', color: 'bg-amber-50 text-amber-700' },
}

export default function FichePrestataire() {
  const { id } = useParams()
  const [presta, setPresta] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chargerPresta()
  }, [id])

  async function chargerPresta() {
    setLoading(true)
    const { data, error } = await supabase.from('prestataires').select('*').eq('id', id).single()
    if (!error) setPresta(data)
    setLoading(false)
  }

  if (loading) return <p className="max-w-4xl mx-auto px-6 py-12 text-gray-400">Chargement...</p>
  if (!presta) return <p className="max-w-4xl mx-auto px-6 py-12 text-gray-400">Prestataire introuvable.</p>

  const gamme = GAMME_LABELS[presta.gamme]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <Link href="/recherche" className="text-sm text-gray-400 hover:text-gray-700 mb-6 inline-block">
        ← Retour aux résultats
      </Link>

      {/* EN-TÊTE */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold">{presta.nom}</h1>
            {presta.verifie && <span className="text-green-600 text-xs">✓ Vérifié</span>}
          </div>
          <p className="text-gray-500">{presta.categorie} · {presta.ville}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-amber-500 text-sm">★ {presta.note} <span className="text-gray-400">({presta.nb_avis} avis)</span></span>
            {gamme && <span className={`text-xs px-2 py-1 rounded-full ${gamme.color}`}>{gamme.label}</span>}
          </div>
        </div>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap">
          Réserver →
        </button>
      </div>

      {/* DESCRIPTION */}
      <div className="border border-gray-200 rounded-xl p-6 mb-4">
        <h2 className="font-medium mb-3">À propos</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{presta.description}</p>
      </div>

      {/* INFOS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-medium mb-3">Informations</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Zone</span><span>{presta.zone}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Capacité</span><span>{presta.capacite_min} - {presta.capacite_max} pers.</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Expérience</span><span>{presta.annees_experience} ans</span></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-medium mb-3">Contact</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Email</span><span>{presta.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Téléphone</span><span>{presta.telephone}</span></div>
          </div>
        </div>
      </div>

    </div>
  )
}

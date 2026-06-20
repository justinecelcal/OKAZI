'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Dashboard() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chargerEvenements()
  }, [])

  async function chargerEvenements() {
    setLoading(true)
    const { data, error } = await supabase.from('evenements').select('*').order('created_at', { ascending: false })
    if (!error) setEvenements(data)
    setLoading(false)
  }

  const totalBudget = evenements.reduce((acc, e) => acc + (parseFloat(e.budget) || 0), 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-2xl font-semibold mb-2">Mon espace</h1>
      <p className="text-gray-500 mb-8">Suivez tous vos événements en un coup d'œil.</p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold">{evenements.length}</p>
          <p className="text-sm text-gray-400">Événements créés</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold">{totalBudget.toLocaleString()} €</p>
          <p className="text-sm text-gray-400">Budget total</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold">0</p>
          <p className="text-sm text-gray-400">Prestataires réservés</p>
        </div>
      </div>

      {/* LISTE ÉVÉNEMENTS */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Mes événements</h2>
        <Link href="/creer-evenement" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg">
          + Créer un événement
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : evenements.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">Vous n'avez pas encore créé d'événement.</p>
          <Link href="/creer-evenement" className="text-sm text-gray-900 underline">
            Créer mon premier événement →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {evenements.map(e => (
            <div key={e.id} className="border border-gray-200 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="font-medium">{e.nom}</p>
                <p className="text-sm text-gray-400">
                  {e.type} · {e.lieu || 'Lieu non défini'} · {e.date_evenement || 'Date non définie'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{parseFloat(e.budget).toLocaleString()} €</p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                  {e.statut === 'en_cours' ? 'En cours' : e.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Dashboard() {
  const [evenements, setEvenements] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chargerDonnees()
  }, [])

  async function chargerDonnees() {
    setLoading(true)
    const { data: e } = await supabase.from('evenements').select('*').order('created_at', { ascending: false })
    const { data: r } = await supabase.from('reservations').select('*, prestataires(nom, categorie, gamme), evenements(nom)').order('created_at', { ascending: false })
    setEvenements(e || [])
    setReservations(r || [])
    setLoading(false)
  }

  const totalBudget = evenements.reduce((acc, e) => acc + (parseFloat(e.budget) || 0), 0)

  const STATUTS = {
    en_attente: { label: 'En attente', color: 'bg-amber-50 text-amber-700' },
    confirme: { label: 'Confirmé', color: 'bg-green-50 text-green-700' },
    refuse: { label: 'Refusé', color: 'bg-red-50 text-red-700' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-2xl font-semibold mb-2 text-gray-900">Mon espace</h1>
      <p className="text-gray-500 mb-8">Suivez tous vos événements en un coup d'œil.</p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold text-gray-900">{evenements.length}</p>
          <p className="text-sm text-gray-400">Événements créés</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold text-gray-900">{totalBudget.toLocaleString()} €</p>
          <p className="text-sm text-gray-400">Budget total</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-2xl font-semibold text-gray-900">{reservations.length}</p>
          <p className="text-sm text-gray-400">Prestataires réservés</p>
        </div>
      </div>

      {/* RÉSERVATIONS */}
      <div className="mb-10">
        <h2 className="font-medium mb-4 text-gray-900">Mes réservations</h2>
        {reservations.length === 0 ? (
          <p className="text-sm text-gray-400">Aucune réservation pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {reservations.map(r => {
              const statut = STATUTS[r.statut] || STATUTS.en_attente
              return (
                <div key={r.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{r.prestataires?.nom}</p>
                    <p className="text-sm text-gray-400">
                      {r.prestataires?.categorie} · pour « {r.evenements?.nom} »
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statut.color}`}>
                    {statut.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ÉVÉNEMENTS */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-900">Mes événements</h2>
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
                <p className="font-medium text-gray-900">{e.nom}</p>
                <p className="text-sm text-gray-400">
                  {e.type} · {e.lieu || 'Lieu non défini'} · {e.date_evenement || 'Date non définie'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{parseFloat(e.budget).toLocaleString()} €</p>
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
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [presta, setPresta] = useState(null)
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOuvert, setModalOuvert] = useState(false)
  const [evenementChoisi, setEvenementChoisi] = useState('')
  const [reservationFaite, setReservationFaite] = useState(false)

  useEffect(() => {
    chargerDonnees()
  }, [id])

  async function chargerDonnees() {
    setLoading(true)
    const { data: p } = await supabase.from('prestataires').select('*').eq('id', id).single()
    const { data: e } = await supabase.from('evenements').select('*').order('created_at', { ascending: false })
    setPresta(p)
    setEvenements(e || [])
    setLoading(false)
  }

  async function confirmerReservation() {
    if (!evenementChoisi) {
      alert('Choisissez un événement.')
      return
    }
    const { error } = await supabase.from('reservations').insert([{
      evenement_id: evenementChoisi,
      prestataire_id: id,
      statut: 'en_attente',
    }])

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      setModalOuvert(false)
      setReservationFaite(true)
    }
  }

  if (loading) return <p className="max-w-4xl mx-auto px-6 py-12 text-gray-400">Chargement...</p>
  if (!presta) return <p className="max-w-4xl mx-auto px-6 py-12 text-gray-400">Prestataire introuvable.</p>

  const gamme = GAMME_LABELS[presta.gamme]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <Link href="/recherche" className="text-sm text-gray-400 hover:text-gray-700 mb-6 inline-block">
        ← Retour aux résultats
      </Link>

      {reservationFaite && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center justify-between">
          <span>✓ Demande de réservation envoyée à {presta.nom} !</span>
          <Link href="/dashboard" className="text-sm underline">Voir mon espace →</Link>
        </div>
      )}

      {/* EN-TÊTE */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{presta.nom}</h1>
            {presta.verifie && <span className="text-green-600 text-xs">✓ Vérifié</span>}
          </div>
          <p className="text-gray-500">{presta.categorie} · {presta.ville}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-amber-500 text-sm">★ {presta.note} <span className="text-gray-400">({presta.nb_avis} avis)</span></span>
            {gamme && <span className={`text-xs px-2 py-1 rounded-full ${gamme.color}`}>{gamme.label}</span>}
          </div>
        </div>
        <button onClick={() => setModalOuvert(true)}
          className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap">
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

      {/* MODAL RÉSERVATION */}
      {modalOuvert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="font-medium text-lg mb-4">Réserver {presta.nom}</h2>

            {evenements.length === 0 ? (
              <div>
                <p className="text-sm text-gray-500 mb-4">Vous n'avez pas encore créé d'événement.</p>
                <Link href="/creer-evenement" className="text-sm text-gray-900 underline">
                  Créer un événement →
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-3">Pour quel événement ?</p>
                <div className="space-y-2 mb-6">
                  {evenements.map(e => (
                    <button key={e.id} onClick={() => setEvenementChoisi(e.id)}
                      className={`w-full text-left border rounded-xl p-3 text-sm transition
                        ${evenementChoisi === e.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                      {e.nom} · {e.type}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModalOuvert(false)}
                    className="border border-gray-200 px-4 py-2 rounded-xl text-sm flex-1">
                    Annuler
                  </button>
                  <button onClick={confirmerReservation}
                    className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm flex-1">
                    Confirmer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
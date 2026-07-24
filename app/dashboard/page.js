'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Dashboard() {
  const [evenements, setEvenements] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [onglet, setOnglet] = useState('overview')

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
    en_attente: { label: 'En attente', bg: 'rgba(255,255,255,0.2)', color: 'white' },
    confirme: { label: 'Confirmé', bg: 'rgba(0,255,150,0.3)', color: 'white' },
    refuse: { label: 'Refusé', bg: 'rgba(255,0,0,0.3)', color: 'white' },
  }

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'planning', label: 'Planning J-Day' },
    { id: 'rdv', label: 'Mes RDV' },
    { id: 'reservations', label: 'Prestataires' },
    { id: 'rappels', label: '🔔 Rappels' },
  ]

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1">Mon espace</h1>
          <p style={{color: 'rgba(255,255,255,0.8)'}}>Suivez tous vos événements en un coup d'œil.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
            <p className="text-3xl font-semibold text-white">{evenements.length}</p>
            <p className="text-sm" style={{color: 'rgba(255,255,255,0.8)'}}>Événements créés</p>
          </div>
          <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
            <p className="text-3xl font-semibold text-white">{totalBudget.toLocaleString()} €</p>
            <p className="text-sm" style={{color: 'rgba(255,255,255,0.8)'}}>Budget total</p>
          </div>
          <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
            <p className="text-3xl font-semibold text-white">{reservations.length}</p>
            <p className="text-sm" style={{color: 'rgba(255,255,255,0.8)'}}>Prestataires réservés</p>
          </div>
        </div>

        {/* ONGLETS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(o => (
            <button key={o.id} onClick={() => setOnglet(o.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition"
              style={{
                background: onglet === o.id ? 'white' : 'rgba(255,255,255,0.2)',
                color: onglet === o.id ? '#FF1493' : 'white'
              }}>
              {o.label}
            </button>
          ))}
        </div>

        {/* VUE D'ENSEMBLE */}
        {onglet === 'overview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium text-white">Mes événements</h2>
              <Link href="/creer-evenement"
                className="text-sm px-4 py-2 rounded-full font-semibold"
                style={{background: 'white', color: '#FF1493'}}>
                + Créer un événement
              </Link>
            </div>

            {loading ? (
              <p style={{color: 'rgba(255,255,255,0.7)'}}>Chargement...</p>
            ) : evenements.length === 0 ? (
              <div className="rounded-2xl p-12 text-center" style={{background: 'rgba(255,255,255,0.15)'}}>
                <p className="text-white mb-4">Vous n'avez pas encore créé d'événement.</p>
                <Link href="/creer-evenement"
                  className="text-sm px-4 py-2 rounded-full font-semibold"
                  style={{background: 'white', color: '#FF1493'}}>
                  Créer mon premier événement →
                </Link>
              </div>
            ) : (
              evenements.map(e => (
                <div key={e.id} className="rounded-2xl p-5 flex items-center justify-between"
                  style={{background: 'rgba(255,255,255,0.15)'}}>
                  <div>
                    <p className="font-medium text-white">{e.nom}</p>
                    <p className="text-sm" style={{color: 'rgba(255,255,255,0.75)'}}>
                      {e.type} · {e.lieu || 'Lieu non défini'} · {e.date_evenement || 'Date non définie'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{parseFloat(e.budget).toLocaleString()} €</p>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{background: 'rgba(255,255,255,0.25)', color: 'white'}}>
                      En cours
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PLANNING J-DAY */}
        {onglet === 'planning' && (
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Planning du Grand Jour</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>
              Le planning de votre grand jour sera généré automatiquement une fois vos prestataires réservés et confirmés.
            </p>
            <div className="mt-4 space-y-3">
              {reservations.filter(r => r.statut === 'confirme').length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white mb-2">Aucun prestataire confirmé pour l'instant.</p>
                  <Link href="/recherche"
                    className="text-sm px-4 py-2 rounded-full font-semibold"
                    style={{background: 'white', color: '#FF1493'}}>
                    Trouver des prestataires →
                  </Link>
                </div>
              ) : (
                reservations.filter(r => r.statut === 'confirme').map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="w-2 h-2 rounded-full bg-white flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm font-medium">{r.prestataires?.nom}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>{r.prestataires?.categorie}</p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full"
                      style={{background: 'rgba(0,255,150,0.3)', color: 'white'}}>
                      Confirmé
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MES RDV */}
        {onglet === 'rdv' && (
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes rendez-vous avant le grand jour</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '1rem'}}>
              Gérez ici tous vos rendez-vous avec vos prestataires avant votre événement.
            </p>
            {reservations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white mb-2">Aucun rendez-vous planifié.</p>
                <Link href="/recherche"
                  className="text-sm px-4 py-2 rounded-full font-semibold"
                  style={{background: 'white', color: '#FF1493'}}>
                  Trouver des prestataires →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map(r => {
                  const statut = STATUTS[r.statut] || STATUTS.en_attente
                  return (
                    <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl"
                      style={{background: 'rgba(255,255,255,0.15)'}}>
                      <div className="flex-1">
                        <p className="text-white font-medium">{r.prestataires?.nom}</p>
                        <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                          {r.prestataires?.categorie} · pour « {r.evenements?.nom} »
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{background: statut.bg, color: statut.color}}>
                        {statut.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PRESTATAIRES RÉSERVÉS */}
        {onglet === 'reservations' && (
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes prestataires réservés</h2>
            {reservations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white mb-2">Aucun prestataire réservé.</p>
                <Link href="/recherche"
                  className="text-sm px-4 py-2 rounded-full font-semibold"
                  style={{background: 'white', color: '#FF1493'}}>
                  Trouver des prestataires →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map(r => {
                  const statut = STATUTS[r.statut] || STATUTS.en_attente
                  return (
                    <div key={r.id} className="flex items-center justify-between p-4 rounded-xl"
                      style={{background: 'rgba(255,255,255,0.15)'}}>
                      <div>
                        <p className="text-white font-medium">{r.prestataires?.nom}</p>
                        <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                          {r.prestataires?.categorie} · {r.prestataires?.gamme}
                        </p>
                        <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                          Événement : {r.evenements?.nom}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{background: statut.bg, color: statut.color}}>
                        {statut.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* RAPPELS */}
        {onglet === 'rappels' && (
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">🔔 Mes rappels & notifications</h2>
            <p className="text-sm mb-6" style={{color: 'rgba(255,255,255,0.7)'}}>
              Configurez comment et quand vous souhaitez être notifié pour vos événements et rendez-vous.
            </p>
            <Link href="/dashboard/rappels"
              className="px-6 py-3 rounded-full text-sm font-semibold inline-block"
              style={{background: 'white', color: '#FF1493'}}>
              Gérer mes rappels →
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
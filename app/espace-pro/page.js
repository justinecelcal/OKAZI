'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function EspacePro() {
  const [onglet, setOnglet] = useState('overview')
  const [presta, setPresta] = useState(null)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chargerDonnees()
  }, [])

  async function chargerDonnees() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: p } = await supabase.from('prestataires').select('*').eq('email', user.email).single()
    const { data: r } = await supabase.from('reservations').select('*, evenements(nom, type, date_evenement, nb_invites, budget)').eq('prestataire_id', p?.id)
    setPresta(p)
    setReservations(r || [])
    setLoading(false)
  }

  async function updateStatut(id, statut) {
    await supabase.from('reservations').update({ statut }).eq('id', id)
    chargerDonnees()
  }

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'rdv', label: 'Planning RDV' },
    { id: 'reservations', label: 'Réservations' },
    { id: 'disponibilites', label: 'Disponibilités' },
    { id: 'formules', label: 'Mes formules' },
    { id: 'photos', label: 'Photos & Portfolio' },
    { id: 'messagerie', label: 'Messagerie' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'documents', label: 'Documents' },
  ]

  if (loading) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p className="text-white">Chargement...</p>
    </div>
  )

  if (!presta) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      <div className="text-center">
        <p className="text-white text-lg mb-4">Vous n'avez pas encore de compte prestataire.</p>
        <Link href="/inscription-prestataire"
          className="px-6 py-3 rounded-full font-semibold text-sm"
          style={{background: 'white', color: '#FF1493'}}>
          Créer mon compte prestataire →
        </Link>
      </div>
    </div>
  )

  const nbConfirmes = reservations.filter(r => r.statut === 'confirme').length
  const nbEnAttente = reservations.filter(r => r.statut === 'en_attente').length

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-semibold text-white">{presta.nom}</h1>
              <span className="text-xs px-2 py-1 rounded-full font-semibold"
                style={{background: 'white', color: '#FF1493'}}>PRO</span>
              {presta.verifie && (
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{background: 'rgba(0,255,150,0.3)', color: 'white'}}>✓ Vérifié</span>
              )}
            </div>
            <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '13px'}}>
              {presta.categorie} · {presta.ville}
            </p>
          </div>
          <Link href={`/prestataire/${presta.id}`}
            className="text-sm px-4 py-2 rounded-full font-semibold"
            style={{background: 'white', color: '#FF1493'}}>
            Voir ma fiche →
          </Link>
        </div>

        {/* ONGLETS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setOnglet(t.id)}
              className="px-3 py-2 rounded-full text-xs font-medium transition"
              style={{
                background: onglet === t.id ? 'white' : 'rgba(255,255,255,0.2)',
                color: onglet === t.id ? '#FF1493' : 'white'
              }}>
              {t.label}
              {t.id === 'reservations' && nbEnAttente > 0 && (
                <span className="ml-1 text-xs bg-yellow-400 text-black rounded-full px-1">{nbEnAttente}</span>
              )}
            </button>
          ))}
        </div>

        {/* VUE D'ENSEMBLE */}
        {onglet === 'overview' && (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { val: reservations.length, lbl: 'Réservations totales' },
                { val: nbConfirmes, lbl: 'Confirmées' },
                { val: nbEnAttente, lbl: 'En attente' },
                { val: presta.note || 0, lbl: `Note (${presta.nb_avis || 0} avis)` },
              ].map((k, i) => (
                <div key={i} className="rounded-2xl p-4 text-center"
                  style={{background: 'rgba(255,255,255,0.2)'}}>
                  <p className="text-2xl font-semibold text-white">{k.val}</p>
                  <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{k.lbl}</p>
                </div>
              ))}
            </div>

            {/* NOUVELLES DEMANDES */}
            <div className="rounded-2xl p-5 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
              <h2 className="font-medium text-white mb-4">
                Nouvelles demandes
                {nbEnAttente > 0 && (
                  <span className="ml-2 text-xs bg-yellow-400 text-black rounded-full px-2 py-0.5">{nbEnAttente}</span>
                )}
              </h2>
              {reservations.filter(r => r.statut === 'en_attente').length === 0 ? (
                <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Aucune nouvelle demande.</p>
              ) : (
                reservations.filter(r => r.statut === 'en_attente').map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                        {r.evenements?.type} · {r.evenements?.date_evenement || 'Date non définie'} · {r.evenements?.nb_invites || '?'} pers.
                      </p>
                    </div>
                    <button onClick={() => updateStatut(r.id, 'confirme')}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{background: 'rgba(0,255,150,0.4)', color: 'white'}}>
                      ✓ Accepter
                    </button>
                    <button onClick={() => updateStatut(r.id, 'refuse')}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{background: 'rgba(255,50,50,0.3)', color: 'white'}}>
                      ✕ Refuser
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* RÉSERVATIONS CONFIRMÉES */}
            <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
              <h2 className="font-medium text-white mb-4">Réservations confirmées</h2>
              {reservations.filter(r => r.statut === 'confirme').length === 0 ? (
                <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Aucune réservation confirmée.</p>
              ) : (
                reservations.filter(r => r.statut === 'confirme').map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                        {r.evenements?.type} · {r.evenements?.date_evenement || 'Date non définie'}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{background: 'rgba(0,255,150,0.3)', color: 'white'}}>
                      Confirmé ✓
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PLANNING RDV */}
        {onglet === 'rdv' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Planning de mes rendez-vous clients</h2>
            {reservations.length === 0 ? (
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Aucun rendez-vous planifié.</p>
            ) : (
              <div className="space-y-3">
                {reservations.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{background: r.statut === 'confirme' ? '#00FF96' : '#FFD700'}}></div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                        {r.evenements?.type} · {r.evenements?.date_evenement || 'Date à confirmer'} · {r.evenements?.nb_invites || '?'} pers.
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: r.statut === 'confirme' ? 'rgba(0,255,150,0.3)' : 'rgba(255,200,0,0.3)',
                        color: 'white'
                      }}>
                      {r.statut === 'confirme' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RÉSERVATIONS */}
        {onglet === 'reservations' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Toutes mes réservations</h2>
            {reservations.length === 0 ? (
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Aucune réservation.</p>
            ) : (
              <div className="space-y-3">
                {reservations.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                        {r.evenements?.type} · {r.evenements?.date_evenement || 'Date non définie'} · Budget : {r.evenements?.budget ? parseFloat(r.evenements.budget).toLocaleString() + ' €' : 'Non défini'}
                      </p>
                    </div>
                    {r.statut === 'en_attente' && (
                      <div className="flex gap-2">
                        <button onClick={() => updateStatut(r.id, 'confirme')}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{background: 'rgba(0,255,150,0.4)', color: 'white'}}>
                          ✓ Accepter
                        </button>
                        <button onClick={() => updateStatut(r.id, 'refuse')}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{background: 'rgba(255,50,50,0.3)', color: 'white'}}>
                          ✕ Refuser
                        </button>
                      </div>
                    )}
                    {r.statut !== 'en_attente' && (
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: r.statut === 'confirme' ? 'rgba(0,255,150,0.3)' : 'rgba(255,50,50,0.3)',
                          color: 'white'
                        }}>
                        {r.statut === 'confirme' ? 'Confirmé ✓' : 'Refusé ✕'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DISPONIBILITÉS */}
        {onglet === 'disponibilites' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Gérer mes disponibilités</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '1rem'}}>
              Indiquez vos dates disponibles et indisponibles pour que les clients puissent réserver en temps réel.
            </p>
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(255,255,255,0.1)'}}>
              <p className="text-white text-sm mb-2">📅 Calendrier interactif</p>
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>
                La gestion complète du calendrier sera disponible prochainement.
              </p>
            </div>
          </div>
        )}

        {/* FORMULES */}
        {onglet === 'formules' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes formules & tarifs</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '1rem'}}>
              Modifiez vos formules directement ici — elles seront mises à jour sur votre fiche publique.
            </p>
            <div className="space-y-3">
              {['Essentiel', 'Prestige', 'Excellence'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl"
                  style={{background: 'rgba(255,255,255,0.15)'}}>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{f}</p>
                    <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Cliquez pour modifier</p>
                  </div>
                  <button className="text-xs px-3 py-1 rounded-full"
                    style={{background: 'white', color: '#FF1493'}}>
                    Modifier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOS & PORTFOLIO */}
        {onglet === 'photos' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Photos & Portfolio</h2>

            {/* PHOTO DE PROFIL */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white mb-3">Photo de profil / Logo</p>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{background: 'rgba(255,255,255,0.25)', color: 'white'}}>
                  {presta.nom?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <input type="file" accept="image/*" className="hidden" id="photo-profil" />
                  <label htmlFor="photo-profil"
                    className="text-sm px-4 py-2 rounded-full font-semibold cursor-pointer"
                    style={{background: 'white', color: '#FF1493'}}>
                    📷 Changer la photo
                  </label>
                  <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.6)'}}>JPG, PNG · Max 5MB</p>
                </div>
              </div>
            </div>

            {/* PHOTOS DE PRÉSENTATION */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white mb-3">Photos de présentation</p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer"
                    style={{background: 'rgba(255,255,255,0.15)', border: '2px dashed rgba(255,255,255,0.3)'}}>
                    <span className="text-2xl mb-1">📸</span>
                    <span className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Ajouter</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PORTFOLIO ÉVÉNEMENTS */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Portfolio — Événements réalisés</p>
                <button className="text-xs px-3 py-1 rounded-full"
                  style={{background: 'white', color: '#FF1493'}}>
                  + Ajouter
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Mariage Dupont — Juin 2025', 'Anniversaire Martin — Mai 2025'].map((evt, i) => (
                  <div key={i} className="rounded-xl overflow-hidden"
                    style={{background: 'rgba(255,255,255,0.15)'}}>
                    <div className="h-24 flex items-center justify-center"
                      style={{background: 'rgba(255,255,255,0.1)'}}>
                      <span className="text-3xl">🎉</span>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-xs font-medium">{evt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGERIE */}
        {onglet === 'messagerie' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Messagerie clients</h2>
            <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>
              La messagerie en temps réel sera disponible prochainement.
            </p>
          </div>
        )}

        {/* STATISTIQUES */}
        {onglet === 'stats' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes statistiques</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: reservations.length, lbl: 'Total réservations' },
                { val: nbConfirmes, lbl: 'Confirmées' },
                { val: presta.note || 0, lbl: 'Note moyenne' },
                { val: presta.nb_avis || 0, lbl: 'Avis clients' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center"
                  style={{background: 'rgba(255,255,255,0.15)'}}>
                  <p className="text-2xl font-semibold text-white">{s.val}</p>
                  <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.7)'}}>{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {onglet === 'documents' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes documents</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '1rem'}}>
              Uploadez vos contrats types, devis et autres documents professionnels.
            </p>
            <div className="rounded-xl p-8 text-center"
              style={{background: 'rgba(255,255,255,0.1)', border: '2px dashed rgba(255,255,255,0.3)'}}>
              <p className="text-3xl mb-2">📄</p>
              <p className="text-white text-sm mb-2">Glissez vos fichiers ici</p>
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>PDF, Word · Max 10MB</p>
              <button className="mt-3 text-sm px-4 py-2 rounded-full font-semibold"
                style={{background: 'white', color: '#FF1493'}}>
                Parcourir les fichiers
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
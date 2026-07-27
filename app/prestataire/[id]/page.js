'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

const GAMME_LABELS = {
  economique: { label: 'Économique', color: '#dcfce7', text: '#166534' },
  milieu: { label: 'Milieu de gamme', color: '#dbeafe', text: '#1e40af' },
  haut: { label: 'Haut de gamme', color: '#f3e8ff', text: '#6b21a8' },
  luxe: { label: 'Luxe', color: '#fef9c3', text: '#854d0e' },
}

export default function FichePrestataire() {
  const { id } = useParams()
  const searchParams = useSearchParams()
const modePro = searchParams.get('mode') === 'pro'
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
    if (!evenementChoisi) { alert('Choisissez un événement.'); return }
    const { error } = await supabase.from('reservations').insert([{
      evenement_id: evenementChoisi,
      prestataire_id: id,
      statut: 'en_attente',
    }])
    if (error) { alert('Erreur : ' + error.message) }
    else { setModalOuvert(false); setReservationFaite(true) }
  }

  if (loading) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p className="text-white">Chargement...</p>
    </div>
  )

  if (!presta) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p className="text-white">Prestataire introuvable.</p>
    </div>
  )

  const gamme = GAMME_LABELS[presta.gamme]

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-4xl mx-auto">

        <Link href="/recherche" className="text-sm mb-6 inline-block"
          style={{color: 'rgba(255,255,255,0.8)'}}>
          ← Retour aux résultats
        </Link>

        {reservationFaite && (
          <div className="rounded-xl p-4 mb-6 flex items-center justify-between"
            style={{background: 'rgba(0,255,150,0.2)', border: '1px solid rgba(0,255,150,0.4)'}}>
            <span className="text-white text-sm">✓ Demande de réservation envoyée à {presta.nom} !</span>
            <Link href="/dashboard" className="text-sm text-white underline">Voir mon espace →</Link>
          </div>
        )}

        {/* EN-TÊTE */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                style={{background: GRADIENT}}>
                {presta.nom?.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-semibold" style={{color: '#1a1a1a'}}>{presta.nom}</h1>
                  {presta.verifie && (
                    <span className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{background: '#dcfce7', color: '#166534'}}>
                      ✅ Certifié OKAZI
                    </span>
                  )}
                  {!presta.verifie && (
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{background: '#f3f4f6', color: '#6b7280'}}>
                      👤 Membre OKAZI
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{presta.categorie} · {presta.ville}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm" style={{color: '#FF6000'}}>
                    ★ {presta.note} <span className="text-gray-400">({presta.nb_avis} avis)</span>
                  </span>
                  {gamme && (
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{background: gamme.color, color: gamme.text}}>
                      {gamme.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => setModalOuvert(true)}
              className="text-white px-6 py-3 rounded-full text-sm font-semibold"
              style={{background: GRADIENT}}>
              Réserver →
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{presta.description}</p>

          {/* INFOS */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl p-4" style={{background: '#f9fafb'}}>
              <h3 className="font-medium text-sm mb-3" style={{color: '#1a1a1a'}}>Informations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Zone</span>
                  <span className="text-gray-700">{presta.zone || presta.ville}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Capacité</span>
                  <span className="text-gray-700">{presta.capacite_min} - {presta.capacite_max} pers.</span>
                </div>
                {presta.annees_experience && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expérience</span>
                    <span className="text-gray-700">{presta.annees_experience} ans</span>
                  </div>
                )}
                {presta.delai_reponse && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Réponse sous</span>
                    <span className="text-gray-700">{presta.delai_reponse}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-xl p-4" style={{background: '#f9fafb'}}>
              <h3 className="font-medium text-sm mb-3" style={{color: '#1a1a1a'}}>Contact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-gray-700">{presta.email}</span>
                </div>
                {presta.telephone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Téléphone</span>
                    <span className="text-gray-700">{presta.telephone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RÉSEAUX SOCIAUX */}
          {(presta.instagram || presta.facebook || presta.tiktok || presta.youtube) && (
            <div className="flex gap-3 flex-wrap">
              {presta.instagram && (
                <a href={presta.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{background: '#f3f4f6', color: '#374151'}}>
                  📷 Instagram
                </a>
              )}
              {presta.facebook && (
                <a href={presta.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{background: '#f3f4f6', color: '#374151'}}>
                  📘 Facebook
                </a>
              )}
              {presta.tiktok && (
                <a href={presta.tiktok} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{background: '#f3f4f6', color: '#374151'}}>
                  🎵 TikTok
                </a>
              )}
              {presta.youtube && (
                <a href={presta.youtube} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{background: '#f3f4f6', color: '#374151'}}>
                  ▶️ YouTube
                </a>
              )}
            </div>
          )}
        </div>

        {!modePro && (
  <>
    {/* INDICATEURS RASSURANTS */}
    <div className="bg-white rounded-2xl p-6 mb-4">
      <h2 className="font-semibold mb-4" style={{color: '#1a1a1a'}}>🔒 Réservez en toute sécurité</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: '🛡️', title: 'Paiement sécurisé', desc: 'Votre argent est retenu jusqu\'à la confirmation de la prestation' },
          { icon: '✅', title: presta.verifie ? 'Identité vérifiée' : 'Identité contrôlée', desc: presta.verifie ? 'Documents professionnels vérifiés par notre équipe' : 'Pièce d\'identité vérifiée par OKAZI' },
          { icon: '🔄', title: 'Remboursement garanti', desc: 'Remboursement intégral si le prestataire ne se présente pas' },
          { icon: '⭐', title: 'Avis vérifiés', desc: 'Tous les avis proviennent de vraies réservations' },
          { icon: '💬', title: 'Communication tracée', desc: 'Tous vos échanges sont conservés pour votre protection' },
          { icon: '🚨', title: 'Signalement facile', desc: 'Signalez tout problème à notre équipe sous 72h' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
            style={{background: '#f9fafb'}}>
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-medium" style={{color: '#1a1a1a'}}>{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {!presta.verifie && (
        <div className="mt-4 rounded-xl p-4"
          style={{background: '#fefce8', border: '1px solid #fde047'}}>
          <p className="text-sm font-medium mb-1" style={{color: '#854d0e'}}>
            👤 Ce prestataire est Membre OKAZI (non professionnel)
          </p>
          <p className="text-xs" style={{color: '#92400e'}}>
            Ce prestataire exerce à titre non professionnel. Son identité a été vérifiée par OKAZI mais il ne dispose pas nécessairement d'une assurance professionnelle. Pour les événements importants, nous vous recommandons de privilégier les prestataires ✅ Certifiés OKAZI.
          </p>
        </div>
      )}
    </div>

    {/* SIGNALEMENT */}
    <div className="bg-white rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Un problème avec ce profil ?</p>
        <button className="text-xs px-3 py-1.5 rounded-full"
          style={{background: '#fee2e2', color: '#991b1b'}}>
          🚨 Signaler ce prestataire
        </button>
      </div>
    </div>
  </>
)}
        {/* GOOGLE ADSENSE */}
<div className="mt-4">
  <div className="rounded-2xl p-4 text-center"
    style={{background: 'rgba(255,255,255,0.1)', border: '1px dashed rgba(255,255,255,0.3)'}}>
    <p className="text-xs mb-2"
      style={{color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
      Publicité
    </p>
    <div className="rounded-xl flex items-center justify-center py-6"
      style={{background: 'rgba(255,255,255,0.08)'}}>
      <p className="text-sm" style={{color: 'rgba(255,255,255,0.4)'}}>
        📢 Espace Google AdSense — 728×90px
      </p>
    </div>
  </div>
</div>

        {/* MODAL RÉSERVATION */}
        {modalOuvert && (
          <div className="fixed inset-0 flex items-center justify-center p-6 z-50"
            style={{background: 'rgba(0,0,0,0.5)'}}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="font-semibold text-lg mb-4" style={{color: '#1a1a1a'}}>
                Réserver {presta.nom}
              </h2>

              {evenements.length === 0 ? (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Vous n'avez pas encore créé d'événement.</p>
                  <Link href="/creer-evenement" className="text-sm underline" style={{color: '#FF1493'}}>
                    Créer un événement →
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Pour quel événement ?</p>
                  <div className="space-y-2 mb-4">
                    {evenements.map(e => (
                      <button key={e.id} onClick={() => setEvenementChoisi(e.id)}
                        className="w-full text-left border rounded-xl p-3 text-sm transition"
                        style={{
                          borderColor: evenementChoisi === e.id ? '#FF1493' : '#e5e7eb',
                          background: evenementChoisi === e.id ? '#fff5f0' : 'white'
                        }}>
                        {e.nom} · {e.type}
                      </button>
                    ))}
                  </div>

                  {/* RAPPEL SÉCURITÉ DANS LE MODAL */}
                  <div className="rounded-xl p-3 mb-4 text-xs"
                    style={{background: '#f0fdf4', border: '1px solid #86efac', color: '#166534'}}>
                    🛡️ Votre paiement est sécurisé et retenu jusqu'à la réalisation de la prestation. Remboursement intégral garanti en cas de no-show.
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setModalOuvert(false)}
                      className="border border-gray-200 px-4 py-2 rounded-xl text-sm flex-1">
                      Annuler
                    </button>
                    <button onClick={confirmerReservation}
                      className="text-white px-4 py-2 rounded-xl text-sm flex-1 font-semibold"
                      style={{background: GRADIENT}}>
                      Confirmer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
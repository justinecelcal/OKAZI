'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

function Calendrier({ evenements, reservations }) {
  const [moisActuel, setMoisActuel] = useState(new Date())

  const mois = moisActuel.getMonth()
  const annee = moisActuel.getFullYear()
  const nomsMois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const joursLabel = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

  const premierJour = new Date(annee, mois, 1).getDay()
  const decalage = premierJour === 0 ? 6 : premierJour - 1
  const nbJours = new Date(annee, mois + 1, 0).getDate()

  function getEvenementsDuJour(jour) {
    const date = `${annee}-${String(mois+1).padStart(2,'0')}-${String(jour).padStart(2,'0')}`
    const evts = evenements.filter(e => e.date_evenement === date)
    const rdvs = reservations.filter(r => r.evenements?.date_evenement === date)
    return { evts, rdvs }
  }

  const aujourd_hui = new Date()
  const estAujourdhui = (jour) =>
    jour === aujourd_hui.getDate() &&
    mois === aujourd_hui.getMonth() &&
    annee === aujourd_hui.getFullYear()

  return (
    <div className="rounded-2xl p-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-semibold">{nomsMois[mois]} {annee}</span>
        <div className="flex gap-2">
          <button onClick={() => setMoisActuel(new Date(annee, mois-1, 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{background: 'rgba(255,255,255,0.2)'}}>‹</button>
          <button onClick={() => setMoisActuel(new Date(annee, mois+1, 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{background: 'rgba(255,255,255,0.2)'}}>›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {joursLabel.map(j => (
          <div key={j} className="text-center text-xs py-1" style={{color: 'rgba(255,255,255,0.5)'}}>
            {j}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(decalage).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {Array(nbJours).fill(null).map((_, i) => {
          const jour = i + 1
          const { evts, rdvs } = getEvenementsDuJour(jour)
          const hasEvt = evts.length > 0
          const hasRdvOk = rdvs.some(r => r.statut === 'confirme')
          const hasRdvWait = rdvs.some(r => r.statut === 'en_attente')

          return (
            <div key={jour} className="min-h-12 rounded-lg p-1 cursor-pointer"
              style={{
                background: estAujourdhui(jour) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
                border: estAujourdhui(jour) ? '1.5px solid white' : '1px solid rgba(255,255,255,0.1)'
              }}>
              <div className="text-xs text-white font-medium mb-1">{jour}</div>
              {hasEvt && <div className="text-xs px-1 rounded mb-0.5 truncate"
                style={{background: 'rgba(255,20,147,0.7)', color: 'white', fontSize: '9px'}}>
                📅 Évt
              </div>}
              {hasRdvOk && <div className="text-xs px-1 rounded mb-0.5 truncate"
                style={{background: 'rgba(0,200,100,0.7)', color: 'white', fontSize: '9px'}}>
                ✅ RDV
              </div>}
              {hasRdvWait && <div className="text-xs px-1 rounded truncate"
                style={{background: 'rgba(255,165,0,0.7)', color: 'white', fontSize: '9px'}}>
                ⏳ RDV
              </div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}export default function Dashboard() {
  const [evenements, setEvenements] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [onglet, setOnglet] = useState('overview')
  const [invites, setInvites] = useState([])
const [nouvelInvite, setNouvelInvite] = useState({ nom: '', email: '', telephone: '', contrainte: '' })
const [filtreInvite, setFiltreInvite] = useState('tous')
const [evenementChoisi, setEvenementChoisi] = useState('')

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
  { id: 'invites', label: '👥 Mes invités' },
  { id: 'rdv', label: 'Mes RDV' },
  { id: 'reservations', label: 'Prestataires' },
  { id: 'rappels', label: '🔔 Rappels' },
  { id: 'planning', label: 'Planning J-Day' },
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
{/* ONGLET INVITÉS */}
{onglet === 'invites' && (
  <div>
    {/* SÉLECTEUR ÉVÉNEMENT */}
    <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <label className="text-xs mb-2 block" style={{color: 'rgba(255,255,255,0.7)'}}>Pour quel événement ?</label>
      <select value={evenementChoisi} onChange={e => setEvenementChoisi(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color: '#333'}}>
        <option value="">Choisir un événement</option>
        {evenements.map(e => (
          <option key={e.id} value={e.id}>{e.type} — {e.nom} · {e.date_evenement || 'Date non définie'}</option>
        ))}
      </select>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-4 gap-3 mb-4">
      {[
        { val: invites.length, lbl: 'Total invités', color: 'white' },
        { val: invites.filter(i => i.statut === 'confirme').length, lbl: 'Confirmés', color: '#00C864' },
        { val: invites.filter(i => i.statut === 'en_attente').length, lbl: 'En attente', color: '#FFA500' },
        { val: invites.filter(i => i.statut === 'refuse').length, lbl: 'Refusés', color: '#FF4444' },
      ].map((s, i) => (
        <div key={i} className="rounded-2xl p-4 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
          <p className="text-2xl font-semibold" style={{color: s.color}}>{s.val}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{s.lbl}</p>
        </div>
      ))}
    </div>

    {/* BARRE DE PROGRESSION */}
    {invites.length > 0 && (
      <div className="mb-4">
        <div className="h-2 rounded-full overflow-hidden mb-1" style={{background: 'rgba(255,255,255,0.2)'}}>
          <div className="h-2 rounded-full" style={{
            background: 'rgba(0,200,100,0.8)',
            width: `${Math.round(invites.filter(i => i.statut === 'confirme').length / invites.length * 100)}%`
          }} />
        </div>
        <p className="text-xs text-right" style={{color: 'rgba(255,255,255,0.7)'}}>
          {invites.filter(i => i.statut === 'confirme').length}/{invites.length} confirmés
        </p>
      </div>
    )}

    {/* AJOUTER UN INVITÉ */}
    <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <h2 className="font-medium text-white mb-3">➕ Ajouter un invité</h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input placeholder="Prénom Nom *"
          value={nouvelInvite.nom} onChange={e => setNouvelInvite({...nouvelInvite, nom: e.target.value})}
          className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
        <input placeholder="Email (optionnel)"
          value={nouvelInvite.email} onChange={e => setNouvelInvite({...nouvelInvite, email: e.target.value})}
          className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <input placeholder="Téléphone (optionnel)"
          value={nouvelInvite.telephone} onChange={e => setNouvelInvite({...nouvelInvite, telephone: e.target.value})}
          className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
        <select value={nouvelInvite.contrainte} onChange={e => setNouvelInvite({...nouvelInvite, contrainte: e.target.value})}
          className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}}>
          <option value="">Aucune contrainte</option>
          <option value="Végétarien">🥗 Végétarien</option>
          <option value="Vegan">🌱 Vegan</option>
          <option value="Halal">🥩 Halal</option>
          <option value="Casher">✡️ Casher</option>
          <option value="Sans gluten">🌾 Sans gluten</option>
          <option value="Sans lactose">🥛 Sans lactose</option>
        </select>
      </div>
      <button
        onClick={() => {
          if (!nouvelInvite.nom) return
          setInvites([...invites, { ...nouvelInvite, id: Date.now(), statut: 'en_attente' }])
          setNouvelInvite({ nom: '', email: '', telephone: '', contrainte: '' })
        }}
        className="w-full py-2 rounded-full text-sm font-semibold"
        style={{background: 'white', color: '#FF1493'}}>
        + Ajouter cet invité
      </button>
    </div>

    {/* FILTRES */}
    <div className="flex gap-2 mb-4 flex-wrap">
      {[
        { id: 'tous', label: `Tous (${invites.length})` },
        { id: 'confirme', label: `✅ Confirmés (${invites.filter(i => i.statut === 'confirme').length})` },
        { id: 'en_attente', label: `⏳ En attente (${invites.filter(i => i.statut === 'en_attente').length})` },
        { id: 'refuse', label: `❌ Refusés (${invites.filter(i => i.statut === 'refuse').length})` },
      ].map(f => (
        <button key={f.id} onClick={() => setFiltreInvite(f.id)}
          className="text-xs px-3 py-2 rounded-full font-medium"
          style={{
            background: filtreInvite === f.id ? 'white' : 'rgba(255,255,255,0.2)',
            color: filtreInvite === f.id ? '#FF1493' : 'white'
          }}>
          {f.label}
        </button>
      ))}
    </div>

    {/* LISTE INVITÉS */}
    <div className="rounded-2xl p-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <h2 className="font-medium text-white mb-3">Liste des invités</h2>
      {invites.length === 0 ? (
        <p className="text-center py-6 text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>
          Aucun invité ajouté pour l'instant.
        </p>
      ) : (
        <div className="space-y-2">
          {invites
            .filter(i => filtreInvite === 'tous' || i.statut === filtreInvite)
            .map(inv => (
              <div key={inv.id} className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: inv.statut === 'confirme' ? 'rgba(0,200,100,0.2)' :
                    inv.statut === 'refuse' ? 'rgba(255,50,50,0.2)' : 'rgba(255,165,0,0.2)',
                  border: inv.statut === 'confirme' ? '1px solid rgba(0,200,100,0.3)' :
                    inv.statut === 'refuse' ? '1px solid rgba(255,50,50,0.3)' : '1px solid rgba(255,165,0,0.3)'
                }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                  style={{background: 'rgba(255,255,255,0.3)'}}>
                  {inv.nom.substring(0,2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{inv.nom}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                    {inv.email || 'Pas d\'email'} {inv.contrainte && `· ${inv.contrainte}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <select value={inv.statut}
                    onChange={e => setInvites(invites.map(i => i.id === inv.id ? {...i, statut: e.target.value} : i))}
                    className="rounded-lg px-2 py-1 text-xs outline-none"
                    style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none'}}>
                    <option value="en_attente">⏳ En attente</option>
                    <option value="confirme">✅ Confirmé</option>
                    <option value="refuse">❌ Refusé</option>
                  </select>
                  <button onClick={() => setInvites(invites.filter(i => i.id !== inv.id))}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{background: 'rgba(255,50,50,0.4)', color: 'white'}}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {invites.length > 0 && (
        <button className="w-full mt-4 py-2 rounded-full text-sm font-semibold"
          style={{background: 'white', color: '#FF1493'}}>
          📥 Exporter la liste
        </button>
      )}
    </div>
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
  <div>
    {/* STATS */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { val: reservations.filter(r => r.statut === 'confirme').length, lbl: 'RDV confirmés', color: '#00C864' },
        { val: reservations.filter(r => r.statut === 'en_attente').length, lbl: 'En attente', color: '#FFA500' },
        { val: evenements.length, lbl: 'Événements', color: '#FF1493' },
      ].map((s, i) => (
        <div key={i} className="rounded-2xl p-4 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
          <p className="text-2xl font-semibold" style={{color: s.color}}>{s.val}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{s.lbl}</p>
        </div>
      ))}
    </div>

    {/* LÉGENDE */}
    <div className="flex gap-4 mb-4 flex-wrap">
      {[
        { color: 'rgba(255,20,147,0.8)', label: 'Événement' },
        { color: 'rgba(255,165,0,0.8)', label: 'RDV en attente' },
        { color: 'rgba(0,200,100,0.8)', label: 'RDV confirmé' },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-2 text-xs" style={{color: 'rgba(255,255,255,0.8)'}}>
          <div className="w-3 h-3 rounded" style={{background: l.color}}></div>
          {l.label}
        </div>
      ))}
    </div>

    {/* CALENDRIER */}
    <Calendrier evenements={evenements} reservations={reservations} />

    {/* LISTE RDV */}
    <div className="rounded-2xl p-5 mt-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <h2 className="font-medium text-white mb-4">Prochains RDV & événements</h2>
      {reservations.length === 0 && evenements.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-white mb-3">Aucun RDV planifié.</p>
          <Link href="/recherche"
            className="text-sm px-4 py-2 rounded-full font-semibold"
            style={{background: 'white', color: '#FF1493'}}>
            Trouver des prestataires →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {evenements.map(e => (
            <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl"
              style={{background: 'rgba(255,20,147,0.2)', border: '1px solid rgba(255,20,147,0.4)'}}>
              <span className="text-lg">📅</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{e.nom}</p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                  {e.type} · {e.date_evenement || 'Date non définie'} · {e.lieu || ''}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full"
                style={{background: 'rgba(255,20,147,0.4)', color: 'white'}}>
                Événement
              </span>
            </div>
          ))}
          {reservations.map(r => {
            const statut = STATUTS[r.statut] || STATUTS.en_attente
            return (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: r.statut === 'confirme' ? 'rgba(0,200,100,0.2)' : 'rgba(255,165,0,0.2)',
                  border: r.statut === 'confirme' ? '1px solid rgba(0,200,100,0.4)' : '1px solid rgba(255,165,0,0.4)'
                }}>
                <span className="text-lg">{r.statut === 'confirme' ? '✅' : '⏳'}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{r.prestataires?.nom}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                    {r.prestataires?.categorie} · {r.evenements?.nom}
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
'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

const GAMMES = [
  { id: 'economique', label: 'Économique', color: '#dcfce7', text: '#166534' },
  { id: 'milieu', label: 'Milieu de gamme', color: '#dbeafe', text: '#1e40af' },
  { id: 'haut', label: 'Haut de gamme', color: '#f3e8ff', text: '#6b21a8' },
  { id: 'luxe', label: 'Luxe', color: '#fef9c3', text: '#854d0e' },
]

const CATEGORIES = [
  'Traiteur', 'Photographe', 'Vidéaste', 'DJ & Musique', 'Lieu de réception',
  'Fleuriste', 'Coiffure & Maquillage', 'Pâtisserie', 'Transport', 'Animateur', 'Décoration', 'Autre'
]

const TYPES_EVENTS = ['Mariage', 'Anniversaire', 'Baby shower', 'EVJF / EVG', 'Baptême', 'Séminaire']
const RAYONS = ['20km', '50km', '100km', 'National']
const NOTES = ['Toutes', '3★+', '4★+', '4.5★+']
const TRIS = [
  { id: 'note', label: '⭐ Note' },
  { id: 'prix_asc', label: '💰 Prix ↑' },
  { id: 'popularite', label: '🔥 Popularité' },
  { id: 'nouveaute', label: '🆕 Nouveauté' },
]

function getInitiales(nom) {
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

function RechercheContent() {
  const searchParams = useSearchParams()
  const [prestataires, setPrestataires] = useState([])
  const [loading, setLoading] = useState(true)

  // FILTRES
  const [recherche, setRecherche] = useState('')
  const [ville, setVille] = useState('')
  const [rayon, setRayon] = useState('50km')
  const [dateDisponible, setDateDisponible] = useState('')
  const [budgetMax, setBudgetMax] = useState(10000)
  const [noteMin, setNoteMin] = useState('Toutes')
  const [filtreCategorie, setFiltreCategorie] = useState(searchParams.get('categorie') || null)
  const [filtreGamme, setFiltreGamme] = useState(null)
  const [filtreEvent, setFiltreEvent] = useState(null)
  const [tri, setTri] = useState('note')

  useEffect(() => {
    chargerPrestataires()
  }, [])

  async function chargerPrestataires() {
    setLoading(true)
    const { data, error } = await supabase.from('prestataires').select('*')
    if (!error) setPrestataires(data)
    setLoading(false)
  }

  function getNoteMin() {
    if (noteMin === '3★+') return 3
    if (noteMin === '4★+') return 4
    if (noteMin === '4.5★+') return 4.5
    return 0
  }

  const filtres = prestataires
    .filter(p => {
      const matchRecherche = recherche ? p.nom.toLowerCase().includes(recherche.toLowerCase()) : true
      const matchVille = ville ? p.ville?.toLowerCase().includes(ville.toLowerCase()) || p.zone?.toLowerCase().includes(ville.toLowerCase()) : true
      const matchCategorie = filtreCategorie ? p.categorie === filtreCategorie : true
      const matchGamme = filtreGamme ? p.gamme === filtreGamme : true
      const matchNote = p.note >= getNoteMin()
      return matchRecherche && matchVille && matchCategorie && matchGamme && matchNote
    })
    .sort((a, b) => {
      if (tri === 'note') return (b.note || 0) - (a.note || 0)
      if (tri === 'nouveaute') return new Date(b.created_at) - new Date(a.created_at)
      if (tri === 'popularite') return (b.nb_avis || 0) - (a.nb_avis || 0)
      return 0
    })

  function reinitialiser() {
    setRecherche('')
    setVille('')
    setRayon('50km')
    setDateDisponible('')
    setBudgetMax(10000)
    setNoteMin('Toutes')
    setFiltreCategorie(null)
    setFiltreGamme(null)
    setFiltreEvent(null)
    setTri('note')
  }

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick}
      className="text-xs px-3 py-2 rounded-full font-medium transition"
      style={{
        background: active ? 'white' : 'rgba(255,255,255,0.2)',
        color: active ? '#FF1493' : 'white'
      }}>
      {label}
    </button>
  )

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-xl font-semibold text-white mb-4">🔍 Trouver un prestataire</h1>

        {/* BARRE DE RECHERCHE */}
        <div className="flex gap-3 mb-4" style={{background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '8px 16px'}}>
          <input type="text" placeholder="Rechercher un prestataire..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent" style={{color: '#333'}} />
          <button className="text-sm font-semibold px-4 py-2 rounded-full text-white"
            style={{background: GRADIENT}}>
            Rechercher
          </button>
        </div>

        {/* FILTRES */}
        <div className="grid grid-cols-2 gap-3 mb-4">

          {/* LOCALISATION + RAYON */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>📍 Localisation</p>
            <div className="flex gap-2 mb-2">
              <span style={{color: '#FF6000', fontSize: '16px'}}>📍</span>
              <input type="text" placeholder="Ville ou région"
                value={ville} onChange={e => setVille(e.target.value)}
                className="flex-1 outline-none text-sm rounded-lg px-3 py-1.5 bg-white" style={{color: '#333'}} />
              {ville && (
                <button onClick={() => setVille('')} className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>✕</button>
              )}
            </div>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)'}}>Rayon de déplacement</p>
            <div className="flex gap-2">
              {RAYONS.map(r => (
                <Chip key={r} label={r} active={rayon === r} onClick={() => setRayon(r)} />
              ))}
            </div>
          </div>

          {/* DATE DISPONIBILITÉ */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>📅 Disponible à ma date</p>
            <input type="date" value={dateDisponible} onChange={e => setDateDisponible(e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none bg-white mb-2" style={{color: '#333'}} />
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>Affiche les prestataires disponibles ce jour</p>
          </div>

          {/* BUDGET */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>💰 Budget maximum</p>
            <div className="flex justify-between text-xs mb-1" style={{color: 'rgba(255,255,255,0.7)'}}>
              <span>500 €</span>
              <span className="text-white font-semibold">{budgetMax.toLocaleString()} €</span>
              <span>10 000 €</span>
            </div>
            <input type="range" min="500" max="10000" step="100"
              value={budgetMax} onChange={e => setBudgetMax(parseInt(e.target.value))}
              className="w-full" />
          </div>

          {/* NOTE MINIMUM */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>⭐ Note minimum</p>
            <div className="flex flex-wrap gap-2">
              {NOTES.map(n => (
                <Chip key={n} label={n} active={noteMin === n} onClick={() => setNoteMin(n)} />
              ))}
            </div>
          </div>

          {/* CATÉGORIE */}
          <div className="rounded-xl p-3 col-span-2" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>🏷️ Catégorie</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Toutes" active={!filtreCategorie} onClick={() => setFiltreCategorie(null)} />
              {CATEGORIES.map(c => (
                <Chip key={c} label={c} active={filtreCategorie === c} onClick={() => setFiltreCategorie(c === filtreCategorie ? null : c)} />
              ))}
            </div>
          </div>

          {/* TYPE D'ÉVÉNEMENT */}
          <div className="rounded-xl p-3 col-span-2" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>🎉 Type d'événement</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Tous" active={!filtreEvent} onClick={() => setFiltreEvent(null)} />
              {TYPES_EVENTS.map(t => (
                <Chip key={t} label={t} active={filtreEvent === t} onClick={() => setFiltreEvent(t === filtreEvent ? null : t)} />
              ))}
            </div>
          </div>

          {/* GAMME */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>💎 Gamme</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Toutes" active={!filtreGamme} onClick={() => setFiltreGamme(null)} />
              {GAMMES.map(g => (
                <Chip key={g.id} label={g.label} active={filtreGamme === g.id} onClick={() => setFiltreGamme(g.id === filtreGamme ? null : g.id)} />
              ))}
            </div>
          </div>

          {/* TRI */}
          <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.15)'}}>
            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>🔢 Trier par</p>
            <div className="flex flex-wrap gap-2">
              {TRIS.map(t => (
                <Chip key={t.id} label={t.label} active={tri === t.id} onClick={() => setTri(t.id)} />
              ))}
            </div>
          </div>

        </div>

        {/* RÉSULTATS */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-white font-medium">
            {filtres.length} prestataire{filtres.length > 1 ? 's' : ''} trouvé{filtres.length > 1 ? 's' : ''}
          </p>
          <button onClick={reinitialiser} className="text-xs" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'underline'}}>
            Réinitialiser les filtres
          </button>
        </div>

        {loading ? (
          <p style={{color: 'rgba(255,255,255,0.7)'}}>Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtres.map(p => {
              const gamme = GAMMES.find(g => g.id === p.gamme)
              return (
                <Link key={p.id} href={`/prestataire/${p.id}`}
                  className="block rounded-2xl p-4 cursor-pointer"
                  style={{background: 'rgba(255,255,255,0.95)'}}>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0"
                      style={{width: '48px', height: '48px', background: GRADIENT, fontSize: '15px'}}>
                      {getInitiales(p.nom)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{color: '#1a1a1a'}}>{p.nom}</p>
                      <p className="text-xs" style={{color: '#888'}}>{p.categorie} · {p.ville}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {gamme && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{background: gamme.color, color: gamme.text}}>
                            {gamme.label}
                          </span>
                        )}
                        {p.verifie && (
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{background: '#dcfce7', color: '#166534'}}>
                            ✅ Certifié
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs mb-3 leading-relaxed" style={{color: '#555'}}>{p.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{color: '#FF6000'}}>
                      ★ {p.note} <span style={{color: '#aaa'}}>({p.nb_avis} avis)</span>
                    </span>
                    {dateDisponible && (
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{background: '#dcfce7', color: '#166534'}}>
                        ✓ Disponible
                      </span>
                    )}
                    <button className="text-xs px-3 py-1.5 rounded-full font-semibold text-white"
                      style={{background: GRADIENT}}>
                      Réserver →
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default function Recherche() {
  return (
    <Suspense fallback={<div style={{background: GRADIENT, minHeight: '100vh'}}></div>}>
      <RechercheContent />
    </Suspense>
  )
}
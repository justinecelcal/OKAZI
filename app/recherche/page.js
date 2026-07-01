'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GAMMES = [
  { id: 'economique', label: 'Économique', color: '#dcfce7', text: '#166534' },
  { id: 'milieu', label: 'Milieu de gamme', color: '#dbeafe', text: '#1e40af' },
  { id: 'haut', label: 'Haut de gamme', color: '#f3e8ff', text: '#6b21a8' },
  { id: 'luxe', label: 'Luxe', color: '#fef9c3', text: '#854d0e' },
]

const CATEGORIES = [
  'Lieux & Espaces',
  'Traiteurs & plus',
  'Décoration & personnalisation',
  'Ambiance & Divertissement',
  'Image & Souvenirs',
  'Mode & Beauté',
  'Transport & Mobilité',
  'Technique & Équipement',
  'Sécurité & Assurance',
]

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

function getInitiales(nom) {
  return nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

export default function Recherche() {
  const [prestataires, setPrestataires] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtreGamme, setFiltreGamme] = useState(null)
  const [filtreCategorie, setFiltreCategorie] = useState(null)
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    chargerPrestataires()
  }, [])

  async function chargerPrestataires() {
    setLoading(true)
    const { data, error } = await supabase.from('prestataires').select('*')
    if (!error) setPrestataires(data)
    setLoading(false)
  }

  const filtres = prestataires.filter(p => {
    const matchGamme = filtreGamme ? p.gamme === filtreGamme : true
    const matchCat = filtreCategorie ? p.megacategorie === filtreCategorie : true
    const matchRecherche = recherche
      ? p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
        p.ville?.toLowerCase().includes(recherche.toLowerCase())
      : true
    return matchGamme && matchCat && matchRecherche
  })

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        {/* BARRE DE RECHERCHE */}
        <div className="flex gap-3 mb-4" style={{background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '8px 16px'}}>
          <input
            type="text"
            placeholder="Rechercher un prestataire, une ville..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
            style={{color: '#333'}}
          />
          <button
            className="text-sm font-semibold px-4 py-2 rounded-full text-white"
            style={{background: GRADIENT}}>
            Rechercher
          </button>
        </div>

        {/* FILTRE CATÉGORIE */}
        <div className="mb-3 p-3 rounded-xl" style={{background: 'rgba(255,255,255,0.15)'}}>
          <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Catégorie</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFiltreCategorie(null)}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: !filtreCategorie ? 'white' : 'rgba(255,255,255,0.2)',
                color: !filtreCategorie ? '#FF1493' : 'white',
                border: '1px solid rgba(255,255,255,0.4)'
              }}>
              Toutes
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFiltreCategorie(cat === filtreCategorie ? null : cat)}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: filtreCategorie === cat ? 'white' : 'rgba(255,255,255,0.2)',
                  color: filtreCategorie === cat ? '#FF1493' : 'white',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FILTRE GAMME */}
        <div className="mb-4 p-3 rounded-xl" style={{background: 'rgba(255,255,255,0.15)'}}>
          <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Gamme</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFiltreGamme(null)}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: !filtreGamme ? 'white' : 'rgba(255,255,255,0.2)',
                color: !filtreGamme ? '#FF1493' : 'white',
                border: '1px solid rgba(255,255,255,0.4)'
              }}>
              Toutes
            </button>
            {GAMMES.map(g => (
              <button key={g.id} onClick={() => setFiltreGamme(g.id === filtreGamme ? null : g.id)}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: filtreGamme === g.id ? 'white' : 'rgba(255,255,255,0.2)',
                  color: filtreGamme === g.id ? '#FF1493' : 'white',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* RÉSULTATS */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm" style={{color: 'rgba(255,255,255,0.9)'}}>
            {filtres.length} prestataire{filtres.length > 1 ? 's' : ''} trouvé{filtres.length > 1 ? 's' : ''}
          </p>
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

                  {/* EN-TÊTE AVEC AVATAR */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0"
                      style={{
                        width: '52px', height: '52px',
                        background: p.photo_url ? 'transparent' : GRADIENT,
                        fontSize: '16px'
                      }}>
                      {p.photo_url
                        ? <img src={p.photo_url} alt={p.nom} className="w-full h-full rounded-full object-cover" />
                        : getInitiales(p.nom)
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{color: '#1a1a1a'}}>{p.nom}</p>
                      <p className="text-xs" style={{color: '#888'}}>{p.categorie} · {p.ville}</p>
                      {gamme && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{background: gamme.color, color: gamme.text}}>
                          {gamme.label}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs mb-3 leading-relaxed" style={{color: '#555'}}>{p.description}</p>

                  {/* PIED */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{color: '#FF6000'}}>
                      ★ {p.note} <span style={{color: '#aaa'}}>({p.nb_avis} avis)</span>
                    </span>
                    {p.verifie && <span className="text-xs" style={{color: '#16a34a'}}>✓ Vérifié</span>}
                    <button
                      className="text-xs px-3 py-1.5 rounded-full font-semibold text-white"
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
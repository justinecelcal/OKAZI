'use client'

export const dynamic = 'force-dynamic'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'
const TYPES = ['Mariage', 'Anniversaire', 'Baby shower', 'EVJF / EVG', 'Baptême', 'Séminaire', 'Autre']
const THEMES = ['Chic & Élégant', 'Bohème', 'Coloré & Festif', 'Minimaliste', 'Champêtre', 'Vintage', 'Tropical', 'Autre']
const CONTRAINTES = ['Végétarien', 'Vegan', 'Halal', 'Casher', 'Sans gluten', 'Sans lactose']
const PRESTATAIRES_LISTE = [
  { id: 'traiteur', label: 'Traiteur', sub: 'Repas, cocktail, buffet' },
  { id: 'photographe', label: 'Photographe', sub: 'Photo & vidéo' },
  { id: 'dj', label: 'DJ & Musique', sub: 'Animation musicale' },
  { id: 'lieu', label: 'Lieu de réception', sub: 'Salle, château, domaine' },
  { id: 'fleuriste', label: 'Fleuriste', sub: 'Décoration florale' },
  { id: 'coiffure', label: 'Coiffure & Maquillage', sub: 'Beauté' },
  { id: 'patisserie', label: 'Pâtisserie', sub: 'Gâteau, pièce montée' },
  { id: 'transport', label: 'Transport', sub: 'Voiture, navette' },
  { id: 'animateur', label: 'Animateur / MC', sub: 'Animation générale' },
  { id: 'decoration', label: 'Décoration', sub: 'Scénographie, lumières' },
]

function CreerEvenementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  const [etape, setEtape] = useState(typeParam ? 2 : 1)
  const [data, setData] = useState({
    type: typeParam || '',
    nom: '',
    date_evenement: '',
    heure_debut: '',
    heure_fin: '',
    lieu: '',
    indoor_outdoor: 'indoor',
    theme: '',
    theme_description: '',
    nb_invites: '',
    nb_enfants: '',
    contraintes: [],
    invites: [],
    budget: 5000,
    budget_traiteur: 0,
    budget_photo: 0,
    budget_lieu: 0,
    budget_dj: 0,
    budget_deco: 0,
    prestataires_voulus: [],
  })

  const [nouvelInvite, setNouvelInvite] = useState({ nom: '', email: '' })

  function update(champ, valeur) {
    setData({ ...data, [champ]: valeur })
  }

  function toggleContrainte(c) {
    const list = data.contraintes.includes(c)
      ? data.contraintes.filter(x => x !== c)
      : [...data.contraintes, c]
    update('contraintes', list)
  }

  function togglePresta(id) {
    const list = data.prestataires_voulus.includes(id)
      ? data.prestataires_voulus.filter(x => x !== id)
      : [...data.prestataires_voulus, id]
    update('prestataires_voulus', list)
  }

  function ajouterInvite() {
    if (!nouvelInvite.nom) return
    update('invites', [...data.invites, { ...nouvelInvite, statut: 'en_attente' }])
    setNouvelInvite({ nom: '', email: '' })
  }

  function supprimerInvite(i) {
    update('invites', data.invites.filter((_, idx) => idx !== i))
  }

  async function valider() {
    const { error } = await supabase.from('evenements').insert([{
      nom: data.nom || data.type,
      type: data.type,
      date_evenement: data.date_evenement,
      lieu: data.lieu,
      nb_invites: parseInt(data.nb_invites) || 0,
      budget: data.budget,
    }])
    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      router.push('/recherche')
    }
  }

  const btnNext = (
    <button onClick={() => setEtape(etape + 1)}
      className="px-6 py-3 rounded-full text-sm font-semibold"
      style={{background: 'white', color: '#FF1493'}}>
      Suivant →
    </button>
  )

  const btnBack = (
    <button onClick={() => setEtape(etape - 1)}
      className="px-6 py-3 rounded-full text-sm font-semibold"
      style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
      ← Retour
    </button>
  )

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-2xl mx-auto py-6">

        {/* BARRE DE PROGRESSION */}
        <div className="flex items-center mb-8">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{
                  background: etape > n ? 'rgba(255,255,255,0.6)' : etape === n ? 'white' : 'rgba(255,255,255,0.2)',
                  color: etape >= n ? '#FF1493' : 'rgba(255,255,255,0.5)'
                }}>
                {etape > n ? '✓' : n}
              </div>
              {n < 6 && <div className="flex-1 h-px mx-1"
                style={{background: etape > n ? 'white' : 'rgba(255,255,255,0.2)'}} />}
            </div>
          ))}
        </div>

        {/* ÉTAPE 1 — TYPE */}
        {etape === 1 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Quel type d'événement ?</h1>
            <p className="mb-6" style={{color: 'rgba(255,255,255,0.8)'}}>Choisissez la catégorie qui correspond le mieux.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {TYPES.map(t => (
                <button key={t} onClick={() => update('type', t)}
                  className="rounded-xl p-4 text-left font-medium transition"
                  style={{
                    background: data.type === t ? 'white' : 'rgba(255,255,255,0.2)',
                    color: data.type === t ? '#FF1493' : 'white',
                    border: data.type === t ? 'none' : '1px solid rgba(255,255,255,0.3)'
                  }}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={() => setEtape(2)} disabled={!data.type}
              className="px-6 py-3 rounded-full text-sm font-semibold disabled:opacity-30"
              style={{background: 'white', color: '#FF1493'}}>
              Suivant →
            </button>
          </div>
        )}

        {/* ÉTAPE 2 — DÉTAILS */}
        {etape === 2 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Les détails</h1>
            <p className="mb-6" style={{color: 'rgba(255,255,255,0.8)'}}>Donnez-nous toutes les informations pour trouver les meilleurs prestataires.</p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Nom de l'événement</label>
                <input placeholder="Ex : Mariage Sophie & Marc"
                  value={data.nom} onChange={e => update('nom', e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Date</label>
                  <input type="date" value={data.date_evenement} onChange={e => update('date_evenement', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Région / Ville</label>
                  <input placeholder="Paris, Lyon, Bordeaux..."
                    value={data.lieu} onChange={e => update('lieu', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Heure de début</label>
                  <input type="time" value={data.heure_debut} onChange={e => update('heure_debut', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Heure de fin</label>
                  <input type="time" value={data.heure_fin} onChange={e => update('heure_fin', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
              </div>

              <div>
                <label className="text-xs text-white mb-2 block" style={{opacity:0.7}}>Lieu</label>
                <div className="grid grid-cols-2 gap-3">
                  {['indoor', 'outdoor'].map(t => (
                    <button key={t} onClick={() => update('indoor_outdoor', t)}
                      className="py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: data.indoor_outdoor === t ? 'white' : 'rgba(255,255,255,0.2)',
                        color: data.indoor_outdoor === t ? '#FF1493' : 'white'
                      }}>
                      {t === 'indoor' ? '🏠 Indoor' : '🌿 Outdoor'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-white mb-2 block" style={{opacity:0.7}}>Ambiance / Thème</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {THEMES.map(t => (
                    <button key={t} onClick={() => update('theme', t)}
                      className="text-xs px-3 py-2 rounded-full font-medium"
                      style={{
                        background: data.theme === t ? 'white' : 'rgba(255,255,255,0.2)',
                        color: data.theme === t ? '#FF1493' : 'white'
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
                <textarea placeholder="Décrivez votre thème et vos souhaits particuliers..."
                  value={data.theme_description} onChange={e => update('theme_description', e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white h-24"
                  style={{color:'#333', resize:'none'}} />
              </div>
            </div>

            <div className="flex gap-3">{btnBack}{btnNext}</div>
          </div>
        )}

        {/* ÉTAPE 3 — INVITÉS */}
        {etape === 3 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Vos invités</h1>
            <p className="mb-6" style={{color: 'rgba(255,255,255,0.8)'}}>Gérez la liste complète de vos invités.</p>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>Nombre total d'invités</label>
                  <input type="number" placeholder="80"
                    value={data.nb_invites} onChange={e => update('nb_invites', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
                <div>
                  <label className="text-xs text-white mb-1 block" style={{opacity:0.7}}>dont enfants</label>
                  <input type="number" placeholder="0"
                    value={data.nb_enfants} onChange={e => update('nb_enfants', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color:'#333'}} />
                </div>
              </div>

              <div>
                <label className="text-xs text-white mb-2 block" style={{opacity:0.7}}>Contraintes alimentaires</label>
                <div className="flex flex-wrap gap-2">
                  {CONTRAINTES.map(c => (
                    <button key={c} onClick={() => toggleContrainte(c)}
                      className="text-xs px-3 py-2 rounded-full font-medium"
                      style={{
                        background: data.contraintes.includes(c) ? 'white' : 'rgba(255,255,255,0.2)',
                        color: data.contraintes.includes(c) ? '#FF1493' : 'white'
                      }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-white mb-2 block" style={{opacity:0.7}}>Liste d'invités</label>
                <div className="flex gap-2 mb-3">
                  <input placeholder="Prénom Nom"
                    value={nouvelInvite.nom} onChange={e => setNouvelInvite({...nouvelInvite, nom: e.target.value})}
                    className="flex-1 rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color:'#333'}} />
                  <input placeholder="Email (optionnel)"
                    value={nouvelInvite.email} onChange={e => setNouvelInvite({...nouvelInvite, email: e.target.value})}
                    className="flex-1 rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color:'#333'}} />
                  <button onClick={ajouterInvite}
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{background: 'white', color: '#FF1493'}}>
                    +
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {data.invites.map((inv, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{background: 'rgba(255,255,255,0.15)'}}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                        style={{background: 'rgba(255,255,255,0.3)'}}>
                        {inv.nom.substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs font-medium">{inv.nom}</p>
                        {inv.email && <p className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>{inv.email}</p>}
                      </div>
                      <button onClick={() => supprimerInvite(i)}
                        className="text-xs" style={{color:'rgba(255,255,255,0.5)'}}>✕</button>
                    </div>
                  ))}
                  {data.invites.length === 0 && (
                    <p className="text-center text-xs py-4" style={{color:'rgba(255,255,255,0.5)'}}>
                      Aucun invité ajouté pour l'instant
                    </p>
                  )}
                </div>
                {data.invites.length > 0 && (
                  <p className="text-xs mt-2 text-right" style={{color:'rgba(255,255,255,0.6)'}}>
                    {data.invites.length} invité{data.invites.length > 1 ? 's' : ''} ajouté{data.invites.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">{btnBack}{btnNext}</div>
          </div>
        )}

        {/* ÉTAPE 4 — BUDGET */}
        {etape === 4 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Votre budget</h1>
            <p className="mb-6" style={{color: 'rgba(255,255,255,0.8)'}}>Définissez votre enveloppe globale.</p>

            <div className="mb-6">
              <p className="text-4xl font-semibold text-white text-center mb-2">{data.budget.toLocaleString()} €</p>
              <input type="range" min="500" max="100000" step="500"
                value={data.budget} onChange={e => update('budget', parseInt(e.target.value))}
                className="w-full mb-2" />
              <div className="flex justify-between text-xs" style={{color:'rgba(255,255,255,0.6)'}}>
                <span>500 €</span><span>100 000 €</span>
              </div>
            </div>

            <div className="flex gap-3">{btnBack}{btnNext}</div>
          </div>
        )}

        {/* ÉTAPE 5 — PRESTATAIRES */}
        {etape === 5 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Prestataires recherchés</h1>
            <p className="mb-6" style={{color: 'rgba(255,255,255,0.8)'}}>Cochez les prestataires dont vous avez besoin.</p>

            <div className="rounded-2xl overflow-hidden mb-6" style={{background: 'rgba(255,255,255,0.15)'}}>
              {PRESTATAIRES_LISTE.map((p, i) => (
                <div key={p.id} onClick={() => togglePresta(p.id)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  style={{borderBottom: i < PRESTATAIRES_LISTE.length-1 ? '1px solid rgba(255,255,255,0.1)' : 'none'}}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{
                      background: data.prestataires_voulus.includes(p.id) ? 'white' : 'transparent',
                      border: '2px solid rgba(255,255,255,0.5)'
                    }}>
                    {data.prestataires_voulus.includes(p.id) && (
                      <span style={{color:'#FF1493', fontSize:'11px', fontWeight:'700'}}>✓</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{p.label}</p>
                    <p className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">{btnBack}{btnNext}</div>
          </div>
        )}

        {/* ÉTAPE 6 — RÉCAPITULATIF */}
        {etape === 6 && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Récapitulatif</h1>

            <div className="rounded-2xl p-5 mb-6 space-y-3" style={{background: 'rgba(255,255,255,0.2)'}}>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Type</span>
                <span className="text-white font-medium">{data.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Nom</span>
                <span className="text-white font-medium">{data.nom || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Date</span>
                <span className="text-white font-medium">{data.date_evenement || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Horaires</span>
                <span className="text-white font-medium">{data.heure_debut || '—'} → {data.heure_fin || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Lieu</span>
                <span className="text-white font-medium">{data.lieu || '—'} ({data.indoor_outdoor})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Thème</span>
                <span className="text-white font-medium">{data.theme || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Invités</span>
                <span className="text-white font-medium">{data.nb_invites || '—'} ({data.invites.length} dans la liste)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{color:'rgba(255,255,255,0.7)'}}>Budget</span>
                <span className="text-white font-medium">{data.budget.toLocaleString()} €</span>
              </div>
              {data.prestataires_voulus.length > 0 && (
                <div className="text-sm">
                  <span style={{color:'rgba(255,255,255,0.7)'}}>Prestataires :</span>
                  <span className="text-white font-medium ml-2">
                    {data.prestataires_voulus.map(id => PRESTATAIRES_LISTE.find(p => p.id === id)?.label).join(', ')}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {btnBack}
              <button onClick={valider}
                className="px-6 py-3 rounded-full text-sm font-semibold"
                style={{background: 'white', color: '#FF1493'}}>
                Créer mon événement ✓
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function CreerEvenement() {
  return (
    <Suspense fallback={<div style={{background: GRADIENT, minHeight: '100vh'}}></div>}>
      <CreerEvenementContent />
    </Suspense>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

const BADGES = [
  { id: 'populaire', label: '⭐ Populaire', bg: GRADIENT },
  { id: 'nouveau', label: '🆕 Nouveau', bg: 'rgba(0,200,100,0.6)' },
  { id: 'promo', label: '🔥 Promo', bg: 'rgba(255,200,0,0.6)' },
  { id: 'none', label: 'Aucun', bg: 'rgba(255,255,255,0.2)' },
]

const FORMULE_VIDE = {
  nom: '', prix: '', type_prix: 'fixe', unite: 'evenement',
  capacite_min: '', capacite_max: '', duree: '', delai_reservation: '',
  description: '', badge: 'none', actif: true,
  inclus: [''], exclus: [''], options: [{ nom: '', prix: '' }],
  conditions_annulation: '',
}

export default function FormulasOnglet({ prestaId }) {
  const [formules, setFormules] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formule, setFormule] = useState(FORMULE_VIDE)
  const [editId, setEditId] = useState(null)
  const [succes, setSucces] = useState('')
  const [devisModal, setDevisModal] = useState(null)

  useEffect(() => { chargerFormules() }, [prestaId])

  async function chargerFormules() {
    setLoading(true)
    const { data } = await supabase.from('formules').select('*').eq('prestataire_id', prestaId).order('created_at')
    setFormules(data || [])
    setLoading(false)
  }

  function update(champ, val) { setFormule({ ...formule, [champ]: val }) }

  function updateListe(champ, index, val) {
    const liste = [...formule[champ]]
    liste[index] = val
    update(champ, liste)
  }

  function ajouterLigne(champ) {
    if (champ === 'options') update('options', [...formule.options, { nom: '', prix: '' }])
    else update(champ, [...formule[champ], ''])
  }

  function supprimerLigne(champ, index) {
    const liste = formule[champ].filter((_, i) => i !== index)
    update(champ, liste.length > 0 ? liste : champ === 'options' ? [{ nom: '', prix: '' }] : [''])
  }

  function updateOption(index, champ, val) {
    const opts = [...formule.options]
    opts[index][champ] = val
    update('options', opts)
  }

  async function sauvegarder() {
    const payload = {
      prestataire_id: prestaId,
      nom: formule.nom,
      prix: parseFloat(formule.prix) || 0,
      type_prix: formule.type_prix,
      unite: formule.unite,
      capacite_min: parseInt(formule.capacite_min) || 0,
      capacite_max: parseInt(formule.capacite_max) || 0,
      duree: formule.duree,
      delai_reservation: parseInt(formule.delai_reservation) || 0,
      description: formule.description,
      badge: formule.badge,
      actif: formule.actif,
      inclus: formule.inclus.filter(i => i.trim()),
      exclus: formule.exclus.filter(e => e.trim()),
      options: formule.options.filter(o => o.nom.trim()),
      conditions_annulation: formule.conditions_annulation,
    }
    if (editId) {
      await supabase.from('formules').update(payload).eq('id', editId)
    } else {
      await supabase.from('formules').insert([payload])
    }
    setShowForm(false)
    setFormule(FORMULE_VIDE)
    setEditId(null)
    setSucces(editId ? 'Formule modifiée !' : 'Formule ajoutée !')
    setTimeout(() => setSucces(''), 3000)
    chargerFormules()
  }

  async function supprimerFormule(id) {
    if (!confirm('Supprimer cette formule ?')) return
    await supabase.from('formules').delete().eq('id', id)
    chargerFormules()
  }

  async function toggleActif(id, actif) {
    await supabase.from('formules').update({ actif: !actif }).eq('id', id)
    chargerFormules()
  }

  function modifierFormule(f) {
    setFormule({
      nom: f.nom || '', prix: f.prix || '', type_prix: f.type_prix || 'fixe',
      unite: f.unite || 'evenement', capacite_min: f.capacite_min || '',
      capacite_max: f.capacite_max || '', duree: f.duree || '',
      delai_reservation: f.delai_reservation || '', description: f.description || '',
      badge: f.badge || 'none', actif: f.actif ?? true,
      inclus: f.inclus?.length ? f.inclus : [''],
      exclus: f.exclus?.length ? f.exclus : [''],
      options: f.options?.length ? f.options : [{ nom: '', prix: '' }],
      conditions_annulation: f.conditions_annulation || '',
    })
    setEditId(f.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function genererDevisWord(f) {
    const contenu = `
DEVIS — ${f.nom}
========================
Prestataire : ${f.nom}
Prix : ${f.type_prix === 'partir' ? 'À partir de ' : ''}${f.prix}€ / ${f.unite}
Capacité : ${f.capacite_min} à ${f.capacite_max} personnes
Durée : ${f.duree}

DESCRIPTION
-----------
${f.description}

INCLUS
------
${(f.inclus || []).map(i => `✓ ${i}`).join('\n')}

NON INCLUS
----------
${(f.exclus || []).map(e => `✗ ${e}`).join('\n')}

OPTIONS SUPPLÉMENTAIRES
-----------------------
${(f.options || []).filter(o => o.nom).map(o => `+ ${o.nom} : ${o.prix}€`).join('\n')}

CONDITIONS D'ANNULATION
-----------------------
${f.conditions_annulation}
    `.trim()
    const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `devis-${f.nom.toLowerCase().replace(/\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const styleInput = { background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', color: '#333', outline: 'none', width: '100%' }
  const styleLabel = { display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.65)', marginBottom: '3px' }

  return (
    <div>
      {succes && (
        <div className="rounded-xl p-3 mb-4 text-center text-sm font-medium text-white"
          style={{background: 'rgba(0,255,150,0.3)'}}>
          ✓ {succes}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium">🎯 Mes formules & tarifs</h2>
        <button onClick={() => { setShowForm(!showForm); setFormule(FORMULE_VIDE); setEditId(null) }}
          className="text-sm px-4 py-2 rounded-full font-semibold"
          style={{background: 'white', color: '#FF1493'}}>
          {showForm ? '✕ Fermer' : '+ Nouvelle formule'}
        </button>
      </div>

      {/* FORMULAIRE */}
      {showForm && (
        <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
          <h3 className="text-white font-medium text-sm mb-3">
            {editId ? '✏️ Modifier la formule' : '➕ Nouvelle formule'}
          </h3>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label style={styleLabel}>Nom *</label>
              <input value={formule.nom} onChange={e => update('nom', e.target.value)}
                placeholder="Ex: Formule Excellence" style={styleInput} />
            </div>
            <div>
              <label style={styleLabel}>Badge</label>
              <div className="flex gap-1 flex-wrap">
                {BADGES.map(b => (
                  <button key={b.id} onClick={() => update('badge', b.id)}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: formule.badge === b.id ? 'white' : 'rgba(255,255,255,0.15)',
                      color: formule.badge === b.id ? '#FF1493' : 'white',
                      fontSize: '9px'
                    }}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2">
            <div>
              <label style={styleLabel}>Prix *</label>
              <input type="number" value={formule.prix} onChange={e => update('prix', e.target.value)}
                placeholder="1500" style={styleInput} />
            </div>
            <div>
              <label style={styleLabel}>Type</label>
              <select value={formule.type_prix} onChange={e => update('type_prix', e.target.value)} style={styleInput}>
                <option value="fixe">Prix fixe</option>
                <option value="partir">À partir de</option>
                <option value="devis">Sur devis</option>
              </select>
            </div>
            <div>
              <label style={styleLabel}>Unité</label>
              <select value={formule.unite} onChange={e => update('unite', e.target.value)} style={styleInput}>
                <option value="evenement">/ événement</option>
                <option value="personne">/ personne</option>
                <option value="heure">/ heure</option>
                <option value="jour">/ jour</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2">
            <div>
              <label style={styleLabel}>Pers. min</label>
              <input type="number" value={formule.capacite_min} onChange={e => update('capacite_min', e.target.value)} placeholder="10" style={styleInput} />
            </div>
            <div>
              <label style={styleLabel}>Pers. max</label>
              <input type="number" value={formule.capacite_max} onChange={e => update('capacite_max', e.target.value)} placeholder="100" style={styleInput} />
            </div>
            <div>
              <label style={styleLabel}>Durée</label>
              <input value={formule.duree} onChange={e => update('duree', e.target.value)} placeholder="4h" style={styleInput} />
            </div>
            <div>
              <label style={styleLabel}>Délai résa (j)</label>
              <input type="number" value={formule.delai_reservation} onChange={e => update('delai_reservation', e.target.value)} placeholder="30" style={styleInput} />
            </div>
          </div>

          <div className="mb-2">
            <label style={styleLabel}>Description *</label>
            <textarea value={formule.description} onChange={e => update('description', e.target.value)}
              placeholder="Décrivez cette formule..." rows={2}
              style={{...styleInput, resize: 'none', height: '50px'}} />
          </div>

          <div className="mb-2">
            <label style={styleLabel}>✓ Inclus</label>
            {formule.inclus.map((item, i) => (
              <div key={i} className="flex items-center gap-1 mb-1">
                <input value={item} onChange={e => updateListe('inclus', i, e.target.value)}
                  placeholder="Ex: Menu 3 services" style={styleInput} />
                <button onClick={() => supprimerLigne('inclus', i)}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                  style={{background: 'rgba(255,50,50,0.5)'}}>✕</button>
              </div>
            ))}
            <button onClick={() => ajouterLigne('inclus')}
              className="w-full py-1 rounded-lg text-xs mt-1"
              style={{background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px dashed rgba(255,255,255,0.3)'}}>
              + Ajouter
            </button>
          </div>

          <div className="mb-2">
            <label style={styleLabel}>✗ Non inclus</label>
            {formule.exclus.map((item, i) => (
              <div key={i} className="flex items-center gap-1 mb-1">
                <input value={item} onChange={e => updateListe('exclus', i, e.target.value)}
                  placeholder="Ex: Boissons" style={styleInput} />
                <button onClick={() => supprimerLigne('exclus', i)}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                  style={{background: 'rgba(255,50,50,0.5)'}}>✕</button>
              </div>
            ))}
            <button onClick={() => ajouterLigne('exclus')}
              className="w-full py-1 rounded-lg text-xs mt-1"
              style={{background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px dashed rgba(255,255,255,0.3)'}}>
              + Ajouter
            </button>
          </div>

          <div className="mb-2">
            <label style={styleLabel}>Options supplémentaires (payantes)</label>
            {formule.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-1 mb-1">
                <input value={opt.nom} onChange={e => updateOption(i, 'nom', e.target.value)}
                  placeholder="Ex: Open bar" style={{...styleInput, flex: 1}} />
                <input type="number" value={opt.prix} onChange={e => updateOption(i, 'prix', e.target.value)}
                  placeholder="Prix €" style={{...styleInput, width: '65px'}} />
                <button onClick={() => supprimerLigne('options', i)}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                  style={{background: 'rgba(255,50,50,0.5)'}}>✕</button>
              </div>
            ))}
            <button onClick={() => ajouterLigne('options')}
              className="w-full py-1 rounded-lg text-xs mt-1"
              style={{background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px dashed rgba(255,255,255,0.3)'}}>
              + Ajouter une option
            </button>
          </div>

          <div className="mb-3">
            <label style={styleLabel}>Conditions d'annulation</label>
            <textarea value={formule.conditions_annulation} onChange={e => update('conditions_annulation', e.target.value)}
              placeholder="Ex: Annulation gratuite jusqu'à 30 jours avant l'événement." rows={2}
              style={{...styleInput, resize: 'none', height: '50px'}} />
          </div>

          <div className="flex gap-2">
            <button onClick={() => { setShowForm(false); setFormule(FORMULE_VIDE); setEditId(null) }}
              className="flex-1 py-2 rounded-xl text-xs"
              style={{background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)'}}>
              Annuler
            </button>
            <button onClick={sauvegarder} disabled={!formule.nom || !formule.prix}
              className="flex-2 py-2 px-6 rounded-xl text-xs font-semibold disabled:opacity-50"
              style={{background: 'white', color: '#FF1493'}}>
              💾 Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* LISTE */}
      {loading ? (
        <p className="text-white text-sm">Chargement...</p>
      ) : formules.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={{background: 'rgba(255,255,255,0.1)'}}>
          <p className="text-2xl mb-2">🎯</p>
          <p className="text-white text-sm mb-1">Aucune formule créée</p>
          <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Créez votre première formule pour qu'elle apparaisse sur votre fiche</p>
        </div>
      ) : (
        formules.map(f => (
          <div key={f.id} className="rounded-2xl p-4 mb-3"
            style={{background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', opacity: f.actif ? 1 : 0.6}}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm">{f.nom}</span>
                {f.badge && f.badge !== 'none' && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{background: BADGES.find(b => b.id === f.badge)?.bg || GRADIENT, fontSize: '9px'}}>
                    {BADGES.find(b => b.id === f.badge)?.label}
                  </span>
                )}
                <div onClick={() => toggleActif(f.id, f.actif)}
                  className="rounded-full cursor-pointer flex-shrink-0"
                  style={{ width: '26px', height: '14px', background: f.actif ? 'white' : 'rgba(255,255,255,0.25)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: '2px',
                    left: f.actif ? '14px' : '2px',
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    background: f.actif ? '#FF1493' : 'rgba(255,255,255,0.6)',
                  }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">
                  {f.type_prix === 'partir' ? 'À partir de ' : f.type_prix === 'devis' ? 'Sur devis' : ''}{f.type_prix !== 'devis' && `${f.prix}€`}
                  <span className="text-xs font-normal" style={{color: 'rgba(255,255,255,0.6)'}}> / {f.unite}</span>
                </p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{f.capacite_min} à {f.capacite_max} pers.</p>
              </div>
            </div>

            <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.75)', lineHeight: '1.5'}}>{f.description}</p>

            {f.inclus?.filter(i => i).length > 0 && (
              <div className="mb-1">
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.8)'}}>
                  <span style={{color: '#00C864'}}>✓</span> {f.inclus.filter(i => i).join(' · ')}
                </p>
              </div>
            )}
            {f.exclus?.filter(e => e).length > 0 && (
              <div className="mb-2">
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                  <span style={{color: '#FF4444'}}>✗</span> {f.exclus.filter(e => e).join(' · ')}
                </p>
              </div>
            )}

            <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.5)'}}>
              {f.duree && `⏱ ${f.duree}`}{f.delai_reservation && ` · 📅 Réservation min. ${f.delai_reservation}j`}
            </p>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => modifierFormule(f)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                ✏️ Modifier
              </button>
              <button onClick={() => setDevisModal(f)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                📄 Créer un devis
              </button>
              <button onClick={() => supprimerFormule(f.id)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{background: 'rgba(255,50,50,0.4)', color: 'white'}}>
                🗑️
              </button>
            </div>
          </div>
        ))
      )}

      {/* MODAL DEVIS */}
      {devisModal && (
        <div className="fixed inset-0 flex items-center justify-center p-6 z-50"
          style={{background: 'rgba(0,0,0,0.6)'}}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-1" style={{color: '#1a1a1a'}}>
              📄 Créer un devis
            </h3>
            <p className="text-xs text-gray-500 mb-4">{devisModal.nom}</p>
            <div className="space-y-3">
              <button onClick={() => { genererDevisWord(devisModal); setDevisModal(null) }}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center gap-3"
                style={{background: '#f0f4ff', color: '#1a1a1a', border: '1px solid #dde5ff'}}>
                <span className="text-2xl ml-2">📝</span>
                <div className="text-left">
                  <p className="font-medium">Télécharger en Word</p>
                  <p className="text-xs text-gray-500">Fichier .txt éditable dans Word</p>
                </div>
              </button>
              <button onClick={() => { window.print(); setDevisModal(null) }}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center gap-3"
                style={{background: '#fff0f0', color: '#1a1a1a', border: '1px solid #ffd5d5'}}>
                <span className="text-2xl ml-2">📊</span>
                <div className="text-left">
                  <p className="font-medium">Exporter en PDF</p>
                  <p className="text-xs text-gray-500">Imprimer ou sauvegarder en PDF</p>
                </div>
              </button>
              <button onClick={() => { window.open(`/prestataire/${prestaId}?formule=${devisModal.id}`, '_blank'); setDevisModal(null) }}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center gap-3"
                style={{background: '#f0fff4', color: '#1a1a1a', border: '1px solid #c6f6d5'}}>
                <span className="text-2xl ml-2">🌐</span>
                <div className="text-left">
                  <p className="font-medium">Page devis OKAZI</p>
                  <p className="text-xs text-gray-500">Partager un lien vers cette formule</p>
                </div>
              </button>
            </div>
            <button onClick={() => setDevisModal(null)}
              className="w-full mt-3 py-2 rounded-xl text-sm border border-gray-200 text-gray-500">
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
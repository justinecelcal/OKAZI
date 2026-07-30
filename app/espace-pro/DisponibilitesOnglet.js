'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'
const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

export default function DisponibilitesOnglet({ prestaId, reservations }) {
  const [moisActuel, setMoisActuel] = useState(new Date())
  const [datesBloquees, setDatesBloquees] = useState([])
  const [modeSelection, setModeSelection] = useState(null)
  const [raisonModal, setRaisonModal] = useState(false)
  const [jourSelectionne, setJourSelectionne] = useState(null)
  const [raison, setRaison] = useState('')
  const [plageDebut, setPlageDebut] = useState('')
  const [plageFin, setPlageFin] = useState('')
  const [raisonPlage, setRaisonPlage] = useState('')
  const [delaiMin, setDelaiMin] = useState(15)
  const [capaciteMax, setCapaciteMax] = useState(1)
  const [messageIndispo, setMessageIndispo] = useState('')
  const [succes, setSucces] = useState('')
  const [horaires, setHoraires] = useState({
    lundi: { actif: true, debut: '09:00', fin: '18:00' },
    mardi: { actif: true, debut: '09:00', fin: '18:00' },
    mercredi: { actif: true, debut: '09:00', fin: '18:00' },
    jeudi: { actif: true, debut: '09:00', fin: '18:00' },
    vendredi: { actif: true, debut: '09:00', fin: '17:00' },
    samedi: { actif: true, debut: '10:00', fin: '20:00' },
    dimanche: { actif: false, debut: '00:00', fin: '00:00' },
  })

  const mois = moisActuel.getMonth()
  const annee = moisActuel.getFullYear()
  const nomsMois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const joursLabel = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
  const premierJour = new Date(annee, mois, 1).getDay()
  const decalage = premierJour === 0 ? 6 : premierJour - 1
  const nbJours = new Date(annee, mois + 1, 0).getDate()

  useEffect(() => { chargerDatesBloquees() }, [prestaId])

  async function chargerDatesBloquees() {
    const { data } = await supabase.from('disponibilites').select('*').eq('prestataire_id', prestaId)
    setDatesBloquees(data || [])
  }

  function getDateStr(jour) {
    return `${annee}-${String(mois+1).padStart(2,'0')}-${String(jour).padStart(2,'0')}`
  }

  function estBloque(jour) {
    return datesBloquees.some(d => d.date === getDateStr(jour))
  }

  function getRaisonBlocage(jour) {
    return datesBloquees.find(d => d.date === getDateStr(jour))?.raison || ''
  }

  function getRdvDuJour(jour) {
    const date = getDateStr(jour)
    return reservations.filter(r => r.date_rdv === date || r.evenements?.date_evenement === date)
  }

  async function bloquerDate(jour) {
    const date = getDateStr(jour)
    await supabase.from('disponibilites').insert([{
      prestataire_id: prestaId,
      date,
      raison: raison || 'Indisponible'
    }])
    setRaisonModal(false)
    setRaison('')
    setJourSelectionne(null)
    chargerDatesBloquees()
  }

  async function bloquerPlage() {
    if (!plageDebut || !plageFin) return
    const debut = new Date(plageDebut)
    const fin = new Date(plageFin)
    const dates = []
    for (let d = new Date(debut); d <= fin; d.setDate(d.getDate() + 1)) {
      dates.push({
        prestataire_id: prestaId,
        date: d.toISOString().split('T')[0],
        raison: raisonPlage || 'Indisponible'
      })
    }
    await supabase.from('disponibilites').insert(dates)
    setPlageDebut('')
    setPlageFin('')
    setRaisonPlage('')
    setSucces('Plage bloquée avec succès !')
    setTimeout(() => setSucces(''), 3000)
    chargerDatesBloquees()
  }

  async function debloquerDate(date) {
    await supabase.from('disponibilites').delete().eq('prestataire_id', prestaId).eq('date', date)
    chargerDatesBloquees()
  }

  function handleJourClick(jour) {
    const rdvs = getRdvDuJour(jour)
    if (rdvs.length > 0) return
    if (modeSelection === 'bloquer' && !estBloque(jour)) {
      setJourSelectionne(jour)
      setRaisonModal(true)
    } else if (modeSelection === 'debloquer' && estBloque(jour)) {
      debloquerDate(getDateStr(jour))
    }
  }

  async function sauvegarderParametres() {
    await supabase.from('prestataires').update({
      delai_min_reservation: delaiMin,
      capacite_max_jour: capaciteMax,
      message_indispo: messageIndispo,
    }).eq('id', prestaId)
    setSucces('Paramètres enregistrés !')
    setTimeout(() => setSucces(''), 3000)
  }

  async function sauvegarderHoraires() {
    await supabase.from('prestataires').update({
      horaires: JSON.stringify(horaires)
    }).eq('id', prestaId)
    setSucces('Horaires enregistrés !')
    setTimeout(() => setSucces(''), 3000)
  }

  const aujourd_hui = new Date()
  const estAujourdhui = (jour) =>
    jour === aujourd_hui.getDate() &&
    mois === aujourd_hui.getMonth() &&
    annee === aujourd_hui.getFullYear()

  const nbBloques = datesBloquees.filter(d =>
    d.date?.startsWith(`${annee}-${String(mois+1).padStart(2,'0')}`)
  ).length
  const nbReserves = reservations.filter(r =>
    r.evenements?.date_evenement?.startsWith(`${annee}-${String(mois+1).padStart(2,'0')}`)
  ).length
  const nbDisponibles = nbJours - nbBloques - nbReserves

  return (
    <div>
      {succes && (
        <div className="rounded-xl p-3 mb-4 text-center text-sm font-medium text-white"
          style={{background: 'rgba(0,255,150,0.3)'}}>
          ✓ {succes}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { val: nbDisponibles, lbl: 'Jours disponibles', color: '#00C864' },
          { val: nbReserves, lbl: 'Jours réservés', color: '#FFA500' },
          { val: nbBloques, lbl: 'Jours bloqués', color: '#FF4444' },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-3 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
            <p className="text-xl font-semibold" style={{color: s.color}}>{s.val}</p>
            <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={() => setModeSelection(modeSelection === 'bloquer' ? null : 'bloquer')}
          className="py-2 rounded-xl text-sm font-medium"
          style={{
            background: modeSelection === 'bloquer' ? 'rgba(255,50,50,0.5)' : 'rgba(255,255,255,0.15)',
            color: 'white',
            border: modeSelection === 'bloquer' ? '2px solid rgba(255,50,50,0.8)' : '1px solid rgba(255,255,255,0.3)'
          }}>
          🚫 {modeSelection === 'bloquer' ? 'Cliquez un jour pour bloquer' : 'Bloquer des dates'}
        </button>
        <button onClick={() => setModeSelection(modeSelection === 'debloquer' ? null : 'debloquer')}
          className="py-2 rounded-xl text-sm font-medium"
          style={{
            background: modeSelection === 'debloquer' ? 'rgba(0,200,100,0.4)' : 'rgba(255,255,255,0.15)',
            color: 'white',
            border: modeSelection === 'debloquer' ? '2px solid rgba(0,200,100,0.6)' : '1px solid rgba(255,255,255,0.3)'
          }}>
          ✅ {modeSelection === 'debloquer' ? 'Cliquez un jour pour débloquer' : 'Débloquer des dates'}
        </button>
      </div>

      {/* BLOCAGE PAR PLAGE */}
      <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
        <h2 className="text-white font-medium text-sm mb-3">📅 Bloquer une plage de dates</h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.65)'}}>Date de début</label>
            <input type="date" value={plageDebut} onChange={e => setPlageDebut(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.65)'}}>Date de fin</label>
            <input type="date" value={plageFin} onChange={e => setPlageFin(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
          </div>
        </div>
        <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.65)'}}>Raison</label>
        <input placeholder="Ex: Congés d'été" value={raisonPlage} onChange={e => setRaisonPlage(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm outline-none bg-white mb-3" style={{color: '#333'}} />
        <button onClick={bloquerPlage} disabled={!plageDebut || !plageFin}
          className="w-full py-2 rounded-xl text-sm font-medium disabled:opacity-50"
          style={{background: 'rgba(255,50,50,0.5)', color: 'white', border: '1px solid rgba(255,50,50,0.6)'}}>
          🚫 Bloquer cette plage
        </button>
      </div>

      {/* CALENDRIER */}
      <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold text-sm">{nomsMois[mois]} {annee}</span>
          <div className="flex gap-2">
            <button onClick={() => setMoisActuel(new Date(annee, mois-1, 1))}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
              style={{background: 'rgba(255,255,255,0.2)'}}>‹</button>
            <button onClick={() => setMoisActuel(new Date(annee, mois+1, 1))}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
              style={{background: 'rgba(255,255,255,0.2)'}}>›</button>
          </div>
        </div>
        <div className="flex gap-4 mb-3 flex-wrap">
          {[
            { color: 'rgba(255,255,255,0.05)', label: 'Disponible', border: '1px solid rgba(255,255,255,0.2)' },
            { color: 'rgba(255,165,0,0.5)', label: 'Réservé' },
            { color: 'rgba(255,50,50,0.5)', label: 'Bloqué' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1 text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
              <div className="w-2 h-2 rounded" style={{background: l.color, border: l.border || 'none'}}></div>
              {l.label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {joursLabel.map(j => (
            <div key={j} className="text-center" style={{fontSize: '9px', color: 'rgba(255,255,255,0.5)', padding: '2px 0'}}>{j}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(decalage).fill(null).map((_, i) => <div key={`e-${i}`} />)}
          {Array(nbJours).fill(null).map((_, i) => {
            const jour = i + 1
            const bloque = estBloque(jour)
            const rdvs = getRdvDuJour(jour)
            const aRdv = rdvs.length > 0
            return (
              <div key={jour} onClick={() => handleJourClick(jour)}
                className="rounded-lg p-1"
                style={{
                  minHeight: '38px',
                  cursor: modeSelection ? 'pointer' : 'default',
                  background: bloque ? 'rgba(255,50,50,0.4)' : aRdv ? 'rgba(255,165,0,0.4)' : estAujourdhui(jour) ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.05)',
                  border: estAujourdhui(jour) ? '1.5px solid white' : bloque ? '1px solid rgba(255,50,50,0.6)' : aRdv ? '1px solid rgba(255,165,0,0.6)' : '1px solid rgba(255,255,255,0.1)'
                }}>
                <div style={{fontSize: '9px', color: 'white', fontWeight: '500', marginBottom: '1px'}}>{jour}</div>
                {bloque && (
                  <div style={{fontSize: '7px', padding: '1px 2px', borderRadius: '3px', background: 'rgba(255,50,50,0.7)', color: 'white', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    {getRaisonBlocage(jour)}
                  </div>
                )}
                {aRdv && (
                  <div style={{fontSize: '7px', padding: '1px 2px', borderRadius: '3px', background: 'rgba(255,165,0,0.7)', color: 'white'}}>
                    RDV
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* HORAIRES */}
      <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
        <h2 className="text-white font-medium text-sm mb-3">🕐 Horaires de disponibilité</h2>
        {JOURS.map(jour => (
          <div key={jour} className="flex items-center gap-3 py-2" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
            <span className="text-white text-xs" style={{width: '65px', flexShrink: 0}}>
              {jour.charAt(0).toUpperCase() + jour.slice(1)}
            </span>
            <div onClick={() => setHoraires({...horaires, [jour]: {...horaires[jour], actif: !horaires[jour].actif}})}
              className="rounded-full cursor-pointer flex-shrink-0"
              style={{
                width: '28px', height: '16px',
                background: horaires[jour].actif ? 'white' : 'rgba(255,255,255,0.25)',
                position: 'relative'
              }}>
              <div style={{
                position: 'absolute', top: '2px',
                left: horaires[jour].actif ? '14px' : '2px',
                width: '12px', height: '12px',
                borderRadius: '50%',
                background: horaires[jour].actif ? '#FF1493' : 'rgba(255,255,255,0.6)',
                transition: 'left 0.2s'
              }} />
            </div>
            <div className="flex items-center gap-2 flex-1" style={{opacity: horaires[jour].actif ? 1 : 0.3}}>
              <input type="time" value={horaires[jour].debut}
                onChange={e => setHoraires({...horaires, [jour]: {...horaires[jour], debut: e.target.value}})}
                disabled={!horaires[jour].actif}
                className="rounded-md text-xs outline-none"
                style={{background: 'rgba(255,255,255,0.15)', border: 'none', padding: '3px 6px', color: 'white', width: '55px'}} />
              <span style={{fontSize: '9px', color: 'rgba(255,255,255,0.5)'}}>→</span>
              <input type="time" value={horaires[jour].fin}
                onChange={e => setHoraires({...horaires, [jour]: {...horaires[jour], fin: e.target.value}})}
                disabled={!horaires[jour].actif}
                className="rounded-md text-xs outline-none"
                style={{background: 'rgba(255,255,255,0.15)', border: 'none', padding: '3px 6px', color: 'white', width: '55px'}} />
            </div>
          </div>
        ))}
        <button onClick={sauvegarderHoraires}
          className="w-full mt-3 py-2 rounded-xl text-sm font-semibold"
          style={{background: 'white', color: '#FF1493'}}>
          Enregistrer les horaires
        </button>
      </div>

      {/* PARAMÈTRES */}
      <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
        <h2 className="text-white font-medium text-sm mb-3">⚙️ Paramètres de réservation</h2>

        <div className="mb-3 pb-3" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
          <p className="text-white text-xs font-medium mb-1">Délai minimum avant réservation</p>
          <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.55)'}}>Je n'accepte pas les réservations à moins de :</p>
          <div className="flex items-center gap-2">
            <input type="number" value={delaiMin} onChange={e => setDelaiMin(parseInt(e.target.value))} min="1"
              className="rounded-lg text-sm outline-none text-center bg-white"
              style={{color: '#333', padding: '5px 8px', width: '60px', border: 'none'}} />
            <span className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>jours avant l'événement</span>
          </div>
        </div>

        <div className="mb-3 pb-3" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
          <p className="text-white text-xs font-medium mb-1">Capacité maximum par jour</p>
          <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.55)'}}>Nombre maximum d'événements acceptés par jour :</p>
          <div className="flex items-center gap-2">
            <input type="number" value={capaciteMax} onChange={e => setCapaciteMax(parseInt(e.target.value))} min="1"
              className="rounded-lg text-sm outline-none text-center bg-white"
              style={{color: '#333', padding: '5px 8px', width: '60px', border: 'none'}} />
            <span className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>événement(s) par jour</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-white text-xs font-medium mb-1">Message d'indisponibilité</p>
          <p className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.55)'}}>Affiché au client quand il choisit une date bloquée :</p>
          <input placeholder="Ex: Je suis indisponible à cette date, merci de choisir une autre date."
            value={messageIndispo} onChange={e => setMessageIndispo(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
        </div>

        <button onClick={sauvegarderParametres}
          className="w-full py-2 rounded-xl text-sm font-semibold"
          style={{background: 'white', color: '#FF1493'}}>
          Enregistrer les paramètres
        </button>
      </div>

      {/* DATES BLOQUÉES */}
      {datesBloquees.length > 0 && (
        <div className="rounded-2xl p-4 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
          <h2 className="text-white font-medium text-sm mb-3">🚫 Dates bloquées</h2>
          <div className="space-y-2">
            {datesBloquees
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                  style={{background: 'rgba(255,50,50,0.2)', border: '1px solid rgba(255,50,50,0.3)'}}>
                  <div>
                    <p className="text-white text-xs font-medium">
                      {new Date(d.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>{d.raison}</p>
                  </div>
                  <button onClick={() => debloquerDate(d.date)}
                    className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                    style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                    Débloquer
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* EXPORT */}
      <div className="rounded-2xl p-4" style={{background: 'rgba(255,255,255,0.15)'}}>
        <h2 className="text-white font-medium text-sm mb-3">📤 Export & Synchronisation</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '📥', label: 'Exporter PDF' },
            { icon: '📅', label: 'Google Calendar' },
            { icon: '🍎', label: 'iCal' },
          ].map((b, i) => (
            <button key={i} className="py-3 rounded-xl text-xs font-medium text-center text-white"
              style={{background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)'}}>
              <div className="text-lg mb-1">{b.icon}</div>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL RAISON */}
      {raisonModal && (
        <div className="fixed inset-0 flex items-center justify-center p-6 z-50"
          style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2" style={{color: '#1a1a1a'}}>
              Bloquer le {jourSelectionne} {nomsMois[mois]}
            </h3>
            <p className="text-xs text-gray-500 mb-4">Pourquoi bloquez-vous cette date ?</p>
            <input
              placeholder="Ex : Congés, rendez-vous personnel..."
              value={raison}
              onChange={e => setRaison(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none mb-4"
              style={{color: '#333'}}
            />
            <div className="flex gap-3">
              <button onClick={() => { setRaisonModal(false); setRaison('') }}
                className="flex-1 py-2 rounded-xl text-sm border border-gray-200 text-gray-600">
                Annuler
              </button>
              <button onClick={() => bloquerDate(jourSelectionne)}
                className="flex-1 py-2 rounded-xl text-sm text-white font-semibold"
                style={{background: GRADIENT}}>
                Bloquer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
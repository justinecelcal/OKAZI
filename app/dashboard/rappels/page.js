'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function RappelsPage() {
  const [prefs, setPrefs] = useState({
    email_actif: true,
    sms_actif: true,
    push_actif: false,
    telephone: '',
    contact2_nom: '',
    contact2_email: '',
    contact2_telephone: '',
    langue: 'fr',
    heure_envoi: '08:00',
    pause_notifications: false,
    resume_hebdo: true,
    rappel_budget: true,
    budget_seuil: 80,
    // Délais événement
    delai_j30: true,
    delai_j7: true,
    delai_j3: true,
    delai_j1: true,
    // Rappels RDV
    rdv_48h: true,
    rdv_24h: true,
    rdv_2h: false,
    // Emails
    email_confirmation: true,
    email_message: true,
    email_devis: true,
    email_modification: false,
    // SMS
    sms_j1: true,
    sms_confirmation: true,
    sms_urgent: false,
  })

  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [historique] = useState([
    { date: '19 juil. 2025 · 08h00', type: 'Email', message: 'Rappel J-7 — Mariage Sophie & Marc', statut: 'Reçu' },
    { date: '15 juil. 2025 · 08h00', type: 'Email', message: 'Confirmation réservation — Maison Lumière', statut: 'Reçu' },
    { date: '14 juil. 2025 · 10h30', type: 'SMS', message: 'Rappel RDV demain — Studio Luminos', statut: 'Reçu' },
    { date: '10 juil. 2025 · 08h00', type: 'Email', message: 'Rappel J-30 — Mariage Sophie & Marc', statut: 'Reçu' },
  ])

  function toggle(champ) {
    setPrefs({ ...prefs, [champ]: !prefs[champ] })
  }

  function update(champ, val) {
    setPrefs({ ...prefs, [champ]: val })
  }

  async function sauvegarder() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSucces(true)
    setLoading(false)
    setTimeout(() => setSucces(false), 3000)
  }

  const Toggle = ({ champ }) => (
    <div onClick={() => toggle(champ)}
      className="flex-shrink-0 cursor-pointer rounded-full transition-all"
      style={{
        width: '40px', height: '22px',
        background: prefs[champ] ? 'white' : 'rgba(255,255,255,0.3)',
        position: 'relative'
      }}>
      <div style={{
        position: 'absolute',
        top: '3px',
        left: prefs[champ] ? '21px' : '3px',
        width: '16px', height: '16px',
        borderRadius: '50%',
        background: prefs[champ] ? '#FF1493' : 'rgba(255,255,255,0.7)',
        transition: 'left 0.2s'
      }} />
    </div>
  )

  const ToggleRow = ({ champ, label, sub, badge }) => (
    <div className="flex items-center justify-between py-3"
      style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm font-medium">{label}</p>
          {badge && <span className="text-xs px-2 py-0.5 rounded-full"
            style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>{badge}</span>}
        </div>
        {sub && <p className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.6)'}}>{sub}</p>}
      </div>
      <Toggle champ={champ} />
    </div>
  )

  const Card = ({ title, icon, children }) => (
    <div className="rounded-2xl p-5 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <p className="text-white font-semibold mb-4">{icon} {title}</p>
      {children}
    </div>
  )

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-semibold text-white mb-1">Mes rappels & notifications</h1>
        <p className="mb-6 text-sm" style={{color: 'rgba(255,255,255,0.75)'}}>
          Configurez comment et quand vous souhaitez être notifié.
        </p>

        {succes && (
          <div className="rounded-xl p-3 mb-4 text-center font-medium text-sm"
            style={{background: 'rgba(0,255,150,0.3)', color: 'white'}}>
            ✓ Préférences enregistrées !
          </div>
        )}

        {/* PAUSE GÉNÉRALE */}
        <Card title="Mettre en pause toutes les notifications" icon="⏸️">
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{color: 'rgba(255,255,255,0.8)'}}>
              Désactiver temporairement tous les rappels (vacances, etc.)
            </p>
            <Toggle champ="pause_notifications" />
          </div>
        </Card>

        {/* CANAUX */}
        <Card title="Canaux de notification" icon="📡">
          <ToggleRow champ="email_actif" label="Emails de rappel" sub="Rappels d'événements et de RDV par email" />
          <ToggleRow champ="sms_actif" label="SMS de rappel" sub="Rappels urgents par SMS" />
          <ToggleRow champ="push_actif" label="Notifications push" sub="Alertes en temps réel dans le navigateur" />
        </Card>

        {/* TÉLÉPHONE */}
        <Card title="Numéro de téléphone" icon="📱">
          <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.7)'}}>Requis pour recevoir les SMS de rappel.</p>
          <input placeholder="+33 6 00 00 00 00"
            value={prefs.telephone} onChange={e => update('telephone', e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white mb-3" style={{color: '#333'}} />

          <p className="text-white text-sm font-medium mb-2">2ème contact (conjoint, proche...)</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Prénom Nom"
              value={prefs.contact2_nom} onChange={e => update('contact2_nom', e.target.value)}
              className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
            <input placeholder="+33 6 00 00 00 00"
              value={prefs.contact2_telephone} onChange={e => update('contact2_telephone', e.target.value)}
              className="rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
          </div>
          <input placeholder="Email du 2ème contact"
            value={prefs.contact2_email} onChange={e => update('contact2_email', e.target.value)}
            className="w-full rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
        </Card>

        {/* HEURE D'ENVOI */}
        <Card title="Heure d'envoi préférée" icon="🕐">
          <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.7)'}}>À quelle heure souhaitez-vous recevoir vos rappels ?</p>
          <div className="flex flex-wrap gap-2">
            {['07:00', '08:00', '09:00', '10:00', '12:00', '18:00', '20:00'].map(h => (
              <button key={h} onClick={() => update('heure_envoi', h)}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: prefs.heure_envoi === h ? 'white' : 'rgba(255,255,255,0.2)',
                  color: prefs.heure_envoi === h ? '#FF1493' : 'white'
                }}>
                {h}
              </button>
            ))}
          </div>
        </Card>

        {/* LANGUE */}
        <Card title="Langue des notifications" icon="🌍">
          <div className="flex gap-3">
            {[{id:'fr', label:'🇫🇷 Français'}, {id:'en', label:'🇬🇧 English'}, {id:'es', label:'🇪🇸 Español'}].map(l => (
              <button key={l.id} onClick={() => update('langue', l.id)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: prefs.langue === l.id ? 'white' : 'rgba(255,255,255,0.2)',
                  color: prefs.langue === l.id ? '#FF1493' : 'white'
                }}>
                {l.label}
              </button>
            ))}
          </div>
        </Card>

        {/* DÉLAIS ÉVÉNEMENT */}
        <Card title="Rappels avant l'événement" icon="📅">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {[
              { champ: 'delai_j30', label: 'J-30', sub: 'Email' },
              { champ: 'delai_j7', label: 'J-7', sub: 'Email' },
              { champ: 'delai_j3', label: 'J-3', sub: 'Email+SMS' },
              { champ: 'delai_j1', label: 'J-1', sub: 'SMS' },
            ].map(d => (
              <button key={d.champ} onClick={() => toggle(d.champ)}
                className="py-3 rounded-xl text-center text-xs font-medium"
                style={{
                  background: prefs[d.champ] ? 'white' : 'rgba(255,255,255,0.2)',
                  color: prefs[d.champ] ? '#FF1493' : 'white'
                }}>
                <div className="font-semibold">{d.label}</div>
                <div style={{opacity: 0.7, fontSize: '10px'}}>{d.sub}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* RAPPELS RDV PRESTATAIRES */}
        <Card title="Rappels RDV prestataires" icon="🤝">
          <ToggleRow champ="rdv_48h" label="48h avant le RDV" sub="Email de rappel 2 jours avant" badge="Email" />
          <ToggleRow champ="rdv_24h" label="24h avant le RDV" sub="Email + SMS la veille" badge="Email+SMS" />
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-white text-sm font-medium">2h avant le RDV</p>
              <p className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.6)'}}>SMS de rappel de dernière minute</p>
            </div>
            <Toggle champ="rdv_2h" />
          </div>
        </Card>

        {/* RAPPELS EMAIL */}
        <Card title="Rappels par email" icon="✉️">
          <ToggleRow champ="email_confirmation" label="Confirmation de réservation" sub="Quand un prestataire confirme votre réservation" />
          <ToggleRow champ="email_message" label="Nouveau message prestataire" sub="Quand un prestataire vous envoie un message" />
          <ToggleRow champ="email_devis" label="Devis reçu" sub="Quand un prestataire vous envoie un devis" />
          <ToggleRow champ="email_modification" label="Modification de réservation" sub="Changement de statut d'une réservation" />
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-white text-sm font-medium">Résumé hebdomadaire</p>
              <p className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.6)'}}>Email récap chaque lundi matin</p>
            </div>
            <Toggle champ="resume_hebdo" />
          </div>
        </Card>

        {/* RAPPELS SMS */}
        <Card title="Rappels par SMS" icon="💬">
          <ToggleRow champ="sms_j1" label="Rappel urgent J-1" sub="La veille de votre événement" />
          <ToggleRow champ="sms_confirmation" label="Confirmation réservation" sub="SMS quand un prestataire confirme" />
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-white text-sm font-medium">Message urgent prestataire</p>
              <p className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.6)'}}>Si un prestataire marque son message comme urgent</p>
            </div>
            <Toggle champ="sms_urgent" />
          </div>
        </Card>

        {/* ALERTE BUDGET */}
        <Card title="Alerte budget" icon="💰">
          <ToggleRow champ="rappel_budget" label="Alerte dépassement de budget" sub="Notification quand le budget est consommé à :" />
          <div className="flex gap-3 mt-3">
            {[50, 70, 80, 90, 100].map(s => (
              <button key={s} onClick={() => update('budget_seuil', s)}
                className="flex-1 py-2 rounded-xl text-xs font-medium"
                style={{
                  background: prefs.budget_seuil === s ? 'white' : 'rgba(255,255,255,0.2)',
                  color: prefs.budget_seuil === s ? '#FF1493' : 'white'
                }}>
                {s}%
              </button>
            ))}
          </div>
        </Card>

        {/* HISTORIQUE */}
        <Card title="Historique des notifications" icon="📋">
          <div className="space-y-2">
            {historique.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                style={{background: 'rgba(255,255,255,0.1)'}}>
                <span className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: h.type === 'SMS' ? 'rgba(255,200,0,0.4)' : 'rgba(255,255,255,0.25)',
                    color: 'white'
                  }}>
                  {h.type}
                </span>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">{h.message}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{h.date}</p>
                </div>
                <span className="text-xs" style={{color: 'rgba(0,255,150,0.9)'}}>✓ {h.statut}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* BOUTON SAUVEGARDER */}
        <button onClick={sauvegarder} disabled={loading}
          className="w-full py-3 rounded-full font-semibold text-sm disabled:opacity-50"
          style={{background: 'white', color: '#FF1493'}}>
          {loading ? 'Enregistrement...' : 'Enregistrer mes préférences ✓'}
        </button>

      </div>
    </div>
  )
}
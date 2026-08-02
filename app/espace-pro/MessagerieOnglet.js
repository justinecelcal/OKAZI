'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function MessagerieOnglet({ prestaId }) {
  const [conversations, setConversations] = useState([])
  const [convActive, setConvActive] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    chargerConversations()
  }, [prestaId])

  useEffect(() => {
    if (!convActive) return
    chargerMessages(convActive.id)

    const channel = supabase
      .channel(`messages-${convActive.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `reservation_id=eq.${convActive.id}`
      }, payload => {
        setMessages(prev => [...prev, payload.new])
        scrollBas()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [convActive])

  useEffect(() => {
    scrollBas()
  }, [messages])

  function scrollBas() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function chargerConversations() {
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*, evenements(nom, type, date_evenement)')
      .eq('prestataire_id', prestaId)
      .order('created_at', { ascending: false })
    setConversations(data || [])
    setLoading(false)
  }

  async function chargerMessages(reservationId) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('reservation_id', reservationId)
      .order('created_at', { ascending: true })
    setMessages(data || [])

    // Marquer comme lus
    await supabase
      .from('messages')
      .update({ lu: true })
      .eq('reservation_id', reservationId)
      .eq('expediteur', 'client')
  }

  async function envoyerMessage() {
    if (!newMessage.trim() || !convActive) return
    setSending(true)
    await supabase.from('messages').insert([{
      reservation_id: convActive.id,
      contenu: newMessage.trim(),
      expediteur: 'prestataire',
      lu: false,
    }])
    setNewMessage('')
    setSending(false)
  }

  function getNbNonLus(reservationId) {
    return 0 // sera calculé depuis les messages en temps réel
  }

  const nbNonLusTotal = conversations.reduce((acc, c) => acc + getNbNonLus(c.id), 0)

  return (
    <div className="flex gap-3" style={{height: '600px'}}>

      {/* LISTE CONVERSATIONS */}
      <div className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
        style={{width: '240px', background: 'rgba(255,255,255,0.15)'}}>
        <div className="p-3 border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
          <p className="text-white font-medium text-sm">
            💬 Messages
            {nbNonLusTotal > 0 && (
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-yellow-400 text-black font-bold">
                {nbNonLusTotal}
              </span>
            )}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-xs p-3" style={{color: 'rgba(255,255,255,0.6)'}}>Chargement...</p>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Aucune conversation</p>
            </div>
          ) : conversations.map(conv => (
            <div key={conv.id}
              onClick={() => setConvActive(conv)}
              className="p-3 cursor-pointer"
              style={{
                background: convActive?.id === conv.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{background: 'rgba(255,255,255,0.3)'}}>
                  {conv.evenements?.nom?.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{conv.evenements?.nom}</p>
                  <p className="text-xs truncate" style={{color: 'rgba(255,255,255,0.55)'}}>
                    {conv.evenements?.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{
                  color: conv.statut === 'confirme' ? '#00C864' : conv.statut === 'refuse' ? '#FF4444' : '#FFA500'
                }}>
                  {conv.statut === 'confirme' ? '✓ Confirmé' : conv.statut === 'refuse' ? '✗ Refusé' : '⏳ En attente'}
                </span>
                <span className="text-xs" style={{color: 'rgba(255,255,255,0.4)'}}>
                  {conv.evenements?.date_evenement || ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZONE MESSAGES */}
      <div className="flex-1 rounded-2xl flex flex-col overflow-hidden"
        style={{background: 'rgba(255,255,255,0.15)'}}>

        {!convActive ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-white font-medium mb-1">Sélectionnez une conversation</p>
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
              Choisissez une réservation dans la liste à gauche
            </p>
          </div>
        ) : (
          <>
            {/* HEADER CONVERSATION */}
            <div className="p-3 border-b flex items-center gap-3"
              style={{borderColor: 'rgba(255,255,255,0.1)'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{background: 'rgba(255,255,255,0.3)'}}>
                {convActive.evenements?.nom?.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{convActive.evenements?.nom}</p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                  {convActive.evenements?.type} · {convActive.evenements?.date_evenement || 'Date non définie'}
                </p>
              </div>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: convActive.statut === 'confirme' ? 'rgba(0,200,100,0.3)' : 'rgba(255,165,0,0.3)',
                  color: 'white'
                }}>
                {convActive.statut === 'confirme' ? '✓ Confirmé' : '⏳ En attente'}
              </span>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>
                    Aucun message — commencez la conversation !
                  </p>
                </div>
              ) : messages.map((msg, i) => (
                <div key={msg.id || i}
                  className={`flex ${msg.expediteur === 'prestataire' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-xs px-3 py-2 rounded-2xl"
                    style={{
                      background: msg.expediteur === 'prestataire'
                        ? 'white'
                        : 'rgba(255,255,255,0.2)',
                      color: msg.expediteur === 'prestataire' ? '#1a1a1a' : 'white',
                      borderRadius: msg.expediteur === 'prestataire'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px'
                    }}>
                    <p className="text-xs leading-relaxed">{msg.contenu}</p>
                    <p className="text-xs mt-1 text-right"
                      style={{color: msg.expediteur === 'prestataire' ? '#aaa' : 'rgba(255,255,255,0.5)', fontSize: '9px'}}>
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'}) : ''}
                      {msg.expediteur === 'prestataire' && (
                        <span className="ml-1">{msg.lu ? '✓✓' : '✓'}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* SAISIE MESSAGE */}
            <div className="p-3 border-t flex gap-2 items-end"
              style={{borderColor: 'rgba(255,255,255,0.1)'}}>
              <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    envoyerMessage()
                  }
                }}
                placeholder="Écrire un message..."
                rows={1}
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none resize-none"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  maxHeight: '80px'
                }}
              />
              <button
                onClick={envoyerMessage}
                disabled={!newMessage.trim() || sending}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50"
                style={{background: 'white'}}>
                <span style={{color: '#FF1493', fontSize: '14px'}}>→</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
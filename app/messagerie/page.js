'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Messagerie() {
  const [user, setUser] = useState(null)
  const [conversations, setConversations] = useState([])
  const [conversationActive, setConversationActive] = useState(null)
  const [messages, setMessages] = useState([])
  const [nouveauMessage, setNouveauMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    chargerUser()
  }, [])

  useEffect(() => {
    if (conversationActive) {
      chargerMessages(conversationActive)
      const subscription = supabase
        .channel('messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `reservation_id=eq.${conversationActive.id}`
        }, (payload) => {
          setMessages(prev => [...prev, payload.new])
          scrollEnBas()
        })
        .subscribe()
      return () => supabase.removeChannel(subscription)
    }
  }, [conversationActive])

  useEffect(() => {
    scrollEnBas()
  }, [messages])

  function scrollEnBas() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function chargerUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) chargerConversations(user)
  }

  async function chargerConversations(user) {
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*, prestataires(nom, categorie), evenements(nom)')
      .order('created_at', { ascending: false })
    setConversations(data || [])
    setLoading(false)
  }

  async function chargerMessages(reservation) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('reservation_id', reservation.id)
      .order('created_at', { ascending: true })
    setMessages(data || [])
    await supabase
      .from('messages')
      .update({ lu: true })
      .eq('reservation_id', reservation.id)
      .neq('expediteur_id', user?.id)
  }

  async function envoyerMessage() {
    if (!nouveauMessage.trim() || !conversationActive || !user) return
    const { error } = await supabase.from('messages').insert([{
      reservation_id: conversationActive.id,
      expediteur_id: user.id,
      contenu: nouveauMessage.trim(),
      lu: false,
    }])
    if (!error) setNouveauMessage('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      envoyerMessage()
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  if (!user) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="text-center">
        <p className="text-white text-lg mb-4">Connectez-vous pour accéder à la messagerie</p>
        <Link href="/connexion"
          className="px-6 py-3 rounded-full font-semibold text-sm"
          style={{background: 'white', color: '#FF1493'}}>
          Se connecter →
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-xl font-semibold text-white mb-4">💬 Messagerie</h1>

        <div className="grid grid-cols-3 gap-4" style={{height: '70vh'}}>

          {/* LISTE DES CONVERSATIONS */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{background: 'rgba(255,255,255,0.15)'}}>
            <div className="p-4 border-b" style={{borderColor: 'rgba(255,255,255,0.2)'}}>
              <p className="text-white font-medium text-sm">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="text-center p-4 text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>Chargement...</p>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-sm mb-3" style={{color: 'rgba(255,255,255,0.6)'}}>Aucune conversation</p>
                  <Link href="/recherche"
                    className="text-xs px-3 py-2 rounded-full"
                    style={{background: 'white', color: '#FF1493'}}>
                    Trouver un prestataire →
                  </Link>
                </div>
              ) : (
                conversations.map(conv => (
                  <div key={conv.id}
                    onClick={() => setConversationActive(conv)}
                    className="p-4 cursor-pointer transition"
                    style={{
                      background: conversationActive?.id === conv.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{background: 'rgba(255,255,255,0.3)'}}>
                        {conv.prestataires?.nom?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{conv.prestataires?.nom}</p>
                        <p className="text-xs truncate" style={{color: 'rgba(255,255,255,0.6)'}}>
                          {conv.evenements?.nom}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{
                            background: conv.statut === 'confirme' ? 'rgba(0,255,150,0.3)' : 'rgba(255,200,0,0.3)',
                            color: 'white'
                          }}>
                          {conv.statut === 'confirme' ? '✓ Confirmé' : '⏳ En attente'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ZONE DE MESSAGES */}
          <div className="col-span-2 rounded-2xl flex flex-col overflow-hidden"
            style={{background: 'rgba(255,255,255,0.15)'}}>

            {conversationActive ? (
              <>
                {/* EN-TÊTE */}
                <div className="p-4 border-b flex items-center gap-3"
                  style={{borderColor: 'rgba(255,255,255,0.2)'}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{background: 'rgba(255,255,255,0.3)'}}>
                    {conversationActive.prestataires?.nom?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{conversationActive.prestataires?.nom}</p>
                    <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                      {conversationActive.prestataires?.categorie} · {conversationActive.evenements?.nom}
                    </p>
                  </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>
                        Démarrez la conversation avec {conversationActive.prestataires?.nom} !
                      </p>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const estMoi = msg.expediteur_id === user?.id
                      return (
                        <div key={msg.id} className={`flex ${estMoi ? 'justify-end' : 'justify-start'}`}>
                          <div className="max-w-xs">
                            <div className="rounded-2xl px-4 py-2 text-sm"
                              style={{
                                background: estMoi ? 'white' : 'rgba(255,255,255,0.2)',
                                color: estMoi ? '#1a1a1a' : 'white',
                                borderBottomRightRadius: estMoi ? '4px' : '16px',
                                borderBottomLeftRadius: estMoi ? '16px' : '4px',
                              }}>
                              {msg.contenu}
                            </div>
                            <p className="text-xs mt-1 px-1"
                              style={{color: 'rgba(255,255,255,0.5)', textAlign: estMoi ? 'right' : 'left'}}>
                              {formatDate(msg.created_at)}
                              {estMoi && <span className="ml-1">{msg.lu ? ' ✓✓' : ' ✓'}</span>}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* AVERTISSEMENT */}
                <div className="px-4 py-2 text-center text-xs"
                  style={{color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.1)'}}>
                  🔒 Ne partagez jamais vos coordonnées avant la confirmation du paiement — Garantie OKAZI
                </div>

                {/* CHAMP MESSAGE */}
                <div className="p-4 border-t" style={{borderColor: 'rgba(255,255,255,0.2)'}}>
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Écrivez votre message... (Entrée pour envoyer)"
                      value={nouveauMessage}
                      onChange={e => setNouveauMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={2}
                      className="flex-1 rounded-xl px-4 py-2 text-sm outline-none resize-none bg-white"
                      style={{color: '#333'}}
                    />
                    <button onClick={envoyerMessage}
                      disabled={!nouveauMessage.trim()}
                      className="px-4 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50 flex-shrink-0"
                      style={{background: 'white', color: '#FF1493'}}>
                      Envoyer →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-3">💬</p>
                  <p className="text-white font-medium mb-1">Sélectionnez une conversation</p>
                  <p className="text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>
                    Choisissez une réservation pour démarrer
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
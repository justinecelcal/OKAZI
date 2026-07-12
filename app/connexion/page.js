'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Connexion() {
  const router = useRouter()
  const [onglet, setOnglet] = useState('connexion')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  async function seConnecter() {
    setLoading(true)
    setErreur('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErreur('Email ou mot de passe incorrect.')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  async function sInscrire() {
    setLoading(true)
    setErreur('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: nom } }
    })
    if (error) {
      setErreur(error.message)
    } else {
      setSucces('Compte créé ! Vérifiez votre email pour confirmer.')
    }
    setLoading(false)
  }

  async function continuerAvecGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' }
    })
  }

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">

        {/* LOGO */}
        <p className="text-2xl font-semibold tracking-widest text-center mb-1"
          style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          OKAZI
        </p>
        <p className="text-center text-sm text-gray-400 mb-6">Organisez votre événement de A à Z</p>

        {/* ONGLETS */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button onClick={() => setOnglet('connexion')}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition"
            style={{
              background: onglet === 'connexion' ? 'white' : 'transparent',
              color: onglet === 'connexion' ? '#FF1493' : '#888',
              boxShadow: onglet === 'connexion' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}>
            Connexion
          </button>
          <button onClick={() => setOnglet('inscription')}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition"
            style={{
              background: onglet === 'inscription' ? 'white' : 'transparent',
              color: onglet === 'inscription' ? '#FF1493' : '#888',
              boxShadow: onglet === 'inscription' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}>
            Inscription
          </button>
        </div>

        {/* ERREUR / SUCCÈS */}
        {erreur && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
            {erreur}
          </div>
        )}
        {succes && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl mb-4">
            {succes}
          </div>
        )}

        {/* FORMULAIRE */}
        <div className="space-y-4 mb-4">
          {onglet === 'inscription' && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Prénom & Nom</label>
              <input type="text" placeholder="Sophie Martin"
                value={nom} onChange={e => setNom(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
                style={{color: '#333'}} />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input type="email" placeholder="votre@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              style={{color: '#333'}} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Mot de passe</label>
            <input type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              style={{color: '#333'}} />
          </div>
        </div>

        {/* BOUTON PRINCIPAL */}
        <button
          onClick={onglet === 'connexion' ? seConnecter : sInscrire}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm mb-4 disabled:opacity-50"
          style={{background: GRADIENT}}>
          {loading ? 'Chargement...' : onglet === 'connexion' ? 'Se connecter →' : 'Créer mon compte →'}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* GOOGLE */}
        <button onClick={continuerAvecGoogle}
          className="w-full py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 flex items-center justify-center gap-2 mb-4 hover:bg-gray-50 transition">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        {/* MOT DE PASSE OUBLIÉ */}
        {onglet === 'connexion' && (
          <p className="text-center text-xs cursor-pointer" style={{color: '#FF1493'}}>
            Mot de passe oublié ?
          </p>
        )}

      </div>
    </div>
  )
}
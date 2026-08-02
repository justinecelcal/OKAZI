'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [estPrestataire, setEstPrestataire] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase
          .from('prestataires')
          .select('id')
          .eq('email', session.user.email)
          .single()
        setEstPrestataire(!!data)
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase
          .from('prestataires')
          .select('id')
          .eq('email', session.user.email)
          .single()
        setEstPrestataire(!!data)
      } else {
        setEstPrestataire(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

async function seDeconnecter() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="bg-white px-6 py-3 flex items-center justify-between sticky top-0 z-50"
      style={{borderBottom: '1px solid rgba(255,100,0,0.15)'}}>

      {/* Logo */}
      <Link href="/" className="text-lg font-semibold tracking-widest"
        style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
        OKAZI
      </Link>

      {/* Navigation centrale */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <Link href="/connexion?type=prestataire"
  style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
  Je suis prestataire
</Link>
        
        <Link href="/recherche"
          style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Trouver un prestataire
        </Link>
        <Link href="/creer-evenement"
          style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Créer mon événement
        </Link>
      </div>

      {/* Boutons droite */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/messagerie"
  className="text-sm px-4 py-2 rounded-full font-semibold"
  style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>
  💬
</Link>
<Link href={estPrestataire ? '/espace-pro' : '/dashboard'}
  className="text-sm px-4 py-2 rounded-full font-semibold"
  style={{background: GRADIENT, color: 'white'}}>
  {estPrestataire ? 'Mon espace pro' : 'Mon espace'}
</Link>
            
            <button onClick={seDeconnecter}
              className="text-sm px-4 py-2 rounded-full font-semibold"
              style={{border: '1.5px solid #FF6000', color: '#FF6000'}}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/connexion"
              className="text-sm px-4 py-2 rounded-full font-semibold"
              style={{background: GRADIENT, color: 'white'}}>
              Connexion
            </Link>
            
          </>
        )}
      </div>
    </nav>
  )
}
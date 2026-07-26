'use client'

import Link from 'next/link'
import { useState } from 'react'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Footer() {
  const [cookiesBannerFerme, setCookiesBannerFerme] = useState(false)

  return (
    <>
      {/* BANDEAU COOKIES */}
      {!cookiesBannerFerme && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4"
          style={{background: 'white', borderTop: '1px solid #eee', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'}}>
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <p className="text-sm font-medium" style={{color: '#1a1a1a'}}>🍪 Nous utilisons des cookies</p>
              <p className="text-xs text-gray-500 mt-0.5">
                OKAZI utilise uniquement des cookies techniques nécessaires au fonctionnement du site (authentification, préférences). Aucun cookie publicitaire.{' '}
                <Link href="/confidentialite" style={{color: '#FF1493'}}>En savoir plus</Link>
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button onClick={() => setCookiesBannerFerme(true)}
                className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-600">
                Refuser les optionnels
              </button>
              <button onClick={() => setCookiesBannerFerme(true)}
                className="text-sm px-4 py-2 rounded-full text-white font-semibold"
                style={{background: GRADIENT}}>
                Accepter ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <p className="font-semibold tracking-widest mb-4 text-2xl"
              style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              OKAZI
            </p>
            <p className="text-sm font-medium"
              style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              La plateforme événementielle de A à Z.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              contact@okazi.fr
            </p>
          </div>

          <div>
            <p className="font-medium text-sm mb-3"
              style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Clients
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/creer-evenement" style={{color: '#FF1493'}}>Créer un événement</Link>
              <Link href="/recherche" style={{color: '#FF1493'}}>Trouver un prestataire</Link>
              <Link href="/dashboard" style={{color: '#FF1493'}}>Mon espace</Link>
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-3"
              style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Prestataires
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/connexion?type=prestataire" style={{color: '#FF1493'}}>Rejoindre OKAZI</Link>
              <Link href="/espace-pro" style={{color: '#FF1493'}}>Espace Pro</Link>
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-3"
              style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Légal
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/cgu" style={{color: '#FF1493'}}>CGU</Link>
              <Link href="/confidentialite" style={{color: '#FF1493'}}>Confidentialité</Link>
              <Link href="/mentions-legales" style={{color: '#FF1493'}}>Mentions légales</Link>
            </div>
          </div>

        </div>

        {/* BARRE DU BAS */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs"
            style={{background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            OKAZI © 2025 — Tous droits réservés
          </p>
          <div className="flex gap-4">
            <Link href="/cgu" className="text-xs text-gray-400 hover:text-gray-600">CGU</Link>
            <Link href="/confidentialite" className="text-xs text-gray-400 hover:text-gray-600">Confidentialité</Link>
            <Link href="/mentions-legales" className="text-xs text-gray-400 hover:text-gray-600">Mentions légales</Link>
          </div>
        </div>

        {/* ESPACE POUR LE BANDEAU COOKIES */}
        {!cookiesBannerFerme && <div className="h-20" />}

      </footer>
    </>
  )
}
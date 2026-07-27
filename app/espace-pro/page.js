'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

const PLANS = [
  {
    id: 'starter', nom: 'Starter', prix: '0€', periode: '/mois', commission: '8% commission',
    features: ['Fiche publique', 'Réservations illimitées', '3 photos'],
  },
  {
    id: 'pro', nom: 'Pro', prix: '49€', periode: '/mois', commission: '3% commission',
    badge: '⭐ Recommandé',
    features: ['Tout du Starter', 'Mise en avant', 'Badge Top', 'Photos illimitées', 'Stats avancées', 'Support prioritaire'],
  },
  {
    id: 'premium', nom: 'Premium', prix: '99€', periode: '/mois', commission: '0% commission',
    features: ['Tout du Pro', '0% commission', 'Position #1', 'Manager dédié', 'Agenda intégré', 'API accès'],
  },
]

const CATEGORIES = ['Traiteur', 'Photographe', 'Vidéaste', 'DJ & Musique', 'Lieu de réception',
  'Fleuriste', 'Coiffure & Maquillage', 'Pâtisserie', 'Transport', 'Animateur',
  'Décoration', 'Sécurité', 'Autre']

const GAMMES = [
  { id: 'economique', label: 'Économique' },
  { id: 'milieu', label: 'Milieu de gamme' },
  { id: 'haut', label: 'Haut de gamme' },
  { id: 'luxe', label: 'Luxe' },
]

const LANGUES = ['🇫🇷 Français', '🇬🇧 Anglais', '🇪🇸 Espagnol', '🇩🇪 Allemand', '🇮🇹 Italien', '🇵🇹 Portugais', '🇸🇦 Arabe', '🇨🇳 Chinois']

const ZONES = ['Locale (50km)', 'Régionale', 'Nationale', 'Internationale']

function FormulaireProfil({ onSuccess }) {
  const [etape, setEtape] = useState(1)
  const [data, setData] = useState({
    type_structure: '',
    nom: '',
    raison_sociale: '',
    siret: '',
    tva: '',
    adresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    email_pro: '',
    categorie: '',
    gamme: '',
    zone: [],
    langues: [],
    description: '',
    capacite_min: '',
    capacite_max: '',
    annees_experience: '',
    delai_reponse: '24h',
    site_web: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
    pinterest: '',
    plan: 'starter',
    cgu_acceptees: false,
    certifie: false,
  })

  function update(champ, val) { setData({ ...data, [champ]: val }) }

  function toggleList(champ, val) {
    const list = data[champ].includes(val)
      ? data[champ].filter(x => x !== val)
      : [...data[champ], val]
    update(champ, list)
  }

  const [loading, setLoading] = useState(false)

  async function sauvegarder() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('prestataires').insert([{
      nom: data.type_structure === 'pro' ? data.raison_sociale || data.nom : data.nom,
      categorie: data.categorie,
      gamme: data.gamme,
      description: data.description,
      ville: data.ville,
      zone: data.zone.join(', '),
      email: user.email,
      telephone: data.telephone,
      capacite_min: parseInt(data.capacite_min) || 0,
      capacite_max: parseInt(data.capacite_max) || 0,
      note: 0, nb_avis: 0,
      verifie: false,
      plan: data.plan,
      type_structure: data.type_structure,
    }])
    if (!error) onSuccess()
    setLoading(false)
  }

  const Step = ({ n }) => (
    <div className="flex items-center flex-1">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
        style={{
          background: etape > n ? 'rgba(255,255,255,0.6)' : etape === n ? 'white' : 'rgba(255,255,255,0.2)',
          color: etape >= n ? '#FF1493' : 'rgba(255,255,255,0.5)'
        }}>
        {etape > n ? '✓' : n}
      </div>
      {n < 5 && <div className="flex-1 h-px mx-1"
        style={{background: etape > n ? 'white' : 'rgba(255,255,255,0.2)'}} />}
    </div>
  )

  const Card = ({ title, children }) => (
    <div className="rounded-2xl p-5 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <h2 className="text-white font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )

  const Input = ({ label, ...props }) => (
    <div className="mb-3">
      {label && <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.7)'}}>{label}</label>}
      <input {...props} className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white" style={{color: '#333'}} />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-2">Créez votre espace prestataire</h1>
      <p className="text-sm mb-6" style={{color: 'rgba(255,255,255,0.75)'}}>
        Rejoignez OKAZI et accédez à des milliers de clients qui organisent leurs événements.
      </p>

      {/* BARRE DE PROGRESSION */}
      <div className="flex items-center mb-6">
        {[1,2,3,4,5].map(n => <Step key={n} n={n} />)}
      </div>

      {/* ÉTAPE 1 — IDENTITÉ */}
      {etape === 1 && (
        <div>
          <Card title="👤 Type de structure">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => update('type_structure', 'particulier')}
                className="p-4 rounded-xl text-sm font-medium text-center"
                style={{
                  background: data.type_structure === 'particulier' ? 'white' : 'rgba(255,255,255,0.2)',
                  color: data.type_structure === 'particulier' ? '#FF1493' : 'white'
                }}>
                👤 Particulier<br/>
                <span className="text-xs" style={{opacity: 0.7}}>Sans SIRET — Membre OKAZI</span>
              </button>
              <button onClick={() => update('type_structure', 'pro')}
                className="p-4 rounded-xl text-sm font-medium text-center"
                style={{
                  background: data.type_structure === 'pro' ? 'white' : 'rgba(255,255,255,0.2)',
                  color: data.type_structure === 'pro' ? '#FF1493' : 'white'
                }}>
                🏢 Professionnel<br/>
                <span className="text-xs" style={{opacity: 0.7}}>Avec SIRET — Certifié OKAZI</span>
              </button>
            </div>

            {data.type_structure === 'particulier' && (
  <div className="rounded-xl p-3 mb-4 text-xs" style={{background: 'rgba(255,200,0,0.2)', color: 'white'}}>
    ℹ️ <strong>Information légale :</strong> En France, les activités occasionnelles non déclarées sont tolérées jusqu'à <strong>3 000€ de revenus annuels</strong>. Au-delà, nous vous recommandons de vous déclarer en tant qu'auto-entrepreneur. OKAZI ne peut être tenu responsable du non-respect de la réglementation fiscale en vigueur.
  </div>
)}

            {data.type_structure === 'pro' && (
              <div className="rounded-xl p-3 mb-4 text-xs" style={{background: 'rgba(0,255,150,0.2)', color: 'white'}}>
                ✅ En tant que <strong>Certifié OKAZI</strong>, vos documents seront vérifiés par notre équipe sous 48h.
              </div>
            )}
          </Card>

          {data.type_structure && (
            <Card title="📋 Informations personnelles">
              {data.type_structure === 'pro' && (
                <Input label="Raison sociale *" placeholder="Mon Entreprise SARL" value={data.raison_sociale} onChange={e => update('raison_sociale', e.target.value)} />
              )}
              <Input label="Prénom & Nom *" placeholder="Sophie Martin" value={data.nom} onChange={e => update('nom', e.target.value)} />
              {data.type_structure === 'pro' && (
                <div className="grid grid-cols-2 gap-3">
                  <Input label="SIRET *" placeholder="123 456 789 00012" value={data.siret} onChange={e => update('siret', e.target.value)} />
                  <Input label="N° TVA (optionnel)" placeholder="FR12345678901" value={data.tva} onChange={e => update('tva', e.target.value)} />
                </div>
              )}
              <Input label="Adresse professionnelle *" placeholder="12 rue de la Paix" value={data.adresse} onChange={e => update('adresse', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Code postal *" placeholder="75001" value={data.code_postal} onChange={e => update('code_postal', e.target.value)} />
                <Input label="Ville *" placeholder="Paris" value={data.ville} onChange={e => update('ville', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Téléphone pro *" placeholder="+33 6 00 00 00 00" value={data.telephone} onChange={e => update('telephone', e.target.value)} />
                <Input label="Email pro *" placeholder="contact@monentreprise.fr" value={data.email_pro} onChange={e => update('email_pro', e.target.value)} />
              </div>
            </Card>
          )}

          {data.type_structure && data.nom && (
            <button onClick={() => setEtape(2)}
              className="w-full py-3 rounded-full font-semibold text-sm"
              style={{background: 'white', color: '#FF1493'}}>
              Suivant →
            </button>
          )}
        </div>
      )}

      {/* ÉTAPE 2 — PRESTATION */}
      {etape === 2 && (
        <div>
          <Card title="🎯 Votre prestation">
            <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.7)'}}>Catégorie *</label>
            <select value={data.categorie} onChange={e => update('categorie', e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white mb-3" style={{color: '#333'}}>
              <option value="">Choisir une catégorie</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label className="block text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)'}}>Gamme *</label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {GAMMES.map(g => (
                <button key={g.id} onClick={() => update('gamme', g.id)}
                  className="py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: data.gamme === g.id ? 'white' : 'rgba(255,255,255,0.2)',
                    color: data.gamme === g.id ? '#FF1493' : 'white'
                  }}>
                  {g.label}
                </button>
              ))}
            </div>

            <label className="block text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)'}}>Zone d'intervention *</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {ZONES.map(z => (
                <button key={z} onClick={() => toggleList('zone', z)}
                  className="text-xs px-3 py-2 rounded-full font-medium"
                  style={{
                    background: data.zone.includes(z) ? 'white' : 'rgba(255,255,255,0.2)',
                    color: data.zone.includes(z) ? '#FF1493' : 'white'
                  }}>
                  {z}
                </button>
              ))}
            </div>

            <label className="block text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)'}}>Langues parlées</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {LANGUES.map(l => (
                <button key={l} onClick={() => toggleList('langues', l)}
                  className="text-xs px-3 py-2 rounded-full font-medium"
                  style={{
                    background: data.langues.includes(l) ? 'white' : 'rgba(255,255,255,0.2)',
                    color: data.langues.includes(l) ? '#FF1493' : 'white'
                  }}>
                  {l}
                </button>
              ))}
            </div>

            <label className="block text-xs mb-1" style={{color: 'rgba(255,255,255,0.7)'}}>Description de votre activité *</label>
            <textarea placeholder="Décrivez votre activité, votre style, votre expérience..."
              value={data.description} onChange={e => update('description', e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white h-24 mb-3"
              style={{color: '#333', resize: 'none'}} />

            <div className="grid grid-cols-3 gap-3 mb-3">
              <Input label="Capacité min" placeholder="10" value={data.capacite_min} onChange={e => update('capacite_min', e.target.value)} />
              <Input label="Capacité max" placeholder="500" value={data.capacite_max} onChange={e => update('capacite_max', e.target.value)} />
              <Input label="Années d'expérience" placeholder="5" value={data.annees_experience} onChange={e => update('annees_experience', e.target.value)} />
            </div>

            <label className="block text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)'}}>Délai de réponse habituel</label>
            <div className="flex gap-2 mb-3">
              {['2h', '24h', '48h', '72h'].map(d => (
                <button key={d} onClick={() => update('delai_reponse', d)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium"
                  style={{
                    background: data.delai_reponse === d ? 'white' : 'rgba(255,255,255,0.2)',
                    color: data.delai_reponse === d ? '#FF1493' : 'white'
                  }}>
                  Sous {d}
                </button>
              ))}
            </div>
          </Card>

          <Card title="🌐 Réseaux sociaux & Site web">
            {[
              { champ: 'site_web', icon: '🌐', placeholder: 'https://monsite.fr' },
              { champ: 'instagram', icon: '📷', placeholder: 'instagram.com/moncompte' },
              { champ: 'facebook', icon: '📘', placeholder: 'facebook.com/mapage' },
              { champ: 'tiktok', icon: '🎵', placeholder: 'tiktok.com/@moncompte' },
              { champ: 'youtube', icon: '▶️', placeholder: 'youtube.com/@machaine' },
              { champ: 'linkedin', icon: '💼', placeholder: 'linkedin.com/in/monprofil' },
              { champ: 'pinterest', icon: '📌', placeholder: 'pinterest.fr/moncompte' },
            ].map(s => (
              <div key={s.champ} className="flex items-center gap-2 mb-2">
                <span className="text-lg w-8 text-center">{s.icon}</span>
                <input placeholder={s.placeholder}
                  value={data[s.champ]} onChange={e => update(s.champ, e.target.value)}
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none bg-white" style={{color: '#333'}} />
              </div>
            ))}
          </Card>

          <div className="flex gap-3">
            <button onClick={() => setEtape(1)}
              className="px-6 py-3 rounded-full font-semibold text-sm"
              style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
              ← Retour
            </button>
            <button onClick={() => setEtape(3)} disabled={!data.categorie || !data.gamme}
              className="flex-1 py-3 rounded-full font-semibold text-sm disabled:opacity-50"
              style={{background: 'white', color: '#FF1493'}}>
              Suivant →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — DOCUMENTS */}
      {etape === 3 && (
        <div>
          <Card title="📄 Documents légaux">
            <p className="text-xs mb-4" style={{color: 'rgba(255,255,255,0.7)'}}>
              Ces documents permettent d'obtenir le badge {data.type_structure === 'pro' ? '✅ Certifié OKAZI' : '👤 Membre OKAZI'} et rassurent vos clients.
            </p>

            {data.type_structure === 'pro' && (
              <>
                {[
                  { icon: '📋', label: 'Kbis ou extrait INSEE *', sub: 'Moins de 3 mois' },
                  { icon: '🛡️', label: 'Attestation assurance professionnelle *', sub: 'En cours de validité' },
                  { icon: '🏦', label: 'RIB professionnel *', sub: 'Pour recevoir vos paiements' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                    style={{background: 'rgba(255,255,255,0.1)', border: '2px dashed rgba(255,255,255,0.3)'}}>
                    <span className="text-2xl">{doc.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-xs font-medium">{doc.label}</p>
                      <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{doc.sub}</p>
                    </div>
                    <button className="text-xs px-3 py-1 rounded-full"
                      style={{background: 'white', color: '#FF1493'}}>
                      Choisir
                    </button>
                  </div>
                ))}
              </>
            )}

            {[
              { icon: '🪪', label: 'Pièce d\'identité *', sub: 'Carte d\'identité ou passeport (recto-verso)' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={{background: 'rgba(255,255,255,0.1)', border: '2px dashed rgba(255,255,255,0.3)'}}>
                <span className="text-2xl">{doc.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">{doc.label}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{doc.sub}</p>
                </div>
                <button className="text-xs px-3 py-1 rounded-full"
                  style={{background: 'white', color: '#FF1493'}}>
                  Choisir
                </button>
              </div>
            ))}

            <div className="rounded-xl p-3 mt-3 text-xs" style={{background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)'}}>
              🔒 Vos documents sont chiffrés et stockés de manière sécurisée. Ils ne sont accessibles qu'à l'équipe de vérification OKAZI.
            </div>
          </Card>

          {/* NIVEAUX DE VÉRIFICATION */}
          <Card title="🏅 Niveaux de vérification OKAZI">
            {[
              { icon: '⚡', title: 'Niveau 1 — Basique', sub: 'Email + téléphone vérifiés · SIRET valide', bg: 'rgba(255,200,0,0.2)', border: 'rgba(255,200,0,0.4)' },
              { icon: '✅', title: data.type_structure === 'pro' ? 'Niveau 2 — Certifié OKAZI' : 'Niveau 2 — Membre OKAZI', sub: 'Documents validés par notre équipe sous 48h', bg: 'rgba(0,255,150,0.2)', border: 'rgba(0,255,150,0.4)' },
              { icon: '⭐', title: 'Niveau 3 — Top OKAZI', sub: '10+ avis · Note > 4.5 · 6 mois d\'activité', bg: 'rgba(100,200,255,0.2)', border: 'rgba(100,200,255,0.4)' },
            ].map((niv, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={{background: niv.bg, border: `1px solid ${niv.border}`}}>
                <span className="text-xl">{niv.icon}</span>
                <div>
                  <p className="text-white text-xs font-semibold">{niv.title}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.65)'}}>{niv.sub}</p>
                </div>
              </div>
            ))}
          </Card>

          <div className="flex gap-3">
            <button onClick={() => setEtape(2)}
              className="px-6 py-3 rounded-full font-semibold text-sm"
              style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
              ← Retour
            </button>
            <button onClick={() => setEtape(4)}
              className="flex-1 py-3 rounded-full font-semibold text-sm"
              style={{background: 'white', color: '#FF1493'}}>
              Suivant →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — FORMULE */}
      {etape === 4 && (
        <div>
          <Card title="💳 Choisissez votre formule">
            <p className="text-xs mb-4" style={{color: 'rgba(255,255,255,0.7)'}}>Sans engagement — changez à tout moment depuis votre espace pro.</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PLANS.map(p => (
                <div key={p.id} onClick={() => update('plan', p.id)}
                  className="rounded-xl p-4 cursor-pointer relative"
                  style={{
                    background: data.plan === p.id ? 'white' : 'rgba(255,255,255,0.15)',
                    border: data.plan === p.id ? '2px solid white' : '2px solid transparent'
                  }}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
                      style={{background: GRADIENT, color: 'white'}}>
                      {p.badge}
                    </div>
                  )}
                  <p className="font-semibold text-sm mb-1" style={{color: data.plan === p.id ? '#FF1493' : 'white'}}>{p.nom}</p>
                  <p className="text-lg font-bold mb-1" style={{color: data.plan === p.id ? '#333' : 'white'}}>
                    {p.prix}<span className="text-xs font-normal" style={{color: data.plan === p.id ? '#888' : 'rgba(255,255,255,0.6)'}}>{p.periode}</span>
                  </p>
                  <p className="text-xs px-2 py-1 rounded-full mb-2 inline-block"
                    style={{background: data.plan === p.id ? '#fff5f0' : 'rgba(255,255,255,0.2)', color: data.plan === p.id ? '#FF6000' : 'white'}}>
                    {p.commission}
                  </p>
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs mb-1">
                      <span style={{color: data.plan === p.id ? '#FF1493' : 'rgba(0,255,150,0.9)'}}>✓</span>
                      <span style={{color: data.plan === p.id ? '#333' : 'white'}}>{f}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3 text-xs" style={{background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)'}}>
              💡 La commission est prélevée uniquement sur les réservations confirmées.
            </div>
          </Card>

          <div className="flex gap-3">
            <button onClick={() => setEtape(3)}
              className="px-6 py-3 rounded-full font-semibold text-sm"
              style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
              ← Retour
            </button>
            <button onClick={() => setEtape(5)}
              className="flex-1 py-3 rounded-full font-semibold text-sm"
              style={{background: 'white', color: '#FF1493'}}>
              Suivant →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 5 — VALIDATION */}
      {etape === 5 && (
        <div>
          <Card title="✅ Validation finale">
            <div className="space-y-3 mb-4">
              {[
                { champ: 'cgu_acceptees', label: 'J\'accepte les CGU OKAZI et la politique de commission' },
                { champ: 'certifie', label: 'Je certifie que toutes les informations fournies sont exactes et complètes' },
              ].map(item => (
                <div key={item.champ} className="flex items-start gap-3 cursor-pointer"
                  onClick={() => update(item.champ, !data[item.champ])}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: data[item.champ] ? 'white' : 'transparent',
                      border: '2px solid rgba(255,255,255,0.5)'
                    }}>
                    {data[item.champ] && <span style={{color: '#FF1493', fontSize: '12px', fontWeight: '700'}}>✓</span>}
                  </div>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.85)'}}>{item.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            <button onClick={() => setEtape(4)}
              className="px-6 py-3 rounded-full font-semibold text-sm"
              style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
              ← Retour
            </button>
            <button onClick={sauvegarder}
              disabled={loading || !data.cgu_acceptees || !data.certifie}
              className="flex-1 py-3 rounded-full font-semibold text-sm disabled:opacity-50"
              style={{background: 'white', color: '#FF1493'}}>
              {loading ? 'Création en cours...' : '🎉 Créer mon espace prestataire →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CalendrierPro({ reservations }) {
  const [moisActuel, setMoisActuel] = useState(new Date())
  const [jourSelectionne, setJourSelectionne] = useState(null)

  const mois = moisActuel.getMonth()
  const annee = moisActuel.getFullYear()
  const nomsMois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const joursLabel = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

  const premierJour = new Date(annee, mois, 1).getDay()
  const decalage = premierJour === 0 ? 6 : premierJour - 1
  const nbJours = new Date(annee, mois + 1, 0).getDate()

  function getRdvDuJour(jour) {
    const date = `${annee}-${String(mois+1).padStart(2,'0')}-${String(jour).padStart(2,'0')}`
    return reservations.filter(r => 
      r.date_rdv === date || r.evenements?.date_evenement === date
    )
  }

  const aujourd_hui = new Date()
  const estAujourdhui = (jour) =>
    jour === aujourd_hui.getDate() &&
    mois === aujourd_hui.getMonth() &&
    annee === aujourd_hui.getFullYear()

  const rdvJourSelectionne = jourSelectionne ? getRdvDuJour(jourSelectionne) : []

  return (
    <div>
      <div className="rounded-2xl p-4 mb-3" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-semibold">{nomsMois[mois]} {annee}</span>
          <div className="flex gap-2">
            <button onClick={() => setMoisActuel(new Date(annee, mois-1, 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{background: 'rgba(255,255,255,0.2)'}}>‹</button>
            <button onClick={() => setMoisActuel(new Date(annee, mois+1, 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{background: 'rgba(255,255,255,0.2)'}}>›</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {joursLabel.map(j => (
            <div key={j} className="text-center text-xs py-1" style={{color: 'rgba(255,255,255,0.5)'}}>
              {j}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array(decalage).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {Array(nbJours).fill(null).map((_, i) => {
            const jour = i + 1
            const rdvs = getRdvDuJour(jour)
            const hasRdvOk = rdvs.some(r => r.statut === 'confirme')
            const hasRdvWait = rdvs.some(r => r.statut === 'en_attente')
            const isSelected = jourSelectionne === jour

            return (
              <div key={jour}
                onClick={() => setJourSelectionne(isSelected ? null : jour)}
                className="rounded-lg p-1 cursor-pointer"
                style={{
                  minHeight: '48px',
                  background: isSelected ? 'rgba(255,255,255,0.4)' : estAujourdhui(jour) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
                  border: isSelected ? '2px solid white' : estAujourdhui(jour) ? '1.5px solid white' : '1px solid rgba(255,255,255,0.1)'
                }}>
                <div className="text-xs text-white font-medium mb-1">{jour}</div>
                {rdvs.map((r, idx) => (
                  <div key={idx} className="text-xs px-1 rounded mb-0.5 truncate"
                    style={{
                      background: r.statut === 'confirme' ? 'rgba(0,200,100,0.7)' : 'rgba(255,165,0,0.7)',
                      color: 'white',
                      fontSize: '8px'
                    }}>
                    {r.heure_rdv || r.evenements?.heure_debut || ''} {r.evenements?.nom?.substring(0,8)}...
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* LÉGENDE */}
        <div className="flex gap-4 mt-3">
          {[
            { color: 'rgba(0,200,100,0.7)', label: 'Confirmé' },
            { color: 'rgba(255,165,0,0.7)', label: 'En attente' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1 text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
              <div className="w-3 h-3 rounded" style={{background: l.color}}></div>
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* DÉTAIL DU JOUR SÉLECTIONNÉ */}
      {jourSelectionne && (
        <div className="rounded-2xl p-4" style={{background: 'rgba(255,255,255,0.15)'}}>
          <h3 className="text-white font-medium text-sm mb-3">
            📌 {jourSelectionne} {nomsMois[mois]} {annee}
          </h3>
          {rdvJourSelectionne.length === 0 ? (
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Aucun RDV ce jour.</p>
          ) : (
            rdvJourSelectionne.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={{
                  background: r.statut === 'confirme' ? 'rgba(0,200,100,0.2)' : 'rgba(255,165,0,0.2)',
                  border: r.statut === 'confirme' ? '1px solid rgba(0,200,100,0.4)' : '1px solid rgba(255,165,0,0.4)'
                }}>
                <span className="text-lg">{r.statut === 'confirme' ? '✅' : '⏳'}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{r.evenements?.nom}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                    {r.evenements?.type} · {r.heure_rdv || r.evenements?.heure_debut || 'Heure non définie'} · {r.evenements?.nb_invites || '?'} pers.
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: r.statut === 'confirme' ? 'rgba(0,200,100,0.4)' : 'rgba(255,165,0,0.4)',
                    color: 'white'
                  }}>
                  {r.statut === 'confirme' ? 'Confirmé ✓' : 'En attente'}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
export default function EspacePro() {
  const [onglet, setOnglet] = useState('overview')
  const [presta, setPresta] = useState(null)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [planChoisi, setPlanChoisi] = useState('starter')

  useEffect(() => {
    chargerDonnees()
  }, [])

  async function chargerDonnees() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    const { data: p } = await supabase.from('prestataires').select('*').eq('email', user.email).single()
    const { data: r } = await supabase.from('reservations').select('*, evenements(nom, type, date_evenement, nb_invites, budget)').eq('prestataire_id', p?.id)
    setPresta(p)
    setPlanChoisi(p?.plan || 'starter')
    setReservations(r || [])
    setLoading(false)
  }

  async function updateStatut(id, statut) {
    await supabase.from('reservations').update({ statut }).eq('id', id)
    chargerDonnees()
  }

  async function changerPlan(nouveauPlan) {
    await supabase.from('prestataires').update({ plan: nouveauPlan }).eq('id', presta.id)
    setPlanChoisi(nouveauPlan)
    chargerDonnees()
  }

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'rdv', label: 'Planning RDV' },
    { id: 'reservations', label: 'Réservations' },
    { id: 'disponibilites', label: 'Disponibilités' },
    { id: 'formules', label: 'Mes formules' },
    { id: 'photos', label: 'Photos & Portfolio' },
    { id: 'messagerie', label: 'Messagerie' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'abonnement', label: '💳 Mon abonnement' },
    { id: 'documents', label: 'Documents' },
  ]

  if (loading) return (
    <div style={{background: GRADIENT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p className="text-white">Chargement...</p>
    </div>
  )

  if (!presta) return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <FormulaireProfil onSuccess={chargerDonnees} />
    </div>
  )

  const nbConfirmes = reservations.filter(r => r.statut === 'confirme').length
  const nbEnAttente = reservations.filter(r => r.statut === 'en_attente').length
  const planActuel = PLANS.find(p => p.id === planChoisi) || PLANS[0]

  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '1.5rem'}}>
      <div className="max-w-5xl mx-auto">

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-semibold text-white">{presta.nom}</h1>
              <span className="text-xs px-2 py-1 rounded-full font-semibold"
                style={{background: 'white', color: '#FF1493'}}>
                {planActuel.nom.toUpperCase()}
              </span>
              {presta.verifie && (
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{background: 'rgba(0,255,150,0.3)', color: 'white'}}>✅ Certifié OKAZI</span>
              )}
              {!presta.verifie && (
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>👤 Membre OKAZI</span>
              )}
            </div>
            <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '13px'}}>
              {presta.categorie} · {presta.ville}
            </p>
          </div>
          <Link href={`/prestataire/${presta.id}?mode=pro`}
            className="text-sm px-4 py-2 rounded-full font-semibold"
            style={{background: 'white', color: '#FF1493'}}>
            Voir ma fiche →
          </Link>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setOnglet(t.id)}
              className="px-3 py-2 rounded-full text-xs font-medium transition"
              style={{
                background: onglet === t.id ? 'white' : 'rgba(255,255,255,0.2)',
                color: onglet === t.id ? '#FF1493' : 'white'
              }}>
              {t.label}
              {t.id === 'reservations' && nbEnAttente > 0 && (
                <span className="ml-1 text-xs bg-yellow-400 text-black rounded-full px-1">{nbEnAttente}</span>
              )}
            </button>
          ))}
        </div>

       {onglet === 'overview' && (
  <div>
    {/* STATS GLOBALES */}
    <div className="grid grid-cols-4 gap-4 mb-4">
      {[
        { val: reservations.length, lbl: 'Réservations totales', color: 'white' },
        { val: nbConfirmes, lbl: 'Confirmées', color: '#00C864' },
        { val: nbEnAttente, lbl: 'En attente', color: '#FFA500' },
        { val: `${presta.note || 0} ⭐`, lbl: `Note (${presta.nb_avis || 0} avis)`, color: 'white' },
      ].map((k, i) => (
        <div key={i} className="rounded-2xl p-4 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
          <p className="text-2xl font-semibold" style={{color: k.color}}>{k.val}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{k.lbl}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">

      {/* NOUVELLES DEMANDES */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">🔔 Nouvelles demandes</h2>
          {nbEnAttente > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{background: 'rgba(255,200,0,0.4)', color: 'white'}}>
              {nbEnAttente} en attente
            </span>
          )}
        </div>
        {reservations.filter(r => r.statut === 'en_attente').length === 0 ? (
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>Aucune nouvelle demande.</p>
        ) : (
          reservations.filter(r => r.statut === 'en_attente').map(r => (
            <div key={r.id} className="flex items-center gap-2 p-2 rounded-xl mb-2"
              style={{background: 'rgba(255,255,255,0.1)'}}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{background: 'rgba(255,255,255,0.3)'}}>
                {r.evenements?.nom?.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">{r.evenements?.nom}</p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                  {r.evenements?.type} · {r.evenements?.date_evenement || 'Date non définie'}
                </p>
              </div>
              <button onClick={() => updateStatut(r.id, 'confirme')}
                className="text-xs px-2 py-1 rounded-lg"
                style={{background: 'rgba(0,200,100,0.4)', color: 'white'}}>✓</button>
              <button onClick={() => updateStatut(r.id, 'refuse')}
                className="text-xs px-2 py-1 rounded-lg"
                style={{background: 'rgba(255,50,50,0.3)', color: 'white'}}>✕</button>
            </div>
          ))
        )}
      </div>

      {/* PROCHAINS RDV */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">📅 Prochains RDV</h2>
          <button onClick={() => setOnglet('rdv')}
            className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
            Voir tout →
          </button>
        </div>
        {reservations.length === 0 ? (
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>Aucun rendez-vous.</p>
        ) : (
          reservations.slice(0, 3).map(r => (
            <div key={r.id} className="flex items-center gap-2 py-2"
              style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{background: r.statut === 'confirme' ? '#00C864' : '#FFA500'}}></div>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">{r.evenements?.nom}</p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
                  {r.evenements?.date_evenement || 'Date à confirmer'}
                </p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: r.statut === 'confirme' ? 'rgba(0,200,100,0.3)' : 'rgba(255,165,0,0.3)',
                  color: 'white'
                }}>
                {r.statut === 'confirme' ? 'Confirmé' : 'En attente'}
              </span>
            </div>
          ))
        )}
      </div>

    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">

      {/* DISPONIBILITÉS */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">📆 Disponibilités</h2>
          <button onClick={() => setOnglet('disponibilites')}
            className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
            Gérer →
          </button>
        </div>
        <CalendrierPro reservations={reservations} />
      </div>

      {/* STATISTIQUES */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">📊 Statistiques du mois</h2>
          <button onClick={() => setOnglet('stats')}
            className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
            Voir tout →
          </button>
        </div>
        <p className="text-2xl font-bold text-white mb-1">
          {reservations.filter(r => r.statut === 'confirme').length * 500} €
        </p>
        <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.6)'}}>Chiffre d'affaires estimé</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: reservations.length, lbl: 'Réservations' },
            { val: nbConfirmes, lbl: 'Confirmées' },
            { val: presta.nb_avis || 0, lbl: 'Avis clients' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-2 text-center"
              style={{background: 'rgba(255,255,255,0.15)'}}>
              <p className="text-lg font-semibold text-white">{s.val}</p>
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>{s.lbl}</p>
            </div>
          ))}
        </div>
      </div>

    </div>

    <div className="grid grid-cols-2 gap-4">

      {/* MON ABONNEMENT */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">💳 Mon abonnement</h2>
          <button onClick={() => setOnglet('abonnement')}
            className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
            Changer →
          </button>
        </div>
        <div className="rounded-xl p-3" style={{background: 'rgba(255,255,255,0.2)'}}>
          <p className="text-white font-semibold">{planActuel.nom}</p>
          <p className="text-white text-lg font-bold">{planActuel.prix}
            <span className="text-xs font-normal" style={{color: 'rgba(255,255,255,0.7)'}}>{planActuel.periode}</span>
          </p>
          <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>{planActuel.commission}</p>
        </div>
      </div>

      {/* MES PHOTOS */}
      <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-white text-sm">📸 Mes photos</h2>
          <button onClick={() => setOnglet('photos')}
            className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>
            Gérer →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[presta.photo_1, presta.photo_2, presta.photo_3].map((photo, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background: photo ? 'transparent' : 'rgba(255,255,255,0.1)',
                border: photo ? 'none' : '1px dashed rgba(255,255,255,0.3)'
              }}>
              {photo ? (
                <img src={photo} alt={`photo ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">📸</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{color: 'rgba(255,255,255,0.6)'}}>
          {[presta.photo_1, presta.photo_2, presta.photo_3].filter(Boolean).length}/3 photos
        </p>
      </div>

    </div>
  </div>
)}
   
  <div>
    {/* STATS */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { val: reservations.filter(r => r.statut === 'confirme').length, lbl: 'RDV confirmés', color: '#00C864' },
        { val: reservations.filter(r => r.statut === 'en_attente').length, lbl: 'En attente', color: '#FFA500' },
        { val: reservations.length, lbl: 'Total réservations', color: 'white' },
      ].map((s, i) => (
        <div key={i} className="rounded-2xl p-4 text-center" style={{background: 'rgba(255,255,255,0.2)'}}>
          <p className="text-2xl font-semibold" style={{color: s.color}}>{s.val}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.75)'}}>{s.lbl}</p>
        </div>
      ))}
    </div>

    {/* LÉGENDE */}
    <div className="flex gap-4 mb-4 flex-wrap">
      {[
        { color: 'rgba(255,20,147,0.8)', label: 'Événement client' },
        { color: 'rgba(255,165,0,0.8)', label: 'RDV en attente' },
        { color: 'rgba(0,200,100,0.8)', label: 'RDV confirmé' },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-2 text-xs" style={{color: 'rgba(255,255,255,0.8)'}}>
          <div className="w-3 h-3 rounded" style={{background: l.color}}></div>
          {l.label}
        </div>
      ))}
    </div>

    {/* CALENDRIER */}
    <CalendrierPro reservations={reservations} />

    {/* LISTE RDV */}
    <div className="rounded-2xl p-5 mt-4" style={{background: 'rgba(255,255,255,0.15)'}}>
      <h2 className="font-medium text-white mb-4">Prochains RDV clients</h2>
      {reservations.length === 0 ? (
        <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Aucun rendez-vous planifié.</p>
      ) : (
        <div className="space-y-2">
          {reservations.map(r => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: r.statut === 'confirme' ? 'rgba(0,200,100,0.2)' : 'rgba(255,165,0,0.2)',
                border: r.statut === 'confirme' ? '1px solid rgba(0,200,100,0.4)' : '1px solid rgba(255,165,0,0.4)'
              }}>
              <span className="text-lg">{r.statut === 'confirme' ? '✅' : '⏳'}</span>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                  {r.evenements?.type} · {r.evenements?.date_evenement || 'Date à confirmer'} · {r.evenements?.nb_invites || '?'} pers.
                </p>
              </div>
              {r.statut === 'en_attente' && (
                <div className="flex gap-2">
                  <button onClick={() => updateStatut(r.id, 'confirme')}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{background: 'rgba(0,255,150,0.4)', color: 'white'}}>
                    ✓ Accepter
                  </button>
                  <button onClick={() => updateStatut(r.id, 'refuse')}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{background: 'rgba(255,50,50,0.3)', color: 'white'}}>
                    ✕
                  </button>
                </div>
              )}
              {r.statut !== 'en_attente' && (
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: r.statut === 'confirme' ? 'rgba(0,255,150,0.3)' : 'rgba(255,50,50,0.3)',
                    color: 'white'
                  }}>
                  {r.statut === 'confirme' ? 'Confirmé ✓' : 'Refusé ✕'}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

        {onglet === 'reservations' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Toutes mes réservations</h2>
            {reservations.length === 0 ? (
              <p style={{color: 'rgba(255,255,255,0.6)'}}>Aucune réservation.</p>
            ) : reservations.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl mb-2"
                style={{background: 'rgba(255,255,255,0.15)'}}>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{r.evenements?.nom}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.7)'}}>
                    {r.evenements?.type} · {r.evenements?.date_evenement || 'Date non définie'}
                  </p>
                </div>
                {r.statut === 'en_attente' ? (
                  <div className="flex gap-2">
                    <button onClick={() => updateStatut(r.id, 'confirme')}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{background: 'rgba(0,255,150,0.4)', color: 'white'}}>✓</button>
                    <button onClick={() => updateStatut(r.id, 'refuse')}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{background: 'rgba(255,50,50,0.3)', color: 'white'}}>✕</button>
                  </div>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{background: r.statut === 'confirme' ? 'rgba(0,255,150,0.3)' : 'rgba(255,50,50,0.3)', color: 'white'}}>
                    {r.statut === 'confirme' ? 'Confirmé ✓' : 'Refusé ✕'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {onglet === 'disponibilites' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Disponibilités</h2>
            <p style={{color: 'rgba(255,255,255,0.6)'}}>Calendrier disponible prochainement.</p>
          </div>
        )}

        {onglet === 'formules' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Mes formules & tarifs</h2>
            {['Essentiel', 'Prestige', 'Excellence'].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl mb-2"
                style={{background: 'rgba(255,255,255,0.15)'}}>
                <p className="text-white text-sm flex-1">{f}</p>
                <button className="text-xs px-3 py-1 rounded-full"
                  style={{background: 'white', color: '#FF1493'}}>Modifier</button>
              </div>
            ))}
          </div>
        )}

        {onglet === 'photos' && (
  <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
    <h2 className="font-medium text-white mb-4">Photos & Portfolio</h2>

    {/* PHOTO DE PROFIL */}
    <div className="mb-6">
      <p className="text-sm font-medium text-white mb-3">Photo de profil / Logo</p>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden"
          style={{background: 'rgba(255,255,255,0.25)', color: 'white'}}>
          {presta.photo_profil ? (
            <img src={presta.photo_profil} alt="profil" className="w-full h-full object-cover" />
          ) : (
            presta.nom?.substring(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <input type="file" accept="image/*" className="hidden" id="photo-profil"
            onChange={async (e) => {
              const file = e.target.files[0]
              if (!file) return
              const { data, error } = await supabase.storage
                .from('photos-prestataires')
                .upload(`${presta.id}/profil/${file.name}`, file, { upsert: true })
              if (!error) {
                const { data: urlData } = supabase.storage
                  .from('photos-prestataires')
                  .getPublicUrl(`${presta.id}/profil/${file.name}`)
                await supabase.from('prestataires').update({ photo_profil: urlData.publicUrl }).eq('id', presta.id)
                chargerDonnees()
              }
            }} />
          <label htmlFor="photo-profil"
            className="text-sm px-4 py-2 rounded-full font-semibold cursor-pointer"
            style={{background: 'white', color: '#FF1493'}}>
            📷 Changer la photo
          </label>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.6)'}}>JPG, PNG · Max 5MB</p>
        </div>
      </div>
    </div>

    {/* PHOTOS DE PRÉSENTATION */}
    <div className="mb-6">
      <p className="text-sm font-medium text-white mb-3">Photos de présentation</p>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="relative">
            {presta[`photo_${i+1}`] ? (
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img src={presta[`photo_${i+1}`]} alt={`photo ${i+1}`}
                  className="w-full h-full object-cover" />
                <button onClick={async () => {
                    await supabase.from('prestataires').update({ [`photo_${i+1}`]: null }).eq('id', presta.id)
                    chargerDonnees()
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{background: 'rgba(255,0,0,0.7)', color: 'white'}}>
                  ✕
                </button>
              </div>
            ) : (
              <label htmlFor={`photo-${i}`}
                className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer block"
                style={{background: 'rgba(255,255,255,0.15)', border: '2px dashed rgba(255,255,255,0.3)'}}>
                <span className="text-2xl mb-1">📸</span>
                <span className="text-xs" style={{color: 'rgba(255,255,255,0.6)'}}>Ajouter</span>
              </label>
            )}
            <input type="file" accept="image/*" className="hidden" id={`photo-${i}`}
              onChange={async (e) => {
                const file = e.target.files[0]
                if (!file) return
                const { data, error } = await supabase.storage
                  .from('photos-prestataires')
                  .upload(`${presta.id}/photos/${i}_${file.name}`, file, { upsert: true })
                if (!error) {
                  const { data: urlData } = supabase.storage
                    .from('photos-prestataires')
                    .getPublicUrl(`${presta.id}/photos/${i}_${file.name}`)
                  await supabase.from('prestataires').update({ [`photo_${i+1}`]: urlData.publicUrl }).eq('id', presta.id)
                  chargerDonnees()
                }
              }} />
          </div>
        ))}
      </div>
    </div>

  </div>
)}

        {onglet === 'messagerie' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Messagerie</h2>
            <p style={{color: 'rgba(255,255,255,0.6)'}}>Messagerie disponible prochainement.</p>
          </div>
        )}

        {onglet === 'stats' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Statistiques</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: reservations.length, lbl: 'Total réservations' },
                { val: nbConfirmes, lbl: 'Confirmées' },
                { val: presta.note || 0, lbl: 'Note moyenne' },
                { val: presta.nb_avis || 0, lbl: 'Avis clients' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center" style={{background: 'rgba(255,255,255,0.15)'}}>
                  <p className="text-2xl font-semibold text-white">{s.val}</p>
                  <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.7)'}}>{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {onglet === 'abonnement' && (
          <div>
            <div className="rounded-2xl p-5 mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
              <h2 className="font-medium text-white mb-3">Mon abonnement actuel</h2>
              <div className="rounded-xl p-4" style={{background: 'rgba(255,255,255,0.2)'}}>
                <p className="text-white font-semibold text-lg">{planActuel.nom}</p>
                <p className="text-white text-2xl font-bold">{planActuel.prix}<span className="text-sm font-normal" style={{color: 'rgba(255,255,255,0.7)'}}>{planActuel.periode}</span></p>
                <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.7)'}}>{planActuel.commission}</p>
              </div>
            </div>
            <h2 className="font-medium text-white mb-4">Changer de formule</h2>
            <div className="grid grid-cols-3 gap-3">
              {PLANS.map(p => (
                <div key={p.id} className="rounded-xl p-4 relative"
                  style={{
                    background: planChoisi === p.id ? 'white' : 'rgba(255,255,255,0.15)',
                    border: planChoisi === p.id ? '2px solid white' : '2px solid transparent'
                  }}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
                      style={{background: GRADIENT, color: 'white'}}>{p.badge}</div>
                  )}
                  <p className="font-semibold text-sm mb-1" style={{color: planChoisi === p.id ? '#FF1493' : 'white'}}>{p.nom}</p>
                  <p className="text-lg font-bold mb-1" style={{color: planChoisi === p.id ? '#333' : 'white'}}>
                    {p.prix}<span className="text-xs" style={{color: planChoisi === p.id ? '#888' : 'rgba(255,255,255,0.6)'}}>{p.periode}</span>
                  </p>
                  <p className="text-xs px-2 py-1 rounded-full mb-3 inline-block"
                    style={{background: planChoisi === p.id ? '#fff5f0' : 'rgba(255,255,255,0.2)', color: planChoisi === p.id ? '#FF6000' : 'white'}}>
                    {p.commission}
                  </p>
                  {planChoisi !== p.id ? (
                    <button onClick={() => changerPlan(p.id)}
                      className="w-full mt-2 py-2 rounded-full text-xs font-semibold"
                      style={{background: 'white', color: '#FF1493'}}>
                      {p.id === 'starter' ? 'Downgrader' : 'Upgrader →'}
                    </button>
                  ) : (
                    <div className="w-full mt-2 py-2 rounded-full text-xs font-semibold text-center"
                      style={{background: GRADIENT, color: 'white'}}>✓ Plan actuel</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {onglet === 'documents' && (
          <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.15)'}}>
            <h2 className="font-medium text-white mb-4">Documents</h2>
            <div className="rounded-xl p-8 text-center"
              style={{background: 'rgba(255,255,255,0.1)', border: '2px dashed rgba(255,255,255,0.3)'}}>
              <p className="text-3xl mb-2">📄</p>
              <p className="text-white text-sm mb-2">Glissez vos fichiers ici</p>
              <button className="mt-3 text-sm px-4 py-2 rounded-full font-semibold"
                style={{background: 'white', color: '#FF1493'}}>
                Parcourir les fichiers
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
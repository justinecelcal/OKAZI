'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'
const MAX_PHOTOS = 20
const CATEGORIES = ['💍 Mariage', '🎂 Anniversaire', '💼 Corporate', '🍼 Baby shower', '✨ Autre']

export default function PhotosOnglet({ presta, onRefresh }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [editPhoto, setEditPhoto] = useState(null)
  const [succes, setSucces] = useState('')
  const [lienVoirPlus, setLienVoirPlus] = useState(presta?.site_web || '')
  const [videoPres, setVideoPres] = useState(presta?.video_presentation || '')
  const [filtreCategorie, setFiltreCategorie] = useState('Tous')

  useEffect(() => { chargerPhotos() }, [presta?.id])

  async function chargerPhotos() {
    setLoading(true)
    const { data } = await supabase
      .from('photos_portfolio')
      .select('*')
      .eq('prestataire_id', presta.id)
      .order('ordre', { ascending: true })
    setPhotos(data || [])
    setLoading(false)
  }

  async function uploadPhoto(e) {
    const files = Array.from(e.target.files)
    if (photos.length + files.length > MAX_PHOTOS) {
      alert(`Maximum ${MAX_PHOTOS} photos autorisées`)
      return
    }
    setUploading(true)
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from('photos-prestataires')
        .upload(`${presta.id}/portfolio/${Date.now()}_${file.name}`, file, { upsert: true })
      if (!error) {
        const { data: urlData } = supabase.storage
          .from('photos-prestataires')
          .getPublicUrl(data.path)
        await supabase.from('photos_portfolio').insert([{
          prestataire_id: presta.id,
          url: urlData.publicUrl,
          legende: '',
          categorie: '',
          principale: photos.length === 0,
          ordre: photos.length,
        }])
      }
    }
    setUploading(false)
    setSucces('Photos ajoutées !')
    setTimeout(() => setSucces(''), 3000)
    chargerPhotos()
  }

  async function supprimerPhoto(id, url) {
    if (!confirm('Supprimer cette photo ?')) return
    await supabase.from('photos_portfolio').delete().eq('id', id)
    const path = url.split('/photos-prestataires/')[1]
    if (path) await supabase.storage.from('photos-prestataires').remove([path])
    chargerPhotos()
  }

  async function definirPrincipale(id) {
    await supabase.from('photos_portfolio').update({ principale: false }).eq('prestataire_id', presta.id)
    await supabase.from('photos_portfolio').update({ principale: true }).eq('id', id)
    chargerPhotos()
  }

  async function sauvegarderEdit() {
    await supabase.from('photos_portfolio').update({
      legende: editPhoto.legende,
      categorie: editPhoto.categorie,
    }).eq('id', editPhoto.id)
    setEditPhoto(null)
    chargerPhotos()
  }

  async function sauvegarderLiens() {
    await supabase.from('prestataires').update({
      site_web: lienVoirPlus,
      video_presentation: videoPres,
    }).eq('id', presta.id)
    setSucces('Enregistré !')
    setTimeout(() => setSucces(''), 3000)
    if (onRefresh) onRefresh()
  }

  async function uploadPhotoProfil(e) {
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
      setSucces('Photo de profil mise à jour !')
      setTimeout(() => setSucces(''), 3000)
      if (onRefresh) onRefresh()
    }
  }

  async function uploadCouverture(e) {
    const file = e.target.files[0]
    if (!file) return
    const { data, error } = await supabase.storage
      .from('photos-prestataires')
      .upload(`${presta.id}/couverture/${file.name}`, file, { upsert: true })
    if (!error) {
      const { data: urlData } = supabase.storage
        .from('photos-prestataires')
        .getPublicUrl(`${presta.id}/couverture/${file.name}`)
      await supabase.from('prestataires').update({ photo_couverture: urlData.publicUrl }).eq('id', presta.id)
      setSucces('Photo de couverture mise à jour !')
      setTimeout(() => setSucces(''), 3000)
      if (onRefresh) onRefresh()
    }
  }

  const photosFiltrees = filtreCategorie === 'Tous'
    ? photos
    : photos.filter(p => p.categorie === filtreCategorie)

  const styleCard = { background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '12px', marginBottom: '10px' }
const styleLabel = { display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginBottom: '3px' }
const styleInput = { width: '100%', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '13px', color: '#333', outline: 'none' }
const styleNum = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: '10px', fontWeight: '600', marginRight: '6px' }
  const styleBtnGhost = { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '3px 10px', borderRadius: '7px', fontSize: '10px', cursor: 'pointer' }
  const styleBtnSmall = { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', padding: '2px 7px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }

  return (
    <div>
      {succes && (
        <div className="rounded-xl p-2 mb-3 text-center text-sm font-medium text-white"
          style={{background: 'rgba(0,255,150,0.3)'}}>
          ✓ {succes}
        </div>
      )}

      {/* 1 — PHOTO DE PROFIL */}
      <div style={styleCard}>
        <p className="text-white font-medium text-sm mb-3">
          <span style={styleNum}>1</span> Photo de profil
        </p>
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-white"
            style={{width: '48px', height: '48px', background: GRADIENT, fontSize: '14px'}}>
            {presta?.photo_profil
              ? <img src={presta.photo_profil} alt="profil" className="w-full h-full object-cover" />
              : presta?.nom?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-0.5">{presta?.nom}</p>
            <p className="text-sm mb-2" style={{color: 'rgba(255,255,255,0.55)'}}>Visible dans les résultats de recherche et sur votre fiche</p>
            <input type="file" accept="image/*" className="hidden" id="profil-upload" onChange={uploadPhotoProfil} />
            <label htmlFor="profil-upload" style={{...styleBtnGhost, display: 'inline-block', cursor: 'pointer'}}>
              📷 Changer la photo
            </label>
          </div>
        </div>
      </div>

      {/* 2 — PHOTO DE COUVERTURE */}
      <div style={styleCard}>
        <p className="text-white font-medium text-sm mb-1">
          <span style={styleNum}>2</span> Photo de couverture
        </p>
        <p className="text-sm mb-3" style={{color: 'rgba(255,255,255,0.55)'}}>Grande bannière affichée en haut de votre fiche publique</p>

        {/* BOUTON AJOUTER avant le champ */}
        <input type="file" accept="image/*" className="hidden" id="cover-upload" onChange={uploadCouverture} />
        <label htmlFor="cover-upload" style={{...styleBtnGhost, display: 'inline-block', cursor: 'pointer', marginBottom: '8px'}}>
          + Ajouter une couverture
        </label>

        {/* CHAMP PHOTO */}
        <div className="relative rounded-xl overflow-hidden"
          style={{height: '70px', background: presta?.photo_couverture ? 'transparent' : 'rgba(255,255,255,0.08)', border: '1.5px dashed rgba(255,255,255,0.25)'}}>
          {presta?.photo_couverture
            ? <img src={presta.photo_couverture} alt="couverture" className="w-full h-full object-cover" />
            : <div className="flex items-center justify-center h-full">
                <span className="text-sm" style={{color: 'rgba(255,255,255,0.35)'}}>🌅 Aucune photo de couverture</span>
              </div>
          }
          {presta?.photo_couverture && (
            <label htmlFor="cover-upload"
              style={{position: 'absolute', top: '6px', right: '6px', ...styleBtnSmall, cursor: 'pointer', background: 'rgba(0,0,0,0.5)', border: 'none'}}>
              ✏️ Modifier
            </label>
          )}
        </div>
      </div>

      {/* 3 — GALERIE PHOTOS */}
      <div style={styleCard}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-medium text-sm">
            <span style={styleNum}>3</span> Galerie photos
            <span className="ml-1" style={{fontSize: '10px', fontWeight: '400', color: 'rgba(255,255,255,0.5)'}}>({photos.length}/{MAX_PHOTOS})</span>
          </p>
          {photos.length < MAX_PHOTOS && (
            <>
              <input type="file" accept="image/*" multiple className="hidden" id="photos-upload" onChange={uploadPhoto} />
              <label htmlFor="photos-upload"
                className="text-sm px-3 py-1 rounded-full font-semibold cursor-pointer"
                style={{background: 'white', color: '#FF1493'}}>
                {uploading ? 'Upload...' : '+ Ajouter'}
              </label>
            </>
          )}
        </div>

        {/* FILTRES */}
        <div className="flex gap-1 flex-wrap mb-3">
          {['Tous', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFiltreCategorie(cat)}
              className="text-sm px-2 py-0.5 rounded-full cursor-pointer border-none"
              style={{
                background: filtreCategorie === cat ? 'white' : 'rgba(255,255,255,0.15)',
                color: filtreCategorie === cat ? '#FF1493' : 'white',
                fontSize: '9px'
              }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-white text-sm">Chargement...</p>
        ) : (
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {photosFiltrees.map((photo, i) => (
              <div key={photo.id} className="relative rounded-lg overflow-hidden group"
                style={{aspectRatio: '1'}}>
                <img src={photo.url} alt={photo.legende || `photo ${i+1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightbox(photo)} />
                {photo.principale && (
                  <span className="absolute top-1 left-1 text-white rounded px-1"
                    style={{background: GRADIENT, fontSize: '7px'}}>⭐</span>
                )}
                {photo.categorie && (
                  <span className="absolute top-1 right-1 rounded px-1"
                    style={{background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '7px'}}>
                    {photo.categorie.split(' ')[0]}
                  </span>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-end justify-between p-1"
                  style={{background: 'rgba(0,0,0,0.5)', transition: 'opacity 0.2s'}}>
                  <button onClick={() => setEditPhoto({...photo})}
                    className="text-white rounded px-1 py-0.5"
                    style={{background: 'rgba(255,255,255,0.25)', fontSize: '8px'}}>✏️</button>
                  {!photo.principale && (
                    <button onClick={() => definirPrincipale(photo.id)}
                      className="text-white rounded px-1 py-0.5"
                      style={{background: 'rgba(255,165,0,0.7)', fontSize: '8px'}}>⭐</button>
                  )}
                  <button onClick={() => supprimerPhoto(photo.id, photo.url)}
                    className="text-white rounded px-1 py-0.5"
                    style={{background: 'rgba(255,50,50,0.7)', fontSize: '8px'}}>🗑️</button>
                </div>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <label htmlFor="photos-upload"
                className="rounded-lg flex flex-col items-center justify-center cursor-pointer"
                style={{aspectRatio: '1', background: 'rgba(255,255,255,0.06)', border: '1.5px dashed rgba(255,255,255,0.2)'}}>
                <span className="text-base mb-0.5">📸</span>
                <span style={{fontSize: '8px', color: 'rgba(255,255,255,0.4)'}}>Ajouter</span>
              </label>
            )}
          </div>
        )}
        <p className="text-sm" style={{color: 'rgba(255,255,255,0.45)'}}>
          💡 Survolez une photo pour la modifier, définir en principale ⭐ ou supprimer.
        </p>
      </div>

      {/* 4 — VIDÉO */}
      <div style={styleCard}>
        <p className="text-white font-medium text-sm mb-3">
          <span style={styleNum}>4</span> Vidéo de présentation
        </p>
        <label style={styleLabel}>Lien YouTube ou Vimeo</label>
        <input value={videoPres} onChange={e => setVideoPres(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          style={{...styleInput, marginBottom: '6px'}} />
        {videoPres && (
          <div className="flex items-center gap-2 rounded-lg p-2 mb-2"
            style={{background: 'rgba(0,0,0,0.2)'}}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{background: 'rgba(255,255,255,0.2)'}}>
              <span className="text-white" style={{fontSize: '9px'}}>▶</span>
            </div>
            <p className="text-white truncate" style={{fontSize: '10px', maxWidth: '200px'}}>{videoPres}</p>
          </div>
        )}
        <p className="text-sm" style={{color: 'rgba(255,255,255,0.5)'}}>
          Votre vidéo sera visible sur votre fiche et aidera les clients à mieux vous connaître.
        </p>
      </div>

      {/* 5 — VOIR PLUS */}
      <div style={styleCard}>
        <p className="text-white font-medium text-sm mb-1">
          <span style={styleNum}>5</span> Voir plus de contenu
        </p>
        <p className="text-sm mb-3" style={{color: 'rgba(255,255,255,0.55)'}}>
          Un bouton "Voir plus" apparaîtra sur votre fiche pour rediriger les clients vers votre site ou réseaux sociaux.
        </p>
        <label style={styleLabel}>Lien de redirection</label>
        <input value={lienVoirPlus} onChange={e => setLienVoirPlus(e.target.value)}
          placeholder="https://monsite.fr ou instagram.com/moncompte"
          style={{...styleInput, marginBottom: '6px'}} />
        <div className="flex gap-1.5 flex-wrap mb-3">
          {[
            { label: '🌐 Site web', val: presta?.site_web },
            { label: '📷 Instagram', val: presta?.instagram },
            { label: '📘 Facebook', val: presta?.facebook },
            { label: '🎵 TikTok', val: presta?.tiktok },
          ].filter(l => l.val).map((l, i) => (
            <button key={i} onClick={() => setLienVoirPlus(l.val)}
              style={styleBtnSmall}>
              {l.label}
            </button>
          ))}
        </div>
        <button onClick={sauvegarderLiens} style={{...styleBtnGhost, fontSize: '10px'}}>
          Enregistrer
        </button>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: 'rgba(0,0,0,0.9)'}}
          onClick={() => setLightbox(null)}>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.legende}
              className="w-full rounded-2xl object-contain" style={{maxHeight: '70vh'}} />
            {lightbox.legende && (
              <p className="text-white text-sm text-center mt-3">{lightbox.legende}</p>
            )}
            {lightbox.categorie && (
              <p className="text-center mt-1" style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>{lightbox.categorie}</p>
            )}
            <button onClick={() => setLightbox(null)}
              className="mt-3 w-full py-2 rounded-xl text-sm text-white"
              style={{background: 'rgba(255,255,255,0.2)'}}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {editPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: 'rgba(0,0,0,0.7)'}}>
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full">
            <h3 className="font-semibold mb-3 text-sm" style={{color: '#1a1a1a'}}>Modifier la photo</h3>
            <img src={editPhoto.url} alt="" className="w-full rounded-xl object-cover mb-3" style={{height: '100px'}} />
            <label className="block text-sm text-gray-400 mb-1">Légende</label>
            <input value={editPhoto.legende} onChange={e => setEditPhoto({...editPhoto, legende: e.target.value})}
              placeholder="Ex: Mariage Dupont — Dîner gastronomique"
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none mb-3"
              style={{color: '#333'}} />
            <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
            <select value={editPhoto.categorie} onChange={e => setEditPhoto({...editPhoto, categorie: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none mb-4"
              style={{color: '#333'}}>
              <option value="">Aucune catégorie</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setEditPhoto(null)}
                className="flex-1 py-1.5 rounded-xl text-sm border border-gray-200 text-gray-500">
                Annuler
              </button>
              <button onClick={sauvegarderEdit}
                className="flex-1 py-1.5 rounded-xl text-sm font-semibold text-white"
                style={{background: GRADIENT}}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
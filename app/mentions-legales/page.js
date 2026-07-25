import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function MentionsLegales() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          
          <h1 className="text-2xl font-semibold mb-2" style={{color: '#FF1493'}}>Mentions légales</h1>
          <p className="text-sm text-gray-400 mb-8">Dernière mise à jour : juillet 2025</p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>1. Éditeur du site</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le site <strong>okazi.fr</strong> est édité par :<br/><br/>
              <strong>Justine Celcal</strong><br/>
              Adresse : [ADRESSE PRO À COMPLÉTER]<br/>
              Email : contact@okazi.fr<br/>
              Statut : Entrepreneur individuel
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>2. Directrice de la publication</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Justine Celcal — contact@okazi.fr
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>3. Hébergement</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le site est hébergé par :<br/><br/>
              <strong>Vercel Inc.</strong><br/>
              440 N Barranca Ave #4133<br/>
              Covina, CA 91723, États-Unis<br/>
              Site : vercel.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>4. Propriété intellectuelle</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              L'ensemble du contenu du site OKAZI (textes, images, logos, icônes, code source) est protégé par le droit d'auteur. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>5. Responsabilité</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI est une plateforme de mise en relation entre particuliers et prestataires événementiels. OKAZI ne peut être tenu responsable des prestations effectuées par les prestataires référencés sur la plateforme. Chaque prestataire est responsable de ses propres services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>6. Données personnelles</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pour toute question relative à vos données personnelles, consultez notre{' '}
              <Link href="/confidentialite" style={{color: '#FF1493'}}>Politique de confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>7. Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pour toute question ou réclamation :<br/>
              Email : contact@okazi.fr<br/>
              Site : www.okazi.fr
            </p>
          </section>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            <Link href="/cgu" className="text-sm" style={{color: '#FF1493'}}>CGU →</Link>
            <Link href="/confidentialite" className="text-sm" style={{color: '#FF1493'}}>Confidentialité →</Link>
            <Link href="/" className="text-sm" style={{color: '#FF1493'}}>Retour à l'accueil →</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
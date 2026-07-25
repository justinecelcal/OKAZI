import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Confidentialite() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8">

          <h1 className="text-2xl font-semibold mb-2" style={{color: '#FF1493'}}>Politique de confidentialité</h1>
          <p className="text-sm text-gray-400 mb-8">Dernière mise à jour : juillet 2025</p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>1. Données collectées</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI collecte les données suivantes :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>Données d'identification</strong> : nom, prénom, email, téléphone</li>
              <li>• <strong>Données de connexion</strong> : adresse IP, cookies de session</li>
              <li>• <strong>Données événementielles</strong> : type d'événement, date, budget, liste d'invités</li>
              <li>• <strong>Données prestataires</strong> : SIRET, documents professionnels, RIB</li>
              <li>• <strong>Données de navigation</strong> : pages visitées, durée de session</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>2. Utilisation des données</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">Vos données sont utilisées pour :</p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Créer et gérer votre compte OKAZI</li>
              <li>• Faciliter la mise en relation avec les prestataires</li>
              <li>• Envoyer des rappels et notifications liés à vos événements</li>
              <li>• Vérifier l'identité des prestataires</li>
              <li>• Améliorer nos services</li>
              <li>• Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>3. Base légale du traitement</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le traitement de vos données est basé sur :
              votre <strong>consentement</strong> lors de l'inscription,
              l'<strong>exécution du contrat</strong> lors d'une réservation,
              et nos <strong>obligations légales</strong> (vérification des prestataires).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>4. Conservation des données</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Vos données sont conservées pendant toute la durée de votre compte actif, puis 3 ans après sa suppression pour des raisons légales. Les documents prestataires sont conservés 5 ans conformément aux obligations comptables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>5. Partage des données</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>Supabase</strong> — hébergement de la base de données (UE)</li>
              <li>• <strong>Brevo</strong> — envoi d'emails et SMS</li>
              <li>• <strong>Vercel</strong> — hébergement du site</li>
              <li>• <strong>Stripe</strong> — traitement des paiements</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              Vos données ne sont <strong>jamais vendues</strong> à des tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>6. Vos droits (RGPD)</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>Droit d'accès</strong> — consulter vos données</li>
              <li>• <strong>Droit de rectification</strong> — corriger vos données</li>
              <li>• <strong>Droit à l'effacement</strong> — supprimer votre compte</li>
              <li>• <strong>Droit à la portabilité</strong> — exporter vos données</li>
              <li>• <strong>Droit d'opposition</strong> — refuser certains traitements</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              Pour exercer ces droits : <strong>contact@okazi.fr</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>7. Cookies</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI utilise des cookies de session nécessaires au fonctionnement du site (authentification). Aucun cookie publicitaire n'est utilisé.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>8. Contact & réclamations</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pour toute question : <strong>contact@okazi.fr</strong><br/>
              Vous pouvez également saisir la <strong>CNIL</strong> : cnil.fr
            </p>
          </section>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            <Link href="/cgu" className="text-sm" style={{color: '#FF1493'}}>CGU →</Link>
            <Link href="/mentions-legales" className="text-sm" style={{color: '#FF1493'}}>Mentions légales →</Link>
            <Link href="/" className="text-sm" style={{color: '#FF1493'}}>Retour à l'accueil →</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
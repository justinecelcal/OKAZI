import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function MentionsLegales() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8">

          <h1 className="text-2xl font-semibold mb-2" style={{color: '#FF1493'}}>Mentions légales</h1>
          <p className="text-sm text-gray-400 mb-8">Dernière mise à jour : juillet 2025 — Conformément à la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN)</p>

          {/* ARTICLE 1 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>1. Éditeur du site</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le site <strong>okazi.fr</strong> est édité par :<br/><br/>
              <strong>Justine Celcal</strong><br/>
              Adresse : [ADRESSE PRO À COMPLÉTER AVANT LANCEMENT]<br/>
              Email : contact@okazi.fr<br/>
              Statut : Entrepreneur individuel<br/>
              SIRET : [À COMPLÉTER]<br/>
              N° TVA intracommunautaire : [À COMPLÉTER SI APPLICABLE]
            </p>
          </section>

          {/* ARTICLE 2 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>2. Directrice de la publication</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Justine Celcal<br/>
              Email : contact@okazi.fr<br/><br/>
              En qualité de directrice de la publication, Justine Celcal est responsable du contenu éditorial publié sur okazi.fr.
            </p>
          </section>

          {/* ARTICLE 3 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>3. Hébergement</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le site okazi.fr est hébergé par :<br/><br/>
              <strong>Vercel Inc.</strong><br/>
              440 N Barranca Ave #4133<br/>
              Covina, CA 91723<br/>
              États-Unis d'Amérique<br/>
              Site : vercel.com<br/><br/>
              Les données sont hébergées dans des centres de données situés en Europe et aux États-Unis, avec des garanties de transfert conformes au RGPD (Clauses Contractuelles Types).
            </p>
          </section>

          {/* ARTICLE 4 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>4. Base de données</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              La base de données d'OKAZI est gérée par :<br/><br/>
              <strong>Supabase Inc.</strong><br/>
              970 Toa Payoh North #07-04<br/>
              Singapore 318992<br/>
              Serveurs hébergés en Europe (Frankfurt, Allemagne)<br/>
              Site : supabase.com
            </p>
          </section>

          {/* ARTICLE 5 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>5. Paiements sécurisés</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les paiements sur OKAZI sont traités par :<br/><br/>
              <strong>Stripe Inc.</strong><br/>
              510 Townsend Street<br/>
              San Francisco, CA 94103<br/>
              États-Unis d'Amérique<br/>
              Site : stripe.com<br/><br/>
              Stripe est certifié PCI DSS niveau 1 (plus haut niveau de sécurité des paiements). OKAZI ne stocke jamais les données bancaires des utilisateurs.
            </p>
          </section>

          {/* ARTICLE 6 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>6. Nom de domaine</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le nom de domaine okazi.fr est enregistré auprès de :<br/><br/>
              <strong>OVH SAS</strong><br/>
              2 rue Kellermann<br/>
              59100 Roubaix, France<br/>
              Site : ovhcloud.com
            </p>
          </section>

          {/* ARTICLE 7 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>7. Propriété intellectuelle</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              L'ensemble du contenu du site OKAZI (textes, images, logos, icônes, code source, design, marque) est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation, distribution, diffusion ou utilisation de tout ou partie des éléments du site, sans autorisation écrite préalable d'OKAZI, est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              La marque <strong>OKAZI</strong> est la propriété exclusive de Justine Celcal. Toute utilisation non autorisée de cette marque est interdite.
            </p>
          </section>

          {/* ARTICLE 8 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>8. Responsabilité</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Cependant, OKAZI ne peut garantir l'exactitude, la complétude ou l'actualité des informations publiées. OKAZI décline toute responsabilité :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Pour les erreurs ou omissions dans le contenu du site</li>
              <li>• Pour les dommages résultant d'une intrusion frauduleuse d'un tiers</li>
              <li>• Pour les interruptions ou indisponibilités du site</li>
              <li>• Pour les dommages causés par des virus informatiques</li>
              <li>• Pour le contenu des sites tiers vers lesquels des liens peuvent pointer</li>
              <li>• Pour la qualité des prestations fournies par les prestataires référencés</li>
            </ul>
          </section>

          {/* ARTICLE 9 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>9. Liens hypertextes</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le site OKAZI peut contenir des liens vers des sites tiers. OKAZI n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité. La création de liens hypertextes vers le site okazi.fr est soumise à l'accord préalable écrit d'OKAZI (contact@okazi.fr).
            </p>
          </section>

          {/* ARTICLE 10 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>10. Données personnelles</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le traitement des données personnelles collectées sur okazi.fr est régi par notre{' '}
              <Link href="/confidentialite" style={{color: '#FF1493'}}>Politique de confidentialité</Link>,
              conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
            </p>
          </section>

          {/* ARTICLE 11 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>11. Cookies</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI utilise des cookies techniques nécessaires au fonctionnement du site (authentification, préférences). Aucun cookie publicitaire n'est utilisé. Pour en savoir plus, consultez notre{' '}
              <Link href="/confidentialite" style={{color: '#FF1493'}}>Politique de confidentialité</Link>.
            </p>
          </section>

          {/* ARTICLE 12 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>12. Droit applicable et juridiction</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les présentes mentions légales sont soumises au droit français. En cas de litige relatif à l'utilisation du site okazi.fr, les tribunaux français seront seuls compétents, et plus particulièrement le Tribunal de Commerce de Paris.
            </p>
          </section>

          {/* ARTICLE 13 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>13. Médiation de la consommation</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, OKAZI propose un dispositif de médiation de la consommation. En cas de litige non résolu amiablement, vous pouvez recourir gratuitement au médiateur de la consommation ou à la plateforme européenne de règlement en ligne des litiges :<br/><br/>
              <strong>Plateforme européenne ODR</strong> : ec.europa.eu/consumers/odr<br/>
              <strong>CNIL (données personnelles)</strong> : cnil.fr
            </p>
          </section>

          {/* ARTICLE 14 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>14. Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pour toute question ou signalement :<br/><br/>
              <strong>OKAZI</strong><br/>
              Email : contact@okazi.fr<br/>
              Site : www.okazi.fr<br/><br/>
              Notre équipe s'engage à répondre dans un délai de <strong>48h ouvrées</strong>.
            </p>
          </section>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 flex-wrap">
            <Link href="/cgu" className="text-sm" style={{color: '#FF1493'}}>CGU →</Link>
            <Link href="/confidentialite" className="text-sm" style={{color: '#FF1493'}}>Confidentialité →</Link>
            <Link href="/" className="text-sm" style={{color: '#FF1493'}}>Retour à l'accueil →</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
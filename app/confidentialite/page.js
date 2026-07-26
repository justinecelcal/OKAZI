import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function Confidentialite() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8">

          <h1 className="text-2xl font-semibold mb-2" style={{color: '#FF1493'}}>Politique de confidentialité & Protection des données</h1>
          <p className="text-sm text-gray-400 mb-2">Dernière mise à jour : juillet 2025 — Version 1.0</p>
          <p className="text-sm text-gray-500 mb-8">
            OKAZI accorde une importance primordiale à la protection de vos données personnelles. Cette politique de confidentialité vous informe de la manière dont nous collectons, utilisons, stockons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
          </p>

          {/* ARTICLE 1 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 1 — Responsable du traitement</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Le responsable du traitement de vos données personnelles est :<br/><br/>
              <strong>Justine Celcal — OKAZI</strong><br/>
              Adresse : [ADRESSE PRO À COMPLÉTER]<br/>
              Email : contact@okazi.fr<br/>
              Site : www.okazi.fr<br/><br/>
              Pour toute question relative à vos données personnelles : <strong>contact@okazi.fr</strong><br/>
              Nous nous engageons à répondre dans un délai de <strong>30 jours</strong> maximum.
            </p>
          </section>

          {/* ARTICLE 2 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 2 — Données collectées et finalités</h2>
            
            <p className="text-sm text-gray-600 font-medium mb-2">2.1 Données des particuliers</p>
            <table className="w-full text-xs text-gray-600 mb-4 border-collapse">
              <thead>
                <tr style={{background: '#fff5f0'}}>
                  <th className="text-left p-2 border border-gray-200">Données</th>
                  <th className="text-left p-2 border border-gray-200">Finalité</th>
                  <th className="text-left p-2 border border-gray-200">Base légale</th>
                  <th className="text-left p-2 border border-gray-200">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">Nom, prénom, email</td>
                  <td className="p-2 border border-gray-200">Création de compte</td>
                  <td className="p-2 border border-gray-200">Contrat</td>
                  <td className="p-2 border border-gray-200">Durée du compte + 3 ans</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Téléphone</td>
                  <td className="p-2 border border-gray-200">Rappels SMS</td>
                  <td className="p-2 border border-gray-200">Consentement</td>
                  <td className="p-2 border border-gray-200">Durée du compte</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Données événementielles</td>
                  <td className="p-2 border border-gray-200">Gestion événements</td>
                  <td className="p-2 border border-gray-200">Contrat</td>
                  <td className="p-2 border border-gray-200">Durée du compte + 3 ans</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Liste d'invités</td>
                  <td className="p-2 border border-gray-200">Gestion invités</td>
                  <td className="p-2 border border-gray-200">Consentement</td>
                  <td className="p-2 border border-gray-200">Durée de l'événement + 1 an</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Contraintes alimentaires</td>
                  <td className="p-2 border border-gray-200">Organisation repas</td>
                  <td className="p-2 border border-gray-200">Consentement explicite</td>
                  <td className="p-2 border border-gray-200">Durée de l'événement</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Données de paiement</td>
                  <td className="p-2 border border-gray-200">Transactions sécurisées</td>
                  <td className="p-2 border border-gray-200">Contrat + obligation légale</td>
                  <td className="p-2 border border-gray-200">5 ans (obligation fiscale)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Messages</td>
                  <td className="p-2 border border-gray-200">Communication + litiges</td>
                  <td className="p-2 border border-gray-200">Intérêt légitime</td>
                  <td className="p-2 border border-gray-200">3 ans</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Adresse IP, logs</td>
                  <td className="p-2 border border-gray-200">Sécurité, fraude</td>
                  <td className="p-2 border border-gray-200">Intérêt légitime</td>
                  <td className="p-2 border border-gray-200">1 an</td>
                </tr>
              </tbody>
            </table>

            <p className="text-sm text-gray-600 font-medium mb-2">2.2 Données des prestataires (en plus des données ci-dessus)</p>
            <table className="w-full text-xs text-gray-600 mb-4 border-collapse">
              <thead>
                <tr style={{background: '#fff5f0'}}>
                  <th className="text-left p-2 border border-gray-200">Données</th>
                  <th className="text-left p-2 border border-gray-200">Finalité</th>
                  <th className="text-left p-2 border border-gray-200">Base légale</th>
                  <th className="text-left p-2 border border-gray-200">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">SIRET, Kbis</td>
                  <td className="p-2 border border-gray-200">Vérification identité pro</td>
                  <td className="p-2 border border-gray-200">Obligation légale</td>
                  <td className="p-2 border border-gray-200">5 ans</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Pièce d'identité</td>
                  <td className="p-2 border border-gray-200">Vérification identité</td>
                  <td className="p-2 border border-gray-200">Obligation légale</td>
                  <td className="p-2 border border-gray-200">5 ans</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Attestation assurance</td>
                  <td className="p-2 border border-gray-200">Vérification Certifié OKAZI</td>
                  <td className="p-2 border border-gray-200">Contrat</td>
                  <td className="p-2 border border-gray-200">Durée du compte + 3 ans</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">RIB / IBAN</td>
                  <td className="p-2 border border-gray-200">Virements des paiements</td>
                  <td className="p-2 border border-gray-200">Contrat</td>
                  <td className="p-2 border border-gray-200">5 ans (obligation fiscale)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Photos portfolio</td>
                  <td className="p-2 border border-gray-200">Présentation sur OKAZI</td>
                  <td className="p-2 border border-gray-200">Consentement</td>
                  <td className="p-2 border border-gray-200">Durée du compte</td>
                </tr>
              </tbody>
            </table>

            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Données sensibles :</strong> Les contraintes alimentaires constituent des données de santé au sens du RGPD. Elles sont collectées uniquement avec votre consentement explicite, chiffrées, et supprimées automatiquement après l'événement. Elles ne sont jamais partagées avec des tiers autres que le prestataire concerné.
            </p>
          </section>

          {/* ARTICLE 3 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 3 — Sous-traitants et transferts de données</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI fait appel aux sous-traitants suivants pour traiter vos données :
            </p>
            <table className="w-full text-xs text-gray-600 mb-4 border-collapse">
              <thead>
                <tr style={{background: '#fff5f0'}}>
                  <th className="text-left p-2 border border-gray-200">Prestataire</th>
                  <th className="text-left p-2 border border-gray-200">Rôle</th>
                  <th className="text-left p-2 border border-gray-200">Localisation</th>
                  <th className="text-left p-2 border border-gray-200">Garanties</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200"><strong>Supabase</strong></td>
                  <td className="p-2 border border-gray-200">Base de données</td>
                  <td className="p-2 border border-gray-200">UE (Frankfurt)</td>
                  <td className="p-2 border border-gray-200">RGPD conforme</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200"><strong>Vercel Inc.</strong></td>
                  <td className="p-2 border border-gray-200">Hébergement site</td>
                  <td className="p-2 border border-gray-200">USA + UE</td>
                  <td className="p-2 border border-gray-200">Clauses contractuelles types UE</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200"><strong>Brevo (Sendinblue)</strong></td>
                  <td className="p-2 border border-gray-200">Emails & SMS</td>
                  <td className="p-2 border border-gray-200">UE (Paris)</td>
                  <td className="p-2 border border-gray-200">RGPD conforme</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200"><strong>Stripe Inc.</strong></td>
                  <td className="p-2 border border-gray-200">Paiements sécurisés</td>
                  <td className="p-2 border border-gray-200">USA + UE</td>
                  <td className="p-2 border border-gray-200">PCI DSS niveau 1 + Clauses UE</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200"><strong>OVH</strong></td>
                  <td className="p-2 border border-gray-200">Nom de domaine</td>
                  <td className="p-2 border border-gray-200">UE (France)</td>
                  <td className="p-2 border border-gray-200">RGPD conforme</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600 leading-relaxed">
              Concernant les transferts hors UE (Vercel, Stripe) : ces transferts sont encadrés par des Clauses Contractuelles Types (CCT) approuvées par la Commission Européenne, conformément à l'article 46 du RGPD. Vos données bénéficient du même niveau de protection qu'au sein de l'UE.
            </p>
          </section>

          {/* ARTICLE 4 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 4 — Cookies et traceurs</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI utilise des cookies et traceurs sur son site. Conformément à la directive ePrivacy et aux recommandations de la CNIL, nous vous informons des cookies utilisés :
            </p>
            <table className="w-full text-xs text-gray-600 mb-4 border-collapse">
              <thead>
                <tr style={{background: '#fff5f0'}}>
                  <th className="text-left p-2 border border-gray-200">Cookie</th>
                  <th className="text-left p-2 border border-gray-200">Type</th>
                  <th className="text-left p-2 border border-gray-200">Finalité</th>
                  <th className="text-left p-2 border border-gray-200">Durée</th>
                  <th className="text-left p-2 border border-gray-200">Consentement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">Session auth</td>
                  <td className="p-2 border border-gray-200">Nécessaire</td>
                  <td className="p-2 border border-gray-200">Maintien de la connexion</td>
                  <td className="p-2 border border-gray-200">Session</td>
                  <td className="p-2 border border-gray-200">Non requis</td>
                </tr>
                <tr style={{background: '#fafafa'}}>
                  <td className="p-2 border border-gray-200">Préférences</td>
                  <td className="p-2 border border-gray-200">Fonctionnel</td>
                  <td className="p-2 border border-gray-200">Mémorisation préférences</td>
                  <td className="p-2 border border-gray-200">1 an</td>
                  <td className="p-2 border border-gray-200">Non requis</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Stripe</td>
                  <td className="p-2 border border-gray-200">Paiement</td>
                  <td className="p-2 border border-gray-200">Sécurité paiements</td>
                  <td className="p-2 border border-gray-200">Session</td>
                  <td className="p-2 border border-gray-200">Non requis</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI n'utilise <strong>aucun cookie publicitaire ou de tracking</strong>. Vos données de navigation ne sont pas vendues à des tiers. Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies à tout moment, sans impact sur l'utilisation d'OKAZI.
            </p>
          </section>

          {/* ARTICLE 5 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 5 — Sécurité des données</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>Chiffrement SSL/TLS</strong> de toutes les communications entre votre navigateur et nos serveurs</li>
              <li>• <strong>Chiffrement AES-256</strong> des données sensibles stockées (documents d'identité, RIB)</li>
              <li>• <strong>Authentification sécurisée</strong> via Supabase Auth avec hachage bcrypt des mots de passe</li>
              <li>• <strong>Accès restreint</strong> aux données personnelles (principe du moindre privilège)</li>
              <li>• <strong>Sauvegardes automatiques</strong> chiffrées des données</li>
              <li>• <strong>Monitoring</strong> des accès et détection des anomalies</li>
              <li>• <strong>Mise à jour régulière</strong> des systèmes et correctifs de sécurité</li>
              <li>• <strong>Politique de mots de passe forts</strong> pour tous les accès internes</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, OKAZI s'engage à vous notifier dans les <strong>72 heures</strong> suivant la détection de l'incident, conformément à l'article 33 du RGPD.
            </p>
          </section>

          {/* ARTICLE 6 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 6 — Vos droits RGPD</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="text-sm text-gray-600 space-y-3 ml-4">
              <li>
                <strong>🔍 Droit d'accès (Art. 15 RGPD)</strong><br/>
                <span className="text-gray-500">Obtenir la confirmation que vos données sont traitées et en recevoir une copie. Délai de réponse : 30 jours.</span>
              </li>
              <li>
                <strong>✏️ Droit de rectification (Art. 16 RGPD)</strong><br/>
                <span className="text-gray-500">Corriger vos données inexactes ou incomplètes. Vous pouvez modifier la plupart de vos données directement dans votre espace OKAZI.</span>
              </li>
              <li>
                <strong>🗑️ Droit à l'effacement (Art. 17 RGPD)</strong><br/>
                <span className="text-gray-500">Demander la suppression de vos données sous réserve de nos obligations légales de conservation (5 ans pour les données fiscales).</span>
              </li>
              <li>
                <strong>⏸️ Droit à la limitation (Art. 18 RGPD)</strong><br/>
                <span className="text-gray-500">Demander la limitation du traitement de vos données dans certains cas (contestation de l'exactitude, opposition au traitement, etc.).</span>
              </li>
              <li>
                <strong>📦 Droit à la portabilité (Art. 20 RGPD)</strong><br/>
                <span className="text-gray-500">Recevoir vos données dans un format structuré et lisible par machine (JSON, CSV) pour les transférer à un autre service.</span>
              </li>
              <li>
                <strong>🚫 Droit d'opposition (Art. 21 RGPD)</strong><br/>
                <span className="text-gray-500">Vous opposer au traitement de vos données à des fins de marketing ou pour des raisons tenant à votre situation particulière.</span>
              </li>
              <li>
                <strong>🤖 Droit relatif aux décisions automatisées (Art. 22 RGPD)</strong><br/>
                <span className="text-gray-500">Ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé produisant des effets juridiques significatifs.</span>
              </li>
              <li>
                <strong>↩️ Droit de retrait du consentement</strong><br/>
                <span className="text-gray-500">Retirer votre consentement à tout moment pour les traitements basés sur celui-ci (SMS, newsletter, etc.), sans que cela affecte la licéité du traitement antérieur.</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à <strong>contact@okazi.fr</strong> en précisant votre demande et en joignant une copie de votre pièce d'identité. Nous répondrons dans un délai de <strong>30 jours</strong> (extensible à 3 mois pour les demandes complexes).
            </p>
          </section>

          {/* ARTICLE 7 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 7 — Données relatives aux mineurs</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI est réservé aux personnes majeures (18 ans et plus). Nous ne collectons pas sciemment de données personnelles de mineurs pour la création de compte.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Concernant les données de mineurs saisies dans les listes d'invités :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Ces données sont collectées sous la responsabilité de l'utilisateur adulte qui crée la liste</li>
              <li>• Elles sont utilisées uniquement pour la gestion de l'événement concerné</li>
              <li>• Elles sont chiffrées et supprimées automatiquement 1 an après l'événement</li>
              <li>• Elles ne sont jamais partagées avec des tiers à des fins commerciales</li>
              <li>• Les parents ou tuteurs légaux peuvent demander leur suppression à tout moment</li>
            </ul>
          </section>

          {/* ARTICLE 8 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 8 — Conservation et suppression des données</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Nos durées de conservation sont définies selon les obligations légales et nos besoins opérationnels :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Données de compte actif</strong> : pendant toute la durée d'utilisation du compte</li>
              <li>• <strong>Données après suppression du compte</strong> : 3 ans (prescription civile)</li>
              <li>• <strong>Données fiscales et comptables</strong> : 5 ans (obligation légale)</li>
              <li>• <strong>Documents d'identité prestataires</strong> : 5 ans après fin du compte</li>
              <li>• <strong>Logs de connexion et sécurité</strong> : 1 an</li>
              <li>• <strong>Messages et communications</strong> : 3 ans</li>
              <li>• <strong>Données contraintes alimentaires</strong> : supprimées après l'événement</li>
              <li>• <strong>Données des invités mineurs</strong> : supprimées 1 an après l'événement</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              À l'expiration des délais de conservation, vos données sont supprimées de manière sécurisée et irréversible ou anonymisées pour des fins statistiques.
            </p>
          </section>

          {/* ARTICLE 9 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 9 — Réclamations et autorité de contrôle</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente :
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>CNIL — Commission Nationale de l'Informatique et des Libertés</strong><br/>
              3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07<br/>
              Téléphone : 01 53 73 22 22<br/>
              Site : <strong>cnil.fr</strong>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nous vous encourageons toutefois à nous contacter en premier lieu à <strong>contact@okazi.fr</strong> afin de trouver une solution amiable.
            </p>
          </section>

          {/* ARTICLE 10 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 10 — Modifications de la politique de confidentialité</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI se réserve le droit de modifier la présente politique de confidentialité pour s'adapter aux évolutions légales ou techniques. Toute modification substantielle sera notifiée par email au moins <strong>15 jours avant</strong> son entrée en vigueur. La date de dernière mise à jour est indiquée en haut de ce document. Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 flex-wrap">
            <Link href="/cgu" className="text-sm" style={{color: '#FF1493'}}>CGU →</Link>
            <Link href="/mentions-legales" className="text-sm" style={{color: '#FF1493'}}>Mentions légales →</Link>
            <Link href="/" className="text-sm" style={{color: '#FF1493'}}>Retour à l'accueil →</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
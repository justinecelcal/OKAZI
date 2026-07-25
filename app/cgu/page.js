import Link from 'next/link'

const GRADIENT = 'linear-gradient(150deg, #FF6000 0%, #FF4500 30%, #FF1493 65%, #C2006B 100%)'

export default function CGU() {
  return (
    <div style={{background: GRADIENT, minHeight: '100vh', padding: '2rem'}}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8">

          <h1 className="text-2xl font-semibold mb-2" style={{color: '#FF1493'}}>Conditions Générales d'Utilisation</h1>
          <p className="text-sm text-gray-400 mb-2">Dernière mise à jour : juillet 2025 — Version 1.0</p>
          <p className="text-sm text-gray-500 mb-8">
            En accédant et en utilisant la plateforme OKAZI (okazi.fr), vous acceptez sans réserve les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions dans leur intégralité, veuillez cesser immédiatement d'utiliser nos services. Ces CGU constituent un contrat juridiquement contraignant entre vous et OKAZI.
          </p>

          {/* ARTICLE 1 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 1 — Définitions</h2>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>OKAZI</strong> : la plateforme de mise en relation accessible sur okazi.fr, éditée par Justine Celcal</li>
              <li>• <strong>Particulier</strong> : toute personne physique majeure utilisant OKAZI pour organiser un événement</li>
              <li>• <strong>Prestataire</strong> : toute personne physique ou morale proposant des services événementiels sur OKAZI</li>
              <li>• <strong>Certifié OKAZI ✅</strong> : prestataire professionnel déclaré dont l'identité et les documents ont été vérifiés par OKAZI</li>
              <li>• <strong>Membre OKAZI 👤</strong> : prestataire non professionnel dont l'identité a été vérifiée par OKAZI</li>
              <li>• <strong>Réservation</strong> : accord entre un particulier et un prestataire, validé et sécurisé via la plateforme OKAZI</li>
              <li>• <strong>Commission</strong> : frais prélevés par OKAZI sur chaque réservation confirmée et payée</li>
              <li>• <strong>Prestation</strong> : service événementiel fourni par le prestataire au particulier</li>
              <li>• <strong>Garantie OKAZI</strong> : ensemble des protections offertes par OKAZI aux utilisateurs de la plateforme</li>
              <li>• <strong>Messagerie OKAZI</strong> : système de communication interne à la plateforme entre particuliers et prestataires</li>
            </ul>
          </section>

          {/* ARTICLE 2 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 2 — Objet et nature de la plateforme</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI est une plateforme de mise en relation entre particuliers organisant des événements et prestataires événementiels. OKAZI n'est pas prestataire de services événementiels et n'est pas partie aux contrats conclus entre particuliers et prestataires. OKAZI agit en tant qu'intermédiaire de mise en relation et gestionnaire de paiements sécurisés.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">OKAZI fournit les services suivants :</p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Mise en relation entre particuliers et prestataires événementiels</li>
              <li>• Système de réservation et de paiement sécurisé via Stripe</li>
              <li>• Outils de gestion d'événements (planning, invités, budget, rappels)</li>
              <li>• Système de vérification des prestataires</li>
              <li>• Système d'avis et de notation vérifiés</li>
              <li>• Messagerie sécurisée entre utilisateurs</li>
              <li>• Service client et médiation en cas de litige</li>
            </ul>
          </section>

          {/* ARTICLE 3 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 3 — Inscription et conditions d'accès</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              L'utilisation des services OKAZI est réservée aux personnes physiques majeures (18 ans et plus) ou aux personnes morales légalement constituées. OKAZI se réserve le droit de vérifier l'âge de ses utilisateurs à tout moment.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">Lors de l'inscription, l'utilisateur s'engage à :</p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Fournir des informations exactes, complètes et à jour</li>
              <li>• Maintenir la confidentialité de ses identifiants de connexion</li>
              <li>• Ne pas créer plusieurs comptes</li>
              <li>• Informer OKAZI immédiatement de tout accès non autorisé à son compte</li>
              <li>• Ne pas céder son compte à un tiers</li>
              <li>• Mettre à jour ses informations en cas de changement</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI se réserve le droit de suspendre ou supprimer tout compte dont les informations s'avèrent inexactes ou frauduleuses, sans préavis ni indemnité. En cas de suppression pour fraude, aucun remboursement ne sera effectué.
            </p>
          </section>

          {/* ARTICLE 4 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 4 — Vérification des prestataires</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI met en place un système de vérification à trois niveaux pour protéger les particuliers :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Niveau 1 — Basique ⚡</strong> : email et téléphone vérifiés, pièce d'identité fournie et contrôlée</li>
              <li>• <strong>Niveau 2 — Certifié OKAZI ✅</strong> : documents professionnels vérifiés (Kbis, assurance professionnelle, RIB) sous 48h ouvrées par notre équipe. Réservé aux prestataires professionnels déclarés avec SIRET valide.</li>
              <li>• <strong>Niveau 3 — Top OKAZI ⭐</strong> : minimum 10 avis vérifiés, note supérieure à 4.5/5, 6 mois d'activité continue sur OKAZI, aucun litige signalé</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Le badge <strong>Membre OKAZI 👤</strong> indique un prestataire non professionnel dont seule la pièce d'identité a été vérifiée. OKAZI informe clairement les particuliers de ce statut sur chaque fiche prestataire.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              La vérification d'identité ne constitue pas une garantie de qualité des prestations. OKAZI ne peut être tenu responsable des prestations fournies par les prestataires, qu'ils soient Certifiés ou Membres OKAZI.
            </p>
          </section>

          {/* ARTICLE 5 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 5 — Processus de réservation</h2>
            <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal mb-4">
              <li>Le particulier soumet une demande de réservation via la messagerie OKAZI</li>
              <li>Le prestataire dispose de <strong>48h</strong> pour accepter ou refuser la demande</li>
              <li>Sans réponse dans ce délai, la demande est automatiquement annulée sans frais</li>
              <li>En cas d'acceptation, le particulier procède au paiement sécurisé via OKAZI/Stripe</li>
              <li>Les fonds sont retenus sur un compte séquestre jusqu'à la réalisation de la prestation</li>
              <li>Après la prestation, les fonds sont virés au prestataire sous <strong>5 jours ouvrés</strong></li>
              <li>Le particulier dispose de <strong>72h</strong> après la prestation pour signaler tout problème</li>
              <li>Sans signalement dans ce délai, la prestation est considérée comme validée et le virement est effectué</li>
            </ol>
            <p className="text-sm text-gray-600 leading-relaxed">
              Toute communication entre particuliers et prestataires doit obligatoirement passer par la messagerie OKAZI jusqu'à la confirmation de la réservation et du paiement. Les coordonnées personnelles complètes ne sont échangées qu'après confirmation et paiement.
            </p>
          </section>

          {/* ARTICLE 6 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 6 — Paiements sécurisés</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Tous les paiements sur OKAZI sont traités par <strong>Stripe</strong>, leader mondial du paiement en ligne, certifié PCI DSS niveau 1 (le plus haut niveau de sécurité). OKAZI ne stocke jamais vos données bancaires (numéro de carte, CVV, date d'expiration).
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Paiement par carte bancaire (Visa, Mastercard, American Express)</li>
              <li>• Authentification 3D Secure obligatoire pour toute transaction</li>
              <li>• Chiffrement SSL/TLS de bout en bout</li>
              <li>• Fonds conservés sur compte séquestre jusqu'à validation de la prestation</li>
              <li>• Virement au prestataire sous 5 jours ouvrés après validation</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>En cas d'échec de paiement :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• La réservation est automatiquement annulée sans frais</li>
              <li>• Le particulier est notifié par email et peut tenter un nouveau paiement</li>
              <li>• Le prestataire est informé de l'échec du paiement</li>
              <li>• OKAZI ne peut être tenu responsable des échecs liés à la banque du client</li>
            </ul>
          </section>

          {/* ARTICLE 7 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 7 — Commissions et tarifs</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI prélève les commissions suivantes sur chaque réservation confirmée et payée :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Plan Starter (gratuit)</strong> : 8% de commission côté prestataire</li>
              <li>• <strong>Plan Pro (49€/mois)</strong> : 3% de commission côté prestataire</li>
              <li>• <strong>Plan Premium (99€/mois)</strong> : 0% de commission côté prestataire</li>
              <li>• <strong>Frais de service particulier</strong> : 3% inclus dans le prix affiché (non remboursable sauf en cas de no-show prestataire)</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Les abonnements Pro et Premium sont facturés mensuellement et peuvent être résiliés à tout moment. La résiliation prend effet à la fin de la période d'abonnement en cours. Aucun remboursement pro-rata ne sera effectué.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI se réserve le droit de modifier ses tarifs avec un préavis de <strong>30 jours</strong> par email. Les réservations déjà confirmées ne sont pas affectées par les changements de tarifs.
            </p>
          </section>

          {/* ARTICLE 8 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 8 — Garantie OKAZI</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI s'engage à protéger ses utilisateurs grâce à la Garantie OKAZI :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Paiement sécurisé</strong> : votre argent est retenu sur un compte séquestre et ne sera versé au prestataire qu'après la réalisation de la prestation</li>
              <li>• <strong>Remboursement garanti en cas de no-show</strong> : si le prestataire ne se présente pas le jour J, vous êtes remboursé intégralement sous 48h</li>
              <li>• <strong>Médiation gratuite</strong> : en cas de litige, OKAZI intervient gratuitement pour trouver une solution amiable</li>
              <li>• <strong>Prestataires vérifiés</strong> : tous les prestataires ont fourni une pièce d'identité vérifiée par notre équipe</li>
              <li>• <strong>Avis vérifiés</strong> : seuls les utilisateurs ayant effectué une vraie réservation peuvent laisser un avis</li>
              <li>• <strong>Messagerie tracée</strong> : toutes les communications sont conservées et peuvent être utilisées en cas de litige</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              La Garantie OKAZI est valable uniquement pour les réservations et paiements effectués exclusivement via la plateforme OKAZI. Toute transaction réalisée en dehors de la plateforme ne bénéficie d'aucune garantie.
            </p>
          </section>

          {/* ARTICLE 9 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 9 — Politique d'annulation et remboursements</h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>Annulation par le particulier :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Moins de 48h après la réservation</strong> : remboursement intégral (100%) — droit de rétractation</li>
              <li>• <strong>Plus de 30 jours avant l'événement</strong> : remboursement à 80%</li>
              <li>• <strong>Entre 15 et 30 jours avant l'événement</strong> : remboursement à 50%</li>
              <li>• <strong>Moins de 15 jours avant l'événement</strong> : aucun remboursement</li>
              <li>• Les frais de service OKAZI (3%) ne sont pas remboursables sauf cas de force majeure</li>
            </ul>

            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              <strong>Annulation par le prestataire — Cas de force majeure :</strong>
            </p>
            <p className="text-sm mb-3" style={{color: '#aaa'}}>
              Maladie avec justificatif médical, accident, décès d'un proche, catastrophe naturelle, hospitalisation
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Remboursement intégral (100%) au particulier</li>
              <li>• Aucune pénalité pour le prestataire</li>
              <li>• Aucune suspension du compte</li>
              <li>• OKAZI s'engage à aider le particulier à trouver un prestataire de remplacement</li>
              <li>• Un justificatif officiel doit être fourni à OKAZI dans les <strong>48h suivant l'annulation</strong></li>
              <li>• En l'absence de justificatif dans ce délai, l'annulation sera requalifiée en annulation sans motif valable</li>
            </ul>

            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              <strong>Annulation par le prestataire — Sans motif valable :</strong>
            </p>
            <p className="text-sm mb-3" style={{color: '#aaa'}}>
              Toute annulation sans justificatif officiel accepté par OKAZI
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• <strong>Plus de 30 jours avant l'événement</strong> : pénalité de <strong>15%</strong> + suspension <strong>15 jours</strong></li>
              <li>• <strong>Entre 15 et 30 jours avant</strong> : pénalité de <strong>25%</strong> + suspension <strong>30 jours</strong></li>
              <li>• <strong>Moins de 15 jours avant</strong> : pénalité de <strong>50%</strong> + suspension <strong>60 jours</strong></li>
              <li>• <strong>Moins de 48h avant</strong> : pénalité de <strong>75%</strong> + suspension <strong>90 jours</strong> + mention permanente sur le profil</li>
              <li>• <strong>2ème annulation sans motif</strong> : suppression définitive du compte sans remboursement des abonnements en cours</li>
              <li>• Dans tous les cas : remboursement intégral (100%) au particulier <strong>garanti par OKAZI</strong></li>
            </ul>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>Justificatifs acceptés par OKAZI :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Certificat médical ou d'hospitalisation</li>
              <li>• Certificat de décès d'un proche (conjoint, enfant, parent, frère/sœur)</li>
              <li>• Rapport de police ou pompiers (accident, catastrophe)</li>
              <li>• Décision administrative ou judiciaire</li>
              <li>• Tout autre document officiel jugé recevable par OKAZI</li>
            </ul>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>No-show du prestataire (absence le jour J) :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Remboursement intégral (100%) garanti par OKAZI sous <strong>48h</strong></li>
              <li>• Pénalité de <strong>50% du montant</strong> de la réservation à la charge du prestataire</li>
              <li>• Suspension immédiate du compte pendant <strong>90 jours</strong></li>
              <li>• Suppression définitive du compte après <strong>2 no-shows</strong></li>
              <li>• Mention permanente et visible sur le profil prestataire</li>
            </ul>
          </section>

          {/* ARTICLE 10 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 10 — Obligations des prestataires</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Tout prestataire inscrit sur OKAZI s'engage à :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Fournir des informations exactes et à jour sur ses services, tarifs et disponibilités</li>
              <li>• Respecter toutes les réservations confirmées</li>
              <li>• Répondre aux demandes dans le délai annoncé sur son profil (2h, 24h, 48h ou 72h)</li>
              <li>• Maintenir une assurance professionnelle en cours de validité (prestataires Certifiés OKAZI)</li>
              <li>• Respecter la réglementation fiscale applicable à son activité</li>
              <li>• Signaler toute indisponibilité dès que possible et avant la réservation</li>
              <li>• Maintenir une note moyenne supérieure à 3/5 pour rester sur la plateforme</li>
              <li>• Fournir une prestation conforme à la description de son profil</li>
              <li>• Se présenter à l'heure convenue le jour de la prestation</li>
              <li>• Traiter les clients avec professionnalisme et respect</li>
            </ul>
          </section>

          {/* ARTICLE 11 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 11 — Interdiction de contournement</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Afin de garantir la sécurité des transactions et la viabilité de la plateforme, il est strictement interdit de :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Échanger des coordonnées personnelles (téléphone, email, réseaux sociaux) avant la confirmation de la réservation et du paiement</li>
              <li>• Proposer ou accepter un paiement en dehors de la plateforme OKAZI (espèces, virement direct, PayPal personnel, chèque, etc.)</li>
              <li>• Annuler une réservation sur OKAZI pour continuer la prestation en direct</li>
              <li>• Mentionner d'autres plateformes ou moyens de contact dans la messagerie OKAZI</li>
              <li>• Inciter un utilisateur à contacter le prestataire hors plateforme</li>
              <li>• Proposer des remises en échange d'un paiement hors plateforme</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>Sanctions en cas de contournement détecté :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• <strong>1ère infraction</strong> : avertissement officiel + suspension du compte 30 jours</li>
              <li>• <strong>2ème infraction</strong> : suppression définitive du compte sans remboursement des abonnements en cours</li>
              <li>• <strong>Dans tous les cas</strong> : OKAZI se réserve le droit de réclamer le paiement des commissions dues, même si la transaction a eu lieu hors plateforme, avec application de pénalités de retard</li>
              <li>• OKAZI utilise des moyens techniques de détection des tentatives de contournement via l'analyse de la messagerie interne</li>
            </ul>
          </section>

          {/* ARTICLE 12 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 12 — Système d'avis et de notation</h2>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Seuls les utilisateurs ayant effectué une réservation confirmée et payée peuvent laisser un avis</li>
              <li>• L'avis doit être laissé dans les <strong>30 jours</strong> suivant la prestation</li>
              <li>• Les avis doivent être honnêtes, constructifs et basés sur l'expérience réelle</li>
              <li>• Les avis diffamatoires, injurieux ou frauduleux seront supprimés sans préavis</li>
              <li>• OKAZI se réserve le droit de modérer tout avis ne respectant pas ces règles</li>
              <li>• Les prestataires peuvent répondre publiquement aux avis dans un délai de 30 jours</li>
              <li>• Un prestataire dont la note descend sous 3/5 sur une période de 3 mois peut être suspendu</li>
            </ul>
          </section>

          {/* ARTICLE 13 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 13 — Résolution des litiges</h2>
            <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal mb-4">
              <li>Le particulier dispose de <strong>72h après la prestation</strong> pour signaler un problème à OKAZI via contact@okazi.fr</li>
              <li>OKAZI accuse réception sous <strong>24h ouvrées</strong></li>
              <li>OKAZI contacte les deux parties pour tenter une résolution amiable sous <strong>5 jours ouvrés</strong></li>
              <li>Les deux parties doivent fournir tous les éléments de preuve (photos, messages, contrats)</li>
              <li>Si aucun accord n'est trouvé sous 10 jours, OKAZI peut trancher en faveur de l'une ou l'autre partie</li>
              <li>La décision d'OKAZI est définitive pour les montants inférieurs à 1 000€</li>
              <li>Pour les montants supérieurs à 1 000€, les parties peuvent saisir le médiateur de la consommation</li>
            </ol>
            <p className="text-sm text-gray-600">
              Pour tout signalement ou litige : <strong>contact@okazi.fr</strong>
            </p>
          </section>

          {/* ARTICLE 14 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 14 — Suspension et suppression de compte</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI se réserve le droit de suspendre ou supprimer tout compte en cas de :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
              <li>• Violation des présentes CGU</li>
              <li>• Informations frauduleuses ou fausses</li>
              <li>• Comportement abusif envers d'autres utilisateurs</li>
              <li>• Tentative de contournement de la plateforme</li>
              <li>• Non-paiement des commissions dues</li>
              <li>• Décision judiciaire ou administrative</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              <strong>Procédure de suppression de compte à la demande de l'utilisateur :</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• L'utilisateur peut demander la suppression de son compte via contact@okazi.fr</li>
              <li>• Un délai de <strong>30 jours</strong> est accordé pour récupérer ses données (export disponible)</li>
              <li>• Les réservations en cours doivent être honorées avant la suppression</li>
              <li>• Les données sont conservées 3 ans après suppression pour des raisons légales</li>
              <li>• Les abonnements en cours ne sont pas remboursés</li>
            </ul>
          </section>

          {/* ARTICLE 15 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 15 — Comportements interdits</h2>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• Publier des informations fausses, trompeuses ou frauduleuses</li>
              <li>• Harceler, menacer ou insulter d'autres utilisateurs</li>
              <li>• Usurper l'identité d'une autre personne ou entreprise</li>
              <li>• Utiliser la plateforme à des fins illégales</li>
              <li>• Tenter de pirater ou de perturber le fonctionnement de la plateforme</li>
              <li>• Collecter des données personnelles d'autres utilisateurs sans consentement</li>
              <li>• Publier du contenu protégé par des droits d'auteur sans autorisation</li>
              <li>• Créer de faux comptes ou de faux avis</li>
              <li>• Spammer d'autres utilisateurs via la messagerie OKAZI</li>
              <li>• Utiliser des robots ou scripts automatisés sur la plateforme</li>
            </ul>
          </section>

          {/* ARTICLE 16 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 16 — Propriété intellectuelle</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              L'ensemble des éléments d'OKAZI (logo, design, code source, textes, marque déposée) est protégé par le droit de la propriété intellectuelle et appartient exclusivement à OKAZI. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              En uploadant des photos, vidéos ou contenus sur OKAZI, l'utilisateur accorde à OKAZI une licence non exclusive, mondiale et gratuite d'utilisation de ces contenus à des fins de promotion de la plateforme. L'utilisateur garantit être titulaire de tous les droits sur les contenus uploadés et dégager OKAZI de toute responsabilité en cas de litige de propriété intellectuelle.
            </p>
          </section>

          {/* ARTICLE 17 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 17 — Données bancaires et sécurité des paiements</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI ne stocke jamais vos données bancaires (numéro de carte, CVV, date d'expiration). Toutes les transactions sont traitées exclusivement par Stripe, certifié PCI DSS niveau 1. En cas de suspicion de fraude sur votre compte, contactez immédiatement contact@okazi.fr et votre banque.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• OKAZI ne demandera jamais vos données bancaires par email ou téléphone</li>
              <li>• Tout email demandant vos coordonnées bancaires au nom d'OKAZI est frauduleux</li>
              <li>• Les virements aux prestataires sont effectués uniquement sur le RIB fourni lors de l'inscription</li>
              <li>• OKAZI ne peut modifier le RIB d'un prestataire sans vérification d'identité supplémentaire</li>
            </ul>
          </section>

          {/* ARTICLE 18 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 18 — Responsabilité d'OKAZI</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI s'engage à mettre en œuvre tous les moyens raisonnables pour assurer le bon fonctionnement de la plateforme et la sécurité des transactions. Cependant, OKAZI ne peut être tenu responsable :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>• De la qualité, de la conformité ou de la sécurité des prestations fournies par les prestataires</li>
              <li>• Des dommages corporels, matériels ou financiers résultant d'une prestation défaillante</li>
              <li>• Des interruptions temporaires de service pour maintenance planifiée ou urgente</li>
              <li>• Des pertes de données dues à des événements de force majeure ou attaques informatiques</li>
              <li>• Des actes frauduleux de tiers malgré les mesures de vérification mises en place</li>
              <li>• Des litiges entre particuliers et prestataires résultant de transactions hors plateforme</li>
              <li>• De la non-conformité fiscale des prestataires Membres OKAZI</li>
            </ul>
          </section>

          {/* ARTICLE 19 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 19 — Force majeure</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure, notamment : catastrophes naturelles, pandémies, épidémies, grèves nationales, pannes d'infrastructure Internet, attaques informatiques (DDoS, ransomware), décisions gouvernementales, guerres ou conflits armés, ou tout autre événement imprévisible, irrésistible et extérieur à OKAZI. En cas de force majeure, OKAZI informera les utilisateurs dans les meilleurs délais et mettra en œuvre tous les moyens disponibles pour rétablir le service.
            </p>
          </section>

          {/* ARTICLE 20 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 20 — Protection des mineurs</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI est strictement réservé aux personnes majeures (18 ans et plus). Il est interdit aux mineurs de créer un compte ou d'effectuer des réservations sur OKAZI. Les parents ou tuteurs légaux sont responsables de l'utilisation de la plateforme par les mineurs sous leur responsabilité.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les données relatives aux mineurs saisies dans les listes d'invités sont traitées avec la plus grande confidentialité, ne sont jamais partagées avec des tiers et sont supprimées conformément à notre politique de confidentialité.
            </p>
          </section>

          {/* ARTICLE 21 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 21 — Prestataires non professionnels (Membres OKAZI)</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Les prestataires Membres OKAZI exercent à titre non professionnel. Conformément à la législation française, les activités occasionnelles non déclarées sont tolérées jusqu'à un certain seuil de revenus annuels. Au-delà, l'inscription en tant qu'auto-entrepreneur ou autre statut professionnel est obligatoire.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              OKAZI informe les Membres OKAZI de cette réglementation mais ne peut être tenu responsable du non-respect de la réglementation fiscale par les prestataires. Chaque prestataire Membre OKAZI est seul responsable de sa situation fiscale.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les particuliers sont clairement informés du statut non professionnel des Membres OKAZI via un badge visible sur leur profil. OKAZI recommande aux particuliers de privilégier les prestataires Certifiés OKAZI pour les événements importants.
            </p>
          </section>

          {/* ARTICLE 22 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 22 — Modification des CGU</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              OKAZI se réserve le droit de modifier les présentes CGU à tout moment pour s'adapter aux évolutions légales, réglementaires ou commerciales. Les utilisateurs seront informés de toute modification substantielle par email au moins <strong>15 jours avant</strong> leur entrée en vigueur. La poursuite de l'utilisation de la plateforme après la date d'entrée en vigueur des nouvelles CGU vaut acceptation pleine et entière des modifications. En cas de refus des nouvelles CGU, l'utilisateur peut supprimer son compte avant la date d'entrée en vigueur.
            </p>
          </section>

          {/* ARTICLE 23 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 23 — Droit applicable et juridiction compétente</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Les présentes CGU sont soumises au droit français. En cas de litige non résolu par voie amiable ou par médiation, les tribunaux compétents de Paris seront seuls compétents, même en cas de pluralité de défendeurs ou d'appel en garantie.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conformément aux articles L.612-1 et suivants du Code de la consommation, les utilisateurs peuvent recourir gratuitement à un médiateur de la consommation. OKAZI adhère au service de médiation de la consommation. La plateforme européenne de règlement en ligne des litiges est également accessible à l'adresse : <strong>ec.europa.eu/consumers/odr</strong>
            </p>
          </section>

          {/* ARTICLE 24 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3" style={{color: '#FF6000'}}>Article 24 — Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pour toute question relative aux présentes CGU, toute réclamation ou tout signalement :<br/><br/>
              <strong>OKAZI</strong><br/>
              Email : contact@okazi.fr<br/>
              Site : www.okazi.fr<br/><br/>
              Notre équipe s'engage à répondre à toute demande dans un délai de <strong>48h ouvrées</strong>.
            </p>
          </section>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 flex-wrap">
            <Link href="/confidentialite" className="text-sm" style={{color: '#FF1493'}}>Confidentialité →</Link>
            <Link href="/mentions-legales" className="text-sm" style={{color: '#FF1493'}}>Mentions légales →</Link>
            <Link href="/" className="text-sm" style={{color: '#FF1493'}}>Retour à l'accueil →</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
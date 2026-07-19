const BREVO_API_KEY = process.env.BREVO_API_KEY

// Envoyer un email via Brevo
export async function envoyerEmail({ to, toName, subject, htmlContent }) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'OKAZI', email: 'noreply@okazi.fr' },
      to: [{ email: to, name: toName }],
      subject,
      htmlContent,
    }),
  })
  return response.json()
}

// Envoyer un SMS via Brevo
export async function envoyerSMS({ to, message }) {
  const response = await fetch('https://api.brevo.com/v3/transactionalSMS/sms', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: 'OKAZI',
      recipient: to,
      content: message,
    }),
  })
  return response.json()
}

// Template email rappel événement
export function templateRappelEvenement({ nomEvenement, dateEvenement, joursRestants }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF6000, #FF1493); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
        <h1 style="color: white; font-size: 28px; margin: 0; letter-spacing: 0.1em;">OKAZI</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #eee;">
        <h2 style="color: #333;">Rappel — ${joursRestants} jour${joursRestants > 1 ? 's' : ''} avant votre événement !</h2>
        <p style="color: #666;">Votre événement <strong>${nomEvenement}</strong> approche !</p>
        <div style="background: #fff5f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; color: #FF6000;"><strong>📅 Date :</strong> ${dateEvenement}</p>
        </div>
        <p style="color: #666;">Connectez-vous à votre espace OKAZI pour vérifier votre planning et vos prestataires.</p>
        <a href="https://www.okazi.fr/dashboard"
          style="display: inline-block; background: linear-gradient(135deg, #FF6000, #FF1493); color: white; padding: 12px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; margin-top: 10px;">
          Voir mon espace →
        </a>
        <p style="color: #aaa; font-size: 12px; margin-top: 20px;">OKAZI — La plateforme événementielle de A à Z</p>
      </div>
    </div>
  `
}

// Template email rappel RDV prestataire
export function templateRappelRDV({ nomPrestataire, categoriePrestataire, dateRDV, heureRDV }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF6000, #FF1493); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
        <h1 style="color: white; font-size: 28px; margin: 0; letter-spacing: 0.1em;">OKAZI</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #eee;">
        <h2 style="color: #333;">Rappel RDV — ${nomPrestataire}</h2>
        <p style="color: #666;">Vous avez un rendez-vous avec votre prestataire qui approche !</p>
        <div style="background: #fff5f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; color: #FF6000;"><strong>👤 Prestataire :</strong> ${nomPrestataire}</p>
          <p style="margin: 0 0 8px 0; color: #FF6000;"><strong>🎯 Catégorie :</strong> ${categoriePrestataire}</p>
          <p style="margin: 0; color: #FF6000;"><strong>📅 RDV :</strong> ${dateRDV} à ${heureRDV}</p>
        </div>
        <a href="https://www.okazi.fr/dashboard"
          style="display: inline-block; background: linear-gradient(135deg, #FF6000, #FF1493); color: white; padding: 12px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; margin-top: 10px;">
          Voir mon planning →
        </a>
        <p style="color: #aaa; font-size: 12px; margin-top: 20px;">OKAZI — La plateforme événementielle de A à Z</p>
      </div>
    </div>
  `
}
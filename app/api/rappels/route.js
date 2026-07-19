import { supabase } from '@/lib/supabase'
import { envoyerEmail, envoyerSMS, templateRappelEvenement } from '@/lib/brevo'

export async function GET() {
  try {
    // Récupérer tous les événements avec une date définie
    const { data: evenements, error } = await supabase
      .from('evenements')
      .select('*, auth.users!user_id(email)')
      .not('date_evenement', 'is', null)

    if (error) throw error

    const aujourd_hui = new Date()
    const rappelsEnvoyes = []

    for (const evt of evenements || []) {
      const dateEvt = new Date(evt.date_evenement)
      const diffMs = dateEvt - aujourd_hui
      const diffJours = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

      // Envoyer rappel à J-7, J-3, J-1
      if ([7, 3, 1].includes(diffJours)) {
        const userEmail = evt['auth.users']?.email
        if (!userEmail) continue

        // Email de rappel
        await envoyerEmail({
          to: userEmail,
          toName: 'Client OKAZI',
          subject: `⏰ Rappel — ${diffJours} jour${diffJours > 1 ? 's' : ''} avant ${evt.nom} !`,
          htmlContent: templateRappelEvenement({
            nomEvenement: evt.nom,
            dateEvenement: evt.date_evenement,
            joursRestants: diffJours,
          })
        })

        rappelsEnvoyes.push({
          evenement: evt.nom,
          jours: diffJours,
          email: userEmail
        })
      }
    }

    return Response.json({
      success: true,
      rappels: rappelsEnvoyes.length,
      details: rappelsEnvoyes
    })

  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
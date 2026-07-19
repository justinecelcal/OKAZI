import { supabase } from '@/lib/supabase'
import { envoyerEmail, templateRappelEvenement } from '@/lib/brevo'

export async function GET() {
  try {
    const { data: evenements, error } = await supabase
      .from('evenements')
      .select('*')
      .not('date_evenement', 'is', null)

    if (error) throw error

    const aujourd_hui = new Date()
    const rappelsEnvoyes = []

    for (const evt of evenements || []) {
      const dateEvt = new Date(evt.date_evenement)
      const diffMs = dateEvt - aujourd_hui
      const diffJours = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

      if ([7, 3, 1].includes(diffJours)) {
        // Récupérer l'email de l'utilisateur
        let userEmail = null

        if (evt.user_id) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', evt.user_id)
            .single()
          userEmail = userData?.email
        }

        if (!userEmail) continue

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
      details: rappelsEnvoyes,
      evenements_trouves: evenements?.length || 0
    })

  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
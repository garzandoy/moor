import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('🔄 Starting stale streak reset...')

    const { data: profiles, error: fetchError } = await supabase
      .from('profiles')
      .select('id, timezone, last_active_date, current_streak')
      .gt('current_streak', 0)

    if (fetchError) throw fetchError

    console.log(`📊 Checking ${profiles?.length || 0} users with active streaks`)

    let resetCount = 0

    for (const profile of profiles || []) {
      const userTimezone = profile.timezone || 'UTC'
      const lastActive = profile.last_active_date

      if (!lastActive) continue

      const userLocalDate = new Date().toLocaleDateString('en-CA', { 
        timeZone: userTimezone 
      })

      const lastActiveDate = new Date(lastActive + 'T00:00:00Z')
      const todayDate = new Date(userLocalDate + 'T00:00:00Z')
      const diffTime = todayDate - lastActiveDate
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays >= 2) {
        await supabase
          .from('profiles')
          .update({ current_streak: 0 })
          .eq('id', profile.id)

        console.log(`💔 Reset streak for user ${profile.id}: ${profile.current_streak} → 0 (${diffDays} days inactive)`)
        resetCount++
      }
    }

    console.log(`✅ Reset complete: ${resetCount} streaks reset`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        checked: profiles?.length || 0,
        reset: resetCount 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

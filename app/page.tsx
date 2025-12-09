import { Leaderboard } from './leaderboard'
import { createClient } from '@/lib/supabase/server'

export default async function LeaderboardPage() {
	const supabase = await createClient()
	const leaderboard = process.env.LEADERBOARD!
	const evaluations = (await supabase.from('evaluations').select().eq('leaderboard', leaderboard))
		.data
	const evaluationIds = evaluations!.map((evaluation) => evaluation.id)
	const maxRows = 10000
	const scores = []

	const totalRowsThing = (
		await supabase
			.from('scores')
			.select('*', { count: 'exact', head: true })
			.in('evaluation_id', evaluationIds)
	)

	const totalRows = totalRowsThing.count || 0

	for (let i = 0; i < totalRows; i += maxRows) {
		const startIndex = i
		const stopIndex = Math.min(i + maxRows - 1, totalRows) 
		const pagedScores = (
			await supabase
				.from('scores')
				.select()
				.in('evaluation_id', evaluationIds)
				.range(startIndex, stopIndex)
		).data!

		scores.push(...pagedScores)
	}

	return (
		<div>
			<Leaderboard
				scores={scores}
				evaluations={evaluations!}
			/>
		</div>
	)
}

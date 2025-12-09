/* eslint-disable @typescript-eslint/no-explicit-any */
import { Leaderboard } from './leaderboard'
import { createClient } from '@/lib/supabase/server'

export default async function LeaderboardPage() {
	const supabase = await createClient()
	const evaluationsTable = process.env.EVALUATIONS_TABLE!
	const scoresTable = process.env.SCORES_TABLE!
	const evaluations = (await supabase.from(evaluationsTable).select()).data as any
	const maxRows = 10000

	const scores = []

	const totalRows = (
		await supabase.from(scoresTable).select('*', { count: 'exact', head: true })
	).count!

	for (let i = 0; i < totalRows; i += maxRows) {
		const startIndex = i
		const stopIndex = Math.min(i + maxRows, totalRows)
		const pagedScores = (
			await supabase
				.from(scoresTable as any)
				.select()
				.range(startIndex, stopIndex)
		).data! as any

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

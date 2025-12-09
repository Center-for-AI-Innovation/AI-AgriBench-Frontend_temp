/* eslint-disable @typescript-eslint/no-explicit-any */
import { Leaderboard } from './leaderboard'
import { createClient } from '@/lib/supabase/server'
import { Score } from './types'

export default async function LeaderboardPage() {
	const supabase = await createClient()
	const evaluationsTable = process.env.EVALUATIONS_TABLE!
	const scoresTable = process.env.SCORES_TABLE!
	const evaluations = (await supabase.from(evaluationsTable as any).select()).data as any
	const maxRows = 4000

	const scoresList = []

	const totalRows = (
		await supabase.from(scoresTable as any).select('*', { count: 'exact', head: true })
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

		scoresList.push(...pagedScores)
	}

	const scores: Record<number, Score[]> = {}
	for (const evaluation of evaluations!) {
		const evaluationScores = scoresList.filter(
			(score: any) => score.evaluation_id === evaluation.id
		) as Score[]
		scores[evaluation.id] = evaluationScores
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

export interface Score {
	accuracy: number
	categories: string[]
	completeness: number
	conciseness: number
	created_at: string
	evaluation_id: number
	id: number
	question_id: string
	relevance: number
}

export interface Evaluation
{
	id: number
	created_at: string
	judge_model: string
	subject_model: string
	judge_temperature: number
}
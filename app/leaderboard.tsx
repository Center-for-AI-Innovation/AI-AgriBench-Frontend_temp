'use client'
import { ChangeEvent, useState } from 'react'
import { calculateAverage } from '@/lib/utils'
import Form from 'react-bootstrap/Form'
import dynamic from 'next/dynamic'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { Evaluation, Score } from './types'

const categoryOptions = [
	{ value: 'Pests_and_Pest_Management', label: 'Pests' },
	{ value: 'Diseases_and_Disease_Management', label: 'Diseases' },
	{ value: 'Weeds_and_Weed_Management', label: 'Weeds' },
	{ value: 'Crop_Nutrition_and_Fertility_Management', label: 'Nutrition' },
	{ value: 'Soils_and_Soil_Health', label: 'Soils' },
	{ value: 'Seed_Hybrid_Rootstock_Selection', label: 'Seed Hybrids' },
	{ value: 'Horticultural_and_Agronomic_Practices', label: 'Horticulture' },
	{ value: 'Water_Management_and_Irrigation', label: 'Water' },
	{ value: 'Weather_and_Weather_Risks', label: 'Weather' }
]

const DataTable = dynamic(
	async () => {
		const dtReact = import('datatables.net-react')
		const dtNet = import('datatables.net-dt')

		const [reactMod, dtNetMod] = await Promise.all([dtReact, dtNet])

		reactMod.default.use(dtNetMod.default)
		return reactMod.default
	},
	{ ssr: false }
)

interface LeaderboardProps {
	scores: Score[]
	evaluations: Evaluation[]
}

function getDataFromScores(scores: Score[], evaluations: Evaluation[]) {
	const data: string[][] = []
	const groupedScores = Object.groupBy(scores, (item) => item.evaluation_id)
	const groupedEvaluations = Object.groupBy(evaluations, (item) => item.subject_model)

	for (const subjectModel in groupedEvaluations) {
		const evaluationGroup = groupedEvaluations[subjectModel]
		const accuracy: number[] = []
		const completeness: number[] = []
		const conciseness: number[] = []
		const relevance: number[] = []

		for (const evaluation of evaluationGroup!) {
			const evaluationScores = groupedScores[evaluation.id]
			evaluationScores!.forEach((score) => {
				accuracy.push(score.accuracy)
				completeness.push(score.completeness)
				conciseness.push(score.conciseness)
				relevance.push(score.relevance)
			})
		}

		if (accuracy.length > 0) {
			data.push([
				subjectModel,
				calculateAverage(accuracy).toFixed(2),
				calculateAverage(completeness).toFixed(2),
				calculateAverage(conciseness).toFixed(2),
				calculateAverage(relevance).toFixed(2)
			])
		}
	}

	return data
}

export function Leaderboard({ scores, evaluations }: LeaderboardProps) {
	const [data, setData] = useState<string[][]>(getDataFromScores(scores, evaluations))
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		categoryOptions.map((option) => option.value)
	)

	const links: Record<string, string> = {}
	for (const evaluation of evaluations) {
		if (evaluation.link != null) {
			links[evaluation.subject_model] = evaluation.link
		}
	}

	async function handleCheckChange(
		e: ChangeEvent<HTMLInputElement>,
		option: { value: string; label?: string }
	) {
		const newSelectedCategories = e.target.checked
			? [...selectedCategories, option.value]
			: selectedCategories.filter((cat) => cat !== option.value)

		setSelectedCategories(newSelectedCategories)

		const filteredScores = scores.filter((score) => {
			return score.categories.some((cat) => newSelectedCategories.includes(cat))
		})

		const newData = getDataFromScores(filteredScores, evaluations)

		setData(newData)
	}

	function isOnlyCheckmark(option: { value: string; label?: string }) {
		return selectedCategories.length === 1 && selectedCategories[0] === option.value
	}

	return (
		<div
			className='h-full d-flex flex-column'
			style={{
				backgroundColor: '#D3CDC6',
				color: '#171717',
				borderRadius: '8px'
			}}>
			<Form
				style={{ paddingTop: '4px', paddingBottom: '0' }}
				className='pl-2 d-flex flex-row'>
				{categoryOptions.map((option) => {
					return (
						<Form.Check
							disabled={isOnlyCheckmark(option)}
							className='pr-3'
							onChange={(e) => {
								handleCheckChange(e, option)
							}}
							style={{
								color: '#171717'
							}}
							key={option.value}
							defaultChecked={true}
							label={option.label}
							name={option.label}
							id={`lb-${option.value}`}
						/>
					)
				})}
			</Form>

			<DataTable
				className='order-column'
				data={data}
				columns={[
					{
						title: 'Subject Model',
						data: 0,
						render: function (data) {
							return links[data]
								? `<a class='underline' href='${links[data]}' target='_blank' rel='noopener noreferrer'>${data}</a>`
								: data
						}
					},
					{
						title: 'Accuracy',
						data: 1
					},
					{
						title: 'Completeness',
						data: 2
					},
					{
						title: 'Conciseness',
						data: 3
					},
					{
						title: 'Relevance',
						data: 4
					}
				]}
				options={{
					searching: false,
					paging: false,
					info: false,
					ordering: true,
					order: [[1, 'desc']],
					columnDefs: [
						{
							targets: '_all',
							className: 'dt-left'
						}
					]
				}}></DataTable>
		</div>
	)
}

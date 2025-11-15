export type Competitor = {
  name: string
  landing_page: string
  logo_url: string
  strength: string
  weakness: string
}

export type SimilarIdea = {
  idea: string
  similarity: number
}

export type ProfitabilityInsight = {
  roi_percentage: number
  timeframe_months: number
  reason: string
}

export type TargetInsight = {
  segment: string
  purchasing_power: string
  justification: string
}

export type AnalyzeResult = {
  summary: string
  score: { value: number; reason: string }
  competitors: Competitor[]
  positioning: string
  similar: SimilarIdea[]
  category: string
  target?: TargetInsight
  profitability?: ProfitabilityInsight
}

export const fallbackSummary =
  'Addressable market appears mid-sized with room for focused entrants. Stronger traction in SMB and prosumer segments.'

export const TARGET_INSIGHTS: TargetInsight = {
  segment: 'ICP',
  purchasing_power: '19-79 / mo',
  justification: 'Early-stage founders and indie builders pay for fast signal + competitor clarity.',
}

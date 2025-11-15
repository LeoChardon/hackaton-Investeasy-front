export type IdeaInput = {
  idea: string;
};

export type Score = {
  value: number; // 0–100
  reason: string;
};

export type Profitability = {
  roi_percentage: number; // 0–300
  timeframe_months: number; // 1–60
  reason: string;
};

export type TargetAudience = {
  segment: string;
  purchasing_power: string;
  justification: string;
};

export type Competitor = {
  name: string;
  landing_page?: string | null;
  logo_url?: string | null;
  strength: string;
  weakness: string;
};

export type SimilarItem = {
  idea: string;
  similarity: number; // 0–1
};

export type AnalyzeResponse = {
  summary: string;
  score: Score;
  profitability: Profitability;
  target: TargetAudience;
  competitors: Competitor[];
  positioning: string;
  similar: SimilarItem[];
  category?: string | null;
};

export type ScoreComponents = {
  market_opportunity: number; // 0–100
  technical_feasibility: number; // 0–100
  competitive_advantage: number; // 0–100
  reason?: string;
};

export type CoreAnalysisResponse = {
  summary: string;
  positioning: string;
  score_components: ScoreComponents;
  profitability: Profitability;
  target: TargetAudience;
  category?: string | null;
};

export type CompetitorListResponse = {
  competitors: Competitor[];
};

export type SimilarityResponse = {
  similar: SimilarItem[];
};

export type ScoreComputationRequest = {
  idea: string;
  score_components: ScoreComponents;
  category?: string | null;
};

export type ScoreComputationResponse = {
  score: Score;
  category: string;
  weights: Record<string, number>;
  weight_explanation: string;
};

export type AgentTriggerInput = {
  idea: string;
  email: string;
  analysis: AnalyzeResponse;
};

export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type HTTPValidationError = {
  detail?: ValidationError[];
};

export const fallbackSummary =
  'Addressable market appears mid-sized with room for focused entrants. Stronger traction in SMB and prosumer segments.';

export const TARGET_INSIGHTS: TargetAudience = {
  segment: 'ICP',
  purchasing_power: '19-79 / mo',
  justification: 'Early-stage founders and indie builders pay for fast signal + competitor clarity.',
};

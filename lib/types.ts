/**
 * Shared domain types used across the app.
 */

export type EvidenceRating =
  | 'strong'
  | 'moderate'
  | 'limited'
  | 'unsupported'
  | 'risky';

export interface TerminologyItem {
  term: string;
  definition: string;
}

export interface CauseItem {
  title: string;
  explanation: string;
}

export interface CommunitySuggestion {
  title: string;
  summary: string;
  frequency: string;
}

export interface EvidenceItem {
  claim: string;
  rating: EvidenceRating;
  explanation: string;
}

export interface RiskItem {
  title: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface ThreadResult {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet?: string;
  isMock?: boolean;
}

export interface SourceResult {
  id: string;
  title: string;
  url: string;
  domain: string;
  sourceType: 'medical' | 'research' | 'government' | 'general';
  explanation: string;
  isMock?: boolean;
}

export interface ResearchAnswer {
  question: string;
  topic: string;
  summary: string;
  terminology: TerminologyItem[];
  possible_causes: CauseItem[];
  community_suggestions: CommunitySuggestion[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  related_questions: string[];
  search_terms: string[];
}

export interface ResearchResult {
  researchId: string;
  answer: ResearchAnswer;
  communityResults: ThreadResult[];
  sources: SourceResult[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  normalized_topic: string;
  created_at: string;
  answer?: ResearchAnswer;
}

export interface SavedAnswerItem {
  id: string;
  answer_id: string;
  question: string;
  topic: string;
  saved_at: string;
  answer: ResearchAnswer;
}

export interface SavedThreadItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet?: string;
  saved_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  created_at: string;
}

export interface PopularQuestion {
  question: string;
  topic: string;
}

export interface TopicCategory {
  label: string;
  icon: string;
}

// ---- Research categories ----

export type ResearchCategory = 'appearance' | 'money';

export interface MoneyResearchAnswer {
  question: string;
  topic: string;
  summary: string;
  key_ideas: CauseItem[];
  community_suggestions: CommunitySuggestion[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  related_questions: string[];
  search_terms: string[];
}

export interface MoneyResearchResult {
  researchId: string;
  answer: MoneyResearchAnswer;
  communityResults: ThreadResult[];
  sources: SourceResult[];
  category: ResearchCategory;
}

// ---- Face Analysis (Face++ abstraction) ----

export interface FacialLandmark {
  x: number;
  y: number;
  type: string;
}

export interface FeatureAnalysis {
  label: string;
  description: string;
  communityTerm?: string;
  communityTermNote?: string;
  researchSuggestion?: string;
}

export interface SkinAnalysis {
  label: string;
  description: string;
  researchSuggestion?: string;
}

export interface ProportionAnalysis {
  label: string;
  ratio: string;
  description: string;
}

export interface ResearchSuggestion {
  query: string;
  label: string;
}

export interface FaceAnalysis {
  faceDetected: boolean;
  faceShape?: string;
  confidence?: number;
  landmarks?: FacialLandmark[];
  eyes?: FeatureAnalysis[];
  brows?: FeatureAnalysis[];
  jaw?: FeatureAnalysis[];
  chin?: FeatureAnalysis[];
  skin?: SkinAnalysis[];
  proportions?: ProportionAnalysis[];
  researchSuggestions?: ResearchSuggestion[];
  isMock?: boolean;
}

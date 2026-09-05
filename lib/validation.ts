/**
 * Lightweight runtime validation for mock mode.
 * In Phase 4 this is replaced by Zod schemas validated server-side.
 * For now we do shape checks so the UI never receives garbage.
 */

import type { ResearchAnswer, ResearchResult, EvidenceRating } from './types';

const VALID_RATINGS: EvidenceRating[] = ['strong', 'moderate', 'limited', 'unsupported', 'risky'];

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

export function isValidAnswer(a: unknown): a is ResearchAnswer {
  if (!a || typeof a !== 'object') return false;
  const o = a as Record<string, unknown>;
  return (
    isString(o.question) &&
    isString(o.topic) &&
    isString(o.summary) &&
    Array.isArray(o.terminology) &&
    Array.isArray(o.possible_causes) &&
    Array.isArray(o.community_suggestions) &&
    Array.isArray(o.evidence) &&
    Array.isArray(o.risks) &&
    isStringArray(o.related_questions) &&
    isStringArray(o.search_terms)
  );
}

export function isValidResearchResult(r: unknown): r is ResearchResult {
  if (!r || typeof r !== 'object') return false;
  const o = r as Record<string, unknown>;
  return isString(o.researchId) && isValidAnswer(o.answer) && Array.isArray(o.communityResults) && Array.isArray(o.sources);
}

export function ratingLabel(rating: EvidenceRating): string {
  switch (rating) {
    case 'strong':
      return 'Strong';
    case 'moderate':
      return 'Moderate';
    case 'limited':
      return 'Limited';
    case 'unsupported':
      return 'Unsupported';
    case 'risky':
      return 'Risky';
  }
}

export function ratingDescription(rating: EvidenceRating): string {
  switch (rating) {
    case 'strong':
      return 'Well-supported by reliable evidence or established professional guidance.';
    case 'moderate':
      return 'Some useful supporting evidence, but limitations remain.';
    case 'limited':
      return 'Weak, preliminary, mixed, or highly context-dependent evidence.';
    case 'unsupported':
      return 'Little or no good evidence supporting the claim.';
    case 'risky':
      return 'Potential harm outweighs speculative benefit.';
  }
}

export { VALID_RATINGS };

import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';
import { generateMockResult, generateMockMoneyResult } from '@/lib/mockData';
import { persistResearchToHistory } from '@/lib/storage';
import { isValidResearchResult } from '@/lib/validation';
import type { ResearchResult, SearchHistoryItem, ResearchCategory, MoneyResearchResult } from '@/lib/types';

interface ResearchContextValue {
  currentResult: ResearchResult | null;
  currentMoneyResult: MoneyResearchResult | null;
  isLoading: boolean;
  loadingStep: number;
  error: string | null;
  submitResearch: (query: string, category?: ResearchCategory) => Promise<ResearchResult | null>;
  clearError: () => void;
}

const ResearchContext = createContext<ResearchContextValue | undefined>(undefined);

const LOADING_STEPS = [
  'Understanding your question...',
  'Finding relevant discussions...',
  'Checking available evidence...',
  'Organizing your answer...',
];

export function ResearchProvider({ children }: { children: ReactNode }) {
  const [currentResult, setCurrentResult] = useState<ResearchResult | null>(null);
  const [currentMoneyResult, setCurrentMoneyResult] = useState<MoneyResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const submitResearch = useCallback(async (query: string, category: ResearchCategory = 'appearance'): Promise<ResearchResult | null> => {
    const trimmed = query.trim();
    if (!trimmed) return null;

    setIsLoading(true);
    setError(null);
    setLoadingStep(0);

    try {
      for (let i = 0; i < LOADING_STEPS.length; i++) {
        setLoadingStep(i);
        await new Promise((r) => setTimeout(r, 700));
      }

      if (category === 'money') {
        const moneyResult = generateMockMoneyResult(trimmed);
        setCurrentMoneyResult(moneyResult);
        // Also create a compatible ResearchResult for history persistence
        const compatResult: ResearchResult = {
          researchId: moneyResult.researchId,
          answer: {
            question: moneyResult.answer.question,
            topic: moneyResult.answer.topic,
            summary: moneyResult.answer.summary,
            terminology: [],
            possible_causes: moneyResult.answer.key_ideas,
            community_suggestions: moneyResult.answer.community_suggestions,
            evidence: moneyResult.answer.evidence,
            risks: moneyResult.answer.risks,
            related_questions: moneyResult.answer.related_questions,
            search_terms: moneyResult.answer.search_terms,
          },
          communityResults: moneyResult.communityResults,
          sources: moneyResult.sources,
        };
        await persistResearchToHistory(compatResult);
        setCurrentResult(compatResult);
        return compatResult;
      }

      const result = generateMockResult(trimmed);
      if (!isValidResearchResult(result)) {
        throw new Error('Invalid response shape');
      }
      await persistResearchToHistory(result);
      setCurrentResult(result);
      return result;
    } catch {
      setError('Couldn\u2019t complete the research. Try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  return (
    <ResearchContext.Provider
      value={{ currentResult, currentMoneyResult, isLoading, loadingStep, error, submitResearch, clearError }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch(): ResearchContextValue {
  const ctx = useContext(ResearchContext);
  if (!ctx) throw new Error('useResearch must be used within ResearchProvider');
  return ctx;
}

export { LOADING_STEPS };
export type { SearchHistoryItem };

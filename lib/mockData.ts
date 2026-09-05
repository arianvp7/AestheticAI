/**
 * MOCK DATA — clearly labeled.
 * Used only for Phase 1 + Phase 2 visual development.
 * Replaced by live backend responses in Phase 5.
 */

import type {
  ResearchResult,
  ThreadResult,
  SourceResult,
  PopularQuestion,
  TopicCategory,
  ResearchAnswer,
  MoneyResearchResult,
  MoneyResearchAnswer,
  FaceAnalysis,
} from './types';

export const MOCK_TOPICS: TopicCategory[] = [
  { label: 'Skin', icon: 'Sparkles' },
  { label: 'Hair', icon: 'Scissors' },
  { label: 'Eyes', icon: 'Eye' },
  { label: 'Jawline', icon: 'Triangle' },
  { label: 'Face', icon: 'Circle' },
  { label: 'Fitness', icon: 'Dumbbell' },
  { label: 'Style', icon: 'Shirt' },
  { label: 'Grooming', icon: 'Brush' },
  { label: 'Teeth', icon: 'Smile' },
  { label: 'Research', icon: 'Microscope' },
];

export const MOCK_POPULAR_QUESTIONS: PopularQuestion[] = [
  { question: 'How do I improve dark circles?', topic: 'Under-eye appearance' },
  { question: 'What is canthal tilt?', topic: 'Eye aesthetics' },
  { question: 'What can improve acne scars?', topic: 'Acne' },
  { question: 'How do I make my jawline look sharper?', topic: 'Jawline' },
  { question: 'What skincare ingredients help pigmentation?', topic: 'Skincare' },
  { question: 'What does facial harmony mean?', topic: 'Facial aesthetics' },
];

const MOCK_DARK_CIRCLES_ANSWER: ResearchAnswer = {
  question: 'How do I improve dark circles?',
  topic: 'Under-eye appearance',
  summary:
    'Dark circles are not one single condition. Their appearance can come from pigmentation, visible blood vessels, facial anatomy, allergies, puffiness, sleep patterns, or a combination of factors. The most useful approach depends on what is causing yours.',
  terminology: [
    {
      term: 'Tear trough',
      definition:
        'A natural hollow or groove between the lower eyelid and cheek that can create shadowing.',
    },
    {
      term: 'Periorbital hyperpigmentation',
      definition:
        'Increased pigment in the thin skin around the eyes, often genetic or sun-related.',
    },
  ],
  possible_causes: [
    {
      title: 'Pigmentation',
      explanation:
        'Darker pigment around the eye can make the area appear shadowed. This may be genetic or worsened by sun exposure and rubbing.',
    },
    {
      title: 'Tear trough anatomy',
      explanation:
        'Natural hollows under the eyes can create shadows that look like darkening, even without pigment change.',
    },
    {
      title: 'Thin skin',
      explanation:
        'Skin under the eye is very thin, so blood vessels may be more visible and create a bluish or purplish tint.',
    },
    {
      title: 'Allergies',
      explanation:
        'Nasal congestion and eye-rubbing from allergies can make the area appear darker and puffier.',
    },
    {
      title: 'Sleep',
      explanation:
        'Lack of sleep can temporarily make dark circles or puffiness more noticeable, though it is rarely the only cause.',
    },
  ],
  community_suggestions: [
    {
      title: 'Sunscreen',
      summary: 'Daily sun protection is commonly recommended to prevent worsening pigmentation.',
      frequency: 'commonly discussed',
    },
    {
      title: 'Caffeine eye products',
      summary: 'Caffeine-based creams are often suggested for temporary puffiness reduction.',
      frequency: 'commonly discussed',
    },
    {
      title: 'Retinoids',
      summary: 'Some community members mention retinoids for skin quality, with mixed reports.',
      frequency: 'sometimes discussed',
    },
    {
      title: 'Better sleep',
      summary: 'Improving sleep is frequently mentioned as a supportive measure.',
      frequency: 'commonly discussed',
    },
    {
      title: 'Treating allergies',
      summary: 'Managing allergies is suggested when congestion is a contributing factor.',
      frequency: 'sometimes discussed',
    },
    {
      title: 'Professional cosmetic treatments',
      summary: 'Fillers and laser are discussed for structural or pigment concerns, usually with cost and risk caveats.',
      frequency: 'sometimes discussed',
    },
  ],
  evidence: [
    {
      claim: 'Sun protection helps prevent additional pigmentation and photoaging.',
      rating: 'strong',
      explanation:
        'Sunscreen is well-supported by dermatological guidance as a daily protective measure for skin including the under-eye area.',
    },
    {
      claim: 'Certain topical ingredients may help pigmentation depending on cause and formulation.',
      rating: 'moderate',
      explanation:
        'Ingredients like vitamin C, niacinamide, and retinoids have some supporting evidence for brightening, but results vary by individual and cause.',
    },
    {
      claim: 'Caffeine products may temporarily improve puffiness for some users.',
      rating: 'limited',
      explanation:
        'Caffeine can temporarily constrict blood vessels, but effects are short-lived and not all users see visible improvement.',
    },
    {
      claim: 'DIY injections or aggressive under-eye procedures should not be attempted.',
      rating: 'risky',
      explanation:
        'Self-administered injections or harsh chemical peels near the eye carry serious risk of infection, tissue damage, or vision problems.',
    },
  ],
  risks: [
    {
      title: 'Aggressive DIY treatments',
      severity: 'high',
      explanation:
        'Home chemical peels, needling, or injections near the eye can cause permanent damage. Consult a qualified professional.',
    },
    {
      title: 'Unrealistic expectations',
      severity: 'medium',
      explanation:
        'Anatomical dark circles caused by tear troughs cannot be fully corrected with skincare alone.',
    },
  ],
  related_questions: [
    'Dark circles vs eye bags — what is the difference?',
    'What is a tear trough?',
    'Can retinoids help under-eye pigmentation?',
    'Are eye creams worth it?',
  ],
  search_terms: ['dark circles', 'tear trough', 'under eye pigmentation', 'periorbital hyperpigmentation'],
};

const MOCK_THREADS: ThreadResult[] = [
  {
    id: 'mock-thread-1',
    title: 'Dark circles — what actually worked for you?',
    url: 'https://looksmax.org/threads/mock-dark-circles-1',
    domain: 'looksmax.org',
    snippet:
      'Users share their experiences with under-eye darkness and what products or routines they tried.',
    isMock: true,
  },
  {
    id: 'mock-thread-2',
    title: 'Tear troughs vs pigmentation — how to tell the difference',
    url: 'https://looksmax.org/threads/mock-tear-trough-2',
    domain: 'looksmax.org',
    snippet:
      'Discussion about distinguishing structural shadows from pigment-related dark circles.',
    isMock: true,
  },
  {
    id: 'mock-thread-3',
    title: 'Best under eye cream? (caffeine, retinol, vitamin C)',
    url: 'https://looksmax.org/threads/mock-under-eye-cream-3',
    domain: 'looksmax.org',
    snippet:
      'Community recommendations and reviews of various under-eye products.',
    isMock: true,
  },
];

const MOCK_SOURCES: SourceResult[] = [
  {
    id: 'mock-source-1',
    title: 'Dark Circles Under the Eyes: Causes and Treatments',
    url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dark-circles',
    domain: 'aad.org',
    sourceType: 'medical',
    explanation: 'American Academy of Dermatology overview of causes and evidence-based options.',
    isMock: true,
  },
  {
    id: 'mock-source-2',
    title: 'Periorbital hyperpigmentation: a comprehensive review',
    url: 'https://pubmed.ncbi.nlm.nih.gov/mock-pubmed-2',
    domain: 'pubmed.ncbi.nlm.nih.gov',
    sourceType: 'research',
    explanation: 'Peer-reviewed review of causes and treatment approaches for under-eye pigmentation.',
    isMock: true,
  },
  {
    id: 'mock-source-3',
    title: 'Under-eye hollows and tear troughs',
    url: 'https://www.nlm.nih.gov/mock-tear-trough',
    domain: 'medlineplus.gov',
    sourceType: 'government',
    explanation: 'General health information on under-eye anatomy and when to seek care.',
    isMock: true,
  },
];

export const MOCK_RESEARCH_RESULT: ResearchResult = {
  researchId: 'mock-research-001',
  answer: MOCK_DARK_CIRCLES_ANSWER,
  communityResults: MOCK_THREADS,
  sources: MOCK_SOURCES,
};

/** Generate a mock result for any question (for Phase 2 UI testing). */
export function generateMockResult(query: string): ResearchResult {
  if (query.toLowerCase().includes('dark circle')) {
    return MOCK_RESEARCH_RESULT;
  }

  // Generic mock: reuse dark circles answer but swap the question
  return {
    researchId: `mock-research-${Date.now()}`,
    answer: {
      ...MOCK_DARK_CIRCLES_ANSWER,
      question: query,
      topic: 'Appearance research',
    },
    communityResults: MOCK_THREADS.map((t) => ({
      ...t,
      title: t.title.replace('Dark circles', query),
    })),
    sources: MOCK_SOURCES,
  };
}

// ============ MONEY MOCK DATA ============

export const MOCK_MONEY_TOPICS: TopicCategory[] = [
  { label: 'Investing', icon: 'TrendingUp' },
  { label: 'Day Trading', icon: 'CandlestickChart' },
  { label: 'Stocks', icon: 'BarChart3' },
  { label: 'Crypto', icon: 'Bitcoin' },
  { label: 'Side Hustles', icon: 'Briefcase' },
  { label: 'Online Income', icon: 'Laptop' },
  { label: 'Careers', icon: 'Building2' },
  { label: 'Business', icon: 'Store' },
];

export const MOCK_MONEY_QUESTIONS: PopularQuestion[] = [
  { question: 'How do I start investing with little money?', topic: 'Investing' },
  { question: 'Is day trading profitable for beginners?', topic: 'Day Trading' },
  { question: 'What are the best side hustles in 2026?', topic: 'Side Hustles' },
  { question: 'How does compound interest work?', topic: 'Investing' },
  { question: 'Should I invest in crypto or stocks?', topic: 'Crypto' },
  { question: 'How do I start an online business?', topic: 'Business' },
];

export const MOCK_MONEY_TRENDING: ThreadResult[] = [
  {
    id: 'mock-money-1',
    title: 'Moneymaking thread — what actually worked for you?',
    url: 'https://looksmax.org/threads/mock-money-1',
    domain: 'looksmax.org',
    snippet: 'Users share their experiences with different income streams and what worked.',
    isMock: true,
  },
  {
    id: 'mock-money-2',
    title: 'Day trading vs long-term investing — which is better?',
    url: 'https://looksmax.org/threads/mock-money-2',
    domain: 'looksmax.org',
    snippet: 'Community debate on short-term trading versus holding strategies.',
    isMock: true,
  },
  {
    id: 'mock-money-3',
    title: 'Best side hustles for 2026?',
    url: 'https://looksmax.org/threads/mock-money-3',
    domain: 'looksmax.org',
    snippet: 'Discussion about profitable side income ideas and experiences.',
    isMock: true,
  },
];

const MOCK_MONEY_BASICS: { title: string; description: string }[] = [
  { title: 'Compound Interest', description: 'How reinvested earnings accelerate long-term growth.' },
  { title: 'Diversification', description: 'Why spreading risk across assets matters.' },
  { title: 'Risk vs Reward', description: 'Understanding the tradeoff between potential gains and losses.' },
  { title: 'Dollar-Cost Averaging', description: 'Investing fixed amounts regularly regardless of market conditions.' },
  { title: 'Emergency Fund', description: 'Why cash reserves matter before investing.' },
  { title: 'Index Funds', description: 'Low-cost way to own a broad slice of the market.' },
];

export { MOCK_MONEY_BASICS };

const MOCK_MONEY_ANSWER: MoneyResearchAnswer = {
  question: 'How do I start investing with little money?',
  topic: 'Investing fundamentals',
  summary:
    'You do not need a lot of money to start investing. Many platforms allow fractional shares and low minimums. The most important early steps are building an emergency fund, understanding your risk tolerance, and starting with simple, diversified investments rather than speculative bets.',
  key_ideas: [
    {
      title: 'Start with an emergency fund',
      explanation: 'Before investing, save 3-6 months of expenses in a liquid, accessible account to avoid being forced to sell investments at a loss.',
    },
    {
      title: 'Use fractional shares',
      explanation: 'Many brokers let you buy portions of expensive stocks or ETFs with as little as $1, making diversification accessible.',
    },
    {
      title: 'Consider index funds',
      explanation: 'Low-cost index funds or ETFs provide broad market exposure without needing to pick individual stocks.',
    },
    {
      title: 'Automate contributions',
      explanation: 'Setting up recurring investments removes emotion and builds consistency over time.',
    },
  ],
  community_suggestions: [
    {
      title: 'Index fund investing',
      summary: 'Frequently recommended as a simple, low-cost way to start investing.',
      frequency: 'commonly discussed',
    },
    {
      title: 'Dollar-cost averaging',
      summary: 'Investing fixed amounts regularly is often suggested to reduce timing risk.',
      frequency: 'commonly discussed',
    },
    {
      title: 'Crypto allocation',
      summary: 'Some suggest small crypto allocations for high risk tolerance, with strong disagreement.',
      frequency: 'sometimes discussed',
    },
    {
      title: 'Real estate',
      summary: 'Mentioned as a long-term wealth builder, though it requires more capital.',
      frequency: 'sometimes discussed',
    },
  ],
  evidence: [
    {
      claim: 'Diversified index funds historically outperform most actively managed funds over long periods.',
      rating: 'strong',
      explanation: 'Multiple large studies show that low-cost index investing beats most active management over 10+ year horizons.',
    },
    {
      claim: 'Dollar-cost averaging can reduce the impact of market timing decisions.',
      rating: 'moderate',
      explanation: 'Research suggests regular contributions reduce volatility impact, though lump-sum investing can outperform in rising markets.',
    },
    {
      claim: 'Day trading is consistently profitable for most retail traders.',
      rating: 'unsupported',
      explanation: 'Studies consistently show the vast majority of retail day traders lose money.',
    },
    {
      claim: 'Leveraged trading strategies guarantee returns.',
      rating: 'risky',
      explanation: 'Leverage amplifies both gains and losses and can lead to total account wipeout.',
    },
  ],
  risks: [
    {
      title: 'Speculative trading',
      severity: 'high',
      explanation: 'Day trading, options, and leveraged crypto positions can lead to rapid, total losses. Never invest money you cannot afford to lose.',
    },
    {
      title: 'FOMO and hype-driven decisions',
      severity: 'medium',
      explanation: 'Buying assets because they are rising rapidly often leads to buying near the top. Have a plan and stick to it.',
    },
    {
      title: 'No financial advice',
      severity: 'medium',
      explanation: 'This app provides educational information only. Consult a licensed financial advisor before making investment decisions.',
    },
  ],
  related_questions: [
    'What is an index fund?',
    'How much should I save before investing?',
    'What is dollar-cost averaging?',
    'Is crypto a good investment for beginners?',
  ],
  search_terms: ['investing basics', 'index funds', 'compound interest', 'dollar-cost averaging'],
};

const MOCK_MONEY_SOURCES: SourceResult[] = [
  {
    id: 'mock-money-source-1',
    title: 'Investing for Beginners',
    url: 'https://www.investor.gov/mock-introduction-investing',
    domain: 'investor.gov',
    sourceType: 'government',
    explanation: 'SEC investor education resource covering the basics of getting started.',
    isMock: true,
  },
  {
    id: 'mock-money-source-2',
    title: 'The Basics of Saving and Investing',
    url: 'https://www.sec.gov/mock-saving-investing',
    domain: 'sec.gov',
    sourceType: 'government',
    explanation: 'Official guidance on saving, investing, and avoiding fraud.',
    isMock: true,
  },
];

export const MOCK_MONEY_RESEARCH_RESULT: MoneyResearchResult = {
  researchId: 'mock-money-research-001',
  answer: MOCK_MONEY_ANSWER,
  communityResults: MOCK_MONEY_TRENDING,
  sources: MOCK_MONEY_SOURCES,
  category: 'money',
};

export function generateMockMoneyResult(query: string): MoneyResearchResult {
  if (query.toLowerCase().includes('invest')) {
    return MOCK_MONEY_RESEARCH_RESULT;
  }
  return {
    researchId: `mock-money-${Date.now()}`,
    answer: {
      ...MOCK_MONEY_ANSWER,
      question: query,
      topic: 'Money research',
    },
    communityResults: MOCK_MONEY_TRENDING.map((t) => ({
      ...t,
      title: t.title.replace('Moneymaking', query),
    })),
    sources: MOCK_MONEY_SOURCES,
    category: 'money',
  };
}

// ============ FACE SCAN MOCK DATA ============

export const MOCK_FACE_ANALYSIS: FaceAnalysis = {
  faceDetected: true,
  faceShape: 'Oval',
  confidence: 0.92,
  isMock: true,
  eyes: [
    {
      label: 'Canthal Tilt',
      description: 'The angle between your inner and outer eye corners appears slightly positive, which is commonly associated with an alert, youthful appearance.',
      communityTerm: 'Hunter Eyes',
      communityTermNote: 'Hunter eyes is informal aesthetic terminology, not a medical diagnosis. It generally refers to a combination of features including canthal tilt, eyelid exposure, and brow position.',
      researchSuggestion: 'How can canthal tilt be improved?',
    },
    {
      label: 'Upper Eyelid Exposure',
      description: 'Moderate upper eyelid visibility is present. This is a normal anatomical variation.',
      researchSuggestion: 'What causes upper eyelid exposure?',
    },
  ],
  brows: [
    {
      label: 'Brow Position',
      description: 'Your brow position appears to be at a moderate height relative to your brow bone.',
      researchSuggestion: 'How can I improve my eyebrow position?',
    },
    {
      label: 'Brow Ridge',
      description: 'A moderate brow ridge is visible. This is a normal structural feature.',
      researchSuggestion: 'What is a brow ridge and can it be changed?',
    },
  ],
  jaw: [
    {
      label: 'Jaw Definition',
      description: 'Your jawline shows moderate definition. Body composition, genetics, and grooming all influence how defined the jaw appears.',
      researchSuggestion: 'How can I make my jawline look sharper?',
    },
    {
      label: 'Gonial Angle',
      description: 'The angle of your jaw appears to be within a typical range.',
      communityTerm: 'Gonial Angle',
      communityTermNote: 'Gonial angle is an anatomical term adopted by online communities. It refers to the angle of the jaw at its corner.',
      researchSuggestion: 'What is the gonial angle?',
    },
  ],
  chin: [
    {
      label: 'Chin Projection',
      description: 'Your chin projection appears moderate. Chin projection is largely determined by skeletal anatomy.',
      researchSuggestion: 'What is chin projection and can it be changed?',
    },
  ],
  skin: [
    {
      label: 'Skin Texture',
      description: 'Some texture variation is visible. Skincare routines may help improve skin smoothness over time.',
      researchSuggestion: 'What skincare ingredients improve skin texture?',
    },
    {
      label: 'Under-eye Area',
      description: 'Some shadowing is visible under the eyes. This may be related to anatomy, pigmentation, or lifestyle factors.',
      researchSuggestion: 'How can under-eye appearance be improved?',
    },
  ],
  proportions: [
    {
      label: 'Facial Thirds',
      ratio: 'Balanced',
      description: 'The upper, middle, and lower thirds of your face appear roughly proportional.',
    },
    {
      label: 'Facial Fifths',
      ratio: 'Balanced',
      description: 'The horizontal fifths of your face appear roughly proportional.',
    },
  ],
  researchSuggestions: [
    { query: 'How can canthal tilt be improved?', label: 'Research Canthal Tilt' },
    { query: 'How can I make my jawline look sharper?', label: 'Research Jaw Definition' },
    { query: 'How can under-eye appearance be improved?', label: 'Research Under-eye Area' },
    { query: 'What skincare ingredients improve skin texture?', label: 'Research Skin Texture' },
  ],
};

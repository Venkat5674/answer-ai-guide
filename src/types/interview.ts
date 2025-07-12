export interface InterviewRole {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AnswerFeedback {
  score: number;
  clarity: number;
  knowledge: number;
  grammar: number;
  confidence: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  feedback: string;
  suggestions: string[];
  strengths: string[];
  improvements: string[];
}

export interface PerformanceReport {
  overallScore: number;
  readinessScore: number;
  improvementTips: string[];
  followUpQuestions: string[];
  answeredQuestions: number;
  averageScore: number;
  strongAreas: string[];
  weakAreas: string[];
}
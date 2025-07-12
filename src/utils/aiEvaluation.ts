import { AnswerFeedback, PerformanceReport } from '@/types/interview';

// Mock AI evaluation function - replace with actual AI service call
export const evaluateAnswer = async (
  question: string,
  userAnswer: string,
  sampleAnswer: string
): Promise<AnswerFeedback> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock evaluation logic - replace with actual AI analysis
  const wordCount = userAnswer.split(' ').length;
  const hasKeywords = checkKeywords(userAnswer, question);
  const grammarScore = checkGrammar(userAnswer);
  
  const clarity = Math.min(10, Math.max(1, 
    (wordCount > 20 ? 8 : 5) + (userAnswer.includes('because') || userAnswer.includes('for example') ? 2 : 0)
  ));
  
  const knowledge = Math.min(10, Math.max(1, hasKeywords * 2 + (wordCount > 50 ? 3 : 1)));
  const grammar = grammarScore;
  const confidence = Math.min(10, Math.max(1, 
    (userAnswer.includes('I believe') || userAnswer.includes('I think') ? 6 : 8) +
    (userAnswer.includes('definitely') || userAnswer.includes('certainly') ? 2 : 0)
  ));
  
  const overallScore = Math.round((clarity + knowledge + grammar + confidence) / 4);
  
  const sentiment = determineSentiment(userAnswer);
  
  return {
    score: overallScore,
    clarity,
    knowledge,
    grammar,
    confidence,
    sentiment,
    feedback: generateFeedback(overallScore, clarity, knowledge, grammar, confidence),
    suggestions: generateSuggestions(clarity, knowledge, grammar, confidence),
    strengths: generateStrengths(clarity, knowledge, grammar, confidence),
    improvements: generateImprovements(clarity, knowledge, grammar, confidence)
  };
};

const checkKeywords = (answer: string, question: string): number => {
  const questionWords = question.toLowerCase().split(' ');
  const answerWords = answer.toLowerCase().split(' ');
  const relevantWords = questionWords.filter(word => 
    word.length > 3 && !['what', 'how', 'why', 'when', 'where', 'would', 'could', 'should'].includes(word)
  );
  
  const foundKeywords = relevantWords.filter(word => 
    answerWords.some(answerWord => answerWord.includes(word))
  );
  
  return Math.min(5, foundKeywords.length);
};

const checkGrammar = (answer: string): number => {
  // Simple grammar checks - replace with actual grammar checking service
  const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const hasProperCapitalization = /^[A-Z]/.test(answer.trim());
  const hasProperPunctuation = /[.!?]$/.test(answer.trim());
  const averageSentenceLength = answer.split(' ').length / sentences.length;
  
  let score = 5;
  if (hasProperCapitalization) score += 2;
  if (hasProperPunctuation) score += 2;
  if (averageSentenceLength > 8 && averageSentenceLength < 25) score += 1;
  
  return Math.min(10, score);
};

const determineSentiment = (answer: string): 'Positive' | 'Neutral' | 'Negative' => {
  const positiveWords = ['excellent', 'great', 'love', 'enjoy', 'excited', 'passionate', 'successful'];
  const negativeWords = ['difficult', 'challenging', 'problem', 'issue', 'struggle', 'hard'];
  
  const lowerAnswer = answer.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerAnswer.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerAnswer.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'Positive';
  if (negativeCount > positiveCount) return 'Negative';
  return 'Neutral';
};

const generateFeedback = (overall: number, clarity: number, knowledge: number, grammar: number, confidence: number): string => {
  if (overall >= 8) {
    return "Excellent response! Your answer demonstrates strong knowledge and clear communication. You've structured your thoughts well and provided relevant examples.";
  } else if (overall >= 6) {
    return "Good response with solid foundation. Your answer shows understanding of the topic, though there's room for improvement in some areas.";
  } else if (overall >= 4) {
    return "Decent attempt with some good points. Consider expanding on your ideas and providing more specific examples to strengthen your response.";
  } else {
    return "Your response needs significant improvement. Focus on addressing the question more directly and providing more detailed explanations.";
  }
};

const generateSuggestions = (clarity: number, knowledge: number, grammar: number, confidence: number): string[] => {
  const suggestions = [];
  
  if (clarity < 7) {
    suggestions.push("Structure your response with a clear beginning, middle, and end");
    suggestions.push("Use specific examples to illustrate your points");
  }
  
  if (knowledge < 7) {
    suggestions.push("Demonstrate deeper understanding by discussing related concepts");
    suggestions.push("Include industry-specific terminology where appropriate");
  }
  
  if (grammar < 7) {
    suggestions.push("Review your response for grammar and punctuation");
    suggestions.push("Vary your sentence structure for better flow");
  }
  
  if (confidence < 7) {
    suggestions.push("Use more assertive language to convey confidence");
    suggestions.push("Avoid hedging words like 'maybe' or 'probably'");
  }
  
  return suggestions.slice(0, 3);
};

const generateStrengths = (clarity: number, knowledge: number, grammar: number, confidence: number): string[] => {
  const strengths = [];
  
  if (clarity >= 7) strengths.push("Clear and well-structured response");
  if (knowledge >= 7) strengths.push("Strong technical knowledge demonstrated");
  if (grammar >= 7) strengths.push("Excellent grammar and communication skills");
  if (confidence >= 7) strengths.push("Confident and assertive delivery");
  
  return strengths.length > 0 ? strengths : ["Shows effort and engagement with the question"];
};

const generateImprovements = (clarity: number, knowledge: number, grammar: number, confidence: number): string[] => {
  const improvements = [];
  
  if (clarity < 7) improvements.push("Improve response structure and organization");
  if (knowledge < 7) improvements.push("Deepen technical knowledge in this area");
  if (grammar < 7) improvements.push("Focus on grammar and communication clarity");
  if (confidence < 7) improvements.push("Build confidence in response delivery");
  
  return improvements;
};

export const generatePerformanceReport = (feedbacks: AnswerFeedback[]): PerformanceReport => {
  if (feedbacks.length === 0) {
    return {
      overallScore: 0,
      readinessScore: 0,
      improvementTips: [],
      followUpQuestions: [],
      answeredQuestions: 0,
      averageScore: 0,
      strongAreas: [],
      weakAreas: []
    };
  }

  const averageScore = Math.round(
    feedbacks.reduce((sum, feedback) => sum + feedback.score, 0) / feedbacks.length
  );
  
  const readinessScore = Math.min(100, Math.max(0, 
    (averageScore * 10) + (feedbacks.length * 5)
  ));

  const allStrengths = feedbacks.flatMap(f => f.strengths);
  const allImprovements = feedbacks.flatMap(f => f.improvements);
  
  const strongAreas = [...new Set(allStrengths)];
  const weakAreas = [...new Set(allImprovements)];

  const improvementTips = [
    "Practice explaining complex concepts in simple terms",
    "Prepare specific examples for each type of question",
    "Record yourself answering questions to improve delivery"
  ];

  const followUpQuestions = [
    "Can you provide a specific example of how you've applied this skill?",
    "How would you handle a situation where this approach doesn't work?",
    "What would you do differently if you encountered this challenge again?"
  ];

  return {
    overallScore: averageScore,
    readinessScore,
    improvementTips,
    followUpQuestions,
    answeredQuestions: feedbacks.length,
    averageScore,
    strongAreas,
    weakAreas
  };
};
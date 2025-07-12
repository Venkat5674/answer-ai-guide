import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Lightbulb, Send, Loader2 } from 'lucide-react';
import { InterviewQuestion, AnswerFeedback } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface QuestionCardProps {
  question: InterviewQuestion;
  onAnswerSubmit: (questionId: string, answer: string) => Promise<AnswerFeedback>;
  feedback?: AnswerFeedback;
}

export function QuestionCard({ question, onAnswerSubmit, feedback }: QuestionCardProps) {
  const [showSample, setShowSample] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await onAnswerSubmit(question.id, userAnswer);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-gradient-card border border-border rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden">
      {/* Question Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground pr-4">{question.question}</h3>
          <div className="flex gap-2 flex-shrink-0">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {question.category}
            </span>
          </div>
        </div>

        {/* Sample Answer Toggle */}
        <button
          onClick={() => setShowSample(!showSample)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary-glow transition-colors duration-200"
        >
          <Lightbulb className="h-4 w-4" />
          <span>Sample Answer</span>
          {showSample ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showSample && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border animate-slide-up">
            <p className="text-sm text-muted-foreground leading-relaxed">{question.sampleAnswer}</p>
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Your Answer
          </label>
          <Textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here... Be specific and provide examples where possible."
            className="min-h-[120px] resize-none border-border focus:border-primary focus:ring-1 focus:ring-primary"
            disabled={isAnalyzing}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!userAnswer.trim() || isAnalyzing}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Analyzing Answer...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Analyze Answer
            </>
          )}
        </Button>
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="border-t border-border bg-muted/20 p-6 animate-slide-up">
          <div className="space-y-4">
            {/* Overall Score */}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Overall Score</h4>
              <div className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
                {feedback.score}/10
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Clarity', value: feedback.clarity },
                { label: 'Knowledge', value: feedback.knowledge },
                { label: 'Grammar', value: feedback.grammar },
                { label: 'Confidence', value: feedback.confidence }
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{label}</div>
                  <div className={`text-lg font-semibold ${getScoreColor(value)}`}>
                    {value}/10
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback Text */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h5 className="font-medium text-foreground mb-2">Feedback</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{feedback.feedback}</p>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid md:grid-cols-2 gap-4">
              {feedback.strengths.length > 0 && (
                <div className="bg-success/5 rounded-lg p-4 border border-success/20">
                  <h5 className="font-medium text-success mb-2">Strengths</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.improvements.length > 0 && (
                <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
                  <h5 className="font-medium text-warning mb-2">Areas for Improvement</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {feedback.suggestions.length > 0 && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h5 className="font-medium text-primary mb-2">Suggestions</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">💡</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
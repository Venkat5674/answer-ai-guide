import { useState } from 'react';
import { Brain, Sparkles, Users, Target } from 'lucide-react';
import { RoleSelector } from '@/components/RoleSelector';
import { QuestionCard } from '@/components/QuestionCard';
import { PerformanceReport } from '@/components/PerformanceReport';
import { Button } from '@/components/ui/button';
import { InterviewRole, InterviewQuestion, AnswerFeedback } from '@/types/interview';
import { questionsByRole } from '@/data/interviewData';
import { evaluateAnswer, generatePerformanceReport } from '@/utils/aiEvaluation';

export default function Index() {
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [feedbacks, setFeedbacks] = useState<Record<string, AnswerFeedback>>({});
  const [showReport, setShowReport] = useState(false);

  const generateQuestions = () => {
    if (!selectedRole) return;
    
    const roleQuestions = questionsByRole[selectedRole.id] || [];
    setQuestions(roleQuestions);
    setFeedbacks({});
    setShowReport(false);
  };

  const handleAnswerSubmit = async (questionId: string, answer: string): Promise<AnswerFeedback> => {
    const question = questions.find(q => q.id === questionId);
    if (!question) throw new Error('Question not found');

    const feedback = await evaluateAnswer(question.question, answer, question.sampleAnswer);
    
    setFeedbacks(prev => ({
      ...prev,
      [questionId]: feedback
    }));

    return feedback;
  };

  const generateReport = () => {
    const allFeedbacks = Object.values(feedbacks);
    const report = generatePerformanceReport(allFeedbacks);
    setShowReport(true);
    return report;
  };

  const answeredQuestions = Object.keys(feedbacks).length;
  const canGenerateReport = answeredQuestions >= 2;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow animate-pulse-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Smart Interview Coach</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered interview preparation with personalized feedback and performance insights
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Selection Section */}
        {!questions.length && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-8">
                Choose your target role to receive tailored interview questions and feedback
              </p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <RoleSelector 
                selectedRole={selectedRole} 
                onRoleSelect={setSelectedRole} 
              />
              
              {selectedRole && (
                <Button 
                  onClick={generateQuestions}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Interview Questions
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-6 bg-card rounded-lg border border-border shadow-card hover:shadow-elevated transition-all duration-300">
                <Target className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Targeted Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Role-specific questions tailored to your career goals and industry requirements
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border border-border shadow-card hover:shadow-elevated transition-all duration-300">
                <Brain className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced feedback on clarity, knowledge, grammar, and confidence levels
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border border-border shadow-card hover:shadow-elevated transition-all duration-300">
                <Users className="h-8 w-8 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Performance Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed reports with improvement tips and readiness assessment
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Section */}
        {questions.length > 0 && !showReport && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {selectedRole?.title} Interview Questions
                </h2>
                <p className="text-muted-foreground">
                  Progress: {answeredQuestions} of {questions.length} questions completed
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setQuestions([]);
                    setFeedbacks({});
                    setShowReport(false);
                  }}
                >
                  Change Role
                </Button>
                
                {canGenerateReport && (
                  <Button 
                    onClick={generateReport}
                    className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    View Performance Report
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-500 ease-out shadow-glow"
                  style={{ width: `${(answeredQuestions / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Cards */}
            <div className="space-y-8">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onAnswerSubmit={handleAnswerSubmit}
                  feedback={feedbacks[question.id]}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            {answeredQuestions > 0 && (
              <div className="text-center mt-12 p-8 bg-gradient-card rounded-xl border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Great Progress! 🎉
                </h3>
                <p className="text-muted-foreground mb-4">
                  You've completed {answeredQuestions} questions. 
                  {canGenerateReport 
                    ? " Ready to see your performance report?" 
                    : ` Answer ${2 - answeredQuestions} more to unlock your detailed report.`
                  }
                </p>
                {canGenerateReport && (
                  <Button 
                    onClick={generateReport}
                    size="lg"
                    className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Generate Performance Report
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Performance Report */}
        {showReport && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Your Performance Analysis</h2>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowReport(false)}
                >
                  Back to Questions
                </Button>
                <Button 
                  onClick={() => {
                    setQuestions([]);
                    setFeedbacks({});
                    setShowReport(false);
                  }}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Start New Session
                </Button>
              </div>
            </div>
            
            <PerformanceReport report={generatePerformanceReport(Object.values(feedbacks))} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-muted-foreground">
            Built with AI to help you succeed in your next interview
          </p>
        </div>
      </footer>
    </div>
  );
}

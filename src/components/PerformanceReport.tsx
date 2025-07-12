import { PerformanceReport as Report } from '@/types/interview';
import { TrendingUp, Target, Award, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface PerformanceReportProps {
  report: Report;
}

export function PerformanceReport({ report }: PerformanceReportProps) {
  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: 'Ready', color: 'text-success', bgColor: 'bg-success' };
    if (score >= 60) return { level: 'Nearly Ready', color: 'text-warning', bgColor: 'bg-warning' };
    return { level: 'Needs Practice', color: 'text-destructive', bgColor: 'bg-destructive' };
  };

  const readinessInfo = getReadinessLevel(report.readinessScore);

  return (
    <div className="bg-gradient-card border border-border rounded-xl shadow-elevated p-6 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Performance Report</h2>
        <p className="text-muted-foreground">Based on {report.answeredQuestions} answered questions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overall Score */}
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
          <Target className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground mb-1">{report.averageScore}/10</div>
          <div className="text-sm text-muted-foreground">Average Score</div>
        </div>

        {/* Questions Answered */}
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
          <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground mb-1">{report.answeredQuestions}</div>
          <div className="text-sm text-muted-foreground">Questions Completed</div>
        </div>

        {/* Readiness Score */}
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
          <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
          <div className={`text-3xl font-bold mb-1 ${readinessInfo.color}`}>{report.readinessScore}%</div>
          <div className="text-sm text-muted-foreground">Interview Ready</div>
        </div>
      </div>

      {/* Readiness Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Interview Readiness</span>
          <span className={`text-sm font-medium ${readinessInfo.color}`}>{readinessInfo.level}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${readinessInfo.bgColor} shadow-glow`}
            style={{ width: `${report.readinessScore}%` }}
          />
        </div>
      </div>

      {/* Strong Areas and Weak Areas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {report.strongAreas.length > 0 && (
          <div className="bg-success/5 rounded-lg p-4 border border-success/20">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              <h3 className="font-semibold text-success">Strong Areas</h3>
            </div>
            <ul className="space-y-2">
              {report.strongAreas.slice(0, 3).map((area, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-success mr-2 flex-shrink-0">✓</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {report.weakAreas.length > 0 && (
          <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-5 w-5 text-warning mr-2" />
              <h3 className="font-semibold text-warning">Areas to Improve</h3>
            </div>
            <ul className="space-y-2">
              {report.weakAreas.slice(0, 3).map((area, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-warning mr-2 flex-shrink-0">⚠</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Improvement Tips */}
      <div className="mb-8">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary" />
          Personalized Improvement Tips
        </h3>
        <div className="space-y-3">
          {report.improvementTips.map((tip, index) => (
            <div key={index} className="flex items-start p-3 bg-primary/5 rounded-lg border border-primary/20">
              <span className="text-primary mr-3 font-semibold">{index + 1}.</span>
              <span className="text-sm text-muted-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up Questions */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-accent" />
          Practice These Follow-up Questions
        </h3>
        <div className="space-y-3">
          {report.followUpQuestions.map((question, index) => (
            <div key={index} className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              <span className="text-sm text-muted-foreground">{question}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
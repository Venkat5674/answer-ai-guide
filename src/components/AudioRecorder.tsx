import React, { useState, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { Mic, MicOff, Play, Pause, Square, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { transcribeAudio, evaluateVoiceResponse } from '@/utils/audioAI';
import { toast } from 'sonner';

interface AudioRecorderProps {
  question: string;
  onEvaluationComplete?: (evaluation: any) => void;
}

interface VoiceEvaluation {
  score: number;
  clarity: number;
  fluency: number;
  confidence: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  feedback: string;
  suggestions: string[];
  transcription: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  question, 
  onEvaluationComplete 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [evaluation, setEvaluation] = useState<VoiceEvaluation | null>(null);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recordingTime > 0) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recordingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAudioEvaluation = async (audioBlob: Blob) => {
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key to use voice features');
      return;
    }

    try {
      setIsTranscribing(true);
      
      // Step 1: Transcribe audio
      const transcribedText = await transcribeAudio(audioBlob, apiKey);
      setTranscription(transcribedText);
      
      setIsTranscribing(false);
      setIsEvaluating(true);
      
      // Step 2: Evaluate the response
      const evaluationResult = await evaluateVoiceResponse(
        question, 
        transcribedText, 
        apiKey
      );
      
      const voiceEval: VoiceEvaluation = {
        ...evaluationResult,
        transcription: transcribedText
      };
      
      setEvaluation(voiceEval);
      onEvaluationComplete?.(voiceEval);
      
    } catch (error) {
      console.error('Audio evaluation failed:', error);
      toast.error('Failed to process audio. Please try again.');
    } finally {
      setIsTranscribing(false);
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants: Record<string, any> = {
      positive: 'bg-success text-success-foreground',
      neutral: 'bg-muted text-muted-foreground',
      negative: 'bg-destructive text-destructive-foreground'
    };
    return variants[sentiment] || variants.neutral;
  };

  return (
    <div className="space-y-6">
      {/* API Key Input */}
      {!apiKey && (
        <Card className="border-warning bg-warning/10">
          <CardHeader>
            <CardTitle className="text-warning">OpenAI API Key Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your OpenAI API key to enable voice transcription and evaluation.
            </p>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="sk-..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button 
                onClick={() => toast.success('API key saved for this session')}
                disabled={!apiKey.trim()}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice Recording Section */}
      <Card className="bg-gradient-card border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Voice Interview Simulation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium text-foreground">{question}</p>
          </div>

          <ReactMediaRecorder
            audio
            onStop={(blobUrl, blob) => {
              setRecordingTime(0);
              if (blob && apiKey) {
                handleAudioEvaluation(blob);
              }
            }}
            render={({ 
              status, 
              startRecording, 
              stopRecording, 
              mediaBlobUrl 
            }) => (
              <div className="space-y-4">
                {/* Recording Controls */}
                <div className="flex items-center justify-center space-x-4">
                  {status === 'idle' && (
                    <Button
                      onClick={() => {
                        setRecordingTime(0);
                        startRecording();
                      }}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={!apiKey}
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </Button>
                  )}

                  {status === 'recording' && (
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={stopRecording}
                        size="lg"
                        variant="destructive"
                        className="animate-pulse-glow"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        Stop Recording
                      </Button>
                      <Badge variant="destructive" className="animate-pulse">
                        REC {formatTime(recordingTime)}
                      </Badge>
                    </div>
                  )}

                  {status === 'stopped' && mediaBlobUrl && (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        variant="outline"
                        size="sm"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <audio
                        src={mediaBlobUrl}
                        controls
                        className="h-8"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                      />
                    </div>
                  )}
                </div>

                {/* Status Messages */}
                {status === 'acquiring_media' && (
                  <div className="text-center text-muted-foreground">
                    <p>Requesting microphone access...</p>
                  </div>
                )}

                {(isTranscribing || isEvaluating) && (
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm">
                        {isTranscribing ? 'Transcribing audio...' : 'Evaluating response...'}
                      </span>
                    </div>
                    <Progress value={isTranscribing ? 50 : 80} className="w-full max-w-xs mx-auto" />
                  </div>
                )}
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Transcription Results */}
      {transcription && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{transcription}</p>
          </CardContent>
        </Card>
      )}

      {/* Evaluation Results */}
      {evaluation && (
        <Card className="bg-gradient-card border border-border/50">
          <CardHeader>
            <CardTitle>Voice Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <div className={`text-2xl font-bold ${getScoreColor(evaluation.score)}`}>
                  {evaluation.score}/10
                </div>
                <p className="text-xs text-muted-foreground">Overall Score</p>
              </div>
              <div className="text-center space-y-1">
                <div className={`text-2xl font-bold ${getScoreColor(evaluation.clarity)}`}>
                  {evaluation.clarity}/10
                </div>
                <p className="text-xs text-muted-foreground">Clarity</p>
              </div>
              <div className="text-center space-y-1">
                <div className={`text-2xl font-bold ${getScoreColor(evaluation.fluency)}`}>
                  {evaluation.fluency}/10
                </div>
                <p className="text-xs text-muted-foreground">Fluency</p>
              </div>
              <div className="text-center space-y-1">
                <div className={`text-2xl font-bold ${getScoreColor(evaluation.confidence)}`}>
                  {evaluation.confidence}/10
                </div>
                <p className="text-xs text-muted-foreground">Confidence</p>
              </div>
            </div>

            <Separator />

            {/* Sentiment & Feedback */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sentiment Analysis:</span>
                <Badge className={getSentimentBadge(evaluation.sentiment)}>
                  {evaluation.sentiment.toUpperCase()}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Detailed Feedback:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {evaluation.feedback}
                </p>
              </div>

              {evaluation.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Improvement Suggestions:</h4>
                  <ul className="space-y-1">
                    {evaluation.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
// Audio AI utilities for transcription and evaluation using OpenAI APIs

export interface VoiceEvaluationResult {
  score: number;
  clarity: number;
  fluency: number;
  confidence: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  feedback: string;
  suggestions: string[];
}

/**
 * Transcribe audio using OpenAI Whisper API
 */
export async function transcribeAudio(audioBlob: Blob, apiKey: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  try {
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Transcription failed: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.text || '';
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio. Please check your API key and try again.');
  }
}

/**
 * Evaluate voice response using OpenAI GPT-4
 */
export async function evaluateVoiceResponse(
  question: string, 
  transcription: string, 
  apiKey: string
): Promise<VoiceEvaluationResult> {
  const prompt = `
You are an expert interview coach evaluating a candidate's voice response to an interview question. 

INTERVIEW QUESTION: "${question}"

CANDIDATE'S RESPONSE: "${transcription}"

Please evaluate this response and provide a detailed analysis. Return your evaluation in the following JSON format:

{
  "score": <overall score out of 10>,
  "clarity": <clarity score out of 10>,
  "fluency": <fluency score out of 10>, 
  "confidence": <confidence score out of 10>,
  "sentiment": "<positive|neutral|negative>",
  "feedback": "<detailed feedback paragraph>",
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
}

Evaluation Criteria:
- CLARITY: How clear and articulate is the speech?
- FLUENCY: How smooth and natural is the delivery?
- CONFIDENCE: How confident does the candidate sound?
- SENTIMENT: Overall emotional tone of the response
- FEEDBACK: Comprehensive feedback on content, delivery, and professionalism
- SUGGESTIONS: Specific actionable improvement recommendations

Be constructive, professional, and provide specific examples where possible.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert interview coach specializing in voice and communication analysis. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Evaluation failed: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No evaluation content received');
    }

    // Parse the JSON response
    try {
      const evaluation = JSON.parse(content);
      
      // Validate required fields
      if (typeof evaluation.score !== 'number' || 
          typeof evaluation.clarity !== 'number' || 
          typeof evaluation.fluency !== 'number' || 
          typeof evaluation.confidence !== 'number') {
        throw new Error('Invalid evaluation format');
      }

      return {
        score: Math.max(0, Math.min(10, evaluation.score)),
        clarity: Math.max(0, Math.min(10, evaluation.clarity)),
        fluency: Math.max(0, Math.min(10, evaluation.fluency)),
        confidence: Math.max(0, Math.min(10, evaluation.confidence)),
        sentiment: ['positive', 'neutral', 'negative'].includes(evaluation.sentiment) 
          ? evaluation.sentiment 
          : 'neutral',
        feedback: evaluation.feedback || 'No feedback provided.',
        suggestions: Array.isArray(evaluation.suggestions) 
          ? evaluation.suggestions.slice(0, 5) 
          : ['Practice your response structure', 'Work on voice clarity', 'Build confidence through rehearsal']
      };
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Fallback evaluation if JSON parsing fails
      return {
        score: 6,
        clarity: 6,
        fluency: 6,
        confidence: 6,
        sentiment: 'neutral',
        feedback: 'Unable to generate detailed feedback. Please try again.',
        suggestions: [
          'Practice speaking clearly and at a steady pace',
          'Structure your responses with clear beginning, middle, and end',
          'Use specific examples to support your points'
        ]
      };
    }
  } catch (error) {
    console.error('Voice evaluation error:', error);
    throw new Error('Failed to evaluate voice response. Please check your API key and try again.');
  }
}

/**
 * Mock evaluation function for testing without API
 */
export async function mockEvaluateVoiceResponse(
  question: string, 
  transcription: string
): Promise<VoiceEvaluationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const wordCount = transcription.split(' ').length;
  const hasStructure = /first|second|third|finally|in conclusion/i.test(transcription);
  
  return {
    score: Math.min(10, Math.max(3, 5 + Math.floor(wordCount / 10) + (hasStructure ? 2 : 0))),
    clarity: Math.min(10, Math.max(4, 6 + Math.floor(Math.random() * 3))),
    fluency: Math.min(10, Math.max(4, 6 + Math.floor(Math.random() * 3))),
    confidence: Math.min(10, Math.max(3, 5 + Math.floor(wordCount / 15))),
    sentiment: wordCount > 20 ? 'positive' : wordCount > 10 ? 'neutral' : 'negative',
    feedback: `Your response demonstrated ${wordCount > 20 ? 'good depth' : 'basic understanding'} of the topic. ${hasStructure ? 'The structure was clear and logical.' : 'Consider organizing your thoughts more systematically.'} Focus on providing specific examples to strengthen your answer.`,
    suggestions: [
      'Practice using the STAR method (Situation, Task, Action, Result)',
      'Include more specific examples from your experience', 
      'Work on maintaining steady pace and volume'
    ]
  };
}
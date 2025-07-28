export interface AIRequest {
  prompt?: string;
  text?: string;
  question?: string;
  context?: string;
  targetLanguage?: string;
  model?: 'openai' | 'gemini';
  maxTokens?: number;
}

export interface AIResponse {
  response?: string;
  summary?: string;
  translation?: string;
  answer?: string;
}

export type AIOperation = 'generate' | 'summarize' | 'translate' | 'qa';
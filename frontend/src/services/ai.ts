import api from './api';
import type { AIRequest, AIResponse, AIOperation } from '../types/ai';

export const aiService = {
  async generateText(request: AIRequest): Promise<AIResponse> {
    const response = await api.post('/ai/generate', request);
    return response.data;
  },

  async summarizeText(request: AIRequest): Promise<AIResponse> {
    const response = await api.post('/ai/summarize', request);
    return response.data;
  },

  async translateText(request: AIRequest): Promise<AIResponse> {
    const response = await api.post('/ai/translate', request);
    return response.data;
  },

  async askQuestion(request: AIRequest): Promise<AIResponse> {
    const response = await api.post('/ai/qa', request);
    return response.data;
  },

  async performOperation(operation: AIOperation, request: AIRequest): Promise<AIResponse> {
    switch (operation) {
      case 'generate':
        return this.generateText(request);
      case 'summarize':
        return this.summarizeText(request);
      case 'translate':
        return this.translateText(request);
      case 'qa':
        return this.askQuestion(request);
      default:
        throw new Error(`Unknown AI operation: ${operation}`);
    }
  },
};
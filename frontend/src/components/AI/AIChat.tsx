import React, { useState } from 'react';
import { aiService } from '../../services/ai';
import type { AIRequest, AIResponse } from '../../types/ai';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'openai' | 'gemini'>('openai');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const request: AIRequest = {
        prompt: userMessage,
        model: selectedModel,
      };

      const response = await aiService.generateText(request);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response || 'No response' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string, prompt: string) => {
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsLoading(true);

    try {
      let response: AIResponse;
      const request: AIRequest = { model: selectedModel };

      switch (action) {
        case 'summarize':
          response = await aiService.summarizeText({ ...request, text: prompt });
          setMessages(prev => [...prev, { role: 'assistant', content: response.summary || 'No summary available' }]);
          break;
        case 'translate':
          response = await aiService.translateText({ ...request, text: prompt, targetLanguage: 'Spanish' });
          setMessages(prev => [...prev, { role: 'assistant', content: response.translation || 'No translation available' }]);
          break;
        default:
          response = await aiService.generateText({ ...request, prompt });
          setMessages(prev => [...prev, { role: 'assistant', content: response.response || 'No response' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as 'openai' | 'gemini')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="openai">OpenAI GPT</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg">Welcome to AI Assistant!</p>
              <p className="text-sm mt-2">Ask me anything or use the quick actions below.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleQuickAction('generate', 'Write a creative story about artificial intelligence')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            disabled={isLoading}
          >
            <div className="text-sm font-medium">✨ Creative Writing</div>
            <div className="text-xs text-gray-500 mt-1">Generate a creative story</div>
          </button>
          
          <button
            onClick={() => handleQuickAction('generate', 'Explain quantum computing in simple terms')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            disabled={isLoading}
          >
            <div className="text-sm font-medium">🧠 Explain Concepts</div>
            <div className="text-xs text-gray-500 mt-1">Explain complex topics</div>
          </button>
          
          <button
            onClick={() => handleQuickAction('generate', 'Give me 5 productivity tips for remote work')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            disabled={isLoading}
          >
            <div className="text-sm font-medium">💡 Tips & Advice</div>
            <div className="text-xs text-gray-500 mt-1">Get helpful suggestions</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
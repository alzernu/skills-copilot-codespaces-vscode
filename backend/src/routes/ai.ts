import express from 'express';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize AI clients with error handling
let openai: OpenAI | null = null;
let genAI: GoogleGenerativeAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Text generation endpoint
router.post('/generate', async (req, res) => {
  try {
    const { prompt, model = 'openai', maxTokens = 500 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    
    let response;
    
    if (model === 'openai') {
      if (!openai) {
        return res.status(400).json({ message: 'OpenAI API key not configured' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
      });
      
      response = completion.choices[0]?.message?.content || '';
    } else if (model === 'gemini') {
      if (!genAI) {
        return res.status(400).json({ message: 'Gemini API key not configured' });
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const responseText = result.response;
      response = responseText.text();
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    
    res.json({ response });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ message: 'AI service error' });
  }
});

// Text summarization endpoint
router.post('/summarize', async (req, res) => {
  try {
    const { text, model = 'openai' } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    
    const prompt = `Please provide a concise summary of the following text:\n\n${text}`;
    let response;
    
    if (model === 'openai') {
      if (!openai) {
        return res.status(400).json({ message: 'OpenAI API key not configured' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      });
      
      response = completion.choices[0]?.message?.content || '';
    } else if (model === 'gemini') {
      if (!genAI) {
        return res.status(400).json({ message: 'Gemini API key not configured' });
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const responseText = result.response;
      response = responseText.text();
    }
    
    res.json({ summary: response });
  } catch (error) {
    console.error('AI summarization error:', error);
    res.status(500).json({ message: 'AI service error' });
  }
});

// Translation endpoint
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage, model = 'openai' } = req.body;
    
    if (!text || !targetLanguage) {
      return res.status(400).json({ message: 'Text and target language are required' });
    }
    
    const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;
    let response;
    
    if (model === 'openai') {
      if (!openai) {
        return res.status(400).json({ message: 'OpenAI API key not configured' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      });
      
      response = completion.choices[0]?.message?.content || '';
    } else if (model === 'gemini') {
      if (!genAI) {
        return res.status(400).json({ message: 'Gemini API key not configured' });
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const responseText = result.response;
      response = responseText.text();
    }
    
    res.json({ translation: response });
  } catch (error) {
    console.error('AI translation error:', error);
    res.status(500).json({ message: 'AI service error' });
  }
});

// Q&A endpoint
router.post('/qa', async (req, res) => {
  try {
    const { question, context, model = 'openai' } = req.body;
    
    if (!question || !context) {
      return res.status(400).json({ message: 'Question and context are required' });
    }
    
    const prompt = `Based on the following context, please answer the question:\n\nContext: ${context}\n\nQuestion: ${question}`;
    let response;
    
    if (model === 'openai') {
      if (!openai) {
        return res.status(400).json({ message: 'OpenAI API key not configured' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      });
      
      response = completion.choices[0]?.message?.content || '';
    } else if (model === 'gemini') {
      if (!genAI) {
        return res.status(400).json({ message: 'Gemini API key not configured' });
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const responseText = result.response;
      response = responseText.text();
    }
    
    res.json({ answer: response });
  } catch (error) {
    console.error('AI Q&A error:', error);
    res.status(500).json({ message: 'AI service error' });
  }
});

export default router;
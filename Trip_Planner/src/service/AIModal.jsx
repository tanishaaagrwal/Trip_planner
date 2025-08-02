// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or try "gemini-pro"

// Simple text generation
export const askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sorry, something went wrong!";
  }
};

// Simple JSON generation
export const askGeminiJSON = async (prompt) => {
  try {
    const jsonPrompt = `${prompt}\n\nRespond only with valid JSON. Do not include markdown or explanations.`;
    const result = await model.generateContent(jsonPrompt);
    const text = result.response.text();

    // Remove Markdown code block (e.g., ```json ... ```)
    const cleanText = text.replace(/```json|```/g, '').trim();

    // Try parsing
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("JSON error:", error);
    return { error: "Failed to get JSON response" };
  }
};

// Chat session initialization
export const createChat = () => {
  return model.startChat({
    history: [],
    generationConfig: { maxOutputTokens: 3000 } // Increased for longer trips
  });
};

// Chat messaging
export const chatWithGemini = async (chat, message) => {
  try {
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, chat failed!";
  }
};

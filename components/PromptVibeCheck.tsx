import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useTheme, Theme } from '../context/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { SparklesIcon } from '../constants';
import { formatVibeResult } from '../utils/markdown';


// Assume process.env.API_KEY is available in the execution environment
const API_KEY = process.env.API_KEY;

export const PromptVibeCheck: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVibeCheck = async () => {
    if (!prompt.trim() || !API_KEY) {
      return;
    }
    setIsLoading(true);
    setResult('');
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a world-class senior frontend engineer and UI/UX designer, specializing in 'Vibe Coding'. Your task is to analyze the user's prompt and provide constructive feedback to help them get a better result from an AI code generator.

Your response MUST be in Markdown and follow this structure:

### Vibe Analysis
Provide a brief, overall analysis of the prompt's clarity, specificity, and style. Use a friendly but expert tone.

### Concrete Suggestions
- **Suggestion 1:** A specific, actionable tip.
- **Suggestion 2:** Another specific, actionable tip.
- *(add more if necessary)*

### ✨ Improved Prompt
Rewrite the user's prompt into a significantly better version that incorporates your suggestions. This should be a complete, copy-paste-ready prompt.
`,
        }
      });
      setResult(response.text);
    } catch (err) {
      console.error(err);
      setError(t('vibeCheckError'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const themeClasses: Record<Theme, any> = {
    light: {
      card: 'bg-white border-slate-200/80 rounded-xl',
      title: 'text-gray-700',
      input: 'bg-slate-100 border-slate-300 focus:ring-purple-500 focus:border-purple-500 text-gray-800 rounded-lg',
      button: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400 rounded-full',
      resultBg: 'bg-slate-50/70 border-slate-200 rounded-lg',
      errorText: 'text-rose-600',
    },
    dark: {
      card: 'bg-slate-900 border-gray-800 rounded-xl',
      title: 'text-white',
      input: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500 rounded-lg',
      button: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-800 disabled:text-gray-400 rounded-full',
      resultBg: 'bg-gray-800/50 border-gray-700 rounded-lg',
      errorText: 'text-red-400',
    },
    minimal: {
      card: 'bg-white border-transparent rounded-xl',
      title: 'text-gray-800',
      input: 'bg-white border-slate-200 focus:ring-gray-800 focus:border-gray-800 text-gray-800 rounded-lg',
      button: 'bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-500 rounded-full',
      resultBg: 'bg-slate-50/70 border-slate-200 rounded-lg',
      errorText: 'text-rose-600',
    },
    colorblind: {
      card: 'bg-white border-slate-300 rounded-xl',
      title: 'text-gray-700',
      input: 'bg-slate-100 border-slate-300 focus:ring-blue-700 focus:border-blue-700 text-gray-800 rounded-lg',
      button: 'bg-blue-700 hover:bg-blue-800 text-white disabled:bg-blue-400 rounded-full',
      resultBg: 'bg-slate-50/70 border-slate-200 rounded-lg',
      errorText: 'text-orange-600',
    },
    colorful: {
      card: 'bg-white border-violet-200 shadow-violet-100 shadow-md rounded-2xl',
      title: 'text-gray-800',
      input: 'bg-violet-50 border-violet-200 focus:ring-pink-500 focus:border-pink-500 text-gray-800 rounded-2xl',
      button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-70 rounded-full',
      resultBg: 'bg-violet-50/50 border-violet-200 rounded-2xl',
      errorText: 'text-rose-600',
    },
    google: {
      card: 'bg-white border-[#DADCE0] shadow-sm rounded-xl',
      title: 'text-[#202124]',
      input: 'bg-[#F1F3F4] border-[#DADCE0] focus:ring-[#4285F4]/50 focus:border-[#4285F4] text-[#202124] rounded-lg',
      button: 'bg-[#4285F4] hover:bg-[#357ae8] text-white disabled:bg-[#a0c2f7] rounded-full',
      resultBg: 'bg-[#F8F9FA] border-[#DADCE0] rounded-lg',
      errorText: 'text-[#EA4335]',
    },
    pixel: {
      card: 'bg-slate-50 border-2 border-indigo-900 rounded-none shadow-[8px_8px_0px_#1e1b4b]',
      title: 'text-indigo-900',
      input: 'bg-white border-2 border-indigo-900 focus:ring-yellow-400 focus:border-yellow-400 text-indigo-900 rounded-none placeholder:text-indigo-900/40',
      button: 'bg-red-500 hover:bg-red-600 text-white border-2 border-b-4 border-indigo-900 active:translate-y-0.5 disabled:bg-red-400 disabled:opacity-70 rounded-none',
      resultBg: 'bg-white/70 border-2 border-indigo-900 rounded-none',
      errorText: 'text-rose-600',
    },
    cyberpunk: {
      card: 'bg-slate-900/50 border border-cyan-400/30 backdrop-blur-sm rounded-none',
      title: 'text-yellow-400 text-glow',
      input: 'bg-slate-800/50 border border-cyan-400/30 text-slate-200 focus:ring-yellow-400/50 focus:border-yellow-400 rounded-none placeholder:text-slate-500',
      button: 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:border-yellow-400/30 disabled:text-yellow-400/30 disabled:bg-transparent rounded-none',
      resultBg: 'bg-slate-800/50 border-cyan-400/20 rounded-none text-slate-300',
      errorText: 'text-pink-500',
    },
    pastel: {
      card: 'bg-white/70 border-rose-200/50 backdrop-blur-md shadow-lg shadow-rose-100/50 rounded-2xl',
      title: 'text-rose-400',
      input: 'bg-white/50 border-rose-200/50 focus:ring-rose-400 focus:border-rose-400 text-slate-600 rounded-xl placeholder:text-slate-400',
      button: 'bg-rose-400 hover:bg-rose-500 text-white disabled:bg-rose-300 rounded-full',
      resultBg: 'bg-white/50 border-rose-200/50 rounded-2xl',
      errorText: 'text-rose-500',
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`max-w-3xl mx-auto border p-6 transition-colors duration-300 ${currentTheme.card}`}>
      <label htmlFor="prompt-input" className="block text-lg font-bold mb-3 flex items-center gap-3">
        <SparklesIcon className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-400' : theme === 'minimal' ? 'text-gray-800' : theme === 'pixel' ? 'text-yellow-400' : theme === 'cyberpunk' ? 'text-yellow-400 text-glow' : theme === 'pastel' ? 'text-rose-400' : 'text-purple-600'}`}/>
        <span className={currentTheme.title}>{t('vibeCheckInputLabel')}</span>
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        placeholder={t('textAreaPlaceholder')}
        className={`w-full p-4 border transition-colors duration-200 ${currentTheme.input}`}
      />
      <button
        onClick={handleVibeCheck}
        disabled={isLoading || !prompt.trim()}
        className={`mt-4 w-full px-8 py-3 font-semibold text-white shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed ${currentTheme.button}`}
      >
        {isLoading ? t('vibeCheckButtonLoading') : t('vibeCheckButton')}
      </button>

      {error && (
        <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${currentTheme.errorText}`}>
            {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
            <h3 className={`text-xl font-bold mb-4 ${currentTheme.title}`}>{t('vibeCheckResultTitle')}</h3>
            <div className={`p-4 border prose prose-sm max-w-none ${currentTheme.resultBg} ${theme === 'dark' || theme === 'cyberpunk' ? 'prose-invert' : ''}`}>
                 <div dangerouslySetInnerHTML={{ __html: formatVibeResult(result) }} />
            </div>
        </div>
      )}
    </div>
  );
};
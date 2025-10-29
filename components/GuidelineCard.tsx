import React from 'react';
import { Theme, useTheme } from '../context/ThemeContext';
import { InfoIcon } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface GuidelineCardProps {
  title: string;
  description: string;
  badExample: string;
  goodExample: string;
  proTip: string;
}

export const GuidelineCard: React.FC<GuidelineCardProps> = ({ title, description, badExample, goodExample, proTip }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const themeClasses: Record<Theme, any> = {
    light: {
      card: 'bg-white border-slate-200/80 hover:border-purple-300 rounded-xl hover:-translate-y-1',
      title: 'text-gray-700 font-bold',
      description: 'text-gray-600',
      exampleContainerGood: 'bg-emerald-500/5',
      exampleContainerBad: 'bg-rose-500/5',
      exampleTextGood: 'text-emerald-700',
      exampleTextBad: 'text-rose-700',
      exampleIconGood: 'text-emerald-500',
      exampleIconBad: 'text-rose-500',
      tooltip: 'bg-slate-800 text-white rounded-lg',
      infoIcon: 'text-slate-400 hover:text-slate-700'
    },
    dark: {
      card: 'bg-slate-900 border-gray-800 hover:border-purple-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
      title: 'text-white font-bold',
      description: 'text-gray-400',
      exampleContainerGood: 'bg-green-500/5',
      exampleContainerBad: 'bg-red-500/5',
      exampleTextGood: 'text-green-400',
      exampleTextBad: 'text-red-400',
      exampleIconGood: 'text-green-500',
      exampleIconBad: 'text-red-500',
      tooltip: 'bg-gray-100 text-gray-900 rounded-lg',
      infoIcon: 'text-gray-500 hover:text-white'
    },
    minimal: {
      card: 'bg-white border-transparent rounded-2xl hover:shadow-slate-200/70 hover:shadow-lg hover:-translate-y-1',
      title: 'text-gray-800 font-semibold',
      description: 'text-gray-600',
      exampleContainerGood: 'bg-slate-50 rounded-lg',
      exampleContainerBad: 'bg-slate-50 rounded-lg',
      exampleTextGood: 'text-emerald-700',
      exampleTextBad: 'text-rose-700',
      exampleIconGood: 'text-emerald-500',
      exampleIconBad: 'text-rose-500',
      tooltip: 'bg-gray-800 text-white rounded-lg',
      infoIcon: 'text-slate-400 hover:text-gray-800'
    },
    colorblind: {
      card: 'bg-slate-50 border-slate-300 hover:border-blue-700 rounded-xl hover:-translate-y-1',
      title: 'text-gray-700 font-bold',
      description: 'text-gray-600',
      exampleContainerGood: 'border border-solid border-blue-700 rounded-md',
      exampleContainerBad: 'border border-dashed border-orange-600 rounded-md',
      exampleTextGood: 'text-blue-700 font-bold',
      exampleTextBad: 'text-orange-600 font-bold',
      exampleIconGood: 'text-blue-700',
      exampleIconBad: 'text-orange-600',
      tooltip: 'bg-gray-800 text-white rounded-lg',
      infoIcon: 'text-slate-500 hover:text-gray-900'
    },
    colorful: {
      card: 'bg-white border-violet-200 hover:border-pink-400 shadow-violet-100 shadow-md rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-pink-200/50',
      title: 'text-gray-800 font-bold',
      description: 'text-gray-600',
      exampleContainerGood: 'bg-emerald-500/5',
      exampleContainerBad: 'bg-rose-500/5',
      exampleTextGood: 'text-emerald-700',
      exampleTextBad: 'text-rose-700',
      exampleIconGood: 'text-emerald-500',
      exampleIconBad: 'text-rose-500',
      tooltip: 'bg-white border border-slate-200 text-slate-800 shadow-lg rounded-2xl',
      infoIcon: 'text-violet-300 hover:text-pink-500'
    },
    google: {
        card: 'bg-white border-[#DADCE0] hover:border-[#4285F4]/50 shadow-sm hover:shadow-md rounded-xl hover:-translate-y-1',
        title: 'text-[#202124] font-bold',
        description: 'text-[#5F6368]',
        exampleContainerGood: 'bg-[#E6F4EA]',
        exampleContainerBad: 'bg-[#FCE8E6]',
        exampleTextGood: 'text-[#1E8E3E]',
        exampleTextBad: 'text-[#C5221F]',
        exampleIconGood: 'text-[#34A853]',
        exampleIconBad: 'text-[#EA4335]',
        tooltip: 'bg-[#3c4043] text-white rounded-lg',
        infoIcon: 'text-gray-400 hover:text-gray-600'
    },
    pixel: {
      card: 'bg-slate-50 border-2 border-indigo-900 shadow-[5px_5px_0px_#1e1b4b] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_#1e1b4b] rounded-none',
      title: 'text-indigo-900 font-bold uppercase tracking-wide',
      description: 'text-indigo-900/80',
      exampleContainerGood: 'bg-emerald-100 border-2 border-indigo-900',
      exampleContainerBad: 'bg-rose-100 border-2 border-indigo-900',
      exampleTextGood: 'text-emerald-700',
      exampleTextBad: 'text-rose-700',
      exampleIconGood: 'text-emerald-500',
      exampleIconBad: 'text-rose-500',
      tooltip: 'bg-indigo-900 text-white border-2 border-slate-50 rounded-none',
      infoIcon: 'text-indigo-900/50 hover:text-yellow-400'
    },
    cyberpunk: {
      card: 'bg-slate-900/50 border border-cyan-400/30 backdrop-blur-sm hover:border-cyan-400/80 rounded-none hover:-translate-y-1',
      title: 'text-yellow-400 font-bold uppercase tracking-widest text-glow',
      description: 'text-slate-300',
      exampleContainerGood: 'bg-cyan-400/5 border border-cyan-400/20',
      exampleContainerBad: 'bg-pink-500/5 border border-pink-500/20',
      exampleTextGood: 'text-cyan-400',
      exampleTextBad: 'text-pink-500',
      exampleIconGood: 'text-cyan-400',
      exampleIconBad: 'text-pink-500',
      tooltip: 'bg-slate-900 border border-yellow-400/50 text-yellow-400 rounded-none',
      infoIcon: 'text-slate-400 hover:text-yellow-400'
    },
    pastel: {
      card: 'bg-white/70 border-pink-200/50 backdrop-blur-md shadow-lg shadow-pink-100/50 hover:shadow-rose-100 rounded-2xl hover:-translate-y-1',
      title: 'text-rose-400 font-semibold',
      description: 'text-slate-600',
      exampleContainerGood: 'bg-emerald-500/10 rounded-xl',
      exampleContainerBad: 'bg-rose-500/10 rounded-xl',
      exampleTextGood: 'text-emerald-600',
      exampleTextBad: 'text-rose-600',
      exampleIconGood: 'text-emerald-500',
      exampleIconBad: 'text-rose-500',
      tooltip: 'bg-white border border-rose-100 text-slate-700 shadow-lg rounded-xl',
      infoIcon: 'text-rose-200 hover:text-rose-400'
    },
  };

  const currentTheme = themeClasses[theme];
  const exampleRounding = (theme === 'pixel' || theme === 'cyberpunk') ? 'rounded-none' : currentTheme.exampleContainerGood.match(/rounded-\w+/)?.[0] || 'rounded-lg';


  return (
    <div className={`relative border p-6 flex flex-col transition-all duration-300 transform group ${currentTheme.card}`}>
      <div className="absolute top-4 right-4 tooltip-container">
        <span className={currentTheme.infoIcon}>
            <InfoIcon className="h-5 w-5" />
        </span>
        <div className={`tooltip bottom-full right-0 mb-2 w-64 p-3 text-sm z-10 ${currentTheme.tooltip}`}>
          {proTip}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className={`text-xl text-center ${currentTheme.title}`}>{title}</h3>
      </div>
      <p className={`mb-6 flex-grow ${currentTheme.description}`}>{description}</p>
      
      <div className="space-y-4 text-sm mt-auto">
        <div className={`p-3 ${exampleRounding} ${currentTheme.exampleContainerBad}`}>
          <p className={`font-semibold mb-1 flex items-center ${currentTheme.exampleTextBad}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 flex-shrink-0 ${currentTheme.exampleIconBad}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('lessEffective')}
          </p>
          <p className={`${currentTheme.description} italic`}>"{badExample}"</p>
        </div>
        <div className={`p-3 ${exampleRounding} ${currentTheme.exampleContainerGood}`}>
          <p className={`font-semibold mb-1 flex items-center ${currentTheme.exampleTextGood}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 flex-shrink-0 ${currentTheme.exampleIconGood}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('moreEffective')}
          </p>
          <p className={`${currentTheme.description} italic`}>"{goodExample}"</p>
        </div>
      </div>
    </div>
  );
};
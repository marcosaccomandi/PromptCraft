import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Theme, useTheme } from '../context/ThemeContext';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { theme } = useTheme();

    const languages = [
        { code: 'it', label: 'IT' },
        { code: 'en', label: 'EN' },
    ];
    
    const themeClasses: Record<Theme, any> = {
        light: {
            bg: 'bg-slate-100/80',
            button: 'text-slate-500 hover:bg-slate-200',
            activeButton: 'bg-white text-purple-600 shadow-sm'
        },
        dark: {
            bg: 'bg-gray-800/80',
            button: 'text-gray-400 hover:bg-gray-700',
            activeButton: 'bg-gray-900 text-purple-400'
        },
        minimal: {
            bg: 'bg-slate-100/80',
            button: 'text-slate-500 hover:bg-slate-200',
            activeButton: 'bg-white text-gray-800 shadow-sm'
        },
        colorblind: {
            bg: 'bg-slate-100/80',
            button: 'text-gray-600 hover:bg-slate-200',
            activeButton: 'bg-white text-blue-700 shadow-sm'
        },
        colorful: {
            bg: 'bg-white/60',
            button: 'text-violet-500 hover:bg-violet-100',
            activeButton: 'bg-white text-pink-600 shadow-md shadow-violet-100'
        },
        google: {
            bg: 'bg-[#F1F3F4]/80',
            button: 'text-[#5F6368] hover:bg-white/70',
            activeButton: 'bg-white text-[#4285F4] shadow-sm'
        },
        pixel: {
            bg: 'bg-slate-50/80 border-2 border-indigo-900',
            button: 'text-indigo-900/70 hover:bg-yellow-100',
            activeButton: 'bg-yellow-400 text-indigo-900'
        },
        cyberpunk: {
            bg: 'bg-slate-900/60 border border-cyan-400/30',
            button: 'text-slate-300/70 hover:bg-cyan-400/10 hover:text-cyan-400',
            activeButton: 'bg-cyan-400/10 text-cyan-400'
        },
        pastel: {
            bg: 'bg-white/60',
            button: 'text-rose-400 hover:bg-rose-100/50',
            activeButton: 'bg-white text-rose-500 shadow-md shadow-rose-100/70'
        },
    }

    const currentTheme = themeClasses[theme];
    const roundingClass = (theme === 'pixel' || theme === 'cyberpunk') ? 'rounded-sm' : 'rounded-full';

    return (
        <div className={`flex items-center space-x-1 p-1 ${roundingClass} ${currentTheme.bg}`}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'it' | 'en')}
                    className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${roundingClass} ${language === lang.code ? currentTheme.activeButton : currentTheme.button}`}
                    aria-pressed={language === lang.code}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
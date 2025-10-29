import React, { useState, useRef, useEffect } from 'react';
import { Theme, useTheme } from '../context/ThemeContext';
import { PaletteIcon } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { LightIcon, DarkIcon, ColorblindIcon, ColorfulIcon, GoogleIcon, MinimalIcon, PixelIcon, CyberpunkIcon, PastelIcon } from './ThemeIcons';


export const ThemeDropdown: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: { name: Theme; label: string; icon: React.ReactElement }[] = [
    { name: 'light', label: 'Light', icon: <LightIcon className="w-5 h-5" /> },
    { name: 'dark', label: 'Dark', icon: <DarkIcon className="w-5 h-5" /> },
    { name: 'minimal', label: t('themeMinimal'), icon: <MinimalIcon className="w-5 h-5" /> },
    { name: 'pastel', label: t('themePastel'), icon: <PastelIcon className="w-5 h-5" /> },
    { name: 'pixel', label: t('themePixel'), icon: <PixelIcon className="w-5 h-5" /> },
    { name: 'cyberpunk', label: t('themeCyberpunk'), icon: <CyberpunkIcon className="w-5 h-5" /> },
    { name: 'colorblind', label: 'Colorblind', icon: <ColorblindIcon className="w-5 h-5" /> },
    { name: 'colorful', label: 'Colorful', icon: <ColorfulIcon className="w-5 h-5" /> },
    { name: 'google', label: t('themeGoogle'), icon: <GoogleIcon className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themeClasses: Record<Theme, any> = {
    light: {
      dropdown: 'bg-white border-slate-200 rounded-xl',
      item: 'hover:bg-slate-100 text-gray-700',
      activeItem: 'bg-purple-50 text-purple-600',
      button: 'bg-white/60 hover:bg-white text-slate-600 border border-transparent hover:border-slate-200 rounded-full'
    },
    dark: {
      dropdown: 'bg-gray-800 border-gray-700 rounded-xl',
      item: 'hover:bg-gray-700 text-gray-300',
      activeItem: 'bg-purple-900/50 text-purple-400',
      button: 'bg-gray-900/60 hover:bg-gray-800 text-gray-300 border border-transparent hover:border-gray-700 rounded-full'
    },
    minimal: {
      dropdown: 'bg-white border-slate-200 rounded-xl',
      item: 'hover:bg-slate-100 text-gray-700',
      activeItem: 'bg-gray-800 text-white',
      button: 'bg-white/60 hover:bg-white text-slate-600 border border-transparent hover:border-slate-200 rounded-full'
    },
    colorblind: {
        dropdown: 'bg-white border-slate-300 rounded-xl',
        item: 'hover:bg-slate-100 text-gray-700',
        activeItem: 'bg-blue-50 text-blue-700',
        button: 'bg-white/60 hover:bg-white text-slate-600 border border-transparent hover:border-slate-200 rounded-full'
    },
    colorful: {
        dropdown: 'bg-white/80 border-violet-200 shadow-lg rounded-2xl',
        item: 'hover:bg-violet-50 text-gray-700',
        activeItem: 'bg-pink-100 text-pink-600',
        button: 'bg-white/60 hover:bg-white text-violet-600 border border-transparent hover:border-violet-200 rounded-full'
    },
    google: {
        dropdown: 'bg-white border-[#DADCE0] shadow-md rounded-xl',
        item: 'hover:bg-gray-100 text-[#3c4043]',
        activeItem: 'bg-blue-50 text-[#1967d2]',
        button: 'bg-white/60 hover:bg-white text-gray-600 border border-transparent hover:border-gray-200 rounded-full'
    },
    pixel: {
      dropdown: 'bg-slate-50 border-2 border-indigo-900 rounded-none',
      item: 'hover:bg-yellow-100 text-indigo-900',
      activeItem: 'bg-yellow-400 text-indigo-900',
      button: 'bg-slate-50/60 hover:bg-slate-50 text-indigo-900 border-2 border-indigo-900 rounded-none'
    },
    cyberpunk: {
      dropdown: 'bg-slate-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-none',
      item: 'hover:bg-cyan-400/10 text-slate-300',
      activeItem: 'bg-yellow-400/10 text-yellow-400',
      button: 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-cyan-400/30 hover:border-cyan-400/80 rounded-none'
    },
    pastel: {
        dropdown: 'bg-white/80 border-rose-200 shadow-lg rounded-2xl',
        item: 'hover:bg-rose-50 text-slate-700',
        activeItem: 'bg-rose-100 text-rose-500',
        button: 'bg-white/60 hover:bg-white text-rose-500 border border-transparent hover:border-rose-200 rounded-full'
    },
  };

  const currentTheme = themeClasses[theme];

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 backdrop-blur-sm button-glow ${currentTheme.button}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <PaletteIcon className="h-5 w-5" />
        <span>{t('selectTheme')}</span>
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 p-2 z-20 ${currentTheme.dropdown}`}>
          {themes.map((tItem) => (
            <button
              key={tItem.name}
              onClick={() => handleThemeSelect(tItem.name)}
              className={`w-full text-left px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-3 ${currentTheme.item} ${theme === tItem.name ? currentTheme.activeItem : ''} ${theme === 'pixel' || theme === 'cyberpunk' ? 'rounded-sm' : 'rounded-lg'}`}
            >
              <span className="flex-shrink-0">{tItem.icon}</span>
              <span>{tItem.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
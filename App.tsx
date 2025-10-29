import React, { useState } from 'react';
import { GuidelineCard } from './components/GuidelineCard';
import { PromptWizard } from './components/PromptWizard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeDropdown } from './components/ThemeDropdown';
import { useTranslation } from './hooks/useTranslation';
import { getLocalizedData } from './data';
import { useLanguage } from './context/LanguageContext';
import { PromptVibeCheck } from './components/PromptVibeCheck';
import { Theme, ThemeProvider, useTheme } from './context/ThemeContext';


// --- Main App Component ---
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { guidelines } = getLocalizedData(language);

  const [workbenchView, setWorkbenchView] = useState<'vibeCheck' | 'wizard'>('vibeCheck');
  
  const themeClasses: Record<Theme, string> = {
    light: 'bg-slate-50 font-inter',
    dark: 'bg-gray-900 font-inter',
    minimal: 'bg-slate-50 font-inter',
    colorblind: 'bg-slate-50 font-inter',
    colorful: 'bg-gradient-to-br from-violet-50 via-pink-50 to-purple-50 font-poppins',
    google: 'bg-white font-roboto',
    pixel: 'bg-sky-400 font-pixelify',
    cyberpunk: 'bg-black bg-gradient-to-br from-indigo-950 to-black font-roboto-mono scanlines',
    pastel: 'bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-sky-100/50 font-poppins',
  };

  const buttonThemeClasses: Record<Theme, string> = {
      light: 'bg-purple-600 hover:bg-purple-700 rounded-lg',
      dark: 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 rounded-lg',
      minimal: 'bg-gray-800 hover:bg-gray-700 rounded-lg',
      colorblind: 'bg-blue-500 hover:bg-blue-600 rounded-lg',
      colorful: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full',
      google: 'bg-[#4285F4] hover:bg-[#357ae8] rounded-lg',
      pixel: 'bg-red-500 text-white border-2 border-b-4 border-indigo-900 shadow-[4px_4px_0px_#1e1b4b] hover:bg-red-600 active:translate-y-1 active:shadow-[2px_2px_0px_#1e1b4b] rounded-none',
      cyberpunk: 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-none',
      pastel: 'bg-rose-400 hover:bg-rose-500 text-white rounded-full',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      <header className="fixed top-0 left-0 right-0 z-30 p-4 flex justify-between items-center backdrop-blur-sm bg-opacity-80">
        <LanguageSwitcher />
        <ThemeDropdown />
      </header>
      
      <main className="container mx-auto px-4 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Interactive Workbench */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:flex lg:flex-col">
            {workbenchView === 'vibeCheck' && (
              <>
                <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0 mb-12">
                  <h1 className={`text-4xl md:text-5xl font-bold uppercase tracking-wider ${theme === 'dark' || theme === 'cyberpunk' ? 'text-white' : theme === 'pastel' ? 'text-rose-400' : 'text-indigo-900'} ${theme === 'cyberpunk' ? 'text-glow text-yellow-400' : ''}`}>{t('mainTitle')}</h1>
                  <p className={`mt-4 text-lg ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pastel' ? 'text-slate-600' : 'text-indigo-900/80'}`}>{t('mainSubtitle')}</p>
                  <button 
                    onClick={() => setWorkbenchView('wizard')}
                    className={`mt-8 px-8 py-3 font-semibold text-white shadow-lg transition-transform transform hover:scale-105 ${buttonThemeClasses[theme]}`}
                  >
                    {t('openWizardButton')}
                  </button>
                </div>
                
                <div className="mt-8">
                    <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0 mb-6">
                        <h2 className={`text-2xl font-bold uppercase tracking-wide ${theme === 'dark' || theme === 'cyberpunk' ? 'text-white' : theme === 'pastel' ? 'text-rose-400' : 'text-indigo-900'} ${theme === 'cyberpunk' ? 'text-glow text-yellow-400' : ''}`}>{t('vibeCheckTitle')}</h2>
                        <p className={`mt-1 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pastel' ? 'text-slate-600' : 'text-indigo-900/80'}`}>{t('vibeCheckSubtitle')}</p>
                    </div>
                    <PromptVibeCheck />
                </div>
              </>
            )}

            {workbenchView === 'wizard' && (
              <div className="w-full h-full max-h-full overflow-y-auto">
                <PromptWizard onExit={() => setWorkbenchView('vibeCheck')} />
              </div>
            )}
          </div>

          {/* Right Column: Knowledge Base */}
          <div className="mt-16 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {guidelines.map((guideline, index) => (
                <GuidelineCard key={index} {...guideline} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={`text-center py-8 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-500' : theme === 'pastel' ? 'text-slate-500' : 'text-indigo-900/80'}`}>
        <p>
            {t('footerSlogan')}. {t('footerCredits')}: Marco Saccomandi -{' '}
            <a 
                href="https://www.linkedin.com/in/marco-saccomandi-5bbb3b2a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold hover:underline"
            >
                {t('linkedinProfile')}
            </a>
        </p>
      </footer>

    </div>
  );
}


const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
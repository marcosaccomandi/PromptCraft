import React, { useState } from 'react';
import { Theme, useTheme } from '../context/ThemeContext';
import { CloseIcon, InfoIcon } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { getLocalizedData } from '../data';

interface PromptWizardProps {
  onExit: () => void;
}

const initialUserData = {
    purpose: '',
    idea: '',
    features: '',
    style: '',
    inspiration: '',
    tech: '',
    logic: '',
    components: '',
    dataSchema: '',
    designSystem: '',
    specifics: '',
    atmosphere: '',
    functionality: '',
    examples: '',
    technology: '',
};

type Workflow = 'beginner' | 'general' | 'developer';

export const PromptWizard: React.FC<PromptWizardProps> = ({ onExit }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState(initialUserData);
  const [copied, setCopied] = useState(false);
  
  const localizedData = getLocalizedData(language);
  const { wizardSteps: stepsConfig, guidelines } = localizedData;
  const wizardSteps = workflow ? stepsConfig[workflow] : [];
  const finalTip = guidelines[5]; // "Itera e Raffina"

  const selectWorkflow = (selected: Workflow) => {
    setWorkflow(selected);
    setStep(0);
  };
  
  const handleBackToSelection = () => {
    setWorkflow(null);
    setUserData(initialUserData);
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, wizardSteps.length));
  const handleBack = () => {
      if (step === 0) {
          handleBackToSelection();
      } else {
        setStep(prev => Math.max(prev - 1, 0));
      }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const generatePrompt = () => {
    const personaAndRules = `
You are a world-class senior frontend engineer with deep expertise in UI/UX design and accessibility. Your task is to write the complete code for a web application based on the user's requirements. Interpret the requested "vibe" and style to create an application that is not only functional but also aesthetically flawless.

**Fundamental Rules:**
- **Single File Output:** Provide all the necessary code in a single \`index.tsx\` file.
- **No Placeholders:** The code must be complete and functional, without any \`// TODO\` comments or incomplete logic.
- **Code Quality:** Write clean, readable, well-commented code (explaining complex parts), and ensure it is performant.
- **Accessibility (a11y):** Use ARIA attributes and semantic HTML to ensure accessibility.
- **Modern Style:** Use modern JavaScript (ES6+) and React (Hooks) features.
- **Minimal Dependencies:** Do not include external libraries (e.g., \`lodash\`, \`moment\`) unless strictly necessary or requested.

--- APPLICATION REQUIREMENTS ---
`;

    if (workflow === 'beginner') {
      return `${personaAndRules}
**Main Concept:** The user wants to create an application for a **${userData.purpose || 'personal project'}**. The core idea is: "**${userData.idea || 'not specified'}**".

**Style and Atmosphere:** The desired aesthetic is **${userData.style || 'modern and clean'}**. For inspiration, the user mentions **${userData.inspiration || 'no specific inspiration'}**.

**Key Features:** The application must allow the user to perform the following actions:
${userData.features.trim().split('\n').map(f => `- ${f.trim()}`).join('\n') || '- (No specific features listed)'}

--- END OF REQUIREMENTS ---

Now, based on all the points above, write the complete code for the application.`;
    }

    if (workflow === 'developer') {
      return `${personaAndRules}
**Technology Stack:**
${userData.tech || 'Standard React with Tailwind CSS is assumed.'}

**Core React Components:**
${userData.components.trim().split('\n').map(c => `- ${c.trim()}`).join('\n') || '- (Not specified, to be inferred from logic)'}

**Business Logic:**
${userData.logic || 'No specific business logic provided.'}

**Main Data Schema:**
\`\`\`json
${userData.dataSchema || '{\n  "message": "No data schema provided."\n}'}
\`\`\`

**Design & Styling Guidelines:**
${userData.designSystem || 'A clean and modern design system should be applied.'}

--- END OF REQUIREMENTS ---

Now, based on all the points above, write the complete code for the application.`;
    }

    if (workflow === 'general') {
      return `${personaAndRules}
**Core Concept & Specifics:**
${userData.specifics || 'No specific concept provided.'}

**Style & Atmosphere:**
${userData.atmosphere || 'A modern and clean style is desired.'}

**Key Functionality:**
${userData.functionality.trim().split('\n').map(f => `- ${f.trim()}`).join('\n') || '- (No specific functionality listed)'}

**Inspirations & Examples:**
${userData.examples || 'No specific inspirations provided.'}

**Technology Preferences:**
${userData.technology || 'Standard React with Tailwind CSS is assumed.'}

--- END OF REQUIREMENTS ---

Now, based on all the points above, write the complete code for the application.`;
    }
    
    return "Error: No workflow selected or prompt could not be generated.";
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleReset = () => {
    setUserData(initialUserData);
    setWorkflow(null);
    setStep(0);
  }

  const themeClasses: Record<Theme, any> = {
    light: {
        bg: 'bg-white', text: 'text-gray-700 font-bold', border: 'border-slate-300', containerRounding: 'rounded-2xl',
        input: 'bg-slate-100 border-slate-300 focus:ring-purple-500 focus:border-purple-500 text-gray-700 rounded-lg',
        buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400 rounded-lg',
        buttonSecondary: 'bg-slate-200 hover:bg-slate-300 text-gray-700 rounded-lg',
        buttonOutline: 'border border-slate-300 text-gray-600 hover:bg-slate-100 rounded-full',
        card: 'hover:border-purple-400 hover:bg-slate-50 rounded-lg',
    },
    dark: {
        bg: 'bg-slate-900', text: 'text-gray-200 font-bold', border: 'border-gray-700', containerRounding: 'rounded-2xl',
        input: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500 rounded-lg',
        buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-800 disabled:text-gray-400 rounded-lg',
        buttonSecondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg',
        buttonOutline: 'border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full',
        card: 'hover:border-purple-500 hover:bg-gray-800 rounded-lg',
    },
    minimal: {
        bg: 'bg-white', text: 'text-gray-800 font-semibold', border: 'border-slate-200', containerRounding: 'rounded-2xl',
        input: 'bg-white border-slate-200 focus:ring-gray-800 focus:border-gray-800 text-gray-800 rounded-lg',
        buttonPrimary: 'bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-500 rounded-lg',
        buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg',
        buttonOutline: 'border border-slate-300 text-gray-600 hover:bg-slate-100 rounded-full',
        card: 'hover:border-gray-400 hover:bg-slate-50 rounded-lg',
    },
    colorblind: {
        bg: 'bg-white', text: 'text-gray-700 font-bold', border: 'border-slate-300', containerRounding: 'rounded-2xl',
        input: 'bg-slate-100 border-slate-300 focus:ring-blue-700 focus:border-blue-700 text-gray-700 rounded-lg',
        buttonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white disabled:bg-blue-400 rounded-lg',
        buttonSecondary: 'bg-slate-200 hover:bg-slate-300 text-gray-700 rounded-lg',
        buttonOutline: 'border border-slate-300 text-gray-700 hover:bg-slate-100 rounded-full',
        card: 'hover:border-blue-700 hover:bg-slate-50 rounded-lg',
    },
    colorful: {
        bg: 'bg-white', text: 'text-gray-700 font-bold', border: 'border-violet-200', containerRounding: 'rounded-2xl',
        input: 'bg-violet-50 border-violet-200 focus:ring-pink-500 focus:border-pink-500 text-gray-700 rounded-2xl',
        buttonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-70 rounded-full',
        buttonSecondary: 'bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-full',
        buttonOutline: 'border border-violet-200 text-violet-700 hover:bg-violet-50 rounded-full',
        card: 'hover:border-pink-400 hover:bg-violet-50 rounded-2xl hover:scale-105',
    },
    google: {
        bg: 'bg-white', text: 'text-[#202124] font-bold', border: 'border-[#DADCE0]', containerRounding: 'rounded-2xl',
        input: 'bg-[#F1F3F4] border-[#DADCE0] focus:ring-[#4285F4]/50 focus:border-[#4285F4] text-[#202124] rounded-lg',
        buttonPrimary: 'bg-[#4285F4] hover:bg-[#357ae8] text-white disabled:bg-[#a0c2f7] rounded-lg',
        buttonSecondary: 'bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3c4043] rounded-lg',
        buttonOutline: 'border border-[#DADCE0] text-[#3c4043] hover:bg-[#F8F9FA] rounded-full',
        card: 'hover:border-[#4285F4]/50 hover:bg-[#F8F9FA] rounded-lg',
    },
    pixel: {
        bg: 'bg-slate-50', text: 'text-indigo-900 font-bold uppercase tracking-wide', border: 'border-2 border-indigo-900', containerRounding: 'rounded-none',
        input: 'bg-white border-2 border-indigo-900 focus:ring-yellow-400 focus:border-yellow-400 text-indigo-900 rounded-none placeholder:text-indigo-900/40',
        buttonPrimary: 'bg-red-500 hover:bg-red-600 text-white border-2 border-b-4 border-indigo-900 active:translate-y-0.5 disabled:bg-red-400 disabled:opacity-70 rounded-none',
        buttonSecondary: 'bg-yellow-400 hover:bg-yellow-500 text-indigo-900 border-2 border-b-4 border-indigo-900 active:translate-y-0.5 disabled:bg-yellow-300 rounded-none',
        buttonOutline: 'border-2 border-indigo-900 text-indigo-900 bg-slate-50 hover:bg-white active:translate-y-0.5 rounded-none',
        card: 'hover:bg-yellow-100/50 rounded-none',
    },
    cyberpunk: {
        bg: 'bg-slate-900/50 backdrop-blur-sm', text: 'text-yellow-400 font-bold uppercase tracking-widest text-glow', border: 'border-cyan-400/30', containerRounding: 'rounded-none',
        input: 'bg-slate-800/50 border border-cyan-400/30 text-slate-200 focus:ring-yellow-400/50 focus:border-yellow-400 rounded-none placeholder:text-slate-500',
        buttonPrimary: 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:border-yellow-400/30 disabled:text-yellow-400/30 disabled:bg-transparent rounded-none',
        buttonSecondary: 'border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-none',
        buttonOutline: 'border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-black rounded-none',
        card: 'hover:border-yellow-400 hover:bg-slate-800/30 rounded-none',
    },
    pastel: {
        bg: 'bg-white/70 backdrop-blur-md', text: 'text-rose-400 font-semibold', border: 'border-pink-200/50', containerRounding: 'rounded-2xl',
        input: 'bg-white/50 border-rose-200/50 focus:ring-rose-400 focus:border-rose-400 text-slate-600 rounded-xl placeholder:text-slate-400',
        buttonPrimary: 'bg-rose-400 hover:bg-rose-500 text-white disabled:bg-rose-300 rounded-full',
        buttonSecondary: 'bg-rose-100 hover:bg-rose-200/70 text-rose-500 rounded-full',
        buttonOutline: 'border border-rose-200 text-rose-400 hover:bg-rose-50 rounded-full',
        card: 'hover:border-rose-300 hover:bg-rose-50/50 rounded-2xl',
    },
  };
  const currentTheme = themeClasses[theme];
  const currentStepData = workflow ? wizardSteps[step] : null;

  return (
    <div className={`relative p-8 border ${currentTheme.bg} ${currentTheme.border} ${currentTheme.containerRounding} ${theme === 'pixel' ? 'shadow-[8px_8px_0px_#1e1b4b]' : theme === 'pastel' ? 'shadow-lg shadow-pink-100/50' : ''}`}>
        <button
            onClick={onExit}
            className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 ${currentTheme.buttonOutline}`}
            aria-label={t('exitWizardAriaLabel')}
        >
            <CloseIcon className="h-5 w-5" />
            <span>{t('exitButton')}</span>
        </button>

      {!workflow ? (
        // Workflow Selection Screen
        <div>
            <h2 className={`text-2xl text-center ${currentTheme.text}`}>{t('wizardSelectionTitle')}</h2>
            <p className={`text-center mt-2 mb-8 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>{t('wizardSelectionSubtitle')}</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <button onClick={() => selectWorkflow('beginner')} className={`p-6 border text-left transition-all ${currentTheme.border} ${currentTheme.card}`}>
                    <h3 className={`text-lg mb-2 ${currentTheme.text}`}>{t('workflowBeginnerTitle')}</h3>
                    <p className={`${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'} text-sm mt-1`}>{t('workflowBeginnerDescription')}</p>
                </button>
                <button onClick={() => selectWorkflow('general')} className={`p-6 border text-left transition-all ${currentTheme.border} ${currentTheme.card}`}>
                    <h3 className={`text-lg mb-2 ${currentTheme.text}`}>{t('workflowIntermediateTitle')}</h3>
                    <p className={`${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'} text-sm mt-1`}>{t('workflowIntermediateDescription')}</p>
                </button>
                <button onClick={() => selectWorkflow('developer')} className={`p-6 border text-left transition-all ${currentTheme.border} ${currentTheme.card}`}>
                    <h3 className={`text-lg mb-2 ${currentTheme.text}`}>{t('workflowDeveloperTitle')}</h3>
                    <p className={`${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'} text-sm mt-1`}>{t('workflowDeveloperDescription')}</p>
                </button>
            </div>
        </div>
      ) : step < wizardSteps.length ? (
            // Form Steps
            <div>
                <div className="mb-6 pr-16">
                    <p className={`font-semibold ${theme === 'dark' ? 'text-purple-400' : theme === 'light' ? 'text-purple-600' : theme === 'colorblind' ? 'text-blue-700' : theme === 'colorful' ? 'text-purple-600' : theme === 'google' ? 'text-[#4285F4]' : theme === 'minimal' ? 'text-gray-800' : theme === 'pixel' ? 'text-yellow-500' : theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'pastel' ? 'text-cyan-400' : 'text-cyan-400'}`}>{t('step')} {step + 1} / {wizardSteps.length}</p>
                    <h2 className={`text-2xl mt-1 ${currentTheme.text}`}>{currentStepData?.question}</h2>
                    <p className={`text-sm mt-2 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>{currentStepData?.description}</p>
                </div>

                <textarea
                    name={currentStepData?.key}
                    value={userData[currentStepData?.key as keyof typeof userData]}
                    onChange={handleChange}
                    rows={workflow === 'general' ? 5 : 8}
                    placeholder={t('textAreaPlaceholder')}
                    className={`w-full p-4 border transition-colors duration-200 ${currentTheme.input}`}
                />
                
                {workflow === 'general' && currentStepData && 'badExample' in currentStepData && 'goodExample' in currentStepData && (
                   <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className={`p-3 border ${theme === 'cyberpunk' ? 'border-pink-500/20' : theme === 'pastel' ? 'border-rose-200/50' : currentTheme.border} bg-rose-500/10`}>
                            <p className="font-bold text-rose-500 mb-1">{t('lessEffectiveExample')}</p>
                            <p className={`italic ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>"{String(currentStepData.badExample)}"</p>
                        </div>
                        <div className={`p-3 border ${theme === 'cyberpunk' ? 'border-cyan-400/20' : theme === 'pastel' ? 'border-emerald-200/50' : currentTheme.border} bg-emerald-500/10`}>
                            <p className="font-bold text-emerald-500 mb-1">{t('moreEffectiveExample')}</p>
                            <p className={`italic ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>"{String(currentStepData.goodExample)}"</p>
                        </div>
                   </div>
                )}


                <div className="mt-8 flex justify-between items-center">
                    <button onClick={handleBack} className={`px-6 py-2 font-semibold transition-colors ${currentTheme.buttonSecondary}`}>
                        {t('backButton')}
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={!userData[currentStepData?.key as keyof typeof userData]?.trim()}
                        className={`px-6 py-2 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${currentTheme.buttonPrimary}`}
                    >
                        {step === wizardSteps.length - 1 ? t('generatePromptButton') : t('nextButton')}
                    </button>
                </div>
            </div>
        ) : (
            // Result View
            <div>
                <h2 className={`text-2xl ${currentTheme.text}`}>{t('resultTitle')}</h2>
                <p className={`mt-2 mb-6 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>{t('resultSubtitle')}</p>
                
                <textarea 
                  className={`w-full p-4 text-sm whitespace-pre-wrap break-words font-mono text-xs leading-relaxed ${currentTheme.input}`}
                  rows={15}
                  value={generatePrompt()}
                  readOnly
                />

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button onClick={handleCopy} className={`w-full sm:w-auto flex-grow px-6 py-3 font-semibold transition-colors ${currentTheme.buttonPrimary}`}>
                        {copied ? t('copiedButton') : t('copyButton')}
                    </button>
                    <button onClick={handleReset} className={`w-full sm:w-auto px-6 py-3 font-semibold transition-colors ${currentTheme.buttonSecondary}`}>
                        {t('restartButton')}
                    </button>
                    <button onClick={onExit} className={`w-full sm:w-auto px-6 py-3 font-semibold transition-colors ${currentTheme.buttonOutline}`}>
                        {t('backToHomeButton')}
                    </button>
                </div>

                <div className={`mt-8 p-4 border-l-4 ${theme === 'dark' || theme === 'cyberpunk' ? 'bg-slate-800/50 border-purple-400' : 'bg-slate-100/70 border-purple-500'} ${currentTheme.containerRounding === 'rounded-none' ? 'rounded-none' : 'rounded-r-lg'}`}>
                    <div className="flex items-start gap-3">
                        <InfoIcon className={`h-6 w-6 flex-shrink-0 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-purple-400' : 'text-purple-600'}`} />
                        <div>
                            <h3 className={`font-semibold ${theme === 'dark' || theme === 'cyberpunk' ? 'text-slate-200' : 'text-slate-800'}`}>{t('wizardProTipTitle')}</h3>
                            <p className={`text-sm mt-1 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>{t('wizardProTipContent')}</p>
                        </div>
                    </div>
                </div>
                
                <div className={`mt-10 pt-6 border-t ${currentTheme.border}`}>
                    <h3 className={`text-lg mb-4 font-semibold ${theme === 'cyberpunk' ? 'text-slate-200' : theme === 'pastel' ? 'text-rose-400' : ''}`}>{t('nextStepTitle')}: {finalTip.title}</h3>
                    <div className="flex items-start gap-4">
                        <div>
                            <p className={`${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-400' : theme === 'pixel' ? 'text-indigo-900/80' : theme === 'pastel' ? 'text-slate-600' : 'text-gray-500'}`}>{finalTip.description}</p>
                            <p className={`text-sm italic mt-2 ${theme === 'dark' || theme === 'cyberpunk' ? 'text-gray-500' : theme === 'pixel' ? 'text-indigo-900/70' : theme === 'pastel' ? 'text-slate-500' : 'text-gray-500'}`}>{finalTip.proTip}</p>
                        </div>
                    </div>
                </div>

            </div>
        )}
    </div>
  );
};
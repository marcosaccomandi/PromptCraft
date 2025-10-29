type Guideline = {
  title: string;
  description: string;
  badExample: string;
  goodExample: string;
  proTip: string;
};

type WizardStep = {
    key: string;
    question: string;
    description: string;
    goodExample?: string;
    badExample?: string;
};

type LocalizedData = {
    guidelines: Guideline[];
    wizardSteps: {
        beginner: WizardStep[];
        developer: WizardStep[];
        general: WizardStep[];
    }
};

const localizedData = {
  it: {
    guidelines: [
      {
        title: "Sii Specifico, Non Vago",
        description: "L'IA non può leggerti nel pensiero. Fornisci dettagli precisi su cosa vuoi, scomponendo la richiesta in parti più piccole e chiare.",
        badExample: "Crea un'app per il meteo.",
        goodExample: "Crea un'app meteo minimalista che mostri temperatura attuale, umidità e un'icona per le condizioni correnti.",
        proTip: "PRO TIP: Menziona anche lo stato iniziale. Es: 'Al caricamento, mostra il meteo per la città di default, Roma'."
      },
      {
        title: "Descrivi l'Atmosfera e lo Stile",
        description: "Usa aggettivi per guidare il design. Questo aiuta l'IA a scegliere colori, font e layout in linea con la tua visione.",
        badExample: "Falla sembrare bella.",
        goodExample: "Usa uno stile 'dark mode' con accenti neon ciano, un font pulito sans-serif e card con angoli arrotondati.",
        proTip: "PRO TIP: Evita termini soggettivi come 'bello'. Sii descrittivo: 'moderno', 'giocoso', 'corporate', 'futuristico'."
      },
      {
        title: "Imposta il Contesto con le System Instruction",
        description: "Le 'System Instruction' sono il modo più potente per definire la personalità e le regole che l'IA seguirà. Usale per impostare un tono, uno stile di codifica o dei vincoli specifici che deve rispettare in ogni risposta, senza doverli ripetere.",
        badExample: "Crea un pulsante per il mio sito.",
        goodExample: "System Instruction: 'Sei un web designer specializzato in design giocoso e colorato, che usa molte animazioni.' Poi chiedi: 'Crea un pulsante per il mio sito.'",
        proTip: "PRO TIP: Definisci una persona ('Sei un senior developer'), le regole ('Usa solo function components') e il formato di output ('Il codice deve essere in un singolo blocco') per la massima coerenza."
      },
      {
        title: "Definisci le Funzionalità Chiave",
        description: "Elenca le azioni principali che l'utente deve poter compiere per assicurarti che l'app sia funzionale e non solo estetica.",
        badExample: "Voglio un todo-list.",
        goodExample: "L'utente deve poter aggiungere task, segnarli come completati (barrandoli), e filtrarli per 'attivi' o 'completati'.",
        proTip: "PRO TIP: Usa un formato a lista puntata per le funzionalità. È più facile da analizzare per l'IA."
      },
      {
        title: "Cita Ispirazioni ed Esempi",
        description: "Menzionare siti o app esistenti fornisce un riferimento visivo potentissimo e riduce l'ambiguità della richiesta.",
        badExample: "Voglio una landing page per un prodotto.",
        goodExample: "Crea una landing page con una sezione 'hero' come quella di Stripe, e una griglia di feature ispirata a Linear.app.",
        proTip: "PRO TIP: Specifica quali elementi dell'esempio ti piacciono: 'Mi piace la palette colori di Stripe e la tipografia di Linear'."
      },
      {
        title: "Specifica la Tecnologia (se conta)",
        description: "L'IA ha le sue preferenze (React, Tailwind), ma se hai bisogno di qualcosa di specifico, menzionarlo assicura il risultato corretto.",
        badExample: "Aggiungi un grafico.",
        goodExample: "Visualizza i dati usando un grafico a barre dalla libreria 'Recharts', con tooltip personalizzati al passaggio del mouse.",
        proTip: "PRO TIP: Se non specifichi, l'IA userà le tecnologie standard. Chiedere è necessario solo per requisiti specifici."
      },
      {
        title: "Itera e Raffina",
        description: "Il primo output è un ottimo punto di partenza. Non esitare a chiedere modifiche puntuali per perfezionare il risultato finale.",
        badExample: "Non mi piace, rifai tutto.",
        goodExample: "Ottimo! Ora rendi i pulsanti più arrotondati, aumenta il contrasto del testo e cambia il colore primario in un blu più scuro.",
        proTip: "PRO TIP: Inizia la tua richiesta di modifica con 'Partendo dal codice attuale...' per assicurarti che l'IA non ricominci da zero."
      },
    ],
    wizardSteps: {
        beginner: [
            { key: 'purpose', question: "Qual è lo scopo principale della tua app?", description: "A cosa servirà? (Es: Lavoro, Gioco, Educativo, Hobby, Personale)" },
            { key: 'idea', question: 'Descrivi la tua idea in una frase.', description: 'Cerca di essere conciso. Es: "Un semplice tracker per le mie piante da appartamento."' },
            { key: 'features', question: 'Quali sono le 3 cose più importanti che un utente deve poter fare?', description: "Elencale separandole con \"a capo\". Es:\n- Aggiungere una nuova pianta\n- Segnare quando l'ho annaffiata\n- Ricevere un promemoria" },
            { key: 'style', question: "Scegli 2-3 aggettivi per descrivere l'aspetto.", description: 'Es: "Moderno e pulito", "Colorato e giocoso", "Serio e professionale".' },
            { key: 'inspiration', question: "C'è un'app o un sito che ti piace come stile?", description: "Non deve essere simile nella funzione, solo nell'aspetto. Es: \"Mi piace la semplicità dell'app Note di Apple.\"" },
        ],
        developer: [
            { key: 'tech', question: "Qual è lo stack tecnologico desiderato?", description: 'Linguaggio, framework, librerie UI, etc. (Es: React, Tailwind, Recharts)' },
            { key: 'logic', question: "Descrivi la logica di business o il flusso utente principale.", description: "Qual è il 'happy path' o il calcolo fondamentale?" },
            { key: 'components', question: "Quali sono i componenti React principali che immagini?", description: 'Elencali e, se possibile, le loro props principali. (Es: `TaskItem({task, onToggle})`)' },
            { key: 'dataSchema', question: "Come è strutturato il dato principale?", description: 'Descrivi l\'oggetto o lo schema. (Es: `{ id: string, text: string, completed: boolean }`)' },
            { key: 'designSystem', question: "Hai un sistema di design di riferimento o preferenze di stile?", description: 'Es: "Usa i principi del Material Design", "Colori primari: #XXXXXX", "Spaziatura basata su multipli di 4px".' },
        ],
        general: []
    }
  },
  en: {
    guidelines: [
      {
        title: "Be Specific, Not Vague",
        description: "The AI cannot read your mind. Provide precise details about what you want, breaking down the request into smaller, clearer parts.",
        badExample: "Create a weather app.",
        goodExample: "Create a minimalist weather app that shows the current temperature, humidity, and an icon for the current conditions.",
        proTip: "PRO TIP: Also mention the initial state. E.g., 'On load, show the weather for the default city, Rome'."
      },
      {
        title: "Describe the Vibe and Style",
        description: "Use adjectives to guide the design. This helps the AI choose colors, fonts, and layouts that align with your vision.",
        badExample: "Make it look nice.",
        goodExample: "Use a 'dark mode' style with cyan neon accents, a clean sans-serif font, and cards with rounded corners.",
        proTip: "PRO TIP: Avoid subjective terms like 'nice'. Be descriptive: 'modern', 'playful', 'corporate', 'futuristic'."
      },
      {
        title: "Set the Context with System Instructions",
        description: "'System Instructions' are the most powerful way to define the personality and rules the AI will follow. Use them to set a tone, a coding style, or specific constraints it must adhere to in every response, without having to repeat them.",
        badExample: "Create a button for my website.",
        goodExample: "System Instruction: 'You are a web designer specializing in playful, colorful designs with a lot of animations.' Then ask: 'Create a button for my website.'",
        proTip: "PRO TIP: Define a persona ('You are a senior developer'), the rules ('Use only function components'), and the output format ('The code must be in a single block') for maximum consistency."
      },
      {
        title: "Define Key Features",
        description: "List the main actions the user must be able to perform to ensure the app is functional and not just aesthetic.",
        badExample: "I want a to-do list.",
        goodExample: "The user must be able to add tasks, mark them as complete (striking them through), and filter them by 'active' or 'completed'.",
        proTip: "PRO TIP: Use a bulleted list for features. It's easier for the AI to parse."
      },
      {
        title: "Cite Inspirations and Examples",
        description: "Mentioning existing sites or apps provides a powerful visual reference and reduces the ambiguity of the request.",
        badExample: "I want a product landing page.",
        goodExample: "Create a landing page with a 'hero' section like Stripe's, and a feature grid inspired by Linear.app.",
        proTip: "PRO TIP: Specify what elements of the example you like: 'I like Stripe's color palette and Linear's typography'."
      },
      {
        title: "Specify Technology (if it matters)",
        description: "The AI has its preferences (React, Tailwind), but if you need something specific, mentioning it ensures the correct result.",
        badExample: "Add a chart.",
        goodExample: "Display the data using a bar chart from the 'Recharts' library, with custom tooltips on hover.",
        proTip: "PRO TIP: If you don't specify, the AI will use standard technologies. Asking is only necessary for specific requirements."
      },
      {
        title: "Iterate and Refine",
        description: "The first output is a great starting point. Don't hesitate to ask for specific changes to perfect the final result.",
        badExample: "I don't like it, redo everything.",
        goodExample: "Great! Now make the buttons more rounded, increase the text contrast, and change the primary color to a darker blue.",
        proTip: "PRO TIP: Start your modification request with 'Starting from the current code...' to ensure the AI doesn't start from scratch."
      },
    ],
    wizardSteps: {
        beginner: [
            { key: 'purpose', question: "What is the main purpose of your app?", description: "What will it be used for? (E.g., Work, Game, Educational, Hobby, Personal)" },
            { key: 'idea', question: 'Describe your idea in one sentence.', description: 'Try to be concise. E.g., "A simple tracker for my houseplants."' },
            { key: 'features', question: 'What are the 3 most important things a user must be able to do?', description: "List them, separated by a new line. E.g.,\n- Add a new plant\n- Mark when I watered it\n- Receive a reminder" },
            { key: 'style', question: "Choose 2-3 adjectives to describe the look.", description: 'E.g., "Modern and clean", "Colorful and playful", "Serious and professional".' },
            { key: 'inspiration', question: "Is there an app or website you like the style of?", description: "It doesn't have to be similar in function, just in appearance. E.g., \"I like the simplicity of Apple's Notes app.\"" },
        ],
        developer: [
            { key: 'tech', question: "What is the desired technology stack?", description: 'Language, framework, UI libraries, etc. (E.g., React, Tailwind, Recharts)' },
            { key: 'logic', question: "Describe the business logic or the main user flow.", description: "What is the 'happy path' or the fundamental calculation?" },
            { key: 'components', question: "What are the main React components you envision?", description: 'List them and, if possible, their main props. (E.g., `TaskItem({task, onToggle})`)' },
            { key: 'dataSchema', question: "How is the main data structured?", description: 'Describe the object or schema. (E.g., `{ id: string, text: string, completed: boolean }`)' },
            { key: 'designSystem', question: "Do you have a reference design system or style preferences?", description: 'E.g., "Use Material Design principles", "Primary colors: #XXXXXX", "Spacing based on multiples of 4px".' },
        ],
        general: []
    }
  }
};

// --- Helper function to get data for the current language ---

export const getLocalizedData = (language: 'it' | 'en'): LocalizedData => {
  const data = localizedData[language];
  const generalStepKeys = ['specifics', 'atmosphere', 'functionality', 'examples', 'technology'];
  
  data.wizardSteps.general = data.guidelines.slice(0, 5).map((g, i) => ({
    key: generalStepKeys[i],
    question: g.title,
    description: g.description,
    goodExample: g.goodExample,
    badExample: g.badExample,
  }));
  
  return data;
};
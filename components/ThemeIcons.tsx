import React from 'react';

export const LightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const DarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const ColorblindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.75L19 12.75" strokeDasharray="2 2" />
  </svg>
);

export const ColorfulIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
);

export const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" {...props}>
        <path fill="#4285F4" d="M24 9.5c3.21 0 6.02 1.14 8.23 3.2L38.3 6.63C34.33 3.16 29.52 1 24 1 14.86 1 7.21 6.13 3.91 13.56l6.23 4.81C11.52 13.62 17.27 9.5 24 9.5z"></path>
        <path fill="#34A853" d="M46.2 25.04c0-1.63-.15-3.2-.42-4.68H24v8.8h12.44c-.54 2.84-2.14 5.25-4.62 6.92l6.14 4.75C42.89 36.63 46.2 31.44 46.2 25.04z"></path>
        <path fill="#FBBC05" d="M10.14 28.37c-.52-1.56-.81-3.23-.81-4.94s.29-3.38.81-4.94l-6.23-4.81C2.32 16.7 1 20.24 1 24s1.32 7.3 3.91 10.84l6.23-4.81z"></path>
        <path fill="#EA4335" d="M24 47c5.52 0 10.33-1.84 13.77-4.96l-6.14-4.75c-1.89 1.27-4.28 2.01-7.63 2.01-6.73 0-12.48-4.12-14.09-9.72l-6.23 4.81C7.21 40.87 14.86 47 24 47z"></path>
    </svg>
);

export const MinimalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
    </svg>
);

export const PixelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M4 8h3v2H4V8zm3 2h2v2H7v-2zm-3 2h3v2H4v-2zm3-2h2v2H7v-2zm-1-2h2v2H6v-2zm12-2h3v2h-3V8zm-2 2h2v2h-2v-2zm3 2h3v2h-3v-2zm-2-2h2v2h-2v-2zm-1-2h2v2h-2V8zM9 9h6v6H9V9zm2 2v2h2v-2h-2zM2 6h20v12H2V6zm2 2v8h16V8H4z" />
    </svg>
);

export const CyberpunkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9V7a2 2 0 012-2h4a2 2 0 012 2v2m-6 6v2a2 2 0 002 2h4a2 2 0 002-2v-2m-2-4h.01M12 12h.01M16 12h.01M12 9h.01M12 15h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3.75l-2.25 2.25v12l2.25 2.25h14l2.25-2.25v-12l-2.25-2.25h-14z" />
    </svg>
);

export const PastelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.5-3.868 3.75 3.75 0 00-6.82-2.062 4.5 4.5 0 00-6.236 4.825z" />
    </svg>
);
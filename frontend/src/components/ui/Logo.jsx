import React from 'react';

export default function Logo({ size = 'md', stacked = false }) {
  // Base sizing logic
  const baseSize = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-6xl',
    xl: 'text-8xl lg:text-[10rem]', // For the massive hero section
  }[size];

  // For the 'lab' text, it needs to scale down relative to the main text
  const labSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-5xl',
    xl: 'text-7xl lg:text-[8rem]',
  }[size];

  const lineHeight = stacked ? 'leading-[0.8]' : 'leading-none';

  return (
    <div className={`flex ${stacked ? 'flex-col items-center text-center' : 'items-baseline gap-2'} ${lineHeight}`}>
      <div className={`font-display font-bold italic ${baseSize} tracking-tight`}>
        <span className="text-logo-brown">Tri</span>
        {!stacked && <span> </span>}
        <span className="text-logo-blue">Sangum</span>
      </div>
      <div className={`font-sans font-bold text-logo-orange ${labSize} ${stacked ? 'mt-2' : ''}`}>
        लैब
      </div>
    </div>
  );
}

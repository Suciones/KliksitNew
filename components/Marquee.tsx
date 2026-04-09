import React from 'react';

export const Marquee: React.FC = () => {
  const text = "STRATEGY • BRANDING • DEVELOPMENT • DESIGN • MARKETING • ";
  
  return (
    <div className="py-12 border-y border-zinc-800 bg-background overflow-hidden relative">
      <div className="whitespace-nowrap animate-marquee flex">
        <span className="text-8xl font-bold tracking-tighter text-transparent stroke-text opacity-30 mx-4">
          {text.repeat(4)}
        </span>
      </div>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

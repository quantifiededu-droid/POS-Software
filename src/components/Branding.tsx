import React from 'react';

export const ClemtrixLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center font-bold text-navy">C</div>
    <span className="font-bold text-xl tracking-tight text-white">Clemtrix <span className="font-light">Technologies</span></span>
  </div>
);

export const BusinessName = ({ name }: { name: string }) => (
  <h1 className="text-2xl font-bold text-navy font-serif tracking-normal">{name}</h1>
);

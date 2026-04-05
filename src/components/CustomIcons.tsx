import React from 'react';

export const HelicopterIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Main Rotor */}
    <path d="M2 3h20" />
    <path d="M12 3v3" />
    
    {/* Body */}
    <path d="M7 11a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-1z" />
    
    {/* Tail */}
    <path d="M19 9h4" />
    <path d="M23 7v4" />
    
    {/* Landing Skids */}
    <path d="M9 16v3" />
    <path d="M15 16v3" />
    <path d="M6 19h12" />
  </svg>
);

export const MedicalIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

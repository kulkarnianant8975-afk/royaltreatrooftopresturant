import React from 'react';
import { motion } from "motion/react";

interface HotelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function HotelLogo({ className = "", size = 'md', showText = true }: HotelLogoProps) {
  const iconSize = size === 'sm' ? 30 : size === 'md' ? 50 : 120;
  const textSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-6xl md:text-8xl';
  const subTextSize = size === 'sm' ? 'text-[7px]' : size === 'md' ? 'text-[9px]' : 'text-[16px]';

  return (
    <div className={`flex flex-col items-center w-full px-4 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-4"
      >
        {/* Classic Crest-like SVG */}
        <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" className="text-gold">
          <path 
            d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
          />
          <path 
            d="M30 40 Q50 20 70 40 Q50 60 30 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
          />
          <text 
            x="50" 
            y="65" 
            textAnchor="middle" 
            className="font-royal text-2xl fill-current"
          >
            M
          </text>
          <path 
            d="M25 70 Q50 85 75 70" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
          />
        </svg>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col items-center w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`font-royal ${textSize} text-charcoal leading-none tracking-tighter uppercase`}
          >
            Morya's
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center gap-2 w-full max-w-[280px] md:max-w-md mt-2"
          >
            <div className="h-[1px] flex-grow bg-gold/30" />
            <span className={`${subTextSize} tracking-[0.5em] text-gold font-black whitespace-nowrap uppercase`}>
              Royal Treat
            </span>
            <div className="h-[1px] flex-grow bg-gold/30" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

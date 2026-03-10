'use client';

import React from 'react';
import { Clapperboard, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]"></div>

      <div className="relative flex flex-col items-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative"
        >
          <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_50px_rgba(var(--color-primary),0.3)] border border-primary/20">
            <Clapperboard size={48} />
          </div>
          
          {/* Sparkles around logo */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-4 -right-4 text-primary"
          >
            <Sparkles size={24} className="fill-current" />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase tracking-[0.2em]">
            CineChat
          </h2>
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Đang chuẩn bị vũ trụ điện ảnh</span>
             <div className="flex gap-1">
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1 w-1 rounded-full bg-primary"
                ></motion.span>
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="h-1 w-1 rounded-full bg-primary"
                ></motion.span>
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="h-1 w-1 rounded-full bg-primary"
                ></motion.span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Line (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted/20">
         <motion.div 
           initial={{ width: "0%" }}
           animate={{ width: "100%" }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           className="h-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]"
         ></motion.div>
      </div>
    </div>
  );
}

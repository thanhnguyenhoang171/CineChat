'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Maximize2, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PiPContextType {
  miniMovie: any | null;
  setMiniMovie: (movie: any) => void;
  closeMiniPlayer: () => void;
}

const PiPContext = createContext<PiPContextType | undefined>(undefined);

export const PiPProvider = ({ children }: { children: React.ReactNode }) => {
  const [miniMovie, setMiniMovie] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const closeMiniPlayer = () => setMiniMovie(null);

  return (
    <PiPContext.Provider value={{ miniMovie, setMiniMovie, closeMiniPlayer }}>
      {children}
      <AnimatePresence>
        {miniMovie && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            drag
            dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }} // Giới hạn kéo trong màn hình
            className='fixed bottom-24 right-6 z-[400] w-72 sm:w-80 aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black group cursor-move'
          >
             <img src={miniMovie.image} className='w-full h-full object-cover opacity-60' alt='Mini Player' />
             
             {/* Controls Overlay */}
             <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3'>
                <div className='flex justify-between items-start'>
                   <span className='text-[10px] font-black text-white uppercase bg-primary px-1.5 py-0.5 rounded'>PiP Mode</span>
                   <button onClick={closeMiniPlayer} className='text-white/60 hover:text-white'><X size={18} /></button>
                </div>
                
                <div className='flex items-center justify-center gap-4'>
                   <button onClick={() => setIsPlaying(!isPlaying)} className='h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20'>
                      {isPlaying ? <Pause size={20} className='fill-current' /> : <Play size={20} className='fill-current ml-1' />}
                   </button>
                </div>

                <div className='flex justify-between items-end'>
                   <p className='text-[10px] font-bold text-white truncate max-w-[150px]'>{miniMovie.title}</p>
                   <button className='text-white/60 hover:text-white'><Maximize2 size={14} /></button>
                </div>
             </div>

             {/* Mini Progress Bar */}
             <div className='absolute bottom-0 left-0 w-full h-1 bg-white/10'>
                <div className='h-full bg-primary w-1/3 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]'></div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PiPContext.Provider>
  );
};

export const usePiP = () => {
  const context = useContext(PiPContext);
  if (!context) throw new Error('usePiP must be used within a PiPProvider');
  return context;
};

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AISearchBanner = () => {
  return (
    <div className='relative z-20 -mt-10 px-6 md:px-16'>
        <div className='max-w-5xl mx-auto p-3 rounded-[2.5rem] bg-card/90 backdrop-blur-3xl border border-border/50 shadow-2xl flex flex-col md:flex-row gap-3 hover:shadow-primary/10 transition-shadow duration-500'>
            <div className='flex-1 relative group'>
                <Sparkles className='absolute left-5 top-5 h-6 w-6 text-primary animate-pulse' />
                <Input 
                  placeholder='Hôm nay bạn muốn xem phim như thế nào? Chat với AI của CineChat...' 
                  className='h-16 rounded-[1.75rem] bg-muted/40 border-none px-14 text-base font-bold placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 transition-all'
                />
            </div>
            <Button size='lg' className='h-16 px-10 rounded-[1.75rem] font-black text-base shadow-xl active:scale-95 transition-all hover:shadow-primary/50'>
                Hỏi AI ngay
            </Button>
        </div>
    </div>
  );
};

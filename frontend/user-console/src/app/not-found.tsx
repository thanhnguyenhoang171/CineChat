'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Clapperboard, Home, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <Navbar />
      
      <main className='flex-1 flex items-center justify-center px-6 pt-20'>
        <div className='max-w-2xl w-full text-center space-y-12'>
           <div className='relative'>
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='text-[12rem] md:text-[15rem] font-black text-primary/10 select-none'
              >
                 404
              </motion.div>
              <div className='absolute inset-0 flex items-center justify-center pt-8'>
                 <div className='h-32 w-32 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 rotate-12'>
                    <Clapperboard size={64} />
                 </div>
              </div>
           </div>

           <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-black tracking-tighter'>Cắt! Cảnh này không có trong kịch bản.</h1>
              <p className='text-muted-foreground font-medium text-lg max-w-lg mx-auto'>
                 Có vẻ như bộ phim bạn đang tìm kiếm đã bị xóa khỏi lịch chiếu hoặc đường dẫn này chưa bao giờ tồn tại.
              </p>
           </div>

           <div className='flex flex-wrap justify-center gap-4'>
              <Button asChild size='lg' className='h-14 px-8 rounded-2xl font-black gap-2 shadow-xl shadow-primary/20'>
                 <Link href="/"><Home size={20} /> Về trang chủ</Link>
              </Button>
              <Button asChild variant='outline' size='lg' className='h-14 px-8 rounded-2xl font-black gap-2 border-2'>
                 <Link href="/browse"><Search size={20} /> Tìm phim khác</Link>
              </Button>
           </div>

           <div className='pt-12 flex items-center justify-center gap-2 text-primary/60 font-black italic text-sm'>
              <Sparkles size={16} /> Thử hỏi AI của CineChat để tìm lại phim bạn cần!
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

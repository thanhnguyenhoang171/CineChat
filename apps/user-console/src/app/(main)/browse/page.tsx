import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BrowseLayout } from '@/features/movies/components/BrowseLayout';
import { Sparkles, SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Khám phá phim | CineChat',
  description: 'Duyệt kho phim khổng lồ với sự hỗ trợ từ trí tuệ nhân tạo.',
};

export default function BrowsePage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main className='pt-28 pb-20 px-6 md:px-16 max-w-[1600px] mx-auto'>
        {/* Header Section (Static Content) */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
           <div>
              <div className='flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-3'>
                 <Sparkles size={14} />
                 Duyệt kho phim
              </div>
              <h1 className='text-4xl md:text-6xl font-black tracking-tighter'>
                Khám phá <span className='text-primary'>Vũ trụ Điện ảnh</span>
              </h1>
           </div>
           
           <div className='flex items-center gap-3'>
              <div className='relative w-full md:w-80 group'>
                 <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors' size={18} />
                 <Input 
                   placeholder='Tìm tên phim, diễn viên...' 
                   className='h-12 pl-12 rounded-xl bg-muted/30 border-border/50 focus-visible:ring-primary/20 transition-all'
                 />
              </div>
              <Button size='icon' variant='outline' className='h-12 w-12 rounded-xl shrink-0 border-border/50'>
                 <SlidersHorizontal size={20} />
              </Button>
           </div>
        </div>

        {/* Client side layout with Streaming Movie List */}
        <BrowseLayout />
      </main>

      <Footer />
    </div>
  );
}

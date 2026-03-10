'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronLeft, Play, Star, Filter, ArrowRight, Sparkles, Clock, Flame, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from './MovieCard';
import { cn } from '@/lib/utils';

const COLLECTION_METADATA: Record<string, any> = {
  'ai-goi-y-rieng-cho-ban': { title: 'AI Gợi ý riêng cho bạn', description: 'Phim được AI phân tích dựa trên gu của bạn.', icon: Sparkles, gradient: 'from-primary/20 via-primary/5 to-transparent', accent: 'text-primary' },
  'moi-phat-hanh': { title: 'Mới phát hành', description: 'Bom tấn điện ảnh mới nhất vừa đổ bộ.', icon: Clock, gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent', accent: 'text-emerald-500' },
  'pho-bien-nhat': { title: 'Phổ biến nhất', description: 'Những tác phẩm đang làm mưa làm gió.', icon: Flame, gradient: 'from-amber-500/20 via-amber-500/5 to-transparent', accent: 'text-amber-500' },
  'danh-gia-cao-nhat': { title: 'Đánh giá cao nhất', description: 'Những bộ phim đạt điểm số tối đa từ cộng đồng.', icon: Star, gradient: 'from-yellow-500/20 via-yellow-500/5 to-transparent', accent: 'text-yellow-500' },
  'ai-personalized': { title: 'Hành trình AI cá nhân', description: 'Những bộ phim khớp 99% với sở thích của bạn.', icon: Sparkles, gradient: 'from-purple-500/20 via-purple-500/5 to-transparent', accent: 'text-purple-500' },
};

export const CollectionLayout = ({ slug, movies }: { slug: string, movies: any[] }) => {
  const meta = COLLECTION_METADATA[slug] || { title: 'Bộ sưu tập', description: 'Khám phá phim hay.', icon: LayoutGrid, gradient: 'from-primary/10 to-transparent', accent: 'text-primary' };

  return (
    <main>
      <section className={cn('relative pt-40 pb-20 px-6 md:px-16 overflow-hidden', meta.gradient)}>
         <div className='max-w-7xl mx-auto relative z-10'>
            <Link href="/" className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm mb-8 group'><ChevronLeft size={18} className='group-hover:-translate-x-1 transition-transform' /> Quay lại trang chủ</Link>
            <div className='flex items-center gap-4 mb-6'>
               <div className={cn('h-12 w-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-xl', meta.accent)}><meta.icon size={24} /></div>
               <h4 className='font-black uppercase tracking-[0.3em] text-xs text-muted-foreground'>Bộ sưu tập đặc biệt</h4>
            </div>
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter mb-6'>{meta.title}</h1>
            <p className='text-lg md:text-xl text-muted-foreground font-medium max-w-2xl'>{meta.description}</p>
         </div>
      </section>

      <section className='px-6 md:px-16 py-12 max-w-7xl mx-auto'>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8'>
            {movies.map((movie, i) => (
              <motion.div key={movie.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                 <MovieCard movie={movie} variant='portrait' />
              </motion.div>
            ))}
         </div>
         <div className='mt-20 text-center'><Button variant='outline' size='lg' className='h-14 px-12 rounded-2xl font-black border-2 gap-3 group hover:bg-primary hover:text-white'>Xem thêm kết quả <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' /></Button></div>
      </section>
    </main>
  );
};

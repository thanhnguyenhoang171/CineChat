import React, { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSpotlight } from '@/features/home/components/HeroSpotlight';
import { AISearchBanner } from '@/features/home/components/AISearchBanner';
import { GenreGrid } from '@/features/home/components/GenreGrid';
import { AppShowcase } from '@/features/home/components/AppShowcase';
import { HomePricing } from '@/features/home/components/HomePricing';
import { Top10Row } from '@/features/home/components/Top10Row';
import { Testimonials } from '@/features/home/components/Testimonials';
import { ContinueWatchingRow } from '@/features/home/components/ContinueWatchingRow';

// Import Loader và Skeleton
import { MovieRowLoader, MovieRowSkeleton } from '@/features/movies/components/MovieRowLoader';
import { movieService } from '@/lib/services/movieService';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default async function Home() {
  // Những dữ liệu quan trọng nhất (Above the fold) vẫn tải trực tiếp
  const heroMovies = await movieService.getHeroMovies();

  return (
    <div className='relative min-h-screen w-full bg-background selection:bg-primary/30 text-foreground'>
      <Navbar />

      <main className='relative overflow-x-hidden'>
        <div className='relative'>
           <HeroSpotlight movies={heroMovies} />
           <div className='absolute -bottom-32 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] pointer-events-none'></div>
        </div>
        
        <AISearchBanner />

        <div className='py-12 space-y-24 pb-32'>
          <div className='space-y-16'>
             <ContinueWatchingRow />
             
             {/* Áp dụng Suspense cho hàng Mới phát hành */}
             <Suspense fallback={<MovieRowSkeleton />}>
                <MovieRowLoader category='Mới phát hành' categoryKey='most-viewed' />
             </Suspense>
          </div>
          
          <GenreGrid />

          {/* Áp dụng Suspense cho hàng Top 10 */}
          <div className='relative group'>
             <div className='absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none'></div>
             <Suspense fallback={<div className='py-20 text-center font-bold opacity-20'>Đang tải Top 10...</div>}>
                <Top10Loader />
             </Suspense>
          </div>

          {/* AI Banner - Tải tĩnh không cần Suspense */}
          <section className='px-6 md:px-16 relative'>
              <div className='absolute -top-20 -right-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none'></div>
              <div className='relative w-full h-[450px] md:h-[500px] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-900 group border border-border/50'>
                  <img src='https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop' className='h-full w-full object-cover opacity-50' alt='AI' />
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent'></div>
                  <div className='absolute inset-y-0 left-0 flex flex-col justify-center px-10 md:px-24 max-w-3xl space-y-8'>
                      <div className='inline-flex items-center gap-2 text-white font-black uppercase tracking-[0.3em] text-[10px] px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full w-fit border border-white/20 shadow-xl'><Sparkles size={14} className='text-amber-300' /> AI Personalized</div>
                      <h3 className='text-4xl md:text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[1] italic'>Phim dành riêng <br /> cho tâm hồn bạn.</h3>
                      <Button asChild size='lg' className='w-fit h-16 px-12 rounded-2xl font-black bg-white text-primary hover:bg-slate-100 shadow-2xl text-lg'><Link href="/collections/ai-personalized">Cá nhân hóa cùng AI</Link></Button>
                  </div>
              </div>
          </section>

          <div className='space-y-16'>
             {/* Áp dụng Suspense cho các hàng còn lại */}
             <Suspense fallback={<MovieRowSkeleton />}>
                <MovieRowLoader category='Phổ biến nhất' categoryKey='popular' />
             </Suspense>
             
             <Suspense fallback={<MovieRowSkeleton />}>
                <MovieRowLoader category='Đánh giá cao nhất' categoryKey='top-rated' />
             </Suspense>
          </div>

          <AppShowcase />
          <Testimonials />
          <HomePricing />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Loader riêng cho Top 10 vì nó dùng component Top10Row khác biệt
async function Top10Loader() {
  const trendingMovies = await movieService.getMoviesByCategory('trending');
  return <Top10Row movies={trendingMovies} />;
}

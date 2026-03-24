'use client';

import React, { useState, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Star, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles,
  Heart,
  Share2,
  ThumbsUp,
  Crown,
  ListVideo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

// Import refactored components
import { VideoPlayer } from '@/features/watch/components/VideoPlayer';
import { Toast } from '@/components/shared/Toast';
import { Modal } from '@/components/shared/Modal';
import { Movie } from '@/types';

const MOCK_MOVIE: Movie = {
  id: '102',
  title: 'Stranger Things',
  tagline: 'Thị trấn lộn ngược.',
  description: 'Một nhóm bạn trẻ đối mặt với những hiện tượng siêu nhiên tại thị trấn Hawkins.',
  image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop',
  rating: 8.7,
  matchScore: 95,
  year: 2016,
  duration: '45m',
  quality: '4K',
  type: 'free',
  genres: ['Kinh dị', 'Viễn tưởng'],
  director: 'The Duffer Brothers',
  isSeries: true,
  seasons: [
    {
      seasonNumber: 1,
      episodes: [
        { id: 'e1', title: 'Chapter One: The Vanishing of Will Byers', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400', duration: '48m', description: 'Will Byers mất tích một cách bí ẩn trên đường về nhà.' },
        { id: 'e2', title: 'Chapter Two: The Weirdo on Maple Street', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400', duration: '55m', description: 'Mike giấu Eleven trong tầng hầm và tìm cách giúp cô.' },
        { id: 'e3', title: 'Chapter Three: Holly, Jolly', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400', duration: '51m', description: 'Nancy tìm kiếm Barb và phát hiện ra điều kinh hoàng.' },
      ]
    }
  ],
  cast: [
    { name: 'Millie Bobby Brown', role: 'Eleven', image: 'https://i.pravatar.cc/150?u=11' },
    { name: 'Finn Wolfhard', role: 'Mike Wheeler', image: 'https://i.pravatar.cc/150?u=12' },
  ],
};

const SIMILAR_MOVIES = [
  { id: 2, title: 'Dune: Part Two', rating: 8.8, matchScore: 92, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', type: 'premium', year: 2024 },
  { id: 3, title: 'Inception', rating: 8.8, matchScore: 89, image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=800&auto=format&fit=crop', type: 'premium', year: 2010 },
];

export default function WatchPage({ params }: { params: Promise<{ movieId: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState<'info' | 'episodes' | 'comments'>('episodes');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setToast(!isWishlisted ? 'Đã thêm vào danh sách yêu thích!' : 'Đã xóa khỏi danh sách');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />

      <main>
        {/* Cinematic Backdrop Hero */}
        <section className='relative h-[70vh] md:h-[85vh] w-full overflow-hidden'>
           <div className='absolute inset-0'>
              <img src={MOCK_MOVIE.image} className='w-full h-full object-cover' alt={MOCK_MOVIE.title} />
              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent'></div>
              <div className='absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent'></div>
           </div>

           <div className='relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl'>
              <div className='flex items-center gap-3 mb-6'>
                 <div className='px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2'>
                    <Sparkles size={12} className='fill-current' /> {MOCK_MOVIE.matchScore}% Match
                 </div>
                 <div className='px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-widest'>
                    {MOCK_MOVIE.quality}
                 </div>
              </div>

              <h1 className='text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none'>{MOCK_MOVIE.title}</h1>
              <p className='text-xl md:text-2xl font-bold text-primary italic mb-8 opacity-90'>{MOCK_MOVIE.tagline}</p>

              <div className='flex items-center gap-6 mb-10 text-sm font-bold'>
                 <div className='flex items-center gap-1.5 text-yellow-500'><Star size={20} className='fill-current' /><span className='text-lg'>{MOCK_MOVIE.rating}</span></div>
                 <div className='flex items-center gap-2 text-muted-foreground'><Calendar size={18} />{MOCK_MOVIE.year}</div>
                 <div className='flex items-center gap-2 text-muted-foreground'><Clock size={18} />{MOCK_MOVIE.duration}</div>
              </div>

              <div className='flex flex-wrap items-center gap-4'>
                 <Button onClick={() => setIsPlaying(true)} size='lg' className='h-16 px-10 rounded-2xl text-xl font-black shadow-2xl shadow-primary/40 gap-3 group relative overflow-hidden'>
                    <div className='absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]'></div>
                    <Play size={24} className='fill-current ml-1' /> Xem tập 1
                 </Button>
                 <Button onClick={toggleWishlist} variant='outline' className={cn('h-16 w-16 rounded-2xl border-2 backdrop-blur-md bg-white/5 transition-all', isWishlisted ? 'border-primary text-primary' : 'hover:bg-white/10')}>
                    <Heart size={24} className={cn(isWishlisted && 'fill-current')} />
                 </Button>
                 <Button variant='outline' size='lg' className='h-16 w-16 rounded-2xl border-2 backdrop-blur-md bg-white/5 hover:bg-white/10'><Share2 size={24} /></Button>
              </div>
           </div>
        </section>

        {/* Content Tabs */}
        <section className='px-6 md:px-16 py-16 max-w-7xl mx-auto'>
           <div className='flex flex-col lg:flex-row gap-16'>
              <div className='flex-1 space-y-12'>
                 <div className='flex gap-8 border-b border-border/50'>
                    {[
                      { id: 'episodes', name: 'Danh sách tập', icon: ListVideo },
                      { id: 'info', name: 'Thông tin', icon: Info },
                      { id: 'comments', name: 'Bình luận', icon: MessageSquare }
                    ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          'pb-4 text-sm font-black uppercase tracking-widest relative flex items-center gap-2 transition-all',
                          activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                         <tab.icon size={16} />
                         {tab.name}
                         {activeTab === tab.id && <div className='absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full'></div>}
                      </button>
                    ))}
                 </div>

                 {activeTab === 'episodes' && MOCK_MOVIE.isSeries && (
                   <div className='space-y-8 animate-in fade-in duration-500'>
                      <div className='flex items-center justify-between'>
                         <h3 className='text-xl font-black'>Mùa {selectedSeason}</h3>
                         <select className='bg-muted/50 border border-border/50 rounded-xl px-4 py-2 font-bold text-sm outline-none'>
                            <option>Mùa 1</option>
                            <option>Mùa 2</option>
                         </select>
                      </div>
                      
                      <div className='grid grid-cols-1 gap-4'>
                         {MOCK_MOVIE.seasons?.[0].episodes.map((episode, i) => (
                           <div key={episode.id} className='group flex flex-col sm:flex-row gap-6 p-4 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-pointer'>
                              <div className='relative w-full sm:w-64 aspect-video rounded-2xl overflow-hidden shrink-0 bg-muted'>
                                 <img src={episode.thumbnail} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' alt={episode.title} />
                                 <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40'>
                                    <div className='h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white'><Play size={20} className='fill-current ml-1' /></div>
                                 </div>
                                 <div className='absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-black text-white'>{episode.duration}</div>
                              </div>
                              <div className='flex-1 space-y-2 py-1'>
                                 <div className='flex justify-between items-start'>
                                    <h4 className='font-black text-lg group-hover:text-primary transition-colors'>{i + 1}. {episode.title}</h4>
                                 </div>
                                 <p className='text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed'>{episode.description}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {activeTab === 'info' && (
                   <div className='space-y-10 animate-in fade-in duration-500'>
                      <div className='space-y-4'>
                         <h3 className='text-xl font-black'>Nội dung phim</h3>
                         <p className='text-lg text-muted-foreground leading-relaxed font-medium'>{MOCK_MOVIE.description}</p>
                      </div>
                      <div className='space-y-6'>
                         <h3 className='text-xl font-black'>Diễn viên chính</h3>
                         <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                            {MOCK_MOVIE.cast?.map((actor, i) => (
                              <div key={i} className='group cursor-pointer'>
                                 <div className='aspect-square rounded-2xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all'>
                                    <img src={actor.image} className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all' alt={actor.name} />
                                 </div>
                                 <p className='font-black text-sm'>{actor.name}</p>
                                 <p className='text-[10px] font-bold text-muted-foreground uppercase'>{actor.role}</p>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                 )}
              </div>

              <aside className='w-full lg:w-80 shrink-0 space-y-10'>
                 <div className='p-8 rounded-[2rem] bg-card border border-border/50 text-center space-y-6'>
                    <h3 className='font-black uppercase tracking-widest text-xs text-muted-foreground'>AI Match Score</h3>
                    <div className='relative h-32 w-32 mx-auto'>
                       <svg className='h-full w-full' viewBox='0 0 100 100'>
                          <circle className='text-muted/20 stroke-current' strokeWidth='8' fill='transparent' r='40' cx='50' cy='50' />
                          <circle className='text-emerald-500 stroke-current transition-all duration-1000' strokeWidth='8' strokeDasharray='251.2' strokeDashoffset={251.2 - (251.2 * (MOCK_MOVIE.matchScore || 0)) / 100} strokeLinecap='round' fill='transparent' r='40' cx='50' cy='50' transform='rotate(-90 50 50)' />
                       </svg>
                       <div className='absolute inset-0 flex items-center justify-center flex-col'>
                          <span className='text-3xl font-black'>{MOCK_MOVIE.matchScore}%</span>
                       </div>
                    </div>
                    <p className='text-xs font-bold text-muted-foreground'>Phim này khớp 95% với gu của bạn!</p>
                 </div>
                 
                 <div className='space-y-6'>
                    <h3 className='text-xl font-black'>Phim tương tự</h3>
                    {SIMILAR_MOVIES.map(m => (
                      <Link key={m.id} href={`/watch/${m.id}`} className='flex gap-4 group cursor-pointer'>
                         <div className='w-20 h-28 rounded-lg overflow-hidden shrink-0 shadow-lg'><img src={m.image} className='w-full h-full object-cover group-hover:scale-110 transition-all' alt={m.title} /></div>
                         <div className='flex flex-col justify-center'><h4 className='font-black text-sm group-hover:text-primary transition-colors'>{m.title}</h4><div className='flex items-center gap-2 mt-1'><span className='text-[10px] font-black text-emerald-500'>{m.matchScore}% Match</span></div></div>
                      </Link>
                    ))}
                 </div>
              </aside>
           </div>
        </section>
      </main>

      <AnimatePresence>
        {isPlaying && <VideoPlayer movie={MOCK_MOVIE} onClose={() => setIsPlaying(false)} />}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function Info({ size }: { size: number }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> }
function MessageSquare({ size }: { size: number }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }

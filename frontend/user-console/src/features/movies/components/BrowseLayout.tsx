'use client';

import React, { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Filter,
  Grid3X3,
  LayoutList,
  Sparkles,
  Ticket,
  Crown,
  Gift,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MovieListLoader, MovieGridSkeleton } from './MovieListLoader';
import { Pagination } from '@/components/shared/Pagination';

const GENRES = ['Tất cả', 'Hành động', 'Viễn tưởng', 'Kinh dị', 'Tình cảm', 'Hài hước', 'Hoạt hình', 'Tài liệu', 'Phiêu lưu'];
const YEARS = ['Tất cả', '2024', '2023', '2022', '2021', '2020', 'Trước 2020'];
const ACCESS_TYPES = [
  { id: 'all', name: 'Tất cả nội dung', icon: Play },
  { id: 'free', name: 'Phim Miễn phí', icon: Gift },
  { id: 'premium', name: 'Gói Premium', icon: Crown },
  { id: 'rental', name: 'Phim thuê (VOD)', icon: Ticket },
];

export const BrowseLayout = () => {
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [selectedAccess, setSelectedAccess] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='flex flex-col lg:flex-row gap-10'>
       {/* Filters Sidebar */}
       <aside className='w-full lg:w-72 shrink-0 space-y-10'>
          <div className='p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm'>
             <h3 className='font-black text-lg mb-8 flex items-center gap-2 text-foreground'>
                <Filter size={18} className='text-primary' /> Bộ lọc
             </h3>
             
             <div className='space-y-10'>
                <div className='space-y-4'>
                   <p className='text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1'>Hình thức xem</p>
                   <div className='grid grid-cols-1 gap-2'>
                      {ACCESS_TYPES.map(type => (
                        <button 
                          key={type.id}
                          onClick={() => setSelectedAccess(type.id)}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all border-2',
                            selectedAccess === type.id 
                              ? 'bg-primary/5 border-primary text-primary shadow-sm' 
                              : 'bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          )}
                        >
                           <type.icon size={16} className={cn(selectedAccess === type.id ? 'text-primary' : 'text-slate-400')} />
                           {type.name}
                           {selectedAccess === type.id && <div className='ml-auto h-1.5 w-1.5 rounded-full bg-primary'></div>}
                        </button>
                      ))}
                   </div>
                </div>

                <div className='space-y-4 pt-8 border-t border-border/50'>
                   <p className='text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1'>Thể loại phim</p>
                   <div className='flex flex-wrap gap-2'>
                      {GENRES.map(genre => (
                        <button 
                          key={genre}
                          onClick={() => setSelectedGenre(genre)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-xs font-bold transition-all border-2',
                            selectedGenre === genre 
                              ? 'bg-foreground text-background shadow-lg' 
                              : 'bg-muted/20 border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                          )}
                        >
                           {genre}
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <Button className='w-full mt-12 h-14 rounded-2xl font-black shadow-xl shadow-primary/20 text-base'>Áp dụng ngay</Button>
          </div>

          <div className='p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl relative overflow-hidden group cursor-pointer'>
             <div className='absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform'><Sparkles size={100} /></div>
             <div className='relative z-10'>
                <h4 className='font-black text-xl mb-2 italic'>AI Tìm phim</h4>
                <p className='text-sm font-medium opacity-90 mb-6 leading-relaxed'>Hãy để AI của chúng tôi chọn phim giúp bạn dựa trên tâm trạng hôm nay.</p>
                <Button variant='secondary' className='w-full h-11 rounded-xl font-black bg-white text-primary hover:bg-white/90'>Hỏi AI ngay</Button>
             </div>
          </div>
       </aside>

       {/* Results Area */}
       <div className='flex-1'>
          {/* Toolbar */}
          <div className='flex items-center justify-between mb-8 bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl'>
             <p className='text-sm font-bold text-muted-foreground'>Kết quả tìm thấy cho: <span className='text-foreground font-black'>{selectedGenre}</span></p>
             <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border/50'>
                   <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-all', viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground')}><Grid3X3 size={18} /></button>
                   <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-all', viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground')}><LayoutList size={18} /></button>
                </div>
             </div>
          </div>

          {/* Movie Grid with Suspense */}
          <Suspense key={`${selectedGenre}-${selectedAccess}-${viewMode}`} fallback={<MovieGridSkeleton viewMode={viewMode} />}>
             <MovieListLoader genre={selectedGenre} access={selectedAccess} viewMode={viewMode} />
          </Suspense>

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={12} 
            onPageChange={setCurrentPage} 
            className='mt-20'
          />
       </div>
    </div>
  );
};

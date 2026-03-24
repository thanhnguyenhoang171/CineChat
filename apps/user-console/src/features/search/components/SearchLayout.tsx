'use client';

import React, { useState } from 'react';
import { Search as SearchIcon, Sparkles, History, TrendingUp, X, ChevronRight, Play, Star, Bot, ArrowRight, Frown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const RECENT_SEARCHES = ['Oppenheimer', 'Dune Part Two', 'Christopher Nolan'];
const TRENDING_NOW = [
  { id: 1, title: 'Queen of Tears', category: 'K-Drama' },
  { id: 2, title: 'Exhuma', category: 'K-Movie' },
];

export const SearchLayout = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults([]); // Giả lập không tìm thấy kết quả để hiện Empty State chuyên nghiệp
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className='max-w-5xl mx-auto'>
        <div className='mb-16 text-center space-y-8'>
           <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-black tracking-tighter'>Tìm kiếm thông minh</h1>
              <p className='text-muted-foreground font-medium text-lg'>Sử dụng AI để tìm phim theo nội dung, cảm xúc.</p>
           </div>

           <form onSubmit={handleSearch} className='relative max-w-3xl mx-auto group'>
              <div className='absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10'><Sparkles className='animate-pulse' size={24} /></div>
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Thử nhập: "Phim nào có cái kết bất ngờ?"' className='h-20 pl-16 pr-24 rounded-[2.5rem] bg-card border-2 border-border/50 focus-visible:ring-primary/20 text-xl font-bold shadow-2xl transition-all' />
              <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2'>
                 {query && <button type="button" onClick={() => { setQuery(''); setResults([]); }} className='p-2 hover:bg-muted rounded-full'><X size={20} className='text-muted-foreground' /></button>}
                 <button type="submit" className='h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg active:scale-90 transition-transform'>
                    {isSearching ? <div className='h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div> : <SearchIcon size={20} />}
                 </button>
              </div>
           </form>
        </div>

        <AnimatePresence mode='wait'>
           {query && results.length === 0 && !isSearching ? (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className='py-20 text-center space-y-8'>
                <div className='h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50'>
                   <Frown size={48} className='text-muted-foreground' />
                </div>
                <div className='space-y-2'>
                   <h3 className='text-2xl font-black'>Không tìm thấy kết quả cho "{query}"</h3>
                   <p className='text-muted-foreground font-medium'>AI gợi ý bạn nên thử tìm theo cảm xúc hoặc bối cảnh phim.</p>
                </div>
                <div className='flex flex-wrap justify-center gap-3'>
                   {['Phim hack não', 'Hài hước nhẹ nhàng', 'Hành động kịch tính'].map(tag => (
                     <Button key={tag} variant='outline' onClick={() => { setQuery(tag); handleSearch(); }} className='rounded-xl font-bold border-2'>{tag}</Button>
                   ))}
                </div>
             </motion.div>
           ) : (
             <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                <div className='space-y-12'>
                   <section className='space-y-6'>
                      <h3 className='text-xl font-black flex items-center gap-3'><History size={20} className='text-primary' /> Tìm kiếm gần đây</h3>
                      <div className='flex flex-col gap-2'>
                         {RECENT_SEARCHES.map(s => (
                           <button key={s} onClick={() => { setQuery(s); handleSearch(); }} className='flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group'>
                              <span className='font-bold text-muted-foreground group-hover:text-foreground'>{s}</span><ArrowRight size={16} className='text-muted-foreground opacity-0 group-hover:opacity-100 transition-all' />
                           </button>
                         ))}
                      </div>
                   </section>
                </div>

                <div className='space-y-12'>
                   <section className='p-8 rounded-[3rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 relative overflow-hidden'>
                      <div className='absolute top-0 right-0 p-6 opacity-10 rotate-12'><Bot size={120} /></div>
                      <h3 className='text-2xl font-black mb-4 flex items-center gap-3'><Sparkles size={24} className='text-primary' /> Khám phá với AI</h3>
                      <p className='text-muted-foreground font-medium mb-8 leading-relaxed italic'>"Tôi muốn xem một bộ phim khoa học viễn tưởng cân não để xem cùng bạn bè."</p>
                      <Button className='w-full h-14 rounded-2xl font-black shadow-xl'>Trò chuyện với AI</Button>
                   </section>
                </div>
             </div>
           )}
        </AnimatePresence>
    </div>
  );
};

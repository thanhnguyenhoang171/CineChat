'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const MyListLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', filter);
    router.push(`/my-list?${params.toString()}`);
  };

  return (
    <div className='space-y-12'>
      {/* Header with Filter Buttons */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-8'>
         <div className='space-y-4'>
            <div className='flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs'>
               <Heart className='fill-current' size={14} />
               Khu vực cá nhân
            </div>
            <h1 className='text-4xl md:text-6xl font-black tracking-tighter'>Danh sách của tôi</h1>
            <p className='text-muted-foreground font-medium text-lg'>Những bộ phim bạn đã lưu để xem sau.</p>
         </div>
         
         <div className='flex items-center gap-3'>
            <div className='bg-card border border-border/50 rounded-2xl p-1 flex'>
               <Button onClick={() => handleFilterChange('all')} variant='ghost' size='sm' className={`rounded-xl font-bold px-6 ${activeFilter === 'all' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>Tất cả</Button>
               <Button onClick={() => handleFilterChange('watching')} variant='ghost' size='sm' className={`rounded-xl font-bold px-6 ${activeFilter === 'watching' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>Đang xem</Button>
               <Button onClick={() => handleFilterChange('finished')} variant='ghost' size='sm' className={`rounded-xl font-bold px-6 ${activeFilter === 'finished' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>Đã xong</Button>
            </div>
         </div>
      </div>

      {/* Dữ liệu phim sẽ được truyền từ Server qua children */}
      {children}
    </div>
  );
};

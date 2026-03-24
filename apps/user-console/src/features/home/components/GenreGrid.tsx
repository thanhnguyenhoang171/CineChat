'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const GENRES = [
  { id: 1, name: 'Hành động', slug: 'hanh-dong', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', icon: '💥' },
  { id: 2, name: 'Viễn tưởng', slug: 'vien-tuong', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b4bf?q=80&w=800&auto=format&fit=crop', icon: '👽' },
  { id: 3, name: 'Kinh dị', slug: 'kinh-di', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop', icon: '👻' },
  { id: 4, name: 'Hoạt hình', slug: 'hoat-hinh', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', icon: '🦄' },
  { id: 5, name: 'Tình cảm', slug: 'tinh-cam', image: 'https://images.unsplash.com/photo-1518101645466-779588035f07?q=80&w=800&auto=format&fit=crop', icon: '❤️' },
  { id: 6, name: 'Tài liệu', slug: 'tai-lieu', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop', icon: '🌍' },
];

export const GenreGrid = () => {
  return (
    <section className='py-20 px-6 md:px-16 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
         <div className='space-y-2'>
            <h2 className='text-3xl md:text-5xl font-black tracking-tighter'>Duyệt theo thể loại</h2>
            <p className='text-muted-foreground font-medium'>Tìm kiếm cảm hứng từ những chủ đề bạn yêu thích.</p>
         </div>
         <Link href='/browse' className='text-primary font-black uppercase tracking-widest text-sm hover:underline'>Xem tất cả</Link>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
         {GENRES.map((genre, i) => (
           <motion.div
             key={genre.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
           >
              <Link href={`/collections/${genre.slug}`} className='group relative aspect-[4/5] rounded-[2rem] overflow-hidden flex items-end p-6 border border-border/50 shadow-sm'>
                 <img src={genre.image} className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2' alt={genre.name} />
                 <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all'></div>
                 
                 <div className='relative z-10 space-y-1'>
                    <span className='text-2xl block mb-2 transform group-hover:scale-125 transition-transform'>{genre.icon}</span>
                    <h4 className='text-white font-black text-lg tracking-tight'>{genre.name}</h4>
                    <div className='h-1 w-0 bg-primary group-hover:w-full transition-all duration-500'></div>
                 </div>
              </Link>
           </motion.div>
         ))}
      </div>
    </section>
  );
};

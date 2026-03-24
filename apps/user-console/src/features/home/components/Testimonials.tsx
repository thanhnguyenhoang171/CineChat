'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Thảo Linh',
    role: 'Người yêu phim',
    avatar: 'https://i.pravatar.cc/150?u=12',
    content: 'CineChat đã thay đổi hoàn toàn cách tôi tận hưởng điện ảnh. AI thực sự hiểu những gì tôi thích!',
    rating: 5,
    tag: 'Cá nhân hóa đỉnh cao'
  },
  {
    id: 2,
    name: 'Minh Quân',
    role: 'Nhà phê bình tự do',
    avatar: 'https://i.pravatar.cc/150?u=24',
    content: 'Tính năng Watch Party hoạt động cực mượt. Vừa xem phim 4K vừa chat với bạn bè rất thú vị.',
    rating: 5,
    tag: 'Trải nghiệm tuyệt vời'
  },
  {
    id: 3,
    name: 'Elena Đặng',
    role: 'Học sinh',
    avatar: 'https://i.pravatar.cc/150?u=36',
    content: 'Gói Discovery giá rẻ mà xem được quá nhiều phim hay. AI tư vấn nhiệt tình như người thật.',
    rating: 4,
    tag: 'Giá cả hợp lý'
  },
  {
    id: 4,
    name: 'Hoàng Long',
    role: 'Kỹ sư phần mềm',
    avatar: 'https://i.pravatar.cc/150?u=48',
    content: 'Thiết kế giao diện hiện đại, tốc độ tải trang cực nhanh. AI giải thích plot twist rất thông minh.',
    rating: 5,
    tag: 'Công nghệ đột phá'
  },
];

export const Testimonials = () => {
  return (
    <section className='py-24 overflow-hidden relative'>
      {/* Background Decorative Element */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 -skew-y-3 -z-10'></div>

      <div className='max-w-7xl mx-auto px-6 md:px-16 mb-16 text-center space-y-4'>
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest'
         >
            <Heart size={12} className='fill-current' /> Cộng đồng CineChat
         </motion.div>
         <h2 className='text-3xl md:text-5xl font-black tracking-tighter'>Khách hàng nói gì về chúng tôi?</h2>
         <p className='text-muted-foreground font-medium max-w-2xl mx-auto'>
            Hơn 500,000 người dùng đã chọn CineChat làm người bạn đồng hành trong mỗi giờ phút giải trí.
         </p>
      </div>

      {/* Testimonials Grid/Scroll */}
      <div className='flex gap-6 animate-marquee hover:pause-marquee px-6'>
         <div className='flex gap-6 shrink-0'>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className='w-[350px] p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-xl space-y-6 group'
              >
                 <div className='flex justify-between items-start'>
                    <div className='flex gap-1 text-amber-400'>
                       {[...Array(t.rating)].map((_, idx) => (
                         <Star key={idx} size={14} className='fill-current' />
                       ))}
                    </div>
                    <Quote size={32} className='text-primary/10 group-hover:text-primary/20 transition-colors' />
                 </div>

                 <p className='text-foreground font-medium leading-relaxed italic'>
                    "{t.content}"
                 </p>

                 <div className='flex items-center gap-4 pt-4 border-t border-border/30'>
                    <div className='h-12 w-12 rounded-full border-2 border-primary/20 p-0.5'>
                       <img src={t.avatar} className='h-full w-full rounded-full object-cover' alt={t.name} />
                    </div>
                    <div>
                       <h4 className='font-black text-sm text-foreground'>{t.name}</h4>
                       <p className='text-[10px] font-bold text-muted-foreground uppercase'>{t.role}</p>
                    </div>
                    <div className='ml-auto px-2 py-1 rounded-md bg-muted text-[9px] font-black uppercase tracking-tighter'>
                       {t.tag}
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

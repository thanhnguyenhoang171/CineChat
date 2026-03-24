'use client';

import React from 'react';
import { Check, Crown, Zap, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'motion/react';

const PLANS = [
  { id: 'discovery', name: 'Khám Phá', price: '49K', tier: 'Cơ bản', icon: Play, features: ['HD 720p', 'Toàn bộ thư viện', 'AI gợi ý cơ bản'] },
  { id: 'fanatic', name: 'Tín Đồ', price: '99K', tier: 'Tiêu chuẩn', icon: Zap, popular: true, features: ['4K HDR', 'Nội dung độc quyền', 'AI cá nhân hóa chuyên sâu', 'Không quảng cáo'] },
  { id: 'cinema', name: 'Điện Ảnh', price: '199K', tier: 'Cao cấp', icon: Crown, features: ['4K & Spatial Audio', 'Tải ngoại tuyến', 'AI Trợ lý (LLM)', 'Không quảng cáo'] },
];

export const HomePricing = () => {
  return (
    <section className='py-24 px-6 md:px-16 max-w-7xl mx-auto'>
      <div className='text-center space-y-4 mb-16'>
         <h2 className='text-3xl md:text-5xl font-black tracking-tighter'>Gói cước dành cho bạn</h2>
         <p className='text-muted-foreground font-medium max-w-xl mx-auto'>Chọn trải nghiệm phù hợp nhất với phong cách xem phim của bạn.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
         {PLANS.map((plan, i) => (
           <motion.div
             key={plan.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className={cn(
               'p-8 rounded-[3rem] bg-card border-2 flex flex-col transition-all hover:-translate-y-2',
               plan.popular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-border/50 shadow-sm'
             )}
           >
              <div className='mb-8'>
                 <div className={cn('h-12 w-12 rounded-2xl flex items-center justify-center mb-6', plan.popular ? 'bg-primary text-white' : 'bg-muted')}>
                    <plan.icon size={24} />
                 </div>
                 <h3 className='text-xl font-black'>{plan.name}</h3>
                 <p className='text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4'>{plan.tier}</p>
                 <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-black'>{plan.price}</span>
                    <span className='text-muted-foreground text-sm font-medium'>/tháng</span>
                 </div>
              </div>

              <div className='space-y-4 flex-1 mb-10'>
                 {plan.features.map((f, idx) => (
                   <div key={idx} className='flex items-start gap-3'>
                      <Check size={16} className='text-primary shrink-0 mt-0.5' />
                      <span className='text-sm font-medium text-slate-600'>{f}</span>
                   </div>
                 ))}
              </div>

              <Button asChild variant={plan.popular ? 'default' : 'outline'} className='w-full h-12 rounded-xl font-black'>
                 <Link href={`/checkout/${plan.id}`}>Bắt đầu ngay</Link>
              </Button>
           </motion.div>
         ))}
      </div>
    </section>
  );
};

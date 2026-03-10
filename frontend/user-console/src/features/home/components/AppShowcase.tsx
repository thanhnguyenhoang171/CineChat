'use client';

import React from 'react';
import { Monitor, Smartphone, Laptop, Tablet, Tv, ShieldCheck, Zap, Download } from 'lucide-react';
import { motion } from 'motion/react';

export const AppShowcase = () => {
  const devices = [
    { icon: Tv, name: 'Smart TV', desc: 'Apple TV, Android TV, Samsung, LG.' },
    { icon: Laptop, name: 'Máy tính', desc: 'Trải nghiệm trực tiếp trên trình duyệt.' },
    { icon: Tablet, name: 'Máy tính bảng', desc: 'iPad và các dòng máy tính bảng Android.' },
    { icon: Smartphone, name: 'Điện thoại', desc: 'Ứng dụng mượt mà trên iOS và Android.' },
  ];

  return (
    <section className='py-24 px-6 md:px-16 bg-slate-950 text-white overflow-hidden'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20'>
         <div className='flex-1 space-y-10'>
            <div className='space-y-4'>
               <h2 className='text-4xl md:text-6xl font-black tracking-tighter leading-tight'>
                  Xem phim mọi lúc, <br /> <span className='text-primary italic'>Mọi nơi bạn muốn.</span>
               </h2>
               <p className='text-slate-400 font-medium text-lg leading-relaxed max-w-xl'>
                  Đồng bộ hóa trải nghiệm của bạn trên tất cả các thiết bị. Bắt đầu xem trên TV và tiếp tục trên điện thoại khi đang di chuyển.
               </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
               {devices.map((device, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className='flex gap-4 group'
                 >
                    <div className='h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all'>
                       <device.icon size={24} />
                    </div>
                    <div>
                       <h4 className='font-black text-lg'>{device.name}</h4>
                       <p className='text-slate-500 text-sm font-medium'>{device.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         <div className='flex-1 relative'>
            <div className='relative z-10 p-4 bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden'>
               <img 
                 src='https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop' 
                 className='rounded-[2.5rem] w-full h-auto opacity-80' 
                 alt='Device interface' 
               />
               <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='h-20 w-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30'>
                     <Zap size={32} className='text-primary fill-primary' />
                  </div>
               </div>
            </div>
            
            {/* Decorative blurs */}
            <div className='absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]'></div>
            <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]'></div>
         </div>
      </div>
    </section>
  );
};

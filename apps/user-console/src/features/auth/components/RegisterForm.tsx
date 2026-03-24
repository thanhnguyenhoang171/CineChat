'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clapperboard, Sparkles, CheckCircle2, ArrowRight, Zap, Globe, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const genres = ['Hành động', 'Viễn tưởng', 'Kinh dị', 'Tình cảm', 'Hài hước', 'Hoạt hình', 'Tài liệu', 'Phiêu lưu', 'Tâm lý', 'Nhạc kịch'];

  return (
    <div className='h-screen w-full flex bg-background font-sans overflow-hidden'>
      {/* Left Side: Features Showcase */}
      <div className='hidden lg:flex flex-1 relative bg-slate-950 overflow-hidden'>
         <div className='absolute inset-0'>
            <img src='https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop' className='w-full h-full object-cover opacity-20' alt='Join' />
            <div className='absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/60 to-primary/20'></div>
         </div>
         <div className='relative z-10 p-16 flex flex-col justify-between h-full'>
            <Link href='/' className='flex items-center gap-2 group w-fit'>
               <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary'><Clapperboard className='h-7 w-7 text-primary-foreground' /></div>
               <span className='text-3xl font-black tracking-tighter text-white'>CineChat</span>
            </Link>
            <div className='space-y-12'>
               <h2 className='text-5xl font-black text-white leading-[1.1] tracking-tighter max-w-md'>Gia nhập cộng đồng <br /><span className='text-primary italic'>Yêu Điện Ảnh.</span></h2>
               <div className='space-y-8'>
                  {[
                    { icon: Sparkles, title: 'AI Cá nhân hóa', desc: 'Nhận gợi ý phim chuẩn xác dựa trên tâm trạng.' },
                    { icon: Zap, title: 'Trải nghiệm tốc độ', desc: 'Xem phim 4K mượt mà, không quảng cáo.' },
                    { icon: Globe, title: 'Kết nối toàn cầu', desc: 'Tham gia Watch Party cùng bạn bè.' },
                  ].map((item, i) => (
                    <div key={i} className='flex gap-5 group'>
                       <div className='h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all'><item.icon size={24} /></div>
                       <div className='space-y-1'><h4 className='text-lg font-black text-white'>{item.title}</h4><p className='text-slate-400 text-sm font-medium'>{item.desc}</p></div>
                    </div>
                  ))}
               </div>
            </div>
            <p className='text-xs font-bold text-slate-300'>+500K người đang tham gia</p>
         </div>
      </div>

      <div className='w-full lg:w-[600px] flex flex-col p-8 sm:p-16 lg:p-24 relative overflow-y-auto bg-card text-card-foreground border-l border-border/50'>
         <div className='lg:hidden mb-12'>
            <Link href='/' className='flex items-center gap-2'><div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary'><Clapperboard className='h-6 w-6 text-primary-foreground' /></div><span className='text-2xl font-black tracking-tighter'>CineChat</span></Link>
         </div>
         <div className='flex-1 flex flex-col justify-center max-w-md mx-auto w-full'>
            <AnimatePresence mode='wait'>
               {step === 1 ? (
                 <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className='space-y-10'>
                    <div className='space-y-3'><h1 className='text-4xl font-black tracking-tighter'>Đăng ký</h1><p className='text-muted-foreground font-medium'>Bắt đầu hành trình của bạn ngay hôm nay.</p></div>
                    <div className='space-y-5'>
                       <div className='space-y-2'><Label className='text-[11px] font-black uppercase text-muted-foreground ml-1'>Họ và tên</Label><Input placeholder='Nguyễn Văn A' className='h-14 bg-muted/50 border-border/50 rounded-2xl focus-visible:ring-primary/50 text-base px-5' /></div>
                       <div className='space-y-2'><Label className='text-[11px] font-black uppercase text-muted-foreground ml-1'>Email</Label><Input type='email' placeholder='name@example.com' className='h-14 bg-muted/50 border-border/50 rounded-2xl focus-visible:ring-primary/50 text-base px-5' /></div>
                       <div className='space-y-2'><Label className='text-[11px] font-black uppercase text-muted-foreground ml-1'>Mật khẩu</Label><Input type='password' placeholder='Tối thiểu 8 ký tự' className='h-14 bg-muted/50 border-border/50 rounded-2xl focus-visible:ring-primary/50 text-base px-5' /></div>
                       <Button onClick={() => setStep(2)} className='w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 gap-2 group mt-4'>Tiếp theo <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' /></Button>
                    </div>
                    <p className='text-center text-sm text-muted-foreground font-medium'>Đã có tài khoản? <Link href='/login' className='text-primary font-black hover:underline'>Đăng nhập</Link></p>
                 </motion.div>
               ) : (
                 <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className='space-y-10'>
                    <div className='space-y-3'><div className='inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20'><Sparkles size={12} /> Personalization</div><h1 className='text-4xl font-black tracking-tighter'>Sở thích của bạn?</h1><p className='text-muted-foreground font-medium'>Chọn ít nhất 3 thể loại để AI thấu hiểu bạn.</p></div>
                    <div className='grid grid-cols-2 gap-3'>
                       {genres.map((genre) => (
                         <button key={genre} onClick={() => toggleGenre(genre)} className={cn('p-4 rounded-2xl border-2 font-bold text-sm transition-all relative group flex items-center justify-between', selectedGenres.includes(genre) ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50')}>
                            {genre}
                            {selectedGenres.includes(genre) ? <CheckCircle2 className='h-4 w-4' /> : <Plus className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity' />}
                         </button>
                       ))}
                    </div>
                    <div className='flex gap-4 pt-2'>
                       <Button variant='ghost' onClick={() => setStep(1)} className='h-14 flex-1 rounded-2xl font-bold text-muted-foreground hover:text-foreground'>Quay lại</Button>
                       <Button disabled={selectedGenres.length < 3} className='h-14 flex-[2] rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all'>Hoàn tất đăng ký</Button>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

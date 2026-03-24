'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Chrome, Github, Clapperboard, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/shared/Toast';

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setToast({ message: 'Đăng nhập thành công!', type: 'success' });
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className='h-screen w-full flex bg-background font-sans overflow-hidden'>
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className='hidden lg:flex flex-1 relative bg-slate-950 overflow-hidden'>
         <div className='absolute inset-0'>
            <img src='https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2000&auto=format&fit=crop' className='w-full h-full object-cover opacity-40 scale-105' alt='Cinematic' />
            <div className='absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-primary/20'></div>
         </div>
         <div className='relative z-10 p-16 flex flex-col justify-between h-full'>
            <Link href='/' className='flex items-center gap-2 group w-fit'>
               <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-2xl'><Clapperboard className='h-7 w-7 text-primary-foreground' /></div>
               <span className='text-3xl font-black tracking-tighter text-white'>CineChat</span>
            </Link>
            <div className='space-y-8 max-w-lg'>
               <div className='space-y-4'>
                  <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest'><Sparkles size={12} /> AI Powered</div>
                  <h2 className='text-5xl font-black text-white leading-[1.1] tracking-tighter'>Khám phá thế giới phim <br /><span className='text-primary italic'>theo cách mới.</span></h2>
               </div>
               <div className='p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 space-y-4'>
                  <div className='flex gap-1 text-amber-400'>{[1,2,3,4,5].map(i => <Star key={i} size={16} className='fill-current' />)}</div>
                  <p className='text-slate-300 font-medium italic'>"AI thực sự thấu hiểu gu điện ảnh của tôi!"</p>
               </div>
            </div>
            <div className='flex items-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]'><span>© 2024 CineChat Inc.</span></div>
         </div>
      </div>

      <div className='w-full lg:w-[550px] flex flex-col p-8 sm:p-16 lg:p-24 relative bg-card text-card-foreground border-l border-border/50'>
         <div className='lg:hidden mb-12'>
            <Link href='/' className='flex items-center gap-2'><div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary'><Clapperboard className='h-6 w-6 text-primary-foreground' /></div><span className='text-2xl font-black tracking-tighter'>CineChat</span></Link>
         </div>
         <div className='flex-1 flex flex-col justify-center max-w-sm mx-auto w-full'>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className='space-y-10'>
               <div className='space-y-3'><h1 className='text-4xl font-black tracking-tighter'>Đăng nhập</h1><p className='text-muted-foreground font-medium'>Vui lòng nhập thông tin để truy cập.</p></div>
               <form onSubmit={handleLogin} className='space-y-6'>
                  <div className='space-y-2'>
                     <Label className='text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1'>Email</Label>
                     <Input required type='email' placeholder='name@example.com' className='h-14 bg-muted/50 border-border/50 rounded-2xl focus-visible:ring-primary/50 text-base font-medium px-5' />
                  </div>
                  <div className='space-y-2'>
                     <div className='flex items-center justify-between'><Label className='text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1'>Mật khẩu</Label><Link href='#' className='text-xs font-bold text-primary'>Quên mật khẩu?</Link></div>
                     <Input required type='password' placeholder='••••••••' className='h-14 bg-muted/50 border-border/50 rounded-2xl focus-visible:ring-primary/50 text-base font-medium px-5' />
                  </div>
                  <Button disabled={isSubmitting} className='w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 group'>
                     {isSubmitting ? 'Đang xác thực...' : 'Bắt đầu trải nghiệm'}
                  </Button>
               </form>
               <div className='relative'><div className='absolute inset-0 flex items-center'><span className='w-full border-t border-border/50'></span></div><div className='relative flex justify-center text-[10px] uppercase tracking-widest'><span className='bg-card px-4 text-muted-foreground font-black'>Hoặc</span></div></div>
               <div className='grid grid-cols-2 gap-4'>
                  <Button variant='outline' className='h-14 rounded-2xl border-border/50 bg-background hover:bg-muted font-bold gap-3'><Chrome size={20} className='text-red-500' /> Google</Button>
                  <Button variant='outline' className='h-14 rounded-2xl border-border/50 bg-background hover:bg-muted font-bold gap-3'><Github size={20} /> GitHub</Button>
               </div>
               <p className='text-center text-sm text-muted-foreground font-medium'>Bạn mới biết đến CineChat? <Link href='/register' className='text-primary font-black hover:underline underline-offset-4'>Đăng ký ngay</Link></p>
            </motion.div>
         </div>
      </div>
    </div>
  );
};

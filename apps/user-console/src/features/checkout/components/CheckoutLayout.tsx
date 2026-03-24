'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, CreditCard, Wallet, ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const PLAN_DATA: Record<string, any> = {
  'discovery': { name: 'Khám Phá', price: '49.000', period: 'tháng' },
  'fanatic': { name: 'Tín Đồ', price: '99.000', period: 'tháng' },
  'cinema': { name: 'Điện Ảnh', price: '199.000', period: 'tháng' },
};

interface CheckoutLayoutProps {
  planId: string;
}

export const CheckoutLayout = ({ planId }: CheckoutLayoutProps) => {
  const plan = PLAN_DATA[planId] || PLAN_DATA['fanatic'];
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'zalopay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) return <SuccessState planName={plan.name} />;

  return (
    <div className='flex flex-col lg:flex-row gap-12'>
       <div className='flex-1 space-y-10'>
          <Link href="/pricing" className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm group'>
             <ChevronLeft size={18} className='group-hover:-translate-x-1 transition-transform' /> Quay lại bảng giá
          </Link>
          <div className='space-y-2'>
             <h1 className='text-4xl font-black tracking-tighter'>Thanh toán</h1>
             <p className='text-muted-foreground font-medium text-lg'>Hoàn tất để bắt đầu trải nghiệm ngay.</p>
          </div>

          <div className='space-y-6'>
             <h3 className='text-lg font-black flex items-center gap-2'>1. Phương thức thanh toán</h3>
             <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[
                  { id: 'card', name: 'Thẻ Visa/Master', icon: CreditCard },
                  { id: 'momo', name: 'Ví MoMo', icon: Wallet, color: 'text-pink-500' },
                  { id: 'zalopay', name: 'ZaloPay', icon: Wallet, color: 'text-blue-500' },
                ].map((m) => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id as any)} className={cn('flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all', paymentMethod === m.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-primary/30')}>
                     <m.icon className={cn('h-8 w-8', m.color)} /><span className='font-bold text-xs uppercase tracking-widest'>{m.name}</span>
                  </button>
                ))}
             </div>
          </div>

          <AnimatePresence mode='wait'>
             {paymentMethod === 'card' ? (
               <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='space-y-6 p-8 rounded-3xl bg-card border border-border/50'>
                  <div className='space-y-4'>
                     <Label className='font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>Thông tin thẻ</Label>
                     <div className='space-y-4'>
                        <div className='space-y-2'><Label className='text-xs font-bold text-muted-foreground ml-1'>Số thẻ</Label><div className='relative'><Input placeholder='0000 0000 0000 0000' className='h-12 rounded-xl pl-12 bg-muted/20' /><CreditCard className='absolute left-4 top-3.5 text-muted-foreground' size={18} /></div></div>
                        <div className='grid grid-cols-2 gap-4'>
                           <div className='space-y-2'><Label className='text-xs font-bold text-muted-foreground ml-1'>Ngày hết hạn</Label><Input placeholder='MM/YY' className='h-12 rounded-xl bg-muted/20' /></div>
                           <div className='space-y-2'><Label className='text-xs font-bold text-muted-foreground ml-1'>CVC/CVV</Label><Input placeholder='***' type='password' className='h-12 rounded-xl bg-muted/20' /></div>
                        </div>
                        <div className='space-y-2'><Label className='text-xs font-bold text-muted-foreground ml-1'>Tên chủ thẻ</Label><Input placeholder='NGUYEN VAN A' className='h-12 rounded-xl bg-muted/20 uppercase' /></div>
                     </div>
                  </div>
               </motion.div>
             ) : (
               <motion.div key="qr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='p-10 rounded-3xl bg-muted/30 border-2 border-dashed border-border flex flex-col items-center text-center space-y-4'>
                  <AlertCircle className='text-primary animate-pulse' size={32} /><h4 className='font-black'>Quét mã QR để thanh toán</h4>
               </motion.div>
             )}
          </AnimatePresence>
       </div>

       <div className='w-full lg:w-[400px] shrink-0'>
          <div className='sticky top-32 p-8 rounded-[3rem] bg-card border border-border/50 shadow-2xl space-y-8'>
             <h3 className='text-xl font-black uppercase tracking-widest'>Tổng đơn hàng</h3>
             <div className='space-y-4'>
                <div className='flex justify-between items-center pb-4 border-b border-border/50'>
                   <div><p className='font-black text-lg'>Gói {plan.name}</p><p className='text-xs font-bold text-muted-foreground uppercase'>Gia hạn {plan.period}</p></div>
                   <p className='font-black text-xl'>{plan.price}đ</p>
                </div>
                <div className='flex justify-between items-center pt-4'>
                   <span className='font-black text-muted-foreground'>Tổng cộng</span>
                   <span className='text-4xl font-black text-primary'>{plan.price}đ</span>
                </div>
             </div>
             <Button onClick={handlePayment} disabled={isProcessing} className='w-full h-16 rounded-2xl font-black text-lg shadow-xl'>{isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay'}</Button>
             <div className='text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2'><Lock size={12} /> Secure CinePay Checkout</div>
          </div>
       </div>
    </div>
  );
};

const SuccessState = ({ planName }: { planName: string }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className='max-w-md w-full mx-auto text-center space-y-8 py-20'>
     <div className='relative w-32 h-32 mx-auto'>
        <div className='absolute inset-0 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl'><CheckCircle2 size={64} /></div>
        <div className='absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20'></div>
     </div>
     <div className='space-y-4'><h1 className='text-4xl font-black tracking-tighter'>Chào mừng bạn!</h1><p className='text-muted-foreground font-medium text-lg leading-relaxed'>Bạn đã đăng ký thành công gói <span className='text-foreground font-black'>{planName}</span>.</p></div>
     <div className='pt-6 flex flex-col gap-3'>
        <Button asChild size='lg' className='h-14 rounded-2xl font-black'><Link href="/">Khám phá phim ngay</Link></Button>
        <Button asChild variant='ghost' className='font-bold rounded-2xl'><Link href="/profile?tab=payment">Xem hóa đơn</Link></Button>
     </div>
  </motion.div>
);

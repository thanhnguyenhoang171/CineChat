'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  Play, 
  Info, 
  Bot, 
  Tv, 
  Download, 
  Minus,
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'motion/react';

const PLANS = [
  {
    id: 'discovery',
    name: 'Khám Phá',
    tier: 'Gói Cơ Bản',
    price: '49.000đ',
    period: '/tháng',
    description: 'Dành cho những người dùng muốn bắt đầu trải nghiệm hệ sinh thái phim ảnh thông minh.',
    icon: Play,
    color: 'border-slate-200',
    btnVariant: 'outline' as const,
    features: [
      { text: 'Chất lượng HD 720p', icon: Tv },
      { text: 'Toàn bộ thư viện phim tiêu chuẩn', icon: Play },
      { text: 'Gợi ý phim cơ bản', icon: Star },
      { text: 'AI Chatbot: Tìm kiếm qua từ khóa', icon: Bot },
      { text: 'Có quảng cáo ngắn trước phim', icon: Info, isNegative: true },
    ]
  },
  {
    id: 'fanatic',
    name: 'Tín Đồ',
    tier: 'Gói Tiêu Chuẩn',
    price: '99.000đ',
    period: '/tháng',
    description: 'Lựa chọn hoàn hảo cho những người yêu phim muốn một trải nghiệm cá nhân hóa và liền mạch.',
    icon: Zap,
    color: 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10',
    popular: true,
    btnVariant: 'default' as const,
    features: [
      { text: 'Full HD 1080p & 4K (tùy phim)', icon: Tv },
      { text: 'Phim tiêu chuẩn & Nội dung độc quyền', icon: Play },
      { text: 'AI Gợi ý chuyên sâu theo gu thẩm mỹ', icon: Sparkles },
      { text: 'AI Chatbot: Tương tác ngôn ngữ tự nhiên', icon: Bot },
      { text: 'Hoàn toàn không có quảng cáo', icon: ShieldCheck },
    ]
  },
  {
    id: 'cinema',
    name: 'Điện Ảnh',
    tier: 'Gói Cao Cấp',
    price: '199.000đ',
    period: '/tháng',
    description: 'Trải nghiệm giải trí tối thượng với sự hỗ trợ toàn diện từ AI LLM mạnh mẽ nhất.',
    icon: Crown,
    color: 'border-amber-500/50 shadow-2xl shadow-amber-500/10',
    btnVariant: 'default' as const,
    accent: 'bg-amber-500 text-white',
    features: [
      { text: 'Tối đa 4K, HDR & Spatial Audio', icon: Tv },
      { text: 'Mọi nội dung & Tải phim không giới hạn', icon: Download },
      { text: 'AI Dự đoán sở thích đa chiều theo tâm trạng', icon: Sparkles },
      { text: 'AI Trợ lý phim ảnh thông minh (LLM)', icon: Bot },
      { text: 'Giải thích tình tiết & Phân tích tâm lý', icon: Bot },
      { text: 'Hoàn toàn không có quảng cáo', icon: ShieldCheck },
    ]
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main className='pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center space-y-6 mb-20'>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]'
           >
              <Crown size={14} />
              CineChat Membership
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className='text-4xl md:text-7xl font-black tracking-tighter'
           >
              Chọn gói cước, <br /> <span className='text-primary italic'>Mở khóa cảm xúc.</span>
           </motion.h1>
           
           {/* Billing Toggle */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className='flex items-center justify-center gap-4 pt-4'
           >
              <span className={cn('text-sm font-bold transition-colors', billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground')}>Hàng tháng</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className='h-8 w-14 rounded-full bg-muted border-2 border-border p-1 relative transition-colors hover:border-primary/50'
              >
                 <div className={cn('h-5 w-5 rounded-full bg-primary transition-all duration-300', billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0')}></div>
              </button>
              <span className={cn('text-sm font-bold transition-colors', billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground')}>
                Hàng năm <span className='ml-1.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black uppercase'>Tiết kiệm 20%</span>
              </span>
           </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch'>
           {PLANS.map((plan, i) => (
             <motion.div
               key={plan.id}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 + 0.3 }}
               className={cn(
                 'relative flex flex-col p-8 rounded-[3rem] bg-card border-2 transition-all hover:-translate-y-2',
                 plan.color
               )}
             >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl'>
                     Phổ biến nhất
                  </div>
                )}

                <div className='mb-8'>
                   <div className={cn('h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg', plan.accent || 'bg-muted')}>
                      <plan.icon size={28} />
                   </div>
                   <h3 className='text-2xl font-black mb-1'>{plan.name}</h3>
                   <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6'>{plan.tier}</p>
                   <div className='flex items-baseline gap-1'>
                      <span className='text-4xl font-black'>{plan.price}</span>
                      <span className='text-muted-foreground font-medium text-sm'>{plan.period}</span>
                   </div>
                   <p className='mt-6 text-sm text-muted-foreground font-medium leading-relaxed min-h-[60px]'>
                      {plan.description}
                   </p>
                </div>

                <div className='space-y-5 flex-1 mb-10'>
                   {plan.features.map((feature, idx) => (
                     <div key={idx} className='flex items-start gap-3'>
                        <div className={cn(
                          'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          feature.isNegative ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                        )}>
                           {feature.isNegative ? <Minus size={12} /> : <Check size={12} />}
                        </div>
                        <span className={cn('text-sm font-medium leading-tight', feature.isNegative && 'text-muted-foreground')}>
                           {feature.text}
                        </span>
                     </div>
                   ))}
                </div>

                <Button 
                  asChild
                  variant={plan.btnVariant} 
                  className={cn(
                    'w-full h-14 rounded-2xl font-black text-base shadow-xl transition-all',
                    plan.id === 'cinema' && 'bg-amber-500 hover:bg-amber-600 text-white border-none'
                  )}
                >
                   <Link href={`/checkout/${plan.id}`}>
                      Chọn gói này <ChevronRight size={18} className='ml-2' />
                   </Link>
                </Button>
             </motion.div>
           ))}
        </div>

        {/* FAQ Section Placeholder */}
        <div className='mt-32 p-12 rounded-[3rem] bg-muted/30 border border-border/50'>
           <div className='flex flex-col md:flex-row gap-12'>
              <div className='md:w-1/3 space-y-4'>
                 <h2 className='text-3xl font-black tracking-tight'>Câu hỏi thường gặp</h2>
                 <p className='text-muted-foreground font-medium'>Bạn vẫn còn thắc mắc? Hãy liên hệ với đội ngũ hỗ trợ 24/7 của chúng tôi.</p>
                 <Button variant='link' className='p-0 text-primary font-bold h-auto'>Liên hệ hỗ trợ ngay</Button>
              </div>
              <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8'>
                 {[
                   { q: 'Tôi có thể hủy gói cước bất cứ lúc nào không?', a: 'Có, bạn có thể hủy gói cước trong phần cài đặt tài khoản bất cứ lúc nào mà không mất thêm phí.' },
                   { q: 'Gói Điện Ảnh khác gì so với Tín Đồ?', a: 'Gói Điện Ảnh sử dụng LLM để thảo luận sâu về phim, hỗ trợ chất lượng 4K HDR và âm thanh vòm.' },
                   { q: 'Có những phương thức thanh toán nào?', a: 'Chúng tôi hỗ trợ Visa, MasterCard, MoMo, ZaloPay và chuyển khoản ngân hàng.' },
                   { q: 'Lợi ích của việc thanh toán theo năm?', a: 'Bạn sẽ được giảm giá 20% so với việc thanh toán hàng tháng.' }
                 ].map((item, i) => (
                   <div key={i} className='space-y-2'>
                      <h4 className='font-black text-sm'>{item.q}</h4>
                      <p className='text-sm text-muted-foreground font-medium leading-relaxed'>{item.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

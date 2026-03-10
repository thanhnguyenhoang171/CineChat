'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Clapperboard, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Globe, 
  Heart,
  ChevronRight,
  Play,
  Zap,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-background overflow-hidden'>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className='relative pt-40 pb-20 px-6 md:px-16'>
           <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20'>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,transparent_70%)] blur-3xl'></div>
           </div>

           <div className='max-w-5xl mx-auto text-center space-y-8'>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]'
              >
                 <Sparkles size={14} />
                 The Future of Cinema
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]'
              >
                Chúng tôi định nghĩa lại <br />
                <span className='text-primary italic'>Cách bạn xem phim.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed'
              >
                CineChat không chỉ là một nền tảng xem phim. Đó là sự kết hợp giữa nghệ thuật điện ảnh thứ bảy và trí tuệ nhân tạo đột phá.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className='pt-10'
              >
                 <Button size='lg' className='h-16 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-primary/40 gap-3'>
                    Khám phá ngay <ChevronRight size={20} />
                 </Button>
              </motion.div>
           </div>
        </section>

        {/* Vision Section */}
        <section className='py-24 px-6 md:px-16 max-w-7xl mx-auto'>
           <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              {[
                { 
                  icon: Bot, 
                  title: 'AI Cá nhân hóa', 
                  desc: 'Hệ thống AI hiểu tâm trạng và sở thích của bạn hơn chính bạn, gợi ý những bộ phim chạm đến cảm xúc.' 
                },
                { 
                  icon: Globe, 
                  title: 'Xem chung toàn cầu', 
                  desc: 'Kết nối với bạn bè và những người yêu điện ảnh trên khắp thế giới thông qua tính năng Watch Party.' 
                },
                { 
                  icon: ShieldCheck, 
                  title: 'Chất lượng tối đa', 
                  desc: 'Trải nghiệm 4K HDR và âm thanh Dolby Atmos tiêu chuẩn phòng vé ngay tại phòng khách của bạn.' 
                }
              ].map((item, i) => (
                <div key={i} className='p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all group'>
                   <div className='h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform'>
                      <item.icon size={32} />
                   </div>
                   <h3 className='text-2xl font-black mb-4'>{item.title}</h3>
                   <p className='text-muted-foreground font-medium leading-relaxed'>{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Story Section */}
        <section className='py-24 px-6 md:px-16 bg-muted/30'>
           <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20'>
              <div className='flex-1 relative'>
                 <div className='aspect-square rounded-[4rem] overflow-hidden rotate-3 shadow-2xl'>
                    <img 
                      src='https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop' 
                      className='w-full h-full object-cover' 
                      alt='CineChat Story'
                    />
                 </div>
                 <div className='absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary flex items-center justify-center text-primary-foreground -rotate-6 shadow-2xl'>
                    <div className='text-center'>
                       <p className='text-4xl font-black'>10K+</p>
                       <p className='text-[10px] font-black uppercase tracking-widest'>Phim hay</p>
                    </div>
                 </div>
              </div>
              
              <div className='flex-1 space-y-8'>
                 <h2 className='text-4xl md:text-6xl font-black tracking-tighter leading-tight'>
                    Câu chuyện bắt đầu từ <br /> <span className='text-primary'>Niềm đam mê.</span>
                 </h2>
                 <p className='text-lg text-muted-foreground font-medium leading-relaxed'>
                    CineChat được thành lập vào năm 2024 bởi một nhóm những nhà làm phim và kỹ sư công nghệ với một mục tiêu duy nhất: Xóa bỏ rào cản giữa người xem và nội dung họ thực sự yêu thích.
                 </p>
                 <p className='text-lg text-muted-foreground font-medium leading-relaxed'>
                    Chúng tôi tin rằng mỗi bộ phim là một trải nghiệm sống, và mỗi người dùng xứng đáng có một hành trình điện ảnh riêng biệt, không bị làm phiền bởi những gợi ý rác hay quảng cáo.
                 </p>
                 <div className='pt-4 flex gap-10'>
                    <div>
                       <p className='text-3xl font-black'>500K+</p>
                       <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Thành viên</p>
                    </div>
                    <div>
                       <p className='text-3xl font-black'>50+</p>
                       <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>Quốc gia</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Team Section Placeholder */}
        <section className='py-24 px-6 md:px-16 max-w-7xl mx-auto text-center'>
           <h2 className='text-4xl font-black mb-16'>Đồng hành cùng CineChat</h2>
           <div className='flex flex-wrap justify-center gap-6'>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className='w-64 space-y-4'>
                   <div className='aspect-square rounded-full bg-muted border border-border overflow-hidden'>
                      <img src={`https://i.pravatar.cc/300?img=${i+10}`} alt='Team member' />
                   </div>
                   <div>
                      <p className='font-black text-lg'>Thành viên {i}</p>
                      <p className='text-xs font-bold text-primary uppercase tracking-widest'>Founder / Engineer</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 px-6 md:px-16'>
           <div className='max-w-5xl mx-auto p-12 md:p-20 rounded-[4rem] bg-primary text-primary-foreground text-center space-y-8 relative overflow-hidden'>
              <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] [background-size:40px_40px]'></div>
              <h2 className='text-4xl md:text-6xl font-black tracking-tighter relative z-10'>Sẵn sàng trải nghiệm?</h2>
              <p className='text-xl font-medium opacity-90 max-w-xl mx-auto relative z-10'>Bắt đầu hành trình điện ảnh của bạn ngay hôm nay với 7 ngày dùng thử Premium miễn phí.</p>
              <div className='pt-6 relative z-10'>
                 <Button size='lg' className='h-16 px-12 rounded-2xl text-lg font-black bg-white text-primary hover:bg-white/90 shadow-2xl'>
                    Đăng ký ngay
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

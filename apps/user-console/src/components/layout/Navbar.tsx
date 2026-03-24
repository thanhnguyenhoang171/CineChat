'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Clapperboard, 
  Sparkles, 
  Menu, 
  X, 
  User, 
  Settings, 
  CreditCard, 
  LogOut, 
  ShieldCheck,
  ChevronDown,
  Bell,
  Check,
  Info,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Khám phá', href: '/' },
    { name: 'Thể loại', href: '/browse' },
    { name: 'Phim mới', href: '/' },
    { name: 'Về CineChat', href: '/about' },
  ];

  const profileMenuItems = [
    { name: 'Thông tin cá nhân', icon: User, href: '/profile' },
    { name: 'Danh sách của tôi', icon: Heart, href: '/my-list' },
    { name: 'Thanh toán & Thẻ', icon: CreditCard, href: '/profile?tab=payment' },
    { name: 'Xác thực tài khoản', icon: ShieldCheck, href: '/profile?tab=security' },
    { name: 'Cài đặt', icon: Settings, href: '/profile?tab=settings' },
  ];

  const notifications = [
    { id: 1, title: 'Ưu đãi Premium', description: 'Giảm 50% khi gia hạn gói Family trong hôm nay!', time: '2 giờ trước', icon: Sparkles, color: 'text-amber-500', unread: true },
    { id: 2, title: 'Phim mới ra mắt', description: 'Dune: Part Two đã sẵn sàng để xem ngay bây giờ.', time: '5 giờ trước', icon: Clapperboard, color: 'text-primary', unread: true },
    { id: 3, title: 'Bảo mật tài khoản', description: 'Bạn vừa đăng nhập từ một thiết bị mới.', time: '1 ngày trước', icon: ShieldCheck, color: 'text-emerald-500', unread: false },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-16 py-4',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 py-3 shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 group'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-300'>
            <Clapperboard className='h-6 w-6 text-primary-foreground' />
          </div>
          <span className='text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors'>
            CineChat
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest'
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions Area */}
        <div className='hidden md:flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            {!isLoggedIn && (
              <Link href='/login'>
                <Button variant='ghost' className='font-bold text-sm uppercase tracking-widest hover:text-primary hover:bg-primary/10'>
                  Đăng nhập
                </Button>
              </Link>
            )}
            <Link href='/register'>
              <Button className='font-bold text-sm uppercase tracking-widest px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all'>
                {isLoggedIn ? 'Gói Premium' : 'Tham gia ngay'}
                <Sparkles className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>

          {isLoggedIn && (
            <div className='flex items-center gap-3 border-l border-border/50 pl-4 ml-2'>
              {/* My List Access */}
              <Link 
                href='/my-list'
                className='h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors relative active:scale-90 text-foreground'
                title="Danh sách của tôi"
              >
                <Heart size={20} />
              </Link>

              {/* Notifications */}
              <div className='relative' ref={notificationsRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className='h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors relative active:scale-90'
                >
                  <Bell size={20} className='text-foreground' />
                  <span className='absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background'></span>
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className='absolute right-0 mt-3 w-80 bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-[60]'
                    >
                      <div className='px-4 py-4 border-b border-border/50 flex items-center justify-between'>
                         <h4 className='font-black text-sm uppercase tracking-widest'>Thông báo</h4>
                         <button className='text-[10px] font-black text-primary uppercase tracking-tighter hover:underline'>Đánh dấu đã đọc</button>
                      </div>
                      <div className='max-h-96 overflow-y-auto'>
                         {notifications.map((notif) => (
                           <button key={notif.id} className={cn(
                             'w-full p-4 flex gap-4 text-left hover:bg-muted/50 transition-colors border-b border-border/10 last:border-0',
                             notif.unread && 'bg-primary/5'
                           )}>
                              <div className={cn('h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm', notif.color)}>
                                 <notif.icon size={20} />
                              </div>
                              <div className='flex-1 min-w-0'>
                                 <p className='text-sm font-black mb-0.5'>{notif.title}</p>
                                 <p className='text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed mb-1.5'>{notif.description}</p>
                                 <p className='text-[10px] text-muted-foreground font-bold uppercase'>{notif.time}</p>
                              </div>
                              {notif.unread && <div className='h-2 w-2 rounded-full bg-primary mt-2'></div>}
                           </button>
                         ))}
                      </div>
                      <Link 
                        href='/profile?tab=notifications' 
                        onClick={() => setIsNotificationsOpen(false)}
                        className='block p-3 text-center text-[11px] font-black uppercase tracking-[0.2em] bg-muted/30 hover:bg-muted transition-colors border-t border-border/50'
                      >
                        Xem tất cả thông báo
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className='relative' ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center gap-2 p-1 pr-2 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all active:scale-95'
                >
                  <div className='h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-md'>
                    LC
                  </div>
                  <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-300', isProfileOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className='absolute right-0 mt-3 w-64 bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden py-2 z-[60]'
                    >
                      <div className='px-4 py-3 border-b border-border/50 mb-1 flex items-center gap-3'>
                         <div className='h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm'>LC</div>
                         <div className='min-w-0'>
                            <p className='text-sm font-black truncate'>Chanh Local</p>
                            <p className='text-[10px] font-bold text-primary uppercase tracking-tighter'>Premium Member</p>
                         </div>
                      </div>
                      {profileMenuItems.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className='flex items-center gap-3 px-4 py-3 text-sm font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors'
                        >
                          <item.icon className='h-4 w-4 shrink-0' />
                          {item.name}
                        </Link>
                      ))}
                      <div className='mt-2 pt-2 border-t border-border/50 px-2'>
                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className='flex items-center gap-3 px-3 py-3 w-full text-sm font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-colors'
                        >
                          <LogOut className='h-4 w-4' />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className='md:hidden p-2 text-foreground'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border p-6 flex flex-col gap-6 md:hidden z-40'
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='text-lg font-bold text-foreground hover:text-primary border-b border-border/50 pb-2 flex items-center justify-between'
              >
                {link.name}
                <ChevronRight size={20} className='text-muted-foreground' />
              </Link>
            ))}
            
            <div className='bg-muted/30 rounded-2xl p-4 mt-2 space-y-4'>
               {isLoggedIn && (
                 <div className='flex items-center justify-between mb-2 pb-4 border-b border-border/50'>
                    <div className='flex items-center gap-4'>
                        <div className='h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black shadow-lg'>LC</div>
                        <div>
                            <p className='font-black'>Chanh Local</p>
                            <p className='text-xs text-muted-foreground font-medium italic'>Premium Member</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                       <Link href='/my-list' onClick={() => setIsMobileMenuOpen(false)} className='h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm border border-border/50'>
                          <Heart size={20} className='text-primary fill-primary/10' />
                       </Link>
                       <Link href='/profile?tab=notifications' onClick={() => setIsMobileMenuOpen(false)} className='h-10 w-10 rounded-full bg-background flex items-center justify-center relative shadow-sm border border-border/50'>
                          <Bell size={20} />
                          <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive'></span>
                       </Link>
                    </div>
                 </div>
               )}
               
               <div className='grid grid-cols-2 gap-3'>
                  {!isLoggedIn && (
                    <Link href='/login' className='w-full' onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant='outline' className='w-full font-black h-12 rounded-xl border-primary text-primary'>Đăng nhập</Button>
                    </Link>
                  )}
                  <Link href='/register' className='w-full' onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className='w-full font-black h-12 shadow-lg rounded-xl'>
                      {isLoggedIn ? 'Nâng cấp' : 'Đăng ký'}
                    </Button>
                  </Link>
               </div>

               {isLoggedIn && (
                  <div className='grid grid-cols-2 gap-2'>
                    <Link href='/profile' onClick={() => setIsMobileMenuOpen(false)} className='flex flex-col items-center justify-center p-3 rounded-xl bg-background border border-border text-[11px] font-black uppercase tracking-tighter gap-2'>
                       <User size={18} />
                       Hồ sơ
                    </Link>
                    <Link href='/my-list' onClick={() => setIsMobileMenuOpen(false)} className='flex flex-col items-center justify-center p-3 rounded-xl bg-background border border-border text-[11px] font-black uppercase tracking-tighter gap-2'>
                       <Heart size={18} />
                       Yêu thích
                    </Link>
                  </div>
               )}

               {isLoggedIn && (
                 <Button 
                   variant='ghost' 
                   className='w-full font-black h-12 rounded-xl text-destructive hover:bg-destructive/10'
                   onClick={() => {
                     setIsLoggedIn(false);
                     setIsMobileMenuOpen(false);
                   }}
                 >
                   Đăng xuất
                 </Button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

'use client';

import React from 'react';
import { User, CreditCard, ShieldCheck, Bell, Zap, ChevronRight, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  showToast: (m: string) => void;
}

export const ProfileSidebar = ({ activeTab, setActiveTab, showToast }: ProfileSidebarProps) => {
  const sidebarItems = [
    { id: 'personal', name: 'Thông tin cá nhân', icon: User },
    { id: 'payment', name: 'Thanh toán & Thẻ', icon: CreditCard },
    { id: 'security', name: 'Xác thực & Bảo mật', icon: ShieldCheck },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'settings', name: 'Cài đặt hệ thống', icon: Zap },
  ];

  return (
    <aside className='w-full md:w-64 shrink-0'>
      <div className='mb-8'>
         <h1 className='text-3xl font-black tracking-tight mb-2 text-foreground'>Cài đặt</h1>
         <p className='text-muted-foreground text-sm font-medium'>Quản lý tài khoản và trải nghiệm của bạn.</p>
      </div>
      
      <nav className='flex flex-col gap-1'>
         {sidebarItems.map((item) => (
           <button
             key={item.id}
             onClick={() => setActiveTab(item.id)}
             className={cn(
               'flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all',
               activeTab === item.id 
                 ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]' 
                 : 'text-muted-foreground hover:bg-muted hover:text-foreground'
             )}
           >
             <item.icon size={18} />
             {item.name}
             {activeTab === item.id && <ChevronRight size={14} className='ml-auto' />}
           </button>
         ))}
      </nav>
      
      <div className='mt-10 p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20'>
         <div className='h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4 shadow-lg shadow-primary/20'>
            <ShieldCheck size={20} />
         </div>
         <p className='font-black text-sm mb-2'>Tài khoản Premium</p>
         <p className='text-xs text-muted-foreground font-medium mb-4'>Hết hạn vào 12/10/2026</p>
         <Button variant='outline' size='sm' className='w-full text-[10px] font-black uppercase tracking-widest h-8 rounded-lg' onClick={() => showToast('Tính năng gia hạn đang phát triển!')}>Gia hạn ngay</Button>
      </div>
    </aside>
  );
};

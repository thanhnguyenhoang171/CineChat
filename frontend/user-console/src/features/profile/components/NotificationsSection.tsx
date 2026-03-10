'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Clapperboard, ShieldCheck, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationsSectionProps {
  onSave: () => void;
}

export const NotificationsSection = ({ onSave }: NotificationsSectionProps) => {
  const notificationHistory = [
    { id: 1, title: 'Ưu đãi Premium', description: 'Giảm 50% khi gia hạn gói Family trong hôm nay!', time: '2 giờ trước', icon: Sparkles, color: 'text-amber-500', unread: true },
    { id: 2, title: 'Phim mới ra mắt', description: 'Dune: Part Two đã sẵn sàng để xem ngay bây giờ.', time: '5 giờ trước', icon: Clapperboard, color: 'text-primary', unread: true },
    { id: 3, title: 'Bảo mật tài khoản', description: 'Bạn vừa đăng nhập từ một thiết bị mới.', time: '1 ngày trước', icon: ShieldCheck, color: 'text-emerald-500', unread: false },
  ];

  const preferences = [
    { id: 'marketing', label: 'Khuyến mãi & Ưu đãi', desc: 'Nhận thông tin về các chương trình giảm giá và quà tặng.' },
    { id: 'new-content', label: 'Nội dung mới', desc: 'Thông báo khi có phim hoặc show truyền hình mới ra mắt.' },
    { id: 'security', label: 'Bảo mật & Tài khoản', desc: 'Cảnh báo đăng nhập và các thay đổi quan trọng của tài khoản.', mandatory: true },
    { id: 'social', label: 'Tương tác xã hội', desc: 'Thông báo khi bạn bè chia sẻ phim hoặc mời bạn xem chung.' },
  ];

  return (
    <div className='space-y-10'>
       <div>
          <h2 className='text-2xl font-black mb-6 text-foreground'>Thông báo</h2>
          
          <Card className='rounded-[2rem] border-border/50 overflow-hidden mb-10'>
             <CardHeader className='bg-muted/30'>
                <CardTitle className='text-lg font-black'>Cài đặt nhận tin</CardTitle>
                <CardDescription className='font-medium'>Chọn cách bạn muốn chúng tôi liên lạc.</CardDescription>
             </CardHeader>
             <CardContent className='p-8 space-y-8'>
                {preferences.map((pref) => (
                  <div key={pref.id} className='flex items-start justify-between gap-4'>
                     <div className='space-y-1'>
                        <Label className='font-black text-base flex items-center gap-2'>
                           {pref.label}
                           {pref.mandatory && <span className='text-[10px] bg-muted px-2 py-0.5 rounded uppercase tracking-widest text-muted-foreground'>Bắt buộc</span>}
                        </Label>
                        <p className='text-sm text-muted-foreground font-medium'>{pref.desc}</p>
                     </div>
                     <div className='flex gap-6 shrink-0'>
                        <div className='flex items-center gap-2'>
                           <Checkbox id={`${pref.id}-email`} defaultChecked disabled={pref.mandatory} />
                           <Label htmlFor={`${pref.id}-email`} className='text-xs font-bold'>Email</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                           <Checkbox id={`${pref.id}-push`} defaultChecked />
                           <Label htmlFor={`${pref.id}-push`} className='text-xs font-bold'>App</Label>
                        </div>
                     </div>
                  </div>
                ))}
                <div className='pt-6 border-t border-border/50 flex justify-end'>
                   <Button onClick={onSave} className='h-12 px-8 rounded-xl font-black'>Cập nhật cài đặt</Button>
                </div>
             </CardContent>
          </Card>

          <div className='flex items-center gap-3 mb-6'>
             <History size={24} className='text-primary' />
             <h3 className='text-xl font-black text-foreground'>Lịch sử thông báo</h3>
          </div>

          <div className='space-y-4'>
             {notificationHistory.map((notif) => (
               <div key={notif.id} className={cn(
                 'p-6 rounded-[2rem] bg-card border border-border/50 flex gap-6 transition-all hover:border-primary/30',
                 notif.unread && 'border-primary/20 bg-primary/5'
               )}>
                  <div className={cn('h-14 w-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm', notif.color)}>
                     <notif.icon size={28} />
                  </div>
                  <div className='flex-1 min-w-0'>
                     <div className='flex justify-between items-start mb-1'>
                        <h4 className='font-black text-lg'>{notif.title}</h4>
                        <span className='text-xs font-bold text-muted-foreground uppercase'>{notif.time}</span>
                     </div>
                     <p className='text-muted-foreground font-medium leading-relaxed mb-4'>{notif.description}</p>
                     <div className='flex gap-2'>
                        <Button size='sm' variant='secondary' className='rounded-lg font-bold'>Xem chi tiết</Button>
                        {notif.unread && <Button size='sm' variant='ghost' className='rounded-lg font-bold text-primary'>Đánh dấu đã đọc</Button>}
                     </div>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

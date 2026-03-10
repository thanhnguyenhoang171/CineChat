'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, CheckCircle2, Clock } from 'lucide-react';

interface PersonalSectionProps {
  onSave: () => void;
}

export const PersonalSection = ({ onSave }: PersonalSectionProps) => {
  return (
    <div className='space-y-8'>
       <div>
          <h2 className='text-2xl font-black mb-6 text-foreground'>Thông tin cá nhân</h2>
          <div className='flex flex-col sm:flex-row items-center gap-8 mb-10 p-6 rounded-3xl bg-card border border-border/50'>
             <div className='relative'>
                <div className='h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl'>
                   LC
                </div>
                <button className='absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors'>
                   <Plus size={16} />
                </button>
             </div>
             <div className='flex-1 text-center sm:text-left'>
                <h3 className='text-xl font-black'>Chanh Local</h3>
                <p className='text-muted-foreground font-medium mb-4'>Thành viên từ tháng 3, 2024</p>
                <div className='flex flex-wrap justify-center sm:justify-start gap-2'>
                   <span className='px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1'>
                      <CheckCircle2 size={12} /> Email đã xác minh
                   </span>
                   <span className='px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1'>
                      <Clock size={12} /> Chờ xác minh SĐT
                   </span>
                </div>
             </div>
             <Button variant='outline' className='rounded-xl font-bold'>Đổi ảnh đại diện</Button>
          </div>
       </div>

       <Card className='rounded-[2rem] border-border/50 overflow-hidden'>
          <CardHeader className='bg-muted/30 pb-6'>
             <CardTitle className='text-lg font-black'>Thông tin chi tiết</CardTitle>
             <CardDescription className='font-medium'>Cập nhật thông tin của bạn để nhận được gợi ý phim tốt nhất.</CardDescription>
          </CardHeader>
          <CardContent className='p-8 space-y-6'>
             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                   <Label htmlFor='fullName' className='font-bold ml-1'>Họ và tên</Label>
                   <Input id='fullName' defaultValue='Chanh Local' className='h-12 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20' />
                </div>
                <div className='space-y-2'>
                   <Label htmlFor='email' className='font-bold ml-1'>Email</Label>
                   <Input id='email' defaultValue='chanh.local@gmail.com' disabled className='h-12 rounded-xl bg-muted/40 border-border/50 cursor-not-allowed opacity-70' />
                </div>
                <div className='space-y-2'>
                   <Label htmlFor='phone' className='font-bold ml-1'>Số điện thoại</Label>
                   <div className='flex gap-2'>
                      <Input id='phone' placeholder='09x xxx xxxx' className='h-12 rounded-xl bg-muted/20 border-border/50 flex-1' />
                      <Button variant='secondary' className='h-12 rounded-xl font-bold px-4 shrink-0'>Xác thực</Button>
                   </div>
                </div>
                <div className='space-y-2'>
                   <Label htmlFor='birthday' className='font-bold ml-1'>Ngày sinh</Label>
                   <Input id='birthday' type='date' className='h-12 rounded-xl bg-muted/20 border-border/50' />
                </div>
             </div>
             <div className='pt-4 border-t border-border/50 flex justify-end'>
                <Button onClick={onSave} className='h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20'>Lưu thay đổi</Button>
             </div>
          </CardContent>
       </Card>
    </div>
  );
};

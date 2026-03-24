'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Mail, CheckCircle2, Lock } from 'lucide-react';

interface SecuritySectionProps {
  showToast: (m: string, t?: any) => void;
}

export const SecuritySection = ({ showToast }: SecuritySectionProps) => {
  return (
    <div className='space-y-8'>
       <h2 className='text-2xl font-black mb-6 text-slate-900'>Xác thực & Bảo mật</h2>
       
       <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='rounded-[2rem] border-border/50 overflow-hidden hover:border-primary/30 transition-colors'>
             <CardContent className='p-8'>
                <div className='flex items-start gap-4'>
                   <div className='h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0'>
                      <Smartphone size={24} />
                   </div>
                   <div className='flex-1'>
                      <h3 className='font-black mb-1'>Xác thực Số điện thoại</h3>
                      <p className='text-sm text-muted-foreground font-medium mb-6'>Thêm lớp bảo mật và nhận thông báo quan trọng qua SMS.</p>
                      <div className='p-4 rounded-xl bg-muted/40 border border-border/50 mb-6 flex items-center justify-between'>
                         <span className='font-bold text-sm'>09x xxx xxxx</span>
                         <span className='text-[10px] font-black text-amber-500 uppercase tracking-widest'>Chưa xác thực</span>
                      </div>
                      <Button className='w-full rounded-xl font-black' onClick={() => showToast('Mã OTP đã được gửi!', 'success')}>Gửi mã OTP</Button>
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card className='rounded-[2rem] border-border/50 overflow-hidden hover:border-primary/30 transition-colors'>
             <CardContent className='p-8'>
                <div className='flex items-start gap-4'>
                   <div className='h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0'>
                      <Mail size={24} />
                   </div>
                   <div className='flex-1'>
                      <h3 className='font-black mb-1'>Xác thực Email</h3>
                      <p className='text-sm text-muted-foreground font-medium mb-6'>Email của bạn dùng để đăng nhập và khôi phục mật khẩu.</p>
                      <div className='p-4 rounded-xl bg-muted/40 border border-border/50 mb-6 flex items-center justify-between'>
                         <span className='font-bold text-sm'>chanh.local@gmail.com</span>
                         <span className='text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1'>
                            <CheckCircle2 size={10} /> Đã xác thực
                         </span>
                      </div>
                      <Button variant='outline' className='w-full rounded-xl font-black'>Thay đổi Email</Button>
                   </div>
                </div>
             </CardContent>
          </Card>
       </div>

       <Card className='rounded-[2rem] border-border/50 overflow-hidden'>
          <CardHeader className='bg-muted/30'>
             <CardTitle className='text-lg font-black'>Đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent className='p-8 space-y-6'>
             <div className='grid grid-cols-1 gap-6 max-w-md'>
                <div className='space-y-2'>
                   <Label className='font-bold ml-1'>Mật khẩu hiện tại</Label>
                   <div className='relative'>
                      <Input type='password' placeholder='••••••••' className='h-12 rounded-xl' />
                      <Lock className='absolute right-4 top-3.5 text-muted-foreground' size={18} />
                   </div>
                </div>
                <div className='space-y-2'>
                   <Label className='font-bold ml-1'>Mật khẩu mới</Label>
                   <Input type='password' placeholder='Tối thiểu 8 ký tự' className='h-12 rounded-xl' />
                </div>
                <div className='space-y-2'>
                   <Label className='font-bold ml-1'>Xác nhận mật khẩu mới</Label>
                   <Input type='password' placeholder='Nhập lại mật khẩu mới' className='h-12 rounded-xl' />
                </div>
             </div>
             <div className='pt-4 border-t border-border/50'>
                <Button onClick={() => showToast('Mật khẩu đã được thay đổi!', 'success')} className='h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20'>Cập nhật mật khẩu</Button>
             </div>
          </CardContent>
       </Card>

       <div className='p-8 rounded-[2rem] border border-destructive/20 bg-destructive/5'>
          <h3 className='text-destructive font-black mb-2'>Khu vực nguy hiểm</h3>
          <p className='text-sm text-muted-foreground font-medium mb-6'>Khi xóa tài khoản, mọi dữ liệu xem phim và thông tin thanh toán sẽ bị xóa vĩnh viễn.</p>
          <Button variant='destructive' className='font-black rounded-xl'>Xóa tài khoản của tôi</Button>
       </div>
    </div>
  );
};

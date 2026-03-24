'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, EyeOff, Lock, User, Phone, Globe, 
  Calendar, Users, ShieldCheck, BadgeCheck,
  CheckCircle2
} from 'lucide-react';
import { SeparatorWithText } from '@/components/shared/SeparatorWithText';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card className='w-full max-w-2xl mx-auto shadow-none border-none bg-transparent'>
      <CardHeader className='space-y-2 text-center px-0 pb-10 pt-0'>
        <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'>
           <BadgeCheck className='h-8 w-8' />
        </div>
        <CardTitle className='text-4xl font-black tracking-tight text-foreground'>
          Bắt đầu trải nghiệm
        </CardTitle>
        <CardDescription className='text-base text-muted-foreground max-w-sm mx-auto'>
          Gia nhập cộng đồng CineChat để khám phá điện ảnh theo cách hoàn toàn mới.
        </CardDescription>
      </CardHeader>

      <CardContent className='px-0'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          
          {/* PHẦN 1: THÔNG TIN CÁ NHÂN */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3 mb-2'>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary ring-1 ring-primary/20'>01</span>
                <h3 className='text-sm font-bold uppercase tracking-widest text-primary/80'>Thông tin cá nhân</h3>
                <div className='h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <Label htmlFor='lastName' className='text-[13px] font-semibold text-foreground/70 ml-1'>Họ & Tên đệm</Label>
                <div className='relative group'>
                  <User className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                  <Input
                    id='lastName'
                    placeholder='Nguyễn'
                    className='pl-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='firstName' className='text-[13px] font-semibold text-foreground/70 ml-1'>Tên</Label>
                <Input
                  id='firstName'
                  placeholder='Văn A'
                  className='h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='space-y-2'>
                    <Label htmlFor='dob' className='text-[13px] font-semibold text-foreground/70 ml-1'>Ngày sinh</Label>
                    <div className='relative group'>
                        <Calendar className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                        <Input
                            id='dob'
                            type='date'
                            className='pl-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                            required
                        />
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='gender' className='text-[13px] font-semibold text-foreground/70 ml-1'>Giới tính</Label>
                    <div className='relative group'>
                        <Users className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none' />
                        <select
                            id='gender'
                            className='flex w-full rounded-xl border border-border/50 bg-muted/20 px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary appearance-none h-11 transition-all shadow-sm'
                            required
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <Label htmlFor='phone' className='text-[13px] font-semibold text-foreground/70 ml-1'>Số điện thoại</Label>
                <div className='relative group'>
                  <Phone className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='0987xxx...'
                    className='pl-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='country' className='text-[13px] font-semibold text-foreground/70 ml-1'>Quốc gia</Label>
                <div className='relative group'>
                  <Globe className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none' />
                  <select
                    id='country'
                    className='flex w-full rounded-xl border border-border/50 bg-muted/20 px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary appearance-none h-11 transition-all shadow-sm'
                    required
                  >
                    <option value="vn">Việt Nam</option>
                    <option value="us">Hoa Kỳ</option>
                    <option value="jp">Nhật Bản</option>
                    <option value="kr">Hàn Quốc</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* PHẦN 2: BẢO MẬT TÀI KHOẢN */}
          <div className='space-y-6 pt-4'>
            <div className='flex items-center gap-3 mb-2'>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary ring-1 ring-primary/20'>02</span>
                <h3 className='text-sm font-bold uppercase tracking-widest text-primary/80'>Tài khoản & Bảo mật</h3>
                <div className='h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent'></div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='username' className='text-[13px] font-semibold text-foreground/70 ml-1'>Tên đăng nhập</Label>
              <div className='relative group'>
                <User className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                <Input
                  id='username'
                  placeholder='vancinechat2026'
                  className='pl-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='space-y-2'>
                    <Label htmlFor='password' className='text-[13px] font-semibold text-foreground/70 ml-1'>Mật khẩu</Label>
                    <div className='relative group'>
                        <Lock className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                        <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            className='pl-10 pr-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors'>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='confirmPassword' className='text-[13px] font-semibold text-foreground/70 ml-1'>Xác nhận mật khẩu</Label>
                    <div className='relative group'>
                        <ShieldCheck className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                        <Input
                            id='confirmPassword'
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            className='pl-10 pr-10 h-11 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm'
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className='absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors'>
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* ĐIỀU KHOẢN & SUBMIT - DESIGN MỚI */}
          <div className='space-y-8 pt-8'>
            <div className='relative group p-6 rounded-[2rem] bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] border border-primary/10 transition-all hover:border-primary/20 shadow-sm'>
                <div className='flex gap-4'>
                    <div className='shrink-0 mt-0.5'>
                        <Checkbox 
                            id='terms' 
                            required 
                            className='h-6 w-6 rounded-lg border-primary/20 data-[state=checked]:bg-primary transition-transform active:scale-90' 
                        />
                    </div>
                    <div className='space-y-1'>
                        <Label
                            htmlFor='terms'
                            className='text-[13px] font-medium leading-relaxed cursor-pointer text-foreground/80'
                        >
                            Tôi xác nhận rằng các thông tin cung cấp ở trên là chính xác và hoàn toàn đồng ý tuân thủ các{' '}
                            <Link href='/terms' className='text-primary hover:underline font-black decoration-2 underline-offset-4'>Điều khoản dịch vụ</Link>
                            {' '}và{' '}
                            <Link href='/privacy' className='text-primary hover:underline font-black decoration-2 underline-offset-4'>Chính sách bảo mật</Link> của CineChat.
                        </Label>
                        <div className='flex items-center gap-1.5 text-[10px] font-bold text-primary/60 uppercase tracking-tighter'>
                            <CheckCircle2 className='h-3 w-3' />
                            Dữ liệu của bạn được mã hóa và bảo mật tuyệt đối
                        </div>
                    </div>
                </div>
            </div>

            <Button type='submit' className='w-full h-14 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 transition-all hover:shadow-[0_12px_40px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]' disabled={isLoading}>
                {isLoading ? 'Đang khởi tạo tài khoản...' : 'Đăng ký ngay'}
            </Button>
          </div>
        </form>

        <SeparatorWithText text='Hoặc tham gia nhanh với' className='my-10' />

        <Button
          variant='outline'
          type='button'
          disabled={isLoading}
          className='w-full h-12 text-base font-bold rounded-2xl border-border/50 bg-background/50 hover:bg-muted/30 transition-all hover:border-primary/30 shadow-sm'>
          <svg className='mr-3 h-5 w-5' viewBox='0 0 24 24'>
            <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
            <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
            <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
            <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
          </svg>
          Tiếp tục với Google
        </Button>
      </CardContent>

      <CardFooter className='flex flex-wrap items-center justify-center gap-2 text-base text-muted-foreground px-0 pb-0 pt-12'>
        <span>Đã là thành viên của CineChat?</span>
        <Link
          href='/login'
          className='font-black text-primary hover:underline transition-all underline-offset-4 decoration-[3px] shadow-primary/10'>
          Đăng nhập ngay
        </Link>
      </CardFooter>
    </Card>
  );
}

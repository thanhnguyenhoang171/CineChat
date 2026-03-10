import React, { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProfileLayout } from '@/features/profile/components/ProfileLayout';

export const metadata = {
  title: 'Cài đặt tài khoản | CineChat',
  description: 'Quản lý thông tin cá nhân và cài đặt trải nghiệm phim ảnh của bạn.',
};

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      
      <main className='pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto'>
        <Suspense fallback={<div className='py-20 text-center font-bold'>Đang tải cài đặt...</div>}>
           <ProfileLayout />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

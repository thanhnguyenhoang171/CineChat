import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchLayout } from '@/features/search/components/SearchLayout';

export const metadata = {
  title: 'Tìm kiếm thông minh | CineChat',
  description: 'Tìm kiếm phim bằng AI theo nội dung và cảm xúc.',
};

export default function SearchPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='pt-32 pb-20 px-6 md:px-16'>
        <SearchLayout />
      </main>
      <Footer />
    </div>
  );
}

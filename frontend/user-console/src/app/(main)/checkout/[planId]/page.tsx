import React, { use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckoutLayout } from '@/features/checkout/components/CheckoutLayout';

export const metadata = {
  title: 'Thanh toán | CineChat',
  description: 'Hoàn tất đăng ký gói cước CineChat của bạn.',
};

export default function CheckoutPage({ params }: { params: Promise<{ planId: string }> }) {
  const resolvedParams = use(params);
  const planId = resolvedParams.planId;

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='pt-32 pb-20 px-6 md:px-16 max-w-6xl mx-auto'>
        <CheckoutLayout planId={planId} />
      </main>
      <Footer />
    </div>
  );
}

import React, { Suspense, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MyListLayout } from '@/features/movies/components/MyListLayout';
import { MyListLoader, MyListSkeleton } from '@/features/movies/components/MyListLoader';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Danh sách của tôi | CineChat',
  description: 'Quản lý các bộ phim yêu thích của bạn.',
};

export default function MyListPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const resolvedParams = use(searchParams);
  const filter = resolvedParams.filter || 'all';

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto'>
        {/* Client Layout bọc ngoài */}
        <MyListLayout>
           {/* Server Component Loader bọc trong Suspense */}
           <Suspense key={filter} fallback={<MyListSkeleton />}>
              <MyListLoader />
           </Suspense>

           {/* AI Widget tĩnh */}
           <section className='mt-20 p-10 rounded-[3rem] bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20 flex flex-col md:flex-row items-center gap-10'>
              <div className='h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shrink-0'>
                 <Sparkles size={40} />
              </div>
              <div className='flex-1 text-center md:text-left space-y-2'>
                 <h3 className='text-2xl font-black text-foreground'>Gợi ý từ danh sách này</h3>
                 <p className='text-muted-foreground font-medium'>AI đang phân tích danh sách yêu thích để tìm những siêu phẩm tương tự cho bạn.</p>
              </div>
              <Button className='rounded-xl h-12 px-8 font-black shrink-0 shadow-lg shadow-primary/20'>Xem gợi ý AI</Button>
           </section>
        </MyListLayout>
      </main>
      <Footer />
    </div>
  );
}

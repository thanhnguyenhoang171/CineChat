import React, { use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CollectionLayout } from '@/features/movies/components/CollectionLayout';

// Mock data remains on server side for now
const MOCK_MOVIES = [
  { id: 1, title: 'Oppenheimer', rating: 8.9, year: 2023, quality: '4K', type: 'premium', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Dune: Part Two', rating: 8.8, year: 2024, quality: '4K', type: 'premium', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'The Dark Knight', rating: 9.0, year: 2008, quality: 'Full HD', type: 'free', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Avatar: The Way of Water', rating: 7.8, year: 2022, quality: '4K', type: 'rental', price: '49K', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Inception', rating: 8.8, year: 2010, quality: 'Full HD', type: 'premium', image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Spider-Man: Across the Spider-Verse', rating: 8.7, year: 2023, quality: '4K', type: 'free', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop' },
];

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <CollectionLayout slug={slug} movies={MOCK_MOVIES} />
      <Footer />
    </div>
  );
}

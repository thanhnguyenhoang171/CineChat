import type { Route } from './+types/movie-list';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard quản trị viên' },
    { name: 'description', content: 'Welcome to Admin Dashboard!' },
  ];
}

export default function MoviesListPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      Movie List
    </div>
  );
}

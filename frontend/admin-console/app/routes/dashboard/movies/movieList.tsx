import type { Route } from './+types/movieList';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard quản trị viên' }];
}

export default function MoviesListPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      Movie List
    </div>
  );
}

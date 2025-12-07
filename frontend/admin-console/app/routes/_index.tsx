import { redirect } from 'react-router';
import type { Route } from './+types/_index';
import { useBoundStore } from '~/store';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const token = useBoundStore.getState().accessToken;

  if (token) {
    return redirect('/dashboard');
  }

  return redirect('/login');
}

export function hydrateFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
    </div>
  );
}

export default function Index() {
  return null;
}

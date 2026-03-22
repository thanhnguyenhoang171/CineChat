import { Outlet } from 'react-router';
import { LanguageToggle } from '~/components/shared/language-toggle';

export default function AuthLayout() {
  return (
    <>
      <div className='absolute right-4 top-4 md:right-8 md:top-8 z-50'>
        <LanguageToggle />
      </div>
      <Outlet />
    </>
  );
}

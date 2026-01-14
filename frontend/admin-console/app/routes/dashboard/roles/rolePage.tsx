import { RoleList } from '~/features/roles/components/roleList';
import type { Route } from './+types/rolePage';

export default function RolePage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      <RoleList />
    </div>
  );
}

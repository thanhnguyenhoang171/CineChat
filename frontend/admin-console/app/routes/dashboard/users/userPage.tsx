import { UserList } from '~/features/users/components/userList';

export default function UserPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      <UserList />
    </div>
  );
}

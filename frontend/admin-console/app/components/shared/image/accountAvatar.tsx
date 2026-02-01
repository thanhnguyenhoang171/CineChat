import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';
import type { User } from '~/types/module-types/user';

interface AccountAvatarProps {
  setOpenUploadAvatar?: (openUploadAvatar: boolean) => void;
  className?: string;
  user: User | null;
}

export function AccountAvatar({
  className,
  user,
  setOpenUploadAvatar,
}: AccountAvatarProps) {
  const [editAvatarHover, setEditAvatarHover] = useState(false);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center cursor-pointer overflow-hidden group',
        className,
      )}
      onMouseEnter={() => setEditAvatarHover(true)}
      onMouseLeave={() => setEditAvatarHover(false)}
      onClick={() => setOpenUploadAvatar?.(true)}>
      <Avatar className='size-full border-none'>
        <AvatarImage
          src={user?.picture}
          className={cn(
            'object-cover transition-all duration-300',
            editAvatarHover && 'scale-110 blur-[1px]', // light zoom and blur when hover
          )}
          alt='User avatar'
        />
        <AvatarFallback
          className={cn(
            'transition-all duration-300',
            editAvatarHover && 'scale-110 blur-[1px]', // light zoom and blur when hover
          )}>
          {(user?.firstName?.[0] || 'A').toUpperCase()}
          {(user?.lastName?.[0] || '').toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Light black overlay and icon*/}
      <div
        className={cn(
          'absolute inset-0 z-10 flex items-center justify-center transition-all duration-300',
          'bg-black/40',
          editAvatarHover ? 'opacity-100' : 'opacity-0',
        )}>
        <SquarePen className='text-white size-1/4 animate-in zoom-in-50 duration-200' />
      </div>
    </div>
  );
}

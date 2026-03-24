import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';
import type { User } from '~/types/module-types/user';

interface UserAvatarProps {
  className?: string;
  user: User | null;
}

export function UserAvatar({ className, user }: UserAvatarProps) {
  return (
    <Avatar className={cn('object-cover', className)}>
      <AvatarImage
        src={user?.picture?.url}
        alt={`${user?.firstName || 'User'} avatar`}
      />
      <AvatarFallback>
        {(user?.firstName?.[0] || 'A').toUpperCase()}
        {(user?.lastName?.[0] || '').toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

import { FunnelPlus, MoreHorizontalIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export function PermissionFilter() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' aria-label='Open menu' size='icon-sm'>
            <FunnelPlus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='end'>
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>New File...</DropdownMenuItem>
            <DropdownMenuItem>Share...</DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

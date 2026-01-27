import { FunnelPlus, MoreHorizontalIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export function PermissionFilterDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' aria-label='Open menu' size='icon-sm'>
            <FunnelPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center gap-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input
                id='link'
                defaultValue='https://ui.shadcn.com/docs/installation'
                readOnly
              />
            </div>
          </div>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Filter
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

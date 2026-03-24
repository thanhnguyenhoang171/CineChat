import { useTranslation } from 'react-i18next';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { RotateCcw, Filter, UserCog, ToggleRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { roleQueries } from '~/queries/role.queries';

interface UserFilterProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentFilters: {
    isActive: string;
    roleId: string;
  };
  onApply: (filters: { 
    isActive: string;
    roleId: string;
  }) => void;
  onReset: () => void;
}

export function UserFilter({
  isOpen,
  setIsOpen,
  currentFilters,
  onApply,
  onReset,
}: UserFilterProps) {
  const { t } = useTranslation(['user', 'app']);
  const [localIsActive, setLocalIsActive] = useState(currentFilters.isActive);
  const [localRoleId, setLocalRoleId] = useState(currentFilters.roleId);

  // Fetch roles for filter dropdown
  const { data: rolesData } = useQuery(
    roleQueries.list(1, 100, 'name', 'asc', '', '', '1')
  );
  const roles = rolesData?.data || [];

  useEffect(() => {
    setLocalIsActive(currentFilters.isActive);
    setLocalRoleId(currentFilters.roleId);
  }, [currentFilters, isOpen]);

  const handleApply = () => {
    onApply({ isActive: localIsActive, roleId: localRoleId });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='h-10 flex items-center gap-2 border-muted-foreground/20 hover:bg-muted/50'>
          <Filter className='w-4 h-4' />
          <span className='hidden sm:inline'>{t('app:button.apply')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-md flex flex-col h-full p-0'>
        <SheetHeader className='p-6 border-b shrink-0 text-left'>
          <SheetTitle className='flex items-center gap-2 text-xl font-bold'>
            <Filter className='w-5 h-5 text-primary' />
            {t('app:button.apply')}
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto p-6 space-y-8'>
          {/* Status Filter */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2'>
              <ToggleRight className='w-3.5 h-3.5 text-primary/60' />
              {t('user:createDialog.status')}
            </Label>
            <Select 
              value={localIsActive} 
              onValueChange={setLocalIsActive}
            >
              <SelectTrigger className='h-11 border-muted-foreground/20 bg-muted/20'>
                <SelectValue placeholder={t('app:select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all' className='font-medium'>{t('app:status.all')}</SelectItem>
                <SelectItem value='1' className='font-medium'>{t('app:status.active')}</SelectItem>
                <SelectItem value='0' className='font-medium'>{t('app:status.inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='h-px bg-muted-foreground/10' />

          {/* Role Filter */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2'>
              <UserCog className='w-3.5 h-3.5 text-primary/60' />
              {t('user:createDialog.role')}
            </Label>
            <Select 
              value={localRoleId} 
              onValueChange={setLocalRoleId}
            >
              <SelectTrigger className='h-11 border-muted-foreground/20 bg-muted/20'>
                <SelectValue placeholder={t('app:select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all' className='font-medium'>{t('app:status.all')}</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role._id} value={role._id} className='font-medium'>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className='p-6 border-t bg-background shrink-0'>
          <div className='flex w-full gap-3'>
            <Button
              variant='ghost'
              className='flex-1 h-11 font-bold text-muted-foreground hover:bg-muted'
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
            >
              <RotateCcw className='w-4 h-4 mr-2' />
              {t('app:button.reset')}
            </Button>
            <Button 
              className='flex-1 h-11 font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90' 
              onClick={handleApply}
            >
              {t('app:button.apply')}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

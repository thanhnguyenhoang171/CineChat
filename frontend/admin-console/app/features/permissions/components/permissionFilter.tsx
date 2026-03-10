import { useTranslation } from 'react-i18next';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
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
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { RotateCcw, Filter, SortAsc, SortDesc, ArrowUpDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '~/lib/utils';

interface PermissionFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    method: string;
    module: string;
    isActive: string;
    sortBy: string;
    sortDir: 'asc' | 'desc';
  };
  onApply: (filters: { 
    method: string; 
    module: string; 
    isActive: string;
    sortBy: string;
    sortDir: 'asc' | 'desc';
  }) => void;
  onReset: () => void;
}

export function PermissionFilter({
  open,
  onOpenChange,
  filters,
  onApply,
  onReset,
}: PermissionFilterProps) {
  const { t } = useTranslation(['permission', 'app']);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, open]);

  const handleApply = () => {
    onApply(localFilters);
    onOpenChange(false);
  };

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  
  const sortOptions = [
    { label: t('permission:filter.sort.createdAt'), value: 'createdAt' },
    { label: t('permission:filter.sort.updatedAt'), value: 'updatedAt' },
    { label: t('permission:filter.sort.name'), value: 'name' },
    { label: t('permission:filter.sort.method'), value: 'method' },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-md flex flex-col h-full p-0'>
        <SheetHeader className='p-6 border-b shrink-0'>
          <SheetTitle className='flex items-center gap-2 text-xl'>
            <Filter className='w-5 h-5 text-primary' />
            {t('permission:filter.title')}
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto p-6 space-y-8'>
          {/* Sorting Section */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2'>
              <ArrowUpDown className='w-3 h-3' />
              {t('permission:filter.sort.title')}
            </Label>
            <div className='grid grid-cols-1 gap-3'>
              <Select 
                value={localFilters.sortBy} 
                onValueChange={(val) => setLocalFilters(prev => ({ ...prev, sortBy: val }))}
              >
                <SelectTrigger className='h-11 border-muted-foreground/20 bg-muted/20'>
                  <SelectValue placeholder={t('permission:filter.sort.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className='font-medium'>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className='flex p-1 bg-muted/30 rounded-lg border border-muted-foreground/10'>
                <Button
                  variant={localFilters.sortDir === 'asc' ? 'default' : 'ghost'}
                  size='sm'
                  className='flex-1 h-9 font-bold text-xs'
                  onClick={() => setLocalFilters(prev => ({ ...prev, sortDir: 'asc' }))}
                >
                  <SortAsc className='w-3.5 h-3.5 mr-2' />
                  {t('app:sort.asc')}
                </Button>
                <Button
                  variant={localFilters.sortDir === 'desc' ? 'default' : 'ghost'}
                  size='sm'
                  className='flex-1 h-9 font-bold text-xs'
                  onClick={() => setLocalFilters(prev => ({ ...prev, sortDir: 'desc' }))}
                >
                  <SortDesc className='w-3.5 h-3.5 mr-2' />
                  {t('app:sort.desc')}
                </Button>
              </div>
            </div>
          </div>

          <div className='h-px bg-muted-foreground/10' />

          {/* Method Filter */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider'>
              {t('permission:filter.method')}
            </Label>
            <div className='flex flex-wrap gap-2'>
              {methods.map((m) => (
                <Badge
                  key={m}
                  variant={localFilters.method === m ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer px-4 py-1.5 text-[11px] font-bold h-8 transition-all',
                    localFilters.method === m 
                      ? 'bg-primary shadow-sm' 
                      : 'hover:border-primary/50 bg-background text-muted-foreground'
                  )}
                  onClick={() => setLocalFilters(prev => ({ ...prev, method: prev.method === m ? '' : m }))}
                >
                  {m}
                </Badge>
              ))}
            </div>
          </div>

          {/* Module Filter */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider'>
              {t('permission:filter.module')}
            </Label>
            <Input
              placeholder={t('permission:filter.modulePlaceholder')}
              value={localFilters.module}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, module: e.target.value }))}
              className='h-11 border-muted-foreground/20 focus-visible:ring-primary/20 bg-muted/20'
            />
          </div>

          {/* Status Filter */}
          <div className='space-y-4'>
            <Label className='text-[11px] font-bold uppercase text-muted-foreground tracking-wider'>
              {t('permission:filter.status')}
            </Label>
            <Select 
              value={localFilters.isActive} 
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, isActive: val }))}
            >
              <SelectTrigger className='h-11 border-muted-foreground/20 bg-muted/20'>
                <SelectValue placeholder={t('permission:filter.statusPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all' className='font-medium'>{t('app:status.all')}</SelectItem>
                <SelectItem value='1' className='font-medium'>{t('app:status.active')}</SelectItem>
                <SelectItem value='0' className='font-medium'>{t('app:status.inactive')}</SelectItem>
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
                onOpenChange(false);
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

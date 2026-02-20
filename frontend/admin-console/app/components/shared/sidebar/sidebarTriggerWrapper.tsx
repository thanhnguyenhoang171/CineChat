import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';

export function SidebarTriggerWrapper({
  isMobile,
  className,
}: {
  isMobile: boolean;
  className?: string;
}) {
  const { open } = useSidebar();

  if (isMobile) return null;

  return (
    <SidebarTrigger open={open} className={cn(!open && 'hidden', className)} />
  );
}

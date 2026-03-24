import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

export function AppThemeModeButton() {
  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();
        console.log('Item clicked, dropdown stays open');
      }}>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Theme Mode</Label>
    </DropdownMenuItem>
  );
}

import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRevalidator } from 'react-router';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '~/components/ui/dropdown-menu';

interface ChangeLanguageSubMenuProps {
  sideOffset?: number;
}

export function ChangeLanguageSubMenu({
  sideOffset,
}: ChangeLanguageSubMenuProps) {
  const { t, i18n } = useTranslation('app');
  const revalidator = useRevalidator();

  const handleChangeLanguage = async (lang: string) => {
    console.log('Check lang = ', lang);

    await i18n.changeLanguage(lang);
  };
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Globe />
        <span>{t('sidebar.language')}</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent sideOffset={sideOffset}>
        <DropdownMenuItem onClick={() => handleChangeLanguage('vi')}>
          <span>Tiếng Việt</span>
          {i18n.language === 'vi' && <Check className='ml-auto h-4 w-4' />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLanguage('en')}>
          <span>English</span>
          {i18n.language === 'en' && <Check className='ml-auto h-4 w-4' />}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

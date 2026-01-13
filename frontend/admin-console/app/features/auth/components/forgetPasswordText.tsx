import { useTranslation } from 'react-i18next';

//  TODO: Handle Forget password
const ForgetPasswordText = () => {
  const { t } = useTranslation('login');
  return (
    <div className='flex items-center justify-center'>
      <a
        href=''
        className='font-medium hover:underline text-muted-foreground transition-colors'>
        {t('text.forgetPassword')}
      </a>
    </div>
  );
};
export default ForgetPasswordText;

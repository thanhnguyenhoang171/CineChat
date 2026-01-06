import { Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  isPending: boolean;
}

const GoogleLoginButton = ({ isPending }: GoogleLoginButtonProps) => {
  const handleGGLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  return (
    <div className='flex justify-center'>
      <Button
        type='button'
        variant='secondary'
        className='w-[80%] rounded-[5px] flex items-center justify-center gap-2'
        disabled={isPending}
        onClick={handleGGLogin}>
        {isPending ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Đang đăng nhập...</span>
          </>
        ) : (
          <>
            <FcGoogle className='h-5 w-5' />
            <span>Sign in with Google</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleLoginButton;

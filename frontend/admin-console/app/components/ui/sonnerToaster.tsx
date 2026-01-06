import { Toaster as SonnerToaster } from 'sonner';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export function SonnerToasterComponent() {
  return (
    <SonnerToaster
      position='top-center'
      expand={true}
      richColors
      duration={3000}
      toastOptions={{
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        },
        classNames: {
          content: 'flex items-center justify-center gap-3',
          title: 'text-center font-bold',
          description: 'text-center text-md text-gray-500',
        },
      }}
      icons={{
        success: <CheckCircle className='h-5 w-5 text-green-500' />,
        info: <Info className='h-5 w-5 text-blue-500' />,
        warning: <AlertTriangle className='h-5 w-5 text-yellow-500' />,
        error: <XCircle className='h-5 w-5 text-red-500' />,
      }}
    />
  );
}

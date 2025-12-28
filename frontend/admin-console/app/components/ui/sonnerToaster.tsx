import { Toaster as SonnerToaster } from 'sonner';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export function SonnerToasterComponent() {
  return (
    <SonnerToaster
      position='top-right'
      expand={true}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        classNames: {
          toast: 'group border-border shadow-lg font-sans',
          title: 'text-base font-bold',
          description: 'text-sm text-gray-500',
          actionButton: 'bg-slate-900 text-white font-medium',
          cancelButton: 'bg-gray-100 text-gray-500',
          closeButton: 'bg-white hover:bg-gray-100 border-gray-200',
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

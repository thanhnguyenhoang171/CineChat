import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../../ui/button';

interface GeneralErrorProps {
  message?: string;
  details?: string;
  stack?: string;
}

export function GeneralError({
  message = 'Oops!',
  details = 'An unexpected error occurred.',
  stack,
}: GeneralErrorProps) {
  // Hàm reload trang khi bị crash
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-center'>
      <div className='bg-white p-8 rounded-xl shadow-sm border max-w-2xl w-full'>
        <div className='flex justify-center mb-s6'>
          <div className='p-4 bg-red-100 rounded-full'>
            <AlertTriangle className='w-12 h-12 text-red-600' />
          </div>
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-3'>{message}</h1>
        <p className='text-gray-500 mb-8 text-lg'>{details}</p>

        {/* Nút Reload trang - Rất quan trọng khi bị Crash */}
        <div className='flex gap-4 justify-center mb-8'>
          <Button
            onClick={() => (window.location.href = '/')}
            variant='outline'>
            Về trang chủ
          </Button>
          <Button
            onClick={handleReload}
            className='gap-2 bg-red-600 hover:bg-red-700 text-white'>
            <RefreshCcw size={16} />
            Tải lại trang
          </Button>
        </div>

        {/* Hiển thị Stack Trace (chỉ hiện khi có stack - thường là môi trường Dev) */}
        {stack && (
          <div className='text-left mt-6'>
            <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2'>
              Error Stack Trace
            </div>
            <div className='bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto shadow-inner text-sm font-mono max-h-[300px]'>
              <pre>
                <code>{stack}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

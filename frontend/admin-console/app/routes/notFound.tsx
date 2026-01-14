import { Link, useNavigate } from 'react-router';
import { MoveLeft, Home } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { Route } from './+types/notFound';


export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center p-4'>
      <h1 className='text-9xl font-extrabold text-slate-200 select-none'>
        404
      </h1>

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8'>
        <h2 className='text-2xl font-bold text-slate-900 mb-2'>
          Oops! Trang này không tồn tại
        </h2>
        <p className='text-slate-500 mb-8 max-w-[500px]'>
          Có vẻ như đường dẫn bạn đang truy cập bị lỗi hoặc trang đã bị xóa. Hãy
          kiểm tra lại URL hoặc quay về trang chủ.
        </p>

        {/* Cụm nút điều hướng */}
        <div className='flex gap-4 justify-center'>
          <Button
            variant='outline'
            onClick={() => navigate(-1)} // Quay lại trang trước
            className='gap-2'>
            <MoveLeft size={16} />
            Quay lại
          </Button>

          <Button asChild className='gap-2'>
            <Link to='/dashboard'>
              <Home size={16} />
              Về Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

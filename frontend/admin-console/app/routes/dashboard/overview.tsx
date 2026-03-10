export default function Overview() {
  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
          <h3 className='text-slate-500 text-sm font-medium'>Tổng người dùng</h3>
          <p className='text-3xl font-black text-slate-800 mt-2'>1,248</p>
          <div className='mt-4 flex items-center text-green-500 text-xs font-bold'>
            <span>+12% so với tháng trước</span>
          </div>
        </div>
        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
          <h3 className='text-slate-500 text-sm font-medium'>Vai trò hệ thống</h3>
          <p className='text-3xl font-black text-slate-800 mt-2'>12</p>
          <div className='mt-4 flex items-center text-blue-500 text-xs font-bold'>
            <span>3 vai trò mới được thêm</span>
          </div>
        </div>
        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
          <h3 className='text-slate-500 text-sm font-medium'>Quyền truy cập</h3>
          <p className='text-3xl font-black text-slate-800 mt-2'>85</p>
          <div className='mt-4 flex items-center text-orange-500 text-xs font-bold'>
            <span>Hoạt động trên 10 modules</span>
          </div>
        </div>
      </div>

      <div className='mt-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center italic text-slate-400'>
        Biểu đồ thống kê sẽ được hiển thị tại đây
      </div>
    </div>
  );
}

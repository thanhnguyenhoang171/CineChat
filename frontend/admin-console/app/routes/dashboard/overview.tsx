import { Users, Film, MessageSquare, ShieldCheck, TrendingUp, Activity } from 'lucide-react';
import { StatCard } from '~/features/dashboard/components/statCard';
import { GrowthChart } from '~/features/dashboard/components/growthChart';
import { GenreChart } from '~/features/dashboard/components/genreChart';
import { RecentActivity } from '~/features/dashboard/components/recentActivity';

export default function Overview() {
  return (
    <div className='flex flex-col gap-8 p-6 bg-slate-50/30 min-h-screen'>
      {/* Welcome Section */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-black tracking-tight text-slate-900'>Bảng điều khiển</h1>
          <p className='text-slate-500 font-medium'>
            Chào mừng trở lại! Đây là tóm tắt hoạt động của CineChat.
          </p>
        </div>
        <div className='flex items-center gap-3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm'>
          <button className='px-4 py-2 text-sm font-bold text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-all'>
            Tạo báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Tổng người dùng'
          value='1,248'
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description='so với tháng trước'
          className='border-l-4 border-l-blue-500'
        />
        <StatCard
          title='Phim đang hoạt động'
          value='432'
          icon={Film}
          trend={{ value: 5.4, isPositive: true }}
          description='mới được thêm tuần này'
          className='border-l-4 border-l-emerald-500'
        />
        <StatCard
          title='Đánh giá chờ duyệt'
          value='28'
          icon={MessageSquare}
          trend={{ value: 2, isPositive: false }}
          description='cần được xử lý ngay'
          className='border-l-4 border-l-orange-500'
        />
        <StatCard
          title='Trạng thái hệ thống'
          value='Ổn định'
          icon={ShieldCheck}
          description='Tất cả dịch vụ đang hoạt động'
          className='border-l-4 border-l-indigo-500'
          iconClassName='bg-indigo-50 text-indigo-600'
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <GrowthChart />
        <GenreChart />
      </div>

      {/* Bottom Section: Activity & More */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <RecentActivity />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='bg-gradient-to-br from-primary to-blue-600 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between overflow-hidden relative group'>
            <div className='absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500' />
            <div className='z-10'>
              <Activity className='h-10 w-10 mb-6 opacity-80' />
              <h3 className='text-xl font-black mb-2'>Nâng cấp hệ thống</h3>
              <p className='text-primary-foreground/90 text-sm leading-relaxed'>
                Dữ liệu lớn? Tốc độ chậm? Nâng cấp server ngay để tối ưu trải nghiệm người dùng.
              </p>
            </div>
            <button className='mt-8 bg-white text-primary font-black py-3 px-6 rounded-xl text-sm shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all w-full z-10'>
              Tìm hiểu thêm
            </button>
          </div>
          <div className='bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between hover:border-primary/50 transition-colors'>
            <div>
              <TrendingUp className='h-10 w-10 mb-6 text-primary opacity-80' />
              <h3 className='text-xl font-black text-slate-900 mb-2'>Thống kê chi tiết</h3>
              <p className='text-slate-500 text-sm leading-relaxed font-medium'>
                Xem báo cáo phân tích sâu về hành vi người dùng và hiệu suất phim.
              </p>
            </div>
            <button className='mt-8 bg-slate-900 text-white font-black py-3 px-6 rounded-xl text-sm shadow-lg hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all w-full'>
              Xem báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

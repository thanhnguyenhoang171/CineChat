import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';

const activities = [
  {
    id: '1',
    user: 'Nguyễn Văn A',
    action: 'đã đăng ký tài khoản mới',
    time: '2 phút trước',
    avatar: '',
    initials: 'NA',
  },
  {
    id: '2',
    user: 'Trần Thị B',
    action: 'vừa cập nhật thông tin phim "Avatar: The Way of Water"',
    time: '15 phút trước',
    avatar: '',
    initials: 'TB',
  },
  {
    id: '3',
    user: 'Lê Văn C',
    action: 'đã phê duyệt 5 đánh giá mới',
    time: '1 giờ trước',
    avatar: '',
    initials: 'LC',
  },
  {
    id: '4',
    user: 'Phạm Minh D',
    action: 'vừa thay đổi quyền truy cập của vai trò Editor',
    time: '3 giờ trước',
    avatar: '',
    initials: 'PD',
  },
  {
    id: '5',
    user: 'Hoàng Anh E',
    action: 'đã xóa một video trailer lỗi',
    time: '5 giờ trước',
    avatar: '',
    initials: 'HE',
  },
];

export function RecentActivity() {
  return (
    <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg font-semibold'>Hoạt động gần đây</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          Các thao tác mới nhất được thực hiện trong hệ thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {activities.map((activity) => (
            <div key={activity.id} className='flex items-center gap-4 group'>
              <Avatar className='h-10 w-10 border-2 border-slate-100 group-hover:border-primary/20 transition-colors'>
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className='bg-slate-100 text-slate-600 font-medium text-xs'>
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5 flex-1 min-w-0'>
                <p className='text-sm font-medium text-slate-900 leading-none truncate'>
                  {activity.user}
                </p>
                <p className='text-xs text-slate-500 line-clamp-2 leading-relaxed'>
                  {activity.action}
                </p>
              </div>
              <div className='text-[10px] font-medium text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-full'>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

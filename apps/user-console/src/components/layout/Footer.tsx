import Link from 'next/link';
import { Clapperboard, Facebook, Instagram, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Khám phá',
      links: [
        { name: 'Mới phát hành', href: '/collections/moi-phat-hanh' },
        { name: 'Phổ biến nhất', href: '/collections/pho-bien-nhat' },
        { name: 'Bộ lọc nâng cao', href: '/browse' },
        { name: 'Tìm kiếm thông minh', href: '/search' },
      ],
    },
    {
      title: 'CineChat AI',
      links: [
        { name: 'Hành trình AI', href: '/collections/ai-personalized' },
        { name: 'Cá nhân hóa', href: '/collections/ai-goi-y-rieng-cho-ban' },
        { name: 'Danh sách của tôi', href: '/my-list' },
        { name: 'Về CineChat', href: '/about' },
      ],
    },
    {
      title: 'Thành viên',
      links: [
        { name: 'Gói Premium', href: '/pricing' },
        { name: 'Quản lý tài khoản', href: '/profile' },
        { name: 'Thanh toán & Thẻ', href: '/profile?tab=payment' },
        { name: 'Đăng nhập / Đăng ký', href: '/login' },
      ],
    },
  ];

  return (
    <footer className='bg-card pt-20 pb-10 border-t border-border/50'>
      <div className='max-w-7xl mx-auto px-6 md:px-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
          {/* Brand Column */}
          <div className='space-y-6'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20'>
                <Clapperboard className='h-6 w-6 text-primary-foreground' />
              </div>
              <span className='text-2xl font-black tracking-tighter text-foreground'>
                CineChat
              </span>
            </Link>
            <p className='text-muted-foreground leading-relaxed text-sm font-medium'>
              CineChat là nền tảng điện ảnh thông minh, nơi AI thấu hiểu gu phim của bạn và mang lại những trải nghiệm xem phim cá nhân hóa tuyệt vời nhất.
            </p>
            <div className='flex gap-4'>
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <Link key={i} href='#' className='h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all'>
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title} className='space-y-6'>
              <h4 className='text-sm font-black uppercase tracking-[0.2em] text-foreground'>
                {section.title}
              </h4>
              <ul className='space-y-4'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-b border-border/50 mb-10'>
          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
              <MapPin size={16} />
            </div>
            123 Cinema Street, Cine City, VN
          </div>
          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
              <Phone size={16} />
            </div>
            +84 123 456 789
          </div>
          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
              <Mail size={16} />
            </div>
            hello@cinechat.com
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
            © {currentYear} CineChat - Dự án mã nguồn mở.
          </p>
          <div className='flex items-center gap-6'>
             <div className='flex items-center gap-1.5'>
                <div className='h-2 w-2 rounded-full bg-green-500 animate-pulse'></div>
                <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-tighter'>Hệ thống ổn định</span>
             </div>
             <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-tighter'>
                Design by CineChat Team
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

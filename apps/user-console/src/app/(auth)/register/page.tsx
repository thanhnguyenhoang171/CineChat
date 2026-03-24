import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata = {
  title: 'Đăng ký thành viên | CineChat',
  description: 'Tham gia cộng đồng CineChat và bắt đầu hành trình điện ảnh của bạn.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}

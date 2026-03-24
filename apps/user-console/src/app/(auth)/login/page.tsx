import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Đăng nhập | CineChat',
  description: 'Truy cập vào tài khoản CineChat của bạn.',
};

export default function LoginPage() {
  return <LoginForm />;
}

import { parse } from 'cookie'; // Import hàm parse từ thư viện

export function getLocaleFromRequest(request: Request): string {
  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) return 'vi';

  //  Object { key: value }"app_lang=en; other=123" -> { app_lang: "en", other: "123" }
  const cookies = parse(cookieHeader);

  return cookies['app_lang'] || 'vi';
}

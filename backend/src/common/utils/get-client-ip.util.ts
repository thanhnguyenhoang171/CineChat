import { Request } from 'express';

export function getClientIpUtil(request: Request) {
  // Kiểm tra danh sách IP
  const xForwardedFor = request.headers['x-forwarded-for'] as string;
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim(); //IP thật (cái đầu tiên)
  }
  return request.socket.remoteAddress || ''; // IP của socket (proxy/server)
}

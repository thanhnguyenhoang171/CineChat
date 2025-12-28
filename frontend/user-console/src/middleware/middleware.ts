import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
};

// NOTE: Next.js expects middleware.ts to be in the root or src/ directory.
// You might need to move this file to src/middleware.ts or setup a custom config.

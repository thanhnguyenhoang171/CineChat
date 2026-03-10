'use client';

import { usePathname } from 'next/navigation';
import { ChatWidget } from '@/features/chat';
import { FeedbackWidget } from '@/features/feedback/components/FeedbackWidget';

export function ConditionalChatWidget() {
  const pathname = usePathname();
  
  // Define routes where widgets should be hidden
  const hideRoutes = ['/login', '/register'];
  
  if (hideRoutes.includes(pathname)) {
    return null;
  }

  return (
    <>
      <ChatWidget />
      <FeedbackWidget />
    </>
  );
}

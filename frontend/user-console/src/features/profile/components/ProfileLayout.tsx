'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

import { ProfileSidebar } from './ProfileSidebar';
import { PersonalSection } from './PersonalSection';
import { PaymentSection } from './PaymentSection';
import { SecuritySection } from './SecuritySection';
import { NotificationsSection } from './NotificationsSection';
import { SettingsSection } from './SettingsSection';
import { Toast } from '@/components/shared/Toast';

type TabType = 'personal' | 'payment' | 'security' | 'notifications' | 'settings';

export const ProfileLayout = () => {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'personal';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className='flex flex-col md:flex-row gap-10'>
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} showToast={showToast} />

      <div className='flex-1 min-w-0'>
         <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
               {activeTab === 'personal' && <PersonalSection onSave={() => showToast('Đã cập nhật thông tin!')} />}
               {activeTab === 'payment' && <PaymentSection showToast={showToast} />}
               {activeTab === 'security' && <SecuritySection showToast={showToast} />}
               {activeTab === 'notifications' && <NotificationsSection onSave={() => showToast('Đã lưu cài đặt!')} />}
               {activeTab === 'settings' && <SettingsSection onSave={() => showToast('Đã lưu cài đặt hệ thống!')} />}
            </motion.div>
         </AnimatePresence>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

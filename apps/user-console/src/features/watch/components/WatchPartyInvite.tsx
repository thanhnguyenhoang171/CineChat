'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Link as LinkIcon, QrCode, Copy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface WatchPartyInviteProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
}

export const WatchPartyInvite = ({ isOpen, onClose, movieTitle }: WatchPartyInviteProps) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://cinechat.io/party/watch-789-abc";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]' 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[310] w-full max-w-md p-8 rounded-[3rem] bg-card border border-border/50 shadow-2xl space-y-8'
      >
         <div className='flex justify-between items-start'>
            <div className='space-y-1'>
               <div className='flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]'>
                  <Users size={14} /> Social Feature
               </div>
               <h3 className='text-3xl font-black tracking-tighter'>Mời xem chung</h3>
            </div>
            <button onClick={onClose} className='p-2 hover:bg-muted rounded-full transition-colors'><X size={20} /></button>
         </div>

         <div className='p-6 rounded-3xl bg-muted/30 border border-border/50 space-y-4 text-center'>
            <p className='text-sm font-medium text-muted-foreground'>Đang chuẩn bị phòng xem phim cho:</p>
            <h4 className='text-xl font-black text-foreground'>{movieTitle}</h4>
         </div>

         <div className='space-y-4'>
            <div className='space-y-2'>
               <p className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>Đường dẫn mời bạn bè</p>
               <div className='relative'>
                  <Input 
                    readOnly 
                    value={inviteLink}
                    className='h-14 pr-24 bg-muted/20 border-border/50 rounded-2xl font-medium'
                  />
                  <Button 
                    onClick={handleCopy}
                    className='absolute right-1.5 top-1.5 h-11 rounded-xl font-black gap-2 transition-all px-4'
                  >
                     {copied ? <Check size={16} /> : <Copy size={16} />}
                     {copied ? 'Đã chép' : 'Sao chép'}
                  </Button>
               </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
               <Button variant='outline' className='h-14 rounded-2xl font-bold border-2 gap-2'>
                  <QrCode size={20} /> Mã QR
               </Button>
               <Button variant='outline' className='h-14 rounded-2xl font-bold border-2 gap-2'>
                  <Users size={20} /> Danh sách bạn
               </Button>
            </div>
         </div>

         <p className='text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Phòng xem chung hỗ trợ tối đa 50 người
         </p>
      </motion.div>
    </>
  );
};

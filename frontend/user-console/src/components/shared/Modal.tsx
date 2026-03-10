'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  variant?: 'default' | 'destructive';
}

export const Modal = ({ isOpen, onClose, title, description, onConfirm, confirmText = "Xác nhận", variant = "default" }: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[250]' 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[260] w-full max-w-md p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-2xl space-y-6'
        >
           <div className='space-y-2'>
              <h3 className='text-2xl font-black tracking-tighter'>{title}</h3>
              <p className='text-muted-foreground font-medium'>{description}</p>
           </div>
           <div className='flex gap-3 pt-4'>
              <Button variant='ghost' onClick={onClose} className='flex-1 rounded-xl font-bold'>Hủy bỏ</Button>
              <Button 
                variant={variant === 'destructive' ? 'destructive' : 'default'} 
                onClick={() => { onConfirm(); onClose(); }}
                className='flex-1 rounded-xl font-black shadow-lg shadow-primary/20'
              >
                {confirmText}
              </Button>
           </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

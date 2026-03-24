'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquarePlus, Star, X, Send, CheckCircle2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Toast } from '@/components/shared/Toast';

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('ui');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { id: 'ui', name: 'Giao diện' },
    { id: 'ai', name: 'Trí tuệ nhân tạo' },
    { id: 'content', name: 'Nội dung phim' },
    { id: 'other', name: 'Góp ý khác' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
      setRating(0);
      setComment('');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className='fixed left-0 top-1/2 -translate-y-1/2 z-[100] bg-primary text-primary-foreground px-3 py-6 rounded-r-2xl shadow-2xl flex flex-col items-center gap-3 hover:pl-5 transition-all group border border-white/20'
      >
         <MessageSquarePlus size={20} className='group-hover:scale-110 transition-transform' />
         <span className='[writing-mode:vertical-lr] font-black uppercase tracking-widest text-[10px]'>Góp ý</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]' 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              className='fixed top-1/2 left-1/2 sm:left-10 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 z-[410] w-[95vw] max-w-md p-8 rounded-[3rem] bg-card border border-border/50 shadow-2xl space-y-8'
            >
               {isSubmitted ? (
                 <div className='py-10 text-center space-y-6'>
                    <div className='h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce'>
                       <Heart size={40} className='fill-current' />
                    </div>
                    <div className='space-y-2'>
                       <h3 className='text-2xl font-black tracking-tighter'>Cảm ơn bạn!</h3>
                       <p className='text-muted-foreground font-medium'>Ý kiến của bạn giúp CineChat ngày càng hoàn thiện hơn.</p>
                    </div>
                 </div>
               ) : (
                 <>
                   <div className='flex justify-between items-start'>
                      <div className='space-y-1'>
                         <h3 className='text-3xl font-black tracking-tighter'>Đánh giá CineChat</h3>
                         <p className='text-muted-foreground font-medium text-sm'>Trải nghiệm của bạn như thế nào?</p>
                      </div>
                      <button onClick={() => setIsOpen(false)} className='p-2 hover:bg-muted rounded-full'><X size={20} /></button>
                   </div>

                   <form onSubmit={handleSubmit} className='space-y-6'>
                      {/* Star Rating */}
                      <div className='flex flex-col items-center gap-3 p-6 rounded-3xl bg-muted/30 border border-border/50'>
                         <div className='flex gap-2'>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type='button'
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className='transition-transform active:scale-90'
                              >
                                 <Star 
                                   size={32} 
                                   className={cn(
                                     'transition-colors',
                                     (hoverRating || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
                                   )} 
                                 />
                              </button>
                            ))}
                         </div>
                         <p className='text-xs font-black uppercase tracking-widest text-primary'>
                            {rating === 5 ? 'Tuyệt vời!' : rating === 4 ? 'Rất tốt' : rating === 3 ? 'Bình thường' : rating === 2 ? 'Kém' : rating === 1 ? 'Rất tệ' : 'Chọn số sao'}
                         </p>
                      </div>

                      {/* Categories */}
                      <div className='space-y-3'>
                         <Label className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>Bạn muốn góp ý về?</Label>
                         <div className='grid grid-cols-2 gap-2'>
                            {categories.map((c) => (
                              <button
                                key={c.id}
                                type='button'
                                onClick={() => setCategory(c.id)}
                                className={cn(
                                  'px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all',
                                  category === c.id ? 'border-primary bg-primary/5 text-primary' : 'border-border/50 hover:border-primary/20'
                                )}
                              >
                                 {c.name}
                              </button>
                            ))}
                         </div>
                      </div>

                      {/* Comment */}
                      <div className='space-y-3'>
                         <Label className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>Nội dung chi tiết</Label>
                         <Textarea 
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                           placeholder='Hãy chia sẻ cảm nghĩ của bạn...' 
                           className='min-h-[120px] rounded-2xl bg-muted/20 border-border/50 focus-visible:ring-primary/20'
                         />
                      </div>

                      <Button 
                        disabled={!rating}
                        className='w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 gap-2'
                      >
                         Gửi đánh giá <Send size={18} />
                      </Button>
                   </form>
                 </>
               )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && <Toast message="Đã gửi phản hồi thành công!" onClose={() => setShowToast(false)} />}
      </AnimatePresence>
    </>
  );
};

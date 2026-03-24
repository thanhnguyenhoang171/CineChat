'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ChevronLeft, 
  Volume2, 
  Settings, 
  Maximize, 
  Sparkles, 
  MessageSquare,
  Users,
  Send,
  X,
  Bot,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WatchPartyInvite } from './WatchPartyInvite';
import { usePiP } from '@/components/shared/PiPProvider';

interface VideoPlayerProps {
  movie: any;
  onClose: () => void;
}

export const VideoPlayer = ({ movie, onClose }: VideoPlayerProps) => {
  const { setMiniMovie } = usePiP();
  const [showChat, setShowChat] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Minh Trần', text: 'Cảnh này quay đẹp quá mọi người ơi!', time: '20:15' },
    { id: 2, user: 'Hoàng An', text: 'Đoạn này Christopher Nolan dùng phim 70mm thật đúng không?', time: '20:16' },
    { id: 3, user: 'CineChat AI', isAI: true, text: 'Đúng vậy! Cảnh này được quay bằng máy quay IMAX để đạt được độ chi tiết cao nhất.', time: '20:16' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'Bạn', text: inputValue, time: '20:17' }]);
    setInputValue('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-200 bg-black flex overflow-hidden'
    >
      {/* Main Player Area */}
      <div className='flex-1 flex flex-col relative group'>
         {/* Top controls */}
         <div className='absolute top-0 left-0 right-0 p-6 bg-linear-to-b from-black/80 to-transparent z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <button onClick={onClose} className='flex items-center gap-2 text-white font-bold hover:text-primary transition-colors'>
               <ChevronLeft size={24} /> Quay lại
            </button>
            <div className='text-center hidden sm:block'>
               <h2 className='text-white font-black'>{movie.title}</h2>
               <p className='text-white/60 text-[10px] font-black uppercase tracking-widest'>Đang phát • 4K HDR</p>
            </div>
            <div className='flex items-center gap-3'>
               {/* PiP Button */}
               <button 
                 onClick={() => { setMiniMovie(movie); onClose(); }}
                 className='h-9 w-9 rounded-xl flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10'
                 title="Thu nhỏ phim"
               >
                  <Maximize2 size={18} />
               </button>
               <Button 
                 onClick={() => setIsInviteOpen(true)}
                 variant='outline' 
                 size='sm' 
                 className='rounded-xl bg-white/5 border-white/20 text-white gap-2 font-bold hidden md:flex'
               >
                  <Users size={14} /> Mời bạn bè
               </Button>
               <Button variant='outline' size='sm' className='rounded-xl bg-white/5 border-white/20 text-white gap-2 font-bold'>
                  <Sparkles size={14} className='text-primary' /> Phân tích AI
               </Button>
               <button 
                 onClick={() => setShowChat(!showChat)}
                 className={cn(
                   'h-9 w-9 rounded-xl flex items-center justify-center transition-all',
                   showChat ? 'bg-primary text-white' : 'bg-white/5 text-white hover:bg-white/10'
                 )}
               >
                  <MessageSquare size={18} />
               </button>
            </div>
         </div>

         {/* Video Area (Mock) */}
         <div className='flex-1 flex items-center justify-center bg-[#050505]'>
            <img src={movie.image} className='max-h-full max-w-full object-contain' alt='Video content' />
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
               <div className='h-24 w-24 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20'>
                  <Play size={48} className='fill-white text-white ml-2' />
               </div>
            </div>
         </div>

         {/* Bottom controls */}
         <div className='p-8 bg-linear-to-t from-black/90 via-black/40 to-transparent space-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='space-y-2'>
               <div className='h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer'>
                  <div className='h-full bg-primary w-1/3'></div>
               </div>
               <div className='flex justify-between text-[10px] font-black text-white/60 uppercase tracking-widest'>
                  <span>45:12</span>
                  <span>{movie.duration}</span>
               </div>
            </div>

            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-8'>
                  <button className='text-white hover:text-primary transition-colors'><Play size={28} className='fill-current' /></button>
                  <div className='flex items-center gap-4'>
                     <Volume2 size={24} className='text-white' />
                     <div className='w-24 h-1 bg-white/20 rounded-full overflow-hidden'>
                        <div className='h-full bg-white w-3/4'></div>
                     </div>
                  </div>
               </div>
               <div className='flex items-center gap-6'>
                  <button className='text-white hover:text-primary transition-colors font-black text-[10px] uppercase border border-white/20 px-2 py-1 rounded'>Tiếng Việt</button>
                  <button className='text-white hover:text-primary transition-colors'><Settings size={22} /></button>
                  <button className='text-white hover:text-primary transition-colors'><Maximize size={22} /></button>
               </div>
            </div>
         </div>
      </div>

      {/* Watch Party Sidebar */}
      <AnimatePresence>
         {showChat && (
           <motion.div 
             initial={{ x: 400 }}
             animate={{ x: 0 }}
             exit={{ x: 400 }}
             className='w-87.5 bg-slate-900 border-l border-white/10 flex flex-col z-210'
           >
              <div className='p-6 border-b border-white/10 flex items-center justify-between'>
                 <div className='flex items-center gap-2'>
                    <Users size={18} className='text-primary' />
                    <h3 className='text-white font-black uppercase tracking-widest text-xs'>Watch Party (12)</h3>
                 </div>
                 <button onClick={() => setShowChat(false)} className='text-white/40 hover:text-white'><X size={20} /></button>
              </div>

              <div className='flex-1 overflow-y-auto p-6 space-y-6'>
                 {messages.map((msg) => (
                   <div key={msg.id} className={cn('space-y-1', msg.isAI && 'p-4 rounded-2xl bg-primary/10 border border-primary/20')}>
                      <div className='flex items-center justify-between'>
                         <span className={cn('text-[10px] font-black uppercase tracking-tighter', msg.isAI ? 'text-primary' : 'text-slate-400')}>
                            {msg.isAI && <Bot size={10} className='inline mr-1' />}
                            {msg.user}
                         </span>
                         <span className='text-[10px] text-slate-600'>{msg.time}</span>
                      </div>
                      <p className='text-sm text-slate-200 font-medium leading-relaxed'>{msg.text}</p>
                   </div>
                 ))}
              </div>

              <div className='p-6 border-t border-white/10'>
                 <form onSubmit={sendMessage} className='relative'>
                    <Input 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder='Nhập tin nhắn...' 
                      className='h-12 bg-white/5 border-white/10 text-white rounded-xl pr-12 focus-visible:ring-primary/20' 
                    />
                    <button type='submit' className='absolute right-2 top-2 h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white'>
                       <Send size={14} />
                    </button>
                 </form>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      <WatchPartyInvite 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        movieTitle={movie.title} 
      />
    </motion.div>
  );
};

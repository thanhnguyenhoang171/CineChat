'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, Maximize2, Minimize2,
  Paperclip, Mic, History, MessageSquare, ChevronLeft, Search, Play,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Movie } from '@/types';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedMovie?: Partial<Movie>;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const QUICK_SUGGESTIONS = [
  "🎬 Tìm phim hành động mới nhất",
  "🍿 Hôm nay xem gì nhỉ?",
  "🤖 Giải thích cốt truyện Inception",
  "✨ Gợi ý phim giống Oppenheimer"
];

const MOCK_HISTORY: ChatHistory[] = [
  { id: 'h1', title: 'Phim khoa học viễn tưởng', date: 'Hôm nay', preview: 'AI: Danh sách 5 phim hack não...' },
  { id: 'h2', title: 'Gợi ý phim bộ Hàn Quốc', date: 'Hôm qua', preview: 'AI: Bạn nên xem Queen of Tears...' },
];

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [view, setView] = useState<'chat' | 'history'>('chat');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý ảo của CineChat. Hôm nay bạn muốn khám phá bộ phim nào?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && view === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isMaximized, view]);

  // Logic reset khi đóng chat
  const toggleChat = () => {
    if (isOpen) {
      setIsMaximized(false);
      setView('chat');
    }
    setIsOpen(!isOpen);
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (text === inputValue) setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const isAskingForAction = text.toLowerCase().includes('hành động');
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isAskingForAction 
          ? 'Dựa trên gu của bạn, tôi tìm thấy siêu phẩm hành động này cực kỳ phù hợp:' 
          : `Tôi đã tìm thấy thông tin về "${text}". Bạn có muốn xem chi tiết không?`,
        timestamp: new Date(),
        suggestedMovie: isAskingForAction ? {
          id: 101,
          title: 'Inception',
          image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400',
          rating: 8.8,
          matchScore: 98
        } : undefined
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1500);
  };

  return (
    <div className={cn(
      "fixed z-350 transition-all duration-500",
      isMaximized 
        ? "inset-0 flex items-center justify-center p-0 sm:p-10 bg-black/40 backdrop-blur-sm" 
        : "bottom-6 right-6 flex flex-col items-end"
    )}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ 
              opacity: 1, y: 0, scale: 1,
              width: isMaximized ? 'min(100vw, 1000px)' : 'min(90vw, 400px)',
              height: isMaximized ? 'min(100vh, 800px)' : '600px'
            }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "shadow-2xl relative overflow-hidden",
              isMaximized ? "rounded-none sm:rounded-[3rem]" : "rounded-[2.5rem] mb-6"
            )}
          >
            <Card className="flex flex-col h-full border-border/50 bg-card/95 backdrop-blur-2xl text-card-foreground">
              {/* Header */}
              <CardHeader className="p-6 border-b border-border/50 bg-linear-to-r from-primary to-primary/80 text-primary-foreground flex flex-row items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {view === 'history' ? (
                    <button onClick={() => setView('chat')} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white"><ChevronLeft size={20} /></button>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"><Sparkles className="w-5 h-5 text-amber-200 fill-amber-200" /></div>
                  )}
                  <div>
                    <CardTitle className="text-base font-black text-white">{view === 'chat' ? 'CineChat AI' : 'Lịch sử'}</CardTitle>
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Đang trực tuyến</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button onClick={() => setView(view === 'chat' ? 'history' : 'chat')} variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white"><History className="h-4 w-4" /></Button>
                  <Button onClick={toggleMaximize} variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">{isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</Button>
                  <Button onClick={toggleChat} variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white"><X className="h-5 w-5" /></Button>
                </div>
              </CardHeader>
              
              <AnimatePresence mode='wait'>
                {view === 'chat' ? (
                  <motion.div 
                    key="chat-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-linear-to-b from-muted/30 to-transparent">
                      {messages.map((message) => (
                        <div key={message.id} className={cn("flex", message.role === 'user' ? "justify-end" : "justify-start")}>
                          <div className={cn("flex flex-col gap-2", message.role === 'user' ? "items-end" : "items-start", isMaximized ? "max-w-[70%]" : "max-w-[85%]")}>
                            <div className={cn("flex items-end gap-2", message.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                              <div className={cn("h-8 w-8 rounded-2xl flex items-center justify-center shrink-0 mb-1 shadow-sm", message.role === 'user' ? "bg-muted" : "bg-primary/10")}>
                                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                              </div>
                              <div className={cn("p-4 text-sm font-medium leading-relaxed shadow-sm", message.role === 'user' ? "bg-primary text-primary-foreground rounded-3xlded-br-none" : "bg-card border border-border/50 rounded-3xl rounded-bl-none")}>
                                {message.content}
                              </div>
                            </div>
                            {message.suggestedMovie && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ml-10 w-full max-w-70 p-3 rounded-3xl bg-card border border-border/50 shadow-xl space-y-3">
                                 <div className="relative aspect-video rounded-2xl overflow-hidden">
                                    <img src={message.suggestedMovie.image} className="w-full h-full object-cover" alt="Suggest" />
                                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg">{message.suggestedMovie.matchScore}% Match</div>
                                 </div>
                                 <div className="px-1">
                                    <h4 className="font-black text-sm line-clamp-1">{message.suggestedMovie.title}</h4>
                                    <div className="flex items-center gap-1 text-yellow-500 mt-0.5"><Star size={10} className="fill-current" /><span className="text-[10px] font-bold">{message.suggestedMovie.rating}</span></div>
                                 </div>
                                 <Button asChild size="sm" className="w-full rounded-xl h-9 font-black text-xs gap-2"><Link href={`/watch/${message.suggestedMovie.id}`}><Play size={12} className="fill-current" /> Xem ngay</Link></Button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && <div className="flex items-center gap-2 bg-muted/50 p-3 w-fit rounded-2xl border border-border/50"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"></span><span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span><span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span></div>}
                    </CardContent>

                    <CardFooter className="p-6 pt-2 flex flex-col border-t border-border/50 bg-card shrink-0">
                      {!inputValue && <div className="flex gap-2 overflow-x-auto w-full mb-4 no-scrollbar">
                        {QUICK_SUGGESTIONS.map((s, i) => (
                          <button key={i} onClick={() => handleSendMessage(s)} className="whitespace-nowrap px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-[11px] font-black uppercase tracking-tighter text-muted-foreground hover:text-primary transition-all">{s}</button>
                        ))}
                      </div>}
                      <div className="flex items-center gap-3 w-full p-1 bg-muted/30 rounded-2xl border border-border/50 focus-within:border-primary/50 transition-all">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground"><Paperclip size={18} /></Button>
                        <Input placeholder="Hỏi AI về phim..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-base" />
                        <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim()} className={cn("h-10 w-10 rounded-xl", inputValue.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}><Send className="h-4 w-4" /></Button>
                      </div>
                    </CardFooter>
                  </motion.div>
                ) : (
                  <motion.div key="history-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
                     <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} /><Input placeholder="Tìm kiếm phiên trò chuyện..." className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary/50" /></div>
                     <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                        {MOCK_HISTORY.map((item) => (
                          <button key={item.id} onClick={() => setView('chat')} className="w-full p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all text-left group">
                             <div className="flex justify-between items-start mb-1"><h4 className="font-black text-sm text-foreground group-hover:text-primary transition-colors">{item.title}</h4><span className="text-[10px] font-bold text-muted-foreground uppercase">{item.date}</span></div>
                             <p className="text-xs text-muted-foreground font-medium line-clamp-1 italic">{item.preview}</p>
                          </button>
                        ))}
                     </div>
                     <Button onClick={() => setView('chat')} className="w-full h-12 rounded-xl font-black gap-2 shadow-lg shadow-primary/20"><MessageSquare size={18} /> Bắt đầu hội thoại mới</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleChat} className="h-16 w-16 rounded-full shadow-2xl flex items-center justify-center bg-primary hover:bg-primary/90 transition-all relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[10px_10px] opacity-10"></div>
          <MessageCircle className="h-7 w-7 text-white" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 border-2 border-primary rounded-full"></span>
        </motion.button>
      )}
    </div>
  );
};

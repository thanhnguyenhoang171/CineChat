'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Monitor, Sun, Moon, Languages, PlayCircle, Download, CheckCircle2, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/shared/ThemeProvider';

interface SettingsSectionProps {
  onSave: () => void;
}

export const SettingsSection = ({ onSave }: SettingsSectionProps) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  return (
    <div className='space-y-10'>
       <div>
          <h2 className='text-2xl font-black mb-6 text-slate-900 dark:text-white'>Cài đặt hệ thống</h2>
          
          <div className='grid grid-cols-1 gap-8'>
             {/* Theme Selection */}
             <Card className='rounded-[2rem] border-border/50 overflow-hidden'>
                <CardHeader className='bg-muted/30'>
                   <CardTitle className='text-lg font-black flex items-center gap-2'>
                      <Monitor size={20} className='text-primary' /> Giao diện ứng dụng
                   </CardTitle>
                   <CardDescription className='font-medium'>Tùy chỉnh giao diện hiển thị phù hợp với mắt bạn.</CardDescription>
                </CardHeader>
                <CardContent className='p-8'>
                   <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                      {[
                        { id: 'light', name: 'Giao diện sáng', icon: Sun, color: 'bg-white text-slate-900 border-slate-200' },
                        { id: 'dark', name: 'Giao diện tối', icon: Moon, color: 'bg-slate-950 text-white border-slate-800' },
                        { id: 'system', name: 'Theo hệ thống', icon: Monitor, color: 'bg-gradient-to-br from-white to-slate-950 dark:from-slate-900 dark:to-slate-950 text-foreground border-border' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id as any)}
                          className={cn(
                            'relative group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 transition-all',
                            theme === t.id 
                              ? 'border-primary bg-primary/5 shadow-xl scale-[1.02]' 
                              : 'border-border hover:border-primary/30 hover:bg-muted/50'
                          )}
                        >
                           <div className={cn('h-20 w-full rounded-lg mb-2 flex items-center justify-center shadow-inner overflow-hidden border', t.color)}>
                              <t.icon size={32} />
                           </div>
                           <span className='font-bold text-sm'>{t.name}</span>
                           {theme === t.id && (
                             <div className='absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground'>
                                <CheckCircle2 size={12} />
                             </div>
                           )}
                        </button>
                      ))}
                   </div>
                </CardContent>
             </Card>

             {/* Language Selection */}
             <Card className='rounded-[2rem] border-border/50 overflow-hidden'>
                <CardHeader className='bg-muted/30'>
                   <CardTitle className='text-lg font-black flex items-center gap-2'>
                      <Languages size={20} className='text-primary' /> Ngôn ngữ hiển thị
                   </CardTitle>
                </CardHeader>
                <CardContent className='p-8'>
                   <div className='flex flex-wrap gap-4'>
                      {[
                        { id: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
                        { id: 'en', name: 'English', flag: '🇺🇸' }
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.id as any)}
                          className={cn(
                            'flex items-center gap-3 px-6 py-4 rounded-xl border-2 font-bold transition-all',
                            language === lang.id 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border hover:border-primary/20'
                          )}
                        >
                           <span className='text-2xl'>{lang.flag}</span>
                           {lang.name}
                        </button>
                      ))}
                   </div>
                </CardContent>
             </Card>

             {/* Video Playback Settings */}
             <Card className='rounded-[2rem] border-border/50 overflow-hidden'>
                <CardHeader className='bg-muted/30'>
                   <CardTitle className='text-lg font-black flex items-center gap-2'>
                      <PlayCircle size={20} className='text-primary' /> Trải nghiệm phát phim
                   </CardTitle>
                </CardHeader>
                <CardContent className='p-8 space-y-8'>
                   <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                         <Label className='font-black text-base'>Tự động phát tập tiếp theo</Label>
                         <p className='text-sm text-muted-foreground font-medium'>Tự động chuyển sang tập tiếp theo khi kết thúc.</p>
                      </div>
                      <Checkbox defaultChecked className='h-6 w-6 rounded-lg' />
                   </div>
                   <div className='pt-6 border-t border-border/50'>
                      <Label className='font-black text-base block mb-4'>Chất lượng mặc định</Label>
                      <div className='flex flex-wrap gap-2'>
                         {['Tự động', '4K Ultra HD', 'Full HD 1080p'].map((quality) => (
                           <button key={quality} className={cn(
                             'px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider border-2 transition-all',
                             quality === '4K Ultra HD' ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/30'
                           )}>
                              {quality}
                           </button>
                         ))}
                      </div>
                   </div>
                </CardContent>
             </Card>
          </div>

          <div className='mt-10 flex justify-end gap-4'>
             <Button variant='ghost' className='rounded-xl font-bold'>Khôi phục mặc định</Button>
             <Button onClick={onSave} className='rounded-xl font-black px-8 h-12 shadow-lg shadow-primary/20'>Lưu tất cả thay đổi</Button>
          </div>
       </div>
    </div>
  );
};

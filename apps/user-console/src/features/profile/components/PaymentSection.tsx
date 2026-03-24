'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/shared/Modal';

interface PaymentSectionProps {
  showToast: (m: string, t?: any) => void;
}

export const PaymentSection = ({ showToast }: PaymentSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const cards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', holder: 'CHANH LOCAL', isDefault: true, color: 'bg-gradient-to-br from-slate-900 to-slate-800' },
    { id: 2, type: 'MasterCard', last4: '8899', expiry: '05/25', holder: 'CHANH LOCAL', isDefault: false, color: 'bg-gradient-to-br from-primary to-primary/80' },
  ];

  const handleDelete = () => {
    if (selectedCard) {
      showToast(`Đã xóa thẻ ${selectedCard.type} kết thúc bằng ${selectedCard.last4}`, 'success');
    }
  };

  return (
    <div className='space-y-8'>
       <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-black text-foreground'>Thanh toán & Thẻ</h2>
          <Button className='rounded-xl font-bold gap-2' onClick={() => showToast('Tính năng thêm thẻ mới đang được phát triển!')}>
             <Plus size={18} /> Thêm thẻ mới
          </Button>
       </div>

       <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10'>
          {cards.map(card => (
            <div key={card.id} className={cn('relative h-56 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden group', card.color)}>
               <div className='absolute top-0 right-0 p-8 opacity-20'>
                  <CreditCard size={120} />
               </div>
               
               <div className='absolute top-6 right-6 flex gap-2 z-20'>
                  <button className='h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white'>
                     <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => { setSelectedCard(card); setIsModalOpen(true); }}
                    className='h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-destructive/80 transition-colors text-white'
                  >
                     <Trash2 size={16} />
                  </button>
               </div>

               <div className='relative z-10 h-full flex flex-col justify-between'>
                  <div className='flex justify-between items-start'>
                     <span className='font-black text-xl italic tracking-tighter'>{card.type}</span>
                     {card.isDefault && <span className='px-2 py-0.5 rounded-lg bg-emerald-500 text-[10px] font-black uppercase tracking-widest mr-24'>Mặc định</span>}
                  </div>
                  <div>
                     <p className='text-2xl font-black tracking-[0.2em] mb-4'>**** **** **** {card.last4}</p>
                     <div className='flex justify-between items-end'>
                        <div>
                           <p className='text-[10px] text-white/60 font-black uppercase tracking-widest mb-1'>Chủ thẻ</p>
                           <p className='font-bold text-sm'>{card.holder}</p>
                        </div>
                        <div>
                           <p className='text-[10px] text-white/60 font-black uppercase tracking-widest mb-1'>Hết hạn</p>
                           <p className='font-bold text-sm'>{card.expiry}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
       </div>

       <Modal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)}
         title="Xác nhận xóa thẻ"
         description={selectedCard ? `Bạn có chắc chắn muốn xóa thẻ ${selectedCard.type} (**** ${selectedCard.last4}) không? Hành động này không thể hoàn tác.` : "Đang tải thông tin thẻ..."}
         onConfirm={handleDelete}
         confirmText="Xóa thẻ"
         variant="destructive"
       />

       <Card className='rounded-[2rem] border-border/50'>
          <CardHeader>
             <CardTitle className='text-lg font-black'>Lịch sử giao dịch</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
             <div className='overflow-x-auto'>
                <table className='w-full text-sm font-medium'>
                   <thead>
                      <tr className='bg-muted/30 text-muted-foreground'>
                         <th className='text-left p-4 pl-8'>Dịch vụ</th>
                         <th className='text-left p-4'>Ngày</th>
                         <th className='text-left p-4'>Số tiền</th>
                         <th className='text-left p-4'>Trạng thái</th>
                         <th className='text-right p-4 pr-8'></th>
                      </tr>
                   </thead>
                   <tbody>
                      {[1, 2, 3].map(i => (
                        <tr key={i} className='border-b border-border/50 hover:bg-muted/20 transition-colors'>
                           <td className='p-4 pl-8 font-bold'>Gói CineChat Premium (1 Tháng)</td>
                           <td className='p-4 text-muted-foreground'>12/0{i}/2024</td>
                           <td className='p-4 font-black'>149,000đ</td>
                           <td className='p-4'>
                              <span className='px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase'>Thành công</span>
                           </td>
                           <td className='p-4 pr-8 text-right'>
                              <Button variant='ghost' size='sm' className='text-primary font-bold'>Hóa đơn</Button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className='p-4 text-center'>
                <Button variant='ghost' className='text-muted-foreground font-bold gap-2'>
                   Xem tất cả <ArrowRight size={16} />
                </Button>
             </div>
          </CardContent>
       </Card>
    </div>
  );
};

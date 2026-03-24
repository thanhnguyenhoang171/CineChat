import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';

const data = [
  { name: 'Jan', total: 120 },
  { name: 'Feb', total: 210 },
  { name: 'Mar', total: 180 },
  { name: 'Apr', total: 240 },
  { name: 'May', total: 320 },
  { name: 'Jun', total: 280 },
  { name: 'Jul', total: 350 },
  { name: 'Aug', total: 400 },
  { name: 'Sep', total: 380 },
  { name: 'Oct', total: 450 },
  { name: 'Nov', total: 520 },
  { name: 'Dec', total: 600 },
];

export function GrowthChart() {
  return (
    <Card className='col-span-1 lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-semibold'>Tăng trưởng người dùng</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          Số lượng người đăng ký mới trong 12 tháng qua.
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='h-[350px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorTotal' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='var(--color-primary, #3b82f6)' stopOpacity={0.1} />
                  <stop offset='95%' stopColor='var(--color-primary, #3b82f6)' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
              <XAxis
                dataKey='name'
                stroke='#94a3b8'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                stroke='#94a3b8'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                tickMargin={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                itemStyle={{ color: '#3b82f6', fontSize: '13px' }}
              />
              <Area
                type='monotone'
                dataKey='total'
                stroke='var(--color-primary, #3b82f6)'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorTotal)'
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

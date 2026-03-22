import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';

const data = [
  { name: 'Hành động', value: 400 },
  { name: 'Hài kịch', value: 300 },
  { name: 'Kinh dị', value: 200 },
  { name: 'Hoạt hình', value: 278 },
  { name: 'Viễn tưởng', value: 189 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function GenreChart() {
  return (
    <Card className='col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-semibold'>Phân bổ thể loại</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          Tỷ lệ phim theo từng thể loại chính.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[350px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey='value'
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend
                verticalAlign='bottom'
                align='center'
                layout='horizontal'
                iconType='circle'
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

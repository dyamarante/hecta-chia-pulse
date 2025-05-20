
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data - in production this would come from an API
const data = [
  { month: 'Jan', "2023": 4000, "2024": 2400, "2025": 2800 },
  { month: 'Feb', "2023": 3000, "2024": 1398, "2025": 2300 },
  { month: 'Mar', "2023": 2000, "2024": 9800, "2025": 3200 },
  { month: 'Apr', "2023": 2780, "2024": 3908, "2025": 3900 },
  { month: 'May', "2023": 1890, "2024": 4800, "2025": 3800 },
  { month: 'Jun', "2023": 2390, "2024": 3800, "2025": 4100 },
  { month: 'Jul', "2023": 3490, "2024": 4300, "2025": 4600 },
  { month: 'Aug', "2023": 3490, "2024": 4300, "2025": 4600 },
  { month: 'Sep', "2023": 3490, "2024": 4300, "2025": 4600 },
  { month: 'Oct', "2023": 3490, "2024": 4300, "2025": 4600 },
  { month: 'Nov', "2023": 3490, "2024": 4300, "2025": 4600 },
  { month: 'Dec', "2023": 3490, "2024": 4300, "2025": 4600 },
];

const ExportChart = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Exportações Mensais (2023-2025)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="2023" 
                stroke="#333333" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="2024" 
                stroke="#009344" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="2025" 
                stroke="#7ED957" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportChart;

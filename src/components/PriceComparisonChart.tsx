
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data - in production this would come from an API
const data = [
  { month: 'Jan', "FOB Paranaguá": 285, "ICE-NY": 278 },
  { month: 'Feb', "FOB Paranaguá": 290, "ICE-NY": 280 },
  { month: 'Mar', "FOB Paranaguá": 283, "ICE-NY": 275 },
  { month: 'Apr', "FOB Paranaguá": 289, "ICE-NY": 279 },
  { month: 'May', "FOB Paranaguá": 295, "ICE-NY": 284 },
  { month: 'Jun', "FOB Paranaguá": 291, "ICE-NY": 282 },
  { month: 'Jul', "FOB Paranaguá": 298, "ICE-NY": 290 },
  { month: 'Aug', "FOB Paranaguá": 301, "ICE-NY": 294 },
  { month: 'Sep', "FOB Paranaguá": 297, "ICE-NY": 292 },
  { month: 'Oct', "FOB Paranaguá": 305, "ICE-NY": 298 },
  { month: 'Nov', "FOB Paranaguá": 310, "ICE-NY": 304 },
  { month: 'Dec', "FOB Paranaguá": 312, "ICE-NY": 306 },
];

const PriceComparisonChart = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Preço FOB Paranaguá vs. ICE-NY (USD/t)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <YAxis domain={[260, 320]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              />
              <Legend />
              <Bar dataKey="FOB Paranaguá" fill="#009344" />
              <Bar dataKey="ICE-NY" fill="#333333" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparisonChart;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dados simulados para preços FOB
const data = [
  { month: 'Jan', wholesaleUSDt: 285, retailUSDkg: 0.72 },
  { month: 'Fev', wholesaleUSDt: 290, retailUSDkg: 0.75 },
  { month: 'Mar', wholesaleUSDt: 283, retailUSDkg: 0.73 },
  { month: 'Abr', wholesaleUSDt: 289, retailUSDkg: 0.74 },
  { month: 'Mai', wholesaleUSDt: 295, retailUSDkg: 0.78 },
  { month: 'Jun', wholesaleUSDt: 291, retailUSDkg: 0.76 },
  { month: 'Jul', wholesaleUSDt: 298, retailUSDkg: 0.79 },
  { month: 'Ago', wholesaleUSDt: 301, retailUSDkg: 0.80 },
  { month: 'Set', wholesaleUSDt: 297, retailUSDkg: 0.79 },
  { month: 'Out', wholesaleUSDt: 305, retailUSDkg: 0.82 },
  { month: 'Nov', wholesaleUSDt: 310, retailUSDkg: 0.84 },
  { month: 'Dez', wholesaleUSDt: 312, retailUSDkg: 0.85 },
];

// Anos disponíveis para seleção
const years = ['2023', '2024', '2025'];

const FOBPriceChart = () => {
  const [selectedYear, setSelectedYear] = React.useState('2025');

  const exportToCSV = () => {
    // Função para exportar dados para CSV
    const headers = 'Mês,Atacado (USD/t),Varejo (USD/kg)\n';
    const csvData = data.map(row => 
      `${row.month},${row.wholesaleUSDt},${row.retailUSDkg}`
    ).join('\n');
    
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `precos-fob-${selectedYear}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-hecta-gray">Preço FOB Paranaguá</h3>
          <p className="text-xs text-muted-foreground">Fonte: Hecta-pay-hub, contratos internos</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportToCSV} title="Exportar dados para CSV">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" domain={[260, 320]} label={{ value: 'USD/t', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0.6, 0.9]} label={{ value: 'USD/kg', angle: 90, position: 'insideRight' }} />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'wholesaleUSDt') return [`${value} USD/t`, 'Atacado'];
                if (name === 'retailUSDkg') return [`${value} USD/kg`, 'Varejo'];
                return [value, name];
              }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
              }}
            />
            <Legend 
              formatter={(value) => {
                if (value === 'wholesaleUSDt') return 'Atacado (USD/t)';
                if (value === 'retailUSDkg') return 'Varejo (USD/kg)';
                return value;
              }}
            />
            <Bar yAxisId="left" dataKey="wholesaleUSDt" fill="#009344" name="wholesaleUSDt" />
            <Line yAxisId="right" type="monotone" dataKey="retailUSDkg" stroke="#D4AF37" strokeWidth={2} activeDot={{ r: 6 }} name="retailUSDkg" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FOBPriceChart;

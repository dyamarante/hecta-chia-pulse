
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dados simulados para os volumes de exportação
const data2023 = [
  { month: 'Jan', volume: 1200 },
  { month: 'Fev', volume: 1350 },
  { month: 'Mar', volume: 1100 },
  { month: 'Abr', volume: 1420 },
  { month: 'Mai', volume: 1500 },
  { month: 'Jun', volume: 1380 },
  { month: 'Jul', volume: 1600 },
  { month: 'Ago', volume: 1650 },
  { month: 'Set', volume: 1550 },
  { month: 'Out', volume: 1700 },
  { month: 'Nov', volume: 1800 },
  { month: 'Dez', volume: 1850 },
];

const data2024 = [
  { month: 'Jan', volume: 1900 },
  { month: 'Fev', volume: 2050 },
  { month: 'Mar', volume: 1950 },
  { month: 'Abr', volume: 2100 },
  { month: 'Mai', volume: 2200 },
  { month: 'Jun', volume: 2150 },
  { month: 'Jul', volume: 2300 },
  { month: 'Ago', volume: 2350 },
  { month: 'Set', volume: 2250 },
  { month: 'Out', volume: 2400 },
  { month: 'Nov', volume: 2500 },
  { month: 'Dez', volume: 2550 },
];

const data2025 = [
  { month: 'Jan', volume: 2600 },
  { month: 'Fev', volume: 2750 },
  { month: 'Mar', volume: 2650 },
  { month: 'Abr', volume: 2800 },
  { month: 'Mai', volume: 2900 },
  { month: 'Jun', volume: 2850 },
  { month: 'Jul', volume: 3000 },
  { month: 'Ago', volume: 3050 },
  { month: 'Set', volume: 2950 },
  { month: 'Out', volume: 3100 },
  { month: 'Nov', volume: 3200 },
  { month: 'Dez', volume: 3250 },
];

const allData = [...data2023, ...data2024, ...data2025].map((item, index) => ({
  ...item,
  date: `2023-01-01`.replace('01', Math.floor(index / 12) + 1).replace('2023', 2023 + Math.floor(index / 12)),
  year: 2023 + Math.floor(index / 12)
}));

const VolumeExportChart = () => {
  const [range, setRange] = useState([0, 35]); // 0-35 representa índices para os 36 meses (3 anos)
  
  const filteredData = allData.slice(range[0], range[1] + 1);
  
  const formatLabel = (value) => {
    const item = allData[value];
    return item ? `${item.month}/${item.year}` : '';
  };

  const exportToCSV = () => {
    const headers = 'Mês,Ano,Volume (t)\n';
    const csvData = filteredData.map(row => 
      `${row.month},${row.year},${row.volume}`
    ).join('\n');
    
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'volume-exportacao.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    
    let newRange = [...range];
    newRange[index] = value;
    
    // Garante que o valor inicial não seja maior que o final
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    }
    // Garante que o valor final não seja menor que o inicial
    else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setRange(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-hecta-gray">Volume Exportado (t/mês)</h3>
          <p className="text-xs text-muted-foreground">Fonte: Ministério da Economia, MDIC</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV} title="Exportar dados para CSV">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" 
              tickFormatter={(tick, index) => {
                const item = filteredData[index];
                return item ? `${item.month}/${String(item.year).substring(2)}` : '';
              }}
            />
            <YAxis label={{ value: 'Toneladas', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              labelFormatter={(label, items) => {
                const item = items?.[0]?.payload;
                return item ? `${item.month}/${item.year}` : label;
              }}
              formatter={(value) => [`${value} t`, 'Volume']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="volume" stroke="#009344" fill="#009344" fillOpacity={0.3} name="Volume Exportado" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-xs">Jan/23</span>
          <span className="text-xs">Dez/25</span>
        </div>
        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="35"
            value={range[0]}
            data-index="0"
            onChange={handleRangeChange}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="35"
            value={range[1]}
            data-index="1"
            onChange={handleRangeChange}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Período: {formatLabel(range[0])} - {formatLabel(range[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default VolumeExportChart;

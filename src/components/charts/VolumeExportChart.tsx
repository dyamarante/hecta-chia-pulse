
import React, { useState, useEffect } from 'react';
import {
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
import { useChartData } from '@/contexts/ChartDataContext';

const VolumeExportChart = () => {
  const { volumeData, isLoading } = useChartData();
  const [range, setRange] = useState([0, 35]); // 0-35 representa índices para os 36 meses (3 anos)
  
  const filteredData = volumeData.slice(range[0], range[1] + 1);
  
  const formatLabel = (value: number) => {
    const item = volumeData[value];
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

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const index = parseInt(e.target.getAttribute('data-index') || '0', 10);
    
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

  // Calcula o total acumulado por ano
  const getYearlyTotal = (year: number) => {
    return volumeData
      .filter(item => item.year === year)
      .reduce((sum, item) => sum + item.volume, 0);
  };

  const total2023_2024 = getYearlyTotal(2023) + getYearlyTotal(2024);
  const total2025_2026 = getYearlyTotal(2025) + getYearlyTotal(2026);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-hecta-gray">Volume Exportado (t/mês)</h3>
          <p className="text-xs text-muted-foreground">
            Fonte: Dados internos • Safra 2023-2024: {total2023_2024.toLocaleString()} t • Projeção 2025-2026: {total2025_2026.toLocaleString()} t
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV} title="Exportar dados para CSV">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hecta-green mx-auto"></div>
            <p className="mt-4 text-hecta-gray">Carregando dados...</p>
          </div>
        </div>
      ) : (
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
              <YAxis 
                label={{ value: 'Toneladas', angle: -90, position: 'insideLeft' }}
                domain={[0, 10000]} // Ajustado para o novo range de volume
              />
              <Tooltip
                labelFormatter={(label, items) => {
                  const item = items?.[0]?.payload;
                  return item ? `${item.month}/${item.year}` : label;
                }}
                formatter={(value) => [`${value.toString()} t`, 'Volume']}
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
      )}

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

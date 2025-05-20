
import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChartData, years } from '@/contexts/ChartDataContext';

const FOBPriceChart = () => {
  const { selectedYear, setSelectedYear, fobData, isLoading } = useChartData();

  const exportToCSV = () => {
    // Função para exportar dados para CSV
    const headers = 'Mês,Atacado (USD/t),Varejo (USD/kg)\n';
    const csvData = fobData.map(row => 
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
          <p className="text-xs text-muted-foreground">Fonte: Commodity-Board, Mercadero NL (Conv. 99.95%)</p>
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
            <ComposedChart
              data={fobData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" domain={[2000, 3000]} label={{ value: 'USD/t', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={[13, 20]} label={{ value: 'USD/kg', angle: 90, position: 'insideRight' }} />
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
      )}
    </div>
  );
};

export default FOBPriceChart;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dados simulados para spread e margens
const data = [
  { month: 'Jan', logistica: 30, margem: 25, percentual: 18 },
  { month: 'Fev', logistica: 30, margem: 28, percentual: 19 },
  { month: 'Mar', logistica: 30, margem: 27, percentual: 18.5 },
  { month: 'Abr', logistica: 30, margem: 29, percentual: 19.2 },
  { month: 'Mai', logistica: 30, margem: 32, percentual: 20.1 },
  { month: 'Jun', logistica: 30, margem: 31, percentual: 19.8 },
  { month: 'Jul', logistica: 30, margem: 33, percentual: 20.5 },
  { month: 'Ago', logistica: 30, margem: 34, percentual: 21 },
  { month: 'Set', logistica: 30, margem: 33, percentual: 20.8 },
  { month: 'Out', logistica: 30, margem: 35, percentual: 21.5 },
  { month: 'Nov', logistica: 30, margem: 36, percentual: 22 },
  { month: 'Dez', logistica: 30, margem: 37, percentual: 22.5 },
];

// Anos disponíveis para seleção
const years = ['2023', '2024', '2025'];

// Destinos disponíveis
const destinations = [
  { id: 'ny', name: 'Nova York' },
  { id: 'rotterdam', name: 'Rotterdam' },
  { id: 'qingdao', name: 'Qingdao' },
];

const SpreadMarginChart = () => {
  const [selectedYear, setSelectedYear] = React.useState('2025');
  const [selectedDestination, setSelectedDestination] = React.useState('ny');

  const getDestinationName = () => {
    return destinations.find(d => d.id === selectedDestination)?.name || 'Nova York';
  };

  const exportToCSV = () => {
    const destName = getDestinationName();
    const headers = 'Mês,Logística (USD/t),Margem (USD/t),Percentual (%)\n';
    const csvData = data.map(row => 
      `${row.month},${row.logistica},${row.margem},${row.percentual}`
    ).join('\n');
    
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `spread-margem-${selectedDestination}-${selectedYear}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-hecta-gray">Spread & Margem - {getDestinationName()}</h3>
          <p className="text-xs text-muted-foreground">Fonte: Hecta-pay-hub, contratos internacionais</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Destino" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((destination) => (
                <SelectItem key={destination.id} value={destination.id}>{destination.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'USD/t', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props;
                if (name === 'logistica') return [`${value} USD/t`, 'Custo Logístico'];
                if (name === 'margem') return [`${value} USD/t`, 'Margem Comercial'];
                
                if (payload && payload.percentual) {
                  return [`${value} USD/t (${payload.percentual}%)`, name];
                }
                
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
                if (value === 'logistica') return 'Custo Logístico';
                if (value === 'margem') return 'Margem Comercial';
                return value;
              }}
            />
            <Bar dataKey="logistica" stackId="a" fill="#333333" />
            <Bar dataKey="margem" stackId="a" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpreadMarginChart;

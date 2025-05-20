
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

// Dados simulados para preços CIF por destino
const dataNY = [
  { month: 'Jan', wholesaleUSDt: 315, retailUSDkg: 0.82 },
  { month: 'Fev', wholesaleUSDt: 320, retailUSDkg: 0.85 },
  { month: 'Mar', wholesaleUSDt: 313, retailUSDkg: 0.83 },
  { month: 'Abr', wholesaleUSDt: 319, retailUSDkg: 0.84 },
  { month: 'Mai', wholesaleUSDt: 325, retailUSDkg: 0.88 },
  { month: 'Jun', wholesaleUSDt: 321, retailUSDkg: 0.86 },
  { month: 'Jul', wholesaleUSDt: 328, retailUSDkg: 0.89 },
  { month: 'Ago', wholesaleUSDt: 331, retailUSDkg: 0.90 },
  { month: 'Set', wholesaleUSDt: 327, retailUSDkg: 0.89 },
  { month: 'Out', wholesaleUSDt: 335, retailUSDkg: 0.92 },
  { month: 'Nov', wholesaleUSDt: 340, retailUSDkg: 0.94 },
  { month: 'Dez', wholesaleUSDt: 342, retailUSDkg: 0.95 },
];

const dataRotterdam = [
  { month: 'Jan', wholesaleUSDt: 325, retailUSDkg: 0.84 },
  { month: 'Fev', wholesaleUSDt: 330, retailUSDkg: 0.87 },
  { month: 'Mar', wholesaleUSDt: 323, retailUSDkg: 0.85 },
  { month: 'Abr', wholesaleUSDt: 329, retailUSDkg: 0.86 },
  { month: 'Mai', wholesaleUSDt: 335, retailUSDkg: 0.90 },
  { month: 'Jun', wholesaleUSDt: 331, retailUSDkg: 0.88 },
  { month: 'Jul', wholesaleUSDt: 338, retailUSDkg: 0.91 },
  { month: 'Ago', wholesaleUSDt: 341, retailUSDkg: 0.92 },
  { month: 'Set', wholesaleUSDt: 337, retailUSDkg: 0.91 },
  { month: 'Out', wholesaleUSDt: 345, retailUSDkg: 0.94 },
  { month: 'Nov', wholesaleUSDt: 350, retailUSDkg: 0.96 },
  { month: 'Dez', wholesaleUSDt: 352, retailUSDkg: 0.97 },
];

const dataQingdao = [
  { month: 'Jan', wholesaleUSDt: 335, retailUSDkg: 0.86 },
  { month: 'Fev', wholesaleUSDt: 340, retailUSDkg: 0.89 },
  { month: 'Mar', wholesaleUSDt: 333, retailUSDkg: 0.87 },
  { month: 'Abr', wholesaleUSDt: 339, retailUSDkg: 0.88 },
  { month: 'Mai', wholesaleUSDt: 345, retailUSDkg: 0.92 },
  { month: 'Jun', wholesaleUSDt: 341, retailUSDkg: 0.90 },
  { month: 'Jul', wholesaleUSDt: 348, retailUSDkg: 0.93 },
  { month: 'Ago', wholesaleUSDt: 351, retailUSDkg: 0.94 },
  { month: 'Set', wholesaleUSDt: 347, retailUSDkg: 0.93 },
  { month: 'Out', wholesaleUSDt: 355, retailUSDkg: 0.96 },
  { month: 'Nov', wholesaleUSDt: 360, retailUSDkg: 0.98 },
  { month: 'Dez', wholesaleUSDt: 362, retailUSDkg: 0.99 },
];

const destinations = [
  { id: 'ny', name: 'Nova York' },
  { id: 'rotterdam', name: 'Rotterdam' },
  { id: 'qingdao', name: 'Qingdao' },
];

// Anos disponíveis para seleção
const years = ['2023', '2024', '2025'];

const CIFPriceChart = () => {
  const [selectedYear, setSelectedYear] = React.useState('2025');
  const [selectedDestination, setSelectedDestination] = React.useState('ny');
  
  // Seleciona os dados com base no destino
  const getDestinationData = () => {
    switch (selectedDestination) {
      case 'rotterdam':
        return dataRotterdam;
      case 'qingdao':
        return dataQingdao;
      case 'ny':
      default:
        return dataNY;
    }
  };

  const data = getDestinationData();
  
  const getDestinationName = () => {
    return destinations.find(d => d.id === selectedDestination)?.name || 'Nova York';
  };

  const exportToCSV = () => {
    const destName = getDestinationName();
    const headers = 'Mês,Atacado (USD/t),Varejo (USD/kg)\n';
    const csvData = data.map(row => 
      `${row.month},${row.wholesaleUSDt},${row.retailUSDkg}`
    ).join('\n');
    
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `precos-cif-${selectedDestination}-${selectedYear}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-hecta-gray">Preço CIF {getDestinationName()}</h3>
          <p className="text-xs text-muted-foreground">Fonte: ICE-NY, contratos internacionais</p>
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
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" domain={[300, 370]} label={{ value: 'USD/t', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0.8, 1.0]} label={{ value: 'USD/kg', angle: 90, position: 'insideRight' }} />
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

export default CIFPriceChart;

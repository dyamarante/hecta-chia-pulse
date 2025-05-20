
import React from 'react';
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
import { useChartData, destinations, years } from '@/contexts/ChartDataContext';

const SpreadMarginChart = () => {
  const { 
    selectedYear, 
    setSelectedYear, 
    selectedDestination, 
    setSelectedDestination,
    spreadData,
    isLoading
  } = useChartData();

  const getDestinationName = () => {
    return destinations.find(d => d.id === selectedDestination)?.name || 'Nova York';
  };

  const exportToCSV = () => {
    const destName = getDestinationName();
    const headers = 'Mês,Logística (USD/t),Margem (USD/t),Percentual (%)\n';
    const csvData = spreadData.map(row => 
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
            <BarChart
              data={spreadData}
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
      )}
    </div>
  );
};

export default SpreadMarginChart;


import React from 'react';
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
import { useChartData, destinations, years } from '@/contexts/ChartDataContext';

const CIFPriceChart = () => {
  const { 
    selectedYear, 
    setSelectedYear, 
    selectedDestination, 
    setSelectedDestination,
    cifData,
    isLoading
  } = useChartData();
  
  const getDestinationName = () => {
    return destinations.find(d => d.id === selectedDestination)?.name || 'Nova York';
  };

  const exportToCSV = () => {
    const destName = getDestinationName();
    const headers = 'Mês,Atacado (USD/t),Varejo (USD/kg)\n';
    const csvData = cifData.map(row => 
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

  // Define escala dinâmica com base no destino
  const getYAxisDomains = () => {
    if (selectedDestination === 'qingdao') {
      return {
        left: [2400, 2800],
        right: [4.0, 6.0]
      };
    } else {
      return {
        left: [2350, 2750],
        right: [13.0, 17.0]
      };
    }
  };
  
  const domains = getYAxisDomains();

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
              data={cifData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" domain={domains.left} label={{ value: 'USD/t', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={domains.right} label={{ value: 'USD/kg', angle: 90, position: 'insideRight' }} />
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

export default CIFPriceChart;

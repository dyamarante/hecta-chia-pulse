
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Destinos disponíveis
export const destinations = [
  { id: 'ny', name: 'Nova York' },
  { id: 'rotterdam', name: 'Rotterdam' },
  { id: 'qingdao', name: 'Qingdao' },
];

// Anos disponíveis para seleção
export const years = ['2023', '2024', '2025'];

// Interface para dados do gráfico
export interface ChartDataPoint {
  month: string;
  wholesaleUSDt: number;
  retailUSDkg: number;
  [key: string]: any;
}

// Interface para dados de spread/margem
export interface SpreadMarginPoint {
  month: string;
  logistica: number;
  margem: number;
  percentual: number;
}

// Interface para dados de volume
export interface VolumeDataPoint {
  month: string;
  volume: number;
  year: number;
  date?: string;
}

// Interface para taxas de câmbio
export interface ExchangeRates {
  [key: string]: number;
}

// Interface para o contexto
interface ChartDataContextType {
  // Configurações gerais
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedDestination: string;
  setSelectedDestination: (destination: string) => void;
  
  // Dados de gráficos
  fobData: ChartDataPoint[];
  cifData: ChartDataPoint[];
  spreadData: SpreadMarginPoint[];
  volumeData: VolumeDataPoint[];
  
  // Estado de carregamento
  isLoading: boolean;
  error: string | null;
}

// Criação do contexto
const ChartDataContext = createContext<ChartDataContextType | undefined>(undefined);

// Hook para usar o contexto
export function useChartData() {
  const context = useContext(ChartDataContext);
  if (context === undefined) {
    throw new Error('useChartData deve ser usado dentro de um ChartDataProvider');
  }
  return context;
}

// Mock data para FOB - valores realistas baseados nas informações fornecidas
const mockFobData: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2350, retailUSDkg: 6.0 },
  { month: 'Fev', wholesaleUSDt: 2380, retailUSDkg: 6.1 },
  { month: 'Mar', wholesaleUSDt: 2420, retailUSDkg: 6.2 },
  { month: 'Abr', wholesaleUSDt: 2450, retailUSDkg: 6.3 },
  { month: 'Mai', wholesaleUSDt: 2500, retailUSDkg: 6.5 },
  { month: 'Jun', wholesaleUSDt: 2480, retailUSDkg: 6.4 },
  { month: 'Jul', wholesaleUSDt: 2520, retailUSDkg: 6.6 },
  { month: 'Ago', wholesaleUSDt: 2550, retailUSDkg: 6.7 },
  { month: 'Set', wholesaleUSDt: 2530, retailUSDkg: 6.6 },
  { month: 'Out', wholesaleUSDt: 2580, retailUSDkg: 6.8 },
  { month: 'Nov', wholesaleUSDt: 2620, retailUSDkg: 6.9 },
  { month: 'Dez', wholesaleUSDt: 2650, retailUSDkg: 7.0 },
];

// Mock data para CIF por destino - valores realistas
const mockCifDataNY: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2400, retailUSDkg: 13.5 },
  { month: 'Fev', wholesaleUSDt: 2430, retailUSDkg: 13.7 },
  { month: 'Mar', wholesaleUSDt: 2470, retailUSDkg: 13.9 },
  { month: 'Abr', wholesaleUSDt: 2500, retailUSDkg: 14.2 },
  { month: 'Mai', wholesaleUSDt: 2550, retailUSDkg: 14.8 },
  { month: 'Jun', wholesaleUSDt: 2530, retailUSDkg: 14.5 },
  { month: 'Jul', wholesaleUSDt: 2570, retailUSDkg: 15.0 },
  { month: 'Ago', wholesaleUSDt: 2600, retailUSDkg: 15.3 },
  { month: 'Set', wholesaleUSDt: 2580, retailUSDkg: 15.1 },
  { month: 'Out', wholesaleUSDt: 2630, retailUSDkg: 15.6 },
  { month: 'Nov', wholesaleUSDt: 2670, retailUSDkg: 16.0 },
  { month: 'Dez', wholesaleUSDt: 2700, retailUSDkg: 16.2 },
];

const mockCifDataRotterdam: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2410, retailUSDkg: 13.6 },
  { month: 'Fev', wholesaleUSDt: 2440, retailUSDkg: 13.8 },
  { month: 'Mar', wholesaleUSDt: 2480, retailUSDkg: 14.0 },
  { month: 'Abr', wholesaleUSDt: 2510, retailUSDkg: 14.3 },
  { month: 'Mai', wholesaleUSDt: 2560, retailUSDkg: 14.9 },
  { month: 'Jun', wholesaleUSDt: 2540, retailUSDkg: 14.6 },
  { month: 'Jul', wholesaleUSDt: 2580, retailUSDkg: 15.1 },
  { month: 'Ago', wholesaleUSDt: 2610, retailUSDkg: 15.4 },
  { month: 'Set', wholesaleUSDt: 2590, retailUSDkg: 15.2 },
  { month: 'Out', wholesaleUSDt: 2640, retailUSDkg: 15.7 },
  { month: 'Nov', wholesaleUSDt: 2680, retailUSDkg: 16.1 },
  { month: 'Dez', wholesaleUSDt: 2710, retailUSDkg: 16.3 },
];

const mockCifDataQingdao: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2450, retailUSDkg: 4.3 },
  { month: 'Fev', wholesaleUSDt: 2480, retailUSDkg: 4.4 },
  { month: 'Mar', wholesaleUSDt: 2520, retailUSDkg: 4.5 },
  { month: 'Abr', wholesaleUSDt: 2550, retailUSDkg: 4.6 },
  { month: 'Mai', wholesaleUSDt: 2600, retailUSDkg: 4.8 },
  { month: 'Jun', wholesaleUSDt: 2580, retailUSDkg: 4.7 },
  { month: 'Jul', wholesaleUSDt: 2620, retailUSDkg: 4.9 },
  { month: 'Ago', wholesaleUSDt: 2650, retailUSDkg: 5.1 },
  { month: 'Set', wholesaleUSDt: 2630, retailUSDkg: 5.0 },
  { month: 'Out', wholesaleUSDt: 2680, retailUSDkg: 5.3 },
  { month: 'Nov', wholesaleUSDt: 2720, retailUSDkg: 5.5 },
  { month: 'Dez', wholesaleUSDt: 2750, retailUSDkg: 5.7 },
];

// Mock data para spread e margem - valores realistas baseados na diferença CIF-FOB
const mockSpreadData: SpreadMarginPoint[] = [
  { month: 'Jan', logistica: 30, margem: 20, percentual: 2.1 },
  { month: 'Fev', logistica: 30, margem: 20, percentual: 2.1 },
  { month: 'Mar', logistica: 30, margem: 20, percentual: 2.1 },
  { month: 'Abr', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Mai', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Jun', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Jul', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Ago', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Set', logistica: 30, margem: 20, percentual: 2.0 },
  { month: 'Out', logistica: 30, margem: 20, percentual: 1.9 },
  { month: 'Nov', logistica: 30, margem: 20, percentual: 1.9 },
  { month: 'Dez', logistica: 30, margem: 20, percentual: 1.9 },
];

// Mock data para volume - mantendo valores semelhantes para comparabilidade
const mockVolumeData2023: VolumeDataPoint[] = [
  { month: 'Jan', volume: 1200, year: 2023 },
  { month: 'Fev', volume: 1350, year: 2023 },
  { month: 'Mar', volume: 1100, year: 2023 },
  { month: 'Abr', volume: 1420, year: 2023 },
  { month: 'Mai', volume: 1500, year: 2023 },
  { month: 'Jun', volume: 1380, year: 2023 },
  { month: 'Jul', volume: 1600, year: 2023 },
  { month: 'Ago', volume: 1650, year: 2023 },
  { month: 'Set', volume: 1550, year: 2023 },
  { month: 'Out', volume: 1700, year: 2023 },
  { month: 'Nov', volume: 1800, year: 2023 },
  { month: 'Dez', volume: 1850, year: 2023 },
];

const mockVolumeData2024: VolumeDataPoint[] = [
  { month: 'Jan', volume: 1900, year: 2024 },
  { month: 'Fev', volume: 2050, year: 2024 },
  { month: 'Mar', volume: 1950, year: 2024 },
  { month: 'Abr', volume: 2100, year: 2024 },
  { month: 'Mai', volume: 2200, year: 2024 },
  { month: 'Jun', volume: 2150, year: 2024 },
  { month: 'Jul', volume: 2300, year: 2024 },
  { month: 'Ago', volume: 2350, year: 2024 },
  { month: 'Set', volume: 2250, year: 2024 },
  { month: 'Out', volume: 2400, year: 2024 },
  { month: 'Nov', volume: 2500, year: 2024 },
  { month: 'Dez', volume: 2550, year: 2024 },
];

const mockVolumeData2025: VolumeDataPoint[] = [
  { month: 'Jan', volume: 2600, year: 2025 },
  { month: 'Fev', volume: 2750, year: 2025 },
  { month: 'Mar', volume: 2650, year: 2025 },
  { month: 'Abr', volume: 2800, year: 2025 },
  { month: 'Mai', volume: 2900, year: 2025 },
  { month: 'Jun', volume: 2850, year: 2025 },
  { month: 'Jul', volume: 3000, year: 2025 },
  { month: 'Ago', volume: 3050, year: 2025 },
  { month: 'Set', volume: 2950, year: 2025 },
  { month: 'Out', volume: 3100, year: 2025 },
  { month: 'Nov', volume: 3200, year: 2025 },
  { month: 'Dez', volume: 3250, year: 2025 },
];

const mockVolumeData: VolumeDataPoint[] = [
  ...mockVolumeData2023,
  ...mockVolumeData2024,
  ...mockVolumeData2025,
];

// Provedor do contexto
export function ChartDataProvider({ children }: { children: ReactNode }) {
  // Estados
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedDestination, setSelectedDestination] = useState('ny');
  const [fobData, setFobData] = useState<ChartDataPoint[]>(mockFobData);
  const [cifData, setCifData] = useState<ChartDataPoint[]>(mockCifDataNY);
  const [spreadData, setSpreadData] = useState<SpreadMarginPoint[]>(mockSpreadData);
  const [volumeData, setVolumeData] = useState<VolumeDataPoint[]>(mockVolumeData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Função que simula o efeito de buscar dados da API
  useEffect(() => {
    setIsLoading(true);
    
    // Simulação de busca de dados
    setTimeout(() => {
      // Atualiza CIF data baseado no destino selecionado
      if (selectedDestination === 'rotterdam') {
        setCifData(mockCifDataRotterdam);
      } else if (selectedDestination === 'qingdao') {
        setCifData(mockCifDataQingdao);
      } else {
        setCifData(mockCifDataNY);
      }
      
      setIsLoading(false);
    }, 800); // Simula um pequeno delay para mostrar o loading state
  }, [selectedDestination]);

  // Valor do contexto
  const value: ChartDataContextType = {
    selectedYear,
    setSelectedYear,
    selectedDestination,
    setSelectedDestination,
    fobData,
    cifData,
    spreadData,
    volumeData,
    isLoading,
    error
  };
  
  return (
    <ChartDataContext.Provider value={value}>
      {children}
    </ChartDataContext.Provider>
  );
}

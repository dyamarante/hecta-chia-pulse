
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
  { month: 'Jan', wholesaleUSDt: 2200, retailUSDkg: 13.4 },
  { month: 'Fev', wholesaleUSDt: 2250, retailUSDkg: 14.0 },
  { month: 'Mar', wholesaleUSDt: 2300, retailUSDkg: 14.5 },
  { month: 'Abr', wholesaleUSDt: 2350, retailUSDkg: 15.0 },
  { month: 'Mai', wholesaleUSDt: 2400, retailUSDkg: 15.5 },
  { month: 'Jun', wholesaleUSDt: 2480, retailUSDkg: 16.0 },
  { month: 'Jul', wholesaleUSDt: 2520, retailUSDkg: 16.5 },
  { month: 'Ago', wholesaleUSDt: 2580, retailUSDkg: 17.0 },
  { month: 'Set', wholesaleUSDt: 2640, retailUSDkg: 17.5 },
  { month: 'Out', wholesaleUSDt: 2700, retailUSDkg: 18.0 },
  { month: 'Nov', wholesaleUSDt: 2750, retailUSDkg: 19.0 },
  { month: 'Dez', wholesaleUSDt: 2780, retailUSDkg: 20.0 },
];

// Mock data para CIF por destino - valores realistas
const mockCifDataNY: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2400, retailUSDkg: 13.5 },
  { month: 'Fev', wholesaleUSDt: 2450, retailUSDkg: 14.2 },
  { month: 'Mar', wholesaleUSDt: 2500, retailUSDkg: 14.8 },
  { month: 'Abr', wholesaleUSDt: 2560, retailUSDkg: 15.3 },
  { month: 'Mai', wholesaleUSDt: 2600, retailUSDkg: 15.9 },
  { month: 'Jun', wholesaleUSDt: 2650, retailUSDkg: 16.4 },
  { month: 'Jul', wholesaleUSDt: 2700, retailUSDkg: 17.0 },
  { month: 'Ago', wholesaleUSDt: 2750, retailUSDkg: 17.5 },
  { month: 'Set', wholesaleUSDt: 2800, retailUSDkg: 18.0 },
  { month: 'Out', wholesaleUSDt: 2850, retailUSDkg: 18.5 },
  { month: 'Nov', wholesaleUSDt: 2900, retailUSDkg: 19.5 },
  { month: 'Dez', wholesaleUSDt: 2950, retailUSDkg: 20.1 },
];

const mockCifDataRotterdam: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2410, retailUSDkg: 13.6 },
  { month: 'Fev', wholesaleUSDt: 2460, retailUSDkg: 14.3 },
  { month: 'Mar', wholesaleUSDt: 2510, retailUSDkg: 14.9 },
  { month: 'Abr', wholesaleUSDt: 2570, retailUSDkg: 15.4 },
  { month: 'Mai', wholesaleUSDt: 2610, retailUSDkg: 16.0 },
  { month: 'Jun', wholesaleUSDt: 2660, retailUSDkg: 16.5 },
  { month: 'Jul', wholesaleUSDt: 2710, retailUSDkg: 17.1 },
  { month: 'Ago', wholesaleUSDt: 2760, retailUSDkg: 17.6 },
  { month: 'Set', wholesaleUSDt: 2810, retailUSDkg: 18.1 },
  { month: 'Out', wholesaleUSDt: 2860, retailUSDkg: 18.6 },
  { month: 'Nov', wholesaleUSDt: 2910, retailUSDkg: 19.6 },
  { month: 'Dez', wholesaleUSDt: 2960, retailUSDkg: 20.2 },
];

const mockCifDataQingdao: ChartDataPoint[] = [
  { month: 'Jan', wholesaleUSDt: 2450, retailUSDkg: 4.3 },
  { month: 'Fev', wholesaleUSDt: 2500, retailUSDkg: 4.5 },
  { month: 'Mar', wholesaleUSDt: 2550, retailUSDkg: 4.7 },
  { month: 'Abr', wholesaleUSDt: 2600, retailUSDkg: 4.9 },
  { month: 'Mai', wholesaleUSDt: 2650, retailUSDkg: 5.1 },
  { month: 'Jun', wholesaleUSDt: 2700, retailUSDkg: 5.3 },
  { month: 'Jul', wholesaleUSDt: 2750, retailUSDkg: 5.5 },
  { month: 'Ago', wholesaleUSDt: 2800, retailUSDkg: 5.7 },
  { month: 'Set', wholesaleUSDt: 2850, retailUSDkg: 5.9 },
  { month: 'Out', wholesaleUSDt: 2900, retailUSDkg: 6.1 },
  { month: 'Nov', wholesaleUSDt: 2950, retailUSDkg: 6.2 },
  { month: 'Dez', wholesaleUSDt: 3000, retailUSDkg: 6.2 },
];

// Mock data para spread e margem - valores realistas baseados na diferença CIF-FOB
const mockSpreadData: SpreadMarginPoint[] = [
  { month: 'Jan', logistica: 160, margem: 40, percentual: 1.8 },
  { month: 'Fev', logistica: 160, margem: 40, percentual: 1.8 },
  { month: 'Mar', logistica: 160, margem: 40, percentual: 1.7 },
  { month: 'Abr', logistica: 160, margem: 50, percentual: 2.1 },
  { month: 'Mai', logistica: 160, margem: 40, percentual: 1.7 },
  { month: 'Jun', logistica: 160, margem: 40, percentual: 1.6 },
  { month: 'Jul', logistica: 160, margem: 20, percentual: 0.8 },
  { month: 'Ago', logistica: 160, margem: 10, percentual: 0.4 },
  { month: 'Set', logistica: 160, margem: 0, percentual: 0.0 },
  { month: 'Out', logistica: 160, margem: -10, percentual: -0.4 },
  { month: 'Nov', logistica: 160, margem: -10, percentual: -0.4 },
  { month: 'Dez', logistica: 160, margem: 10, percentual: 0.4 },
];

// Mock data para volume - baseado nas informações fornecidas (46k tons para 2023-2024, 90k para 2025-2026)
const mockVolumeData2023: VolumeDataPoint[] = [
  { month: 'Jan', volume: 3500, year: 2023 },
  { month: 'Fev', volume: 3800, year: 2023 },
  { month: 'Mar', volume: 3700, year: 2023 },
  { month: 'Abr', volume: 3900, year: 2023 },
  { month: 'Mai', volume: 4000, year: 2023 },
  { month: 'Jun', volume: 3800, year: 2023 },
  { month: 'Jul', volume: 3700, year: 2023 },
  { month: 'Ago', volume: 3600, year: 2023 },
  { month: 'Set', volume: 3700, year: 2023 },
  { month: 'Out', volume: 4000, year: 2023 },
  { month: 'Nov', volume: 4100, year: 2023 },
  { month: 'Dez', volume: 4200, year: 2023 },
];

const mockVolumeData2024: VolumeDataPoint[] = [
  { month: 'Jan', volume: 4300, year: 2024 },
  { month: 'Fev', volume: 4400, year: 2024 },
  { month: 'Mar', volume: 4500, year: 2024 },
  { month: 'Abr', volume: 4600, year: 2024 },
  { month: 'Mai', volume: 4700, year: 2024 },
  { month: 'Jun', volume: 4800, year: 2024 },
  { month: 'Jul', volume: 4900, year: 2024 },
  { month: 'Ago', volume: 5000, year: 2024 },
  { month: 'Set', volume: 5100, year: 2024 },
  { month: 'Out', volume: 5200, year: 2024 },
  { month: 'Nov', volume: 5300, year: 2024 },
  { month: 'Dez', volume: 5400, year: 2024 },
];

const mockVolumeData2025: VolumeDataPoint[] = [
  { month: 'Jan', volume: 6000, year: 2025 },
  { month: 'Fev', volume: 6500, year: 2025 },
  { month: 'Mar', volume: 7000, year: 2025 },
  { month: 'Abr', volume: 7500, year: 2025 },
  { month: 'Mai', volume: 8000, year: 2025 },
  { month: 'Jun', volume: 8300, year: 2025 },
  { month: 'Jul', volume: 8600, year: 2025 },
  { month: 'Ago', volume: 8900, year: 2025 },
  { month: 'Set', volume: 9200, year: 2025 },
  { month: 'Out', volume: 9500, year: 2025 },
  { month: 'Nov', volume: 9800, year: 2025 },
  { month: 'Dez', volume: 10000, year: 2025 },
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


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

// Mock data para FOB
const mockFobData: ChartDataPoint[] = [
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

// Mock data para CIF por destino
const mockCifDataNY: ChartDataPoint[] = [
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

const mockCifDataRotterdam: ChartDataPoint[] = [
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

const mockCifDataQingdao: ChartDataPoint[] = [
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

// Mock data para spread e margem
const mockSpreadData: SpreadMarginPoint[] = [
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

// Mock data para volume
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

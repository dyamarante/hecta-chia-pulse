
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { PriceData, ExchangeRate, DataSource } from '@/types/currency';
import { 
  fetchCurrencyFreaksRates, 
  fetchPTAXRate, 
  shouldUsePTAX, 
  calculatePercentChange 
} from '@/services/exchangeRateService';

// Valores padrão para fallback
const DEFAULT_RATES = {
  BRL: 5.08,
  CNY: 6.47,
  AED: 3.67,
  EUR: 0.92,
};

export const useExchangeRates = (basePriceUSD: number) => {
  // Estado para armazenar dados de preço
  const [priceData, setPriceData] = useState<PriceData[]>([
    { asset: 'Chia', price: basePriceUSD, currency: 'USD/t', change: 0 },
    { asset: 'Chia', price: basePriceUSD * DEFAULT_RATES.BRL, currency: 'BRL/t', change: 0 },
  ]);

  // Estado para armazenar as taxas de câmbio atuais
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { from: 'USD', to: 'BRL', rate: DEFAULT_RATES.BRL, change: 0 },
    { from: 'USD', to: 'CNY', rate: DEFAULT_RATES.CNY, change: 0 },
    { from: 'USD', to: 'AED', rate: DEFAULT_RATES.AED, change: 0 },
    { from: 'USD', to: 'EUR', rate: DEFAULT_RATES.EUR, change: 0 },
  ]);
  
  // Estado para armazenar as taxas da última atualização
  const [lastFetchedRates, setLastFetchedRates] = useState<Record<string, number>>(DEFAULT_RATES);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>('FALLBACK');

  // Função para buscar taxas de câmbio
  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      
      // Buscar dados da API CurrencyFreaks
      const data = await fetchCurrencyFreaksRates();
      
      if (!data.rates) {
        throw new Error('Dados de taxa de câmbio inválidos');
      }
      
      // Converter as taxas de string para número
      let brlRate = data.rates.BRL ? parseFloat(data.rates.BRL) : DEFAULT_RATES.BRL;
      let brlSource: 'API' | 'PTAX' = 'API';
      
      // Verificar se deve usar PTAX para BRL
      if (shouldUsePTAX()) {
        const ptaxRate = await fetchPTAXRate();
        
        if (ptaxRate) {
          brlRate = ptaxRate;
          brlSource = 'PTAX';
        }
      }
      
      // Calculando as novas taxas
      const newRates = {
        BRL: brlRate,
        CNY: data.rates.CNY ? parseFloat(data.rates.CNY) : DEFAULT_RATES.CNY,
        AED: data.rates.AED ? parseFloat(data.rates.AED) : DEFAULT_RATES.AED,
        EUR: data.rates.EUR ? parseFloat(data.rates.EUR) : DEFAULT_RATES.EUR,
      };
      
      // Calcular variação percentual para cada taxa
      const newExchangeRates: ExchangeRate[] = [
        { 
          from: 'USD', 
          to: 'BRL', 
          rate: newRates.BRL, 
          change: calculatePercentChange(lastFetchedRates.BRL, newRates.BRL) 
        },
        { 
          from: 'USD', 
          to: 'CNY', 
          rate: newRates.CNY, 
          change: calculatePercentChange(lastFetchedRates.CNY, newRates.CNY) 
        },
        { 
          from: 'USD', 
          to: 'AED', 
          rate: newRates.AED, 
          change: calculatePercentChange(lastFetchedRates.AED, newRates.AED) 
        },
        { 
          from: 'USD', 
          to: 'EUR', 
          rate: newRates.EUR, 
          change: calculatePercentChange(lastFetchedRates.EUR, newRates.EUR) 
        }
      ];
      
      // Atualizar preços da Chia com base nas novas taxas
      const newPriceData: PriceData[] = [
        { 
          asset: 'Chia', 
          price: basePriceUSD, 
          currency: 'USD/t', 
          change: 0 // O preço base não muda
        },
        { 
          asset: 'Chia', 
          price: basePriceUSD * newRates.BRL, 
          currency: 'BRL/t', 
          change: calculatePercentChange(basePriceUSD * lastFetchedRates.BRL, basePriceUSD * newRates.BRL) 
        }
      ];
      
      // Atualizar estados
      setExchangeRates(newExchangeRates);
      setPriceData(newPriceData);
      setLastFetchedRates(newRates);
      setDataSource(brlSource);
      setError(null);
      
      // Notificar usuário sobre a fonte da taxa BRL
      if (brlSource === 'PTAX') {
        toast.info('Taxa BRL atualizada via PTAX', {
          description: `${new Date().toLocaleString('pt-BR')}`
        });
      } else {
        toast.info('Taxas de câmbio atualizadas via CurrencyFreaks', {
          description: `${new Date().toLocaleString('pt-BR')}`
        });
      }
    } catch (err) {
      console.error('Erro ao buscar taxas de câmbio:', err);
      setError('Falha ao carregar dados de câmbio');
      setDataSource('FALLBACK');
      
      toast.error('Erro ao atualizar taxas de câmbio', {
        description: 'Usando dados de fallback'
      });
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar taxas de câmbio iniciais e periodicamente
  useEffect(() => {
    // Buscar dados iniciais
    fetchExchangeRates();
    
    // Atualizar a cada 10 minutos (600000ms)
    const interval = setInterval(fetchExchangeRates, 600000);
    
    return () => clearInterval(interval);
  }, []);

  // Efeito para simular pequenas flutuações nos preços entre atualizações reais
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      // Simular pequenas flutuações apenas no valor visual (rate), sem afetar o change real
      setPriceData(prevData => 
        prevData.map(item => ({
          ...item,
          price: +(item.price * (1 + (Math.random() * 0.0005 - 0.00025))).toFixed(2),
          // Não modificamos o 'change' pois isso é baseado em dados reais
        }))
      );
      
      setExchangeRates(prevRates => 
        prevRates.map(rate => ({
          ...rate,
          rate: +(rate.rate * (1 + (Math.random() * 0.0002 - 0.0001))).toFixed(4),
          // Não modificamos o 'change' pois isso é baseado em dados reais
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loading]);

  return {
    priceData,
    exchangeRates,
    loading,
    error,
    dataSource,
    // Concatenar os dados para o ticker
    tickerContent: [...priceData, ...exchangeRates, ...priceData, ...exchangeRates]
  };
};

import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface PriceData {
  asset: string;
  price: number;
  currency: string;
  change: number;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
}

// Updated interface for CurrencyFreaks API response
interface CurrencyFreaksResponse {
  base: string;
  date: string;
  rates: {
    BRL?: string;
    CNY?: string;
    AED?: string;
    EUR?: string;
  };
}

interface PTAXResponse {
  value?: Array<{
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
  }>;
}

const PriceTicker = () => {
  // Preço base da Chia em USD
  const basePriceUSD = 285.72;
  
  const [priceData, setPriceData] = useState<PriceData[]>([
    { asset: 'Chia', price: basePriceUSD, currency: 'USD/t', change: 0 },
    { asset: 'Chia', price: basePriceUSD * 5.08, currency: 'BRL/t', change: 0 },
  ]);

  // Estado para armazenar as taxas de câmbio atuais
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { from: 'USD', to: 'BRL', rate: 5.08, change: 0 },
    { from: 'USD', to: 'CNY', rate: 6.47, change: 0 },
    { from: 'USD', to: 'AED', rate: 3.67, change: 0 },
    { from: 'USD', to: 'EUR', rate: 0.92, change: 0 },
  ]);
  
  // Estado para armazenar as taxas da última atualização para calcular a variação
  const [lastFetchedRates, setLastFetchedRates] = useState<Record<string, number>>({
    BRL: 5.08,
    CNY: 6.47,
    AED: 3.67,
    EUR: 0.92,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'API' | 'PTAX' | 'FALLBACK'>('FALLBACK');

  // Função para buscar taxas de câmbio
  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      
      // Utilizando CurrencyFreaks API com a chave fornecida
      const response = await fetch(
        'https://api.currencyfreaks.com/latest?apikey=583477b244014fca8bf97efe5b39b3c8&symbols=BRL,CNY,AED,EUR'
      );
      
      if (!response.ok) {
        throw new Error('Falha ao obter taxas de câmbio');
      }
      
      const data: CurrencyFreaksResponse = await response.json();
      
      if (!data.rates) {
        throw new Error('Dados de taxa de câmbio inválidos');
      }
      
      // Verificar se precisamos do fallback PTAX para BRL (após 15h BRT)
      const nowBRT = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      const hour = new Date(nowBRT).getHours();
      
      // Converter as taxas de string para número
      let brlRate = data.rates.BRL ? parseFloat(data.rates.BRL) : 5.08;
      let brlSource: 'API' | 'PTAX' = 'API';
      
      if (hour >= 15) {
        try {
          // Formatar a data no formato esperado pela API PTAX (MM-DD-YYYY)
          const today = new Date();
          const ptaxDate = today.toISOString().split('T')[0];
          
          const ptaxResponse = await fetch(
            `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@d)?@d='${ptaxDate}'&$top=1&$format=json`
          );
          
          if (ptaxResponse.ok) {
            const ptaxData: PTAXResponse = await ptaxResponse.json();
            if (ptaxData.value && ptaxData.value.length > 0) {
              brlRate = ptaxData.value[0].cotacaoCompra;
              brlSource = 'PTAX';
            }
          }
        } catch (ptaxError) {
          console.error('Erro ao obter taxa PTAX, usando taxa da API CurrencyFreaks:', ptaxError);
        }
      }
      
      // Calculando variações com base na última atualização
      const newRates = {
        BRL: brlRate,
        CNY: data.rates.CNY ? parseFloat(data.rates.CNY) : 6.47,
        AED: data.rates.AED ? parseFloat(data.rates.AED) : 3.67,
        EUR: data.rates.EUR ? parseFloat(data.rates.EUR) : 0.92,
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
  
  // Função para calcular a variação percentual
  const calculatePercentChange = (oldValue: number, newValue: number): number => {
    if (!oldValue || oldValue === 0) return 0;
    return +((newValue / oldValue - 1) * 100).toFixed(2);
  };

  useEffect(() => {
    // Buscar dados iniciais
    fetchExchangeRates();
    
    // Atualizar a cada 10 minutos (600000ms)
    const interval = setInterval(fetchExchangeRates, 600000);
    
    return () => clearInterval(interval);
  }, []);

  // Continuar a mostrar pequenas variações nos preços a cada 5 segundos
  // para manter a animação do ticker entre as atualizações reais
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

  // Criar conteúdo duplicado do ticker para animação contínua
  const tickerContent = [...priceData, ...exchangeRates, ...priceData, ...exchangeRates];

  if (error) {
    return (
      <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap bg-red-50">
        <div className="text-center text-red-500">
          {error} - Usando dados simulados.
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap">
      <div className="ticker-wrapper inline-block whitespace-nowrap animate-ticker">
        {loading && lastFetchedRates.BRL === 5.08 ? (
          <div className="ticker-item inline-block px-3 text-gray-500">
            Carregando taxas de câmbio em tempo real...
          </div>
        ) : (
          tickerContent.map((item, index) => (
            <div key={index} className="ticker-item inline-block px-3">
              {'asset' in item ? (
                <span>
                  <strong>{item.asset}:</strong>{' '}
                  {item.price.toFixed(2)} {item.currency}{' '}
                  <span className={item.change >= 0 ? 'text-hecta-gold' : 'text-red-500'}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </span>
              ) : (
                <span>
                  <strong>{item.from}/{item.to}:</strong>{' '}
                  {item.rate.toFixed(2)}{' '}
                  <span className={item.change >= 0 ? 'text-hecta-gold' : 'text-red-500'}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                    {item.to === 'BRL' && dataSource === 'PTAX' && ' (PTAX)'}
                  </span>
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PriceTicker;

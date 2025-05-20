
import React, { useEffect, useState } from 'react';

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

interface ExchangeRateResponse {
  rates: {
    BRL: number;
    CNY: number;
    AED: number;
    EUR: number;
  };
  date: string;
}

const PriceTicker = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([
    { asset: 'Chia', price: 285.72, currency: 'USD/t', change: 2.3 },
    { asset: 'Chia', price: 1450.65, currency: 'BRL/t', change: 1.8 },
  ]);

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { from: 'USD', to: 'BRL', rate: 5.08, change: 0.2 },
    { from: 'USD', to: 'CNY', rate: 6.47, change: -0.1 },
    { from: 'USD', to: 'AED', rate: 3.67, change: 0 },
    { from: 'USD', to: 'EUR', rate: 0.92, change: 0.3 },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=BRL,CNY,AED,EUR');
        
        if (!response.ok) {
          throw new Error('Falha ao obter taxas de câmbio');
        }
        
        const data: ExchangeRateResponse = await response.json();
        
        // Verificar se precisamos do fallback PTAX para BRL (após 15h BRT)
        const nowBRT = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        const hour = new Date(nowBRT).getHours();
        
        let brlRate = data.rates.BRL;
        
        if (hour >= 15) {
          try {
            const currentDate = new Date().toISOString().split('T')[0];
            const ptaxResponse = await fetch(
              `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@d)?@d='${currentDate}'&$top=1&$format=json`
            );
            
            if (ptaxResponse.ok) {
              const ptaxData = await ptaxResponse.json();
              if (ptaxData.value && ptaxData.value.length > 0) {
                brlRate = ptaxData.value[0].cotacaoCompra;
              }
            }
          } catch (ptaxError) {
            console.error('Erro ao obter taxa PTAX, usando taxa padrão:', ptaxError);
          }
        }
        
        // Atualizar taxas de câmbio com dados reais
        const newExchangeRates: ExchangeRate[] = [
          { from: 'USD', to: 'BRL', rate: brlRate, change: 0 },
          { from: 'USD', to: 'CNY', rate: data.rates.CNY, change: 0 },
          { from: 'USD', to: 'AED', rate: data.rates.AED, change: 0 },
          { from: 'USD', to: 'EUR', rate: data.rates.EUR, change: 0 }
        ];
        
        // Atualizar preços da Chia com base nas novas taxas
        const newPriceData: PriceData[] = [
          { asset: 'Chia', price: 285.72, currency: 'USD/t', change: 2.3 },
          { asset: 'Chia', price: 285.72 * brlRate, currency: 'BRL/t', change: 1.8 }
        ];
        
        setExchangeRates(newExchangeRates);
        setPriceData(newPriceData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar taxas de câmbio:', err);
        setError('Falha ao carregar dados de câmbio');
      } finally {
        setLoading(false);
      }
    };

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
      setPriceData(prevData => 
        prevData.map(item => ({
          ...item,
          price: +(item.price * (1 + (Math.random() * 0.0005 - 0.00025))).toFixed(2),
        }))
      );
      
      setExchangeRates(prevRates => 
        prevRates.map(rate => ({
          ...rate,
          rate: +(rate.rate * (1 + (Math.random() * 0.0002 - 0.0001))).toFixed(4),
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
        {loading ? (
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
                  <span className={item.change >= 0 ? 'text-green-300' : 'text-red-300'}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </span>
              ) : (
                <span>
                  <strong>{item.from}/{item.to}:</strong>{' '}
                  {item.rate.toFixed(2)}{' '}
                  <span className={item.change >= 0 ? 'text-green-300' : 'text-red-300'}>
                    {item.change > 0 ? '+' : ''}{item.change}%
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

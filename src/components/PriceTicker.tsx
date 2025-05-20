
import React from 'react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import PriceTickerItem from '@/components/PriceTickerItem';
import TickerError from '@/components/TickerError';

const PriceTicker = () => {
  // Preço base da Chia em USD
  const basePriceUSD = 285.72;
  
  // Usa o hook customizado para gerenciar os dados
  const { 
    priceData, 
    exchangeRates, 
    loading, 
    error, 
    dataSource, 
    tickerContent 
  } = useExchangeRates(basePriceUSD);
  
  if (error) {
    return <TickerError message={error} />;
  }

  return (
    <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap">
      <div className="ticker-wrapper inline-block whitespace-nowrap animate-ticker">
        {loading && exchangeRates[0].rate === 5.08 ? (
          <div className="ticker-item inline-block px-3 text-gray-500">
            Carregando taxas de câmbio em tempo real...
          </div>
        ) : (
          tickerContent.map((item, index) => (
            <PriceTickerItem key={index} item={item} dataSource={dataSource} />
          ))
        )}
      </div>
    </div>
  );
};

export default PriceTicker;

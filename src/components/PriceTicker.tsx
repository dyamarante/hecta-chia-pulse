
import React from 'react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import PriceTickerItem from '@/components/PriceTickerItem';
import TickerError from '@/components/TickerError';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap flex items-center">
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
      <div className="ml-auto mr-2 flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center text-xs text-white/80">
              <Info size={14} className="mr-1" />
              Atualizado a cada 12h
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Valores atualizados a cada 12 horas</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceTicker;

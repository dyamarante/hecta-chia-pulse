
import React from 'react';
import { PriceData, ExchangeRate } from '@/types/currency';

interface TickerItemProps {
  item: PriceData | ExchangeRate;
  dataSource: 'API' | 'PTAX' | 'FALLBACK';
}

const PriceTickerItem = ({ item, dataSource }: TickerItemProps) => {
  // Verifica se o item é um PriceData ou ExchangeRate usando type guard
  const isPriceData = (data: PriceData | ExchangeRate): data is PriceData => 
    'asset' in data;

  return (
    <div className="ticker-item inline-block px-3">
      {isPriceData(item) ? (
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
  );
};

export default PriceTickerItem;

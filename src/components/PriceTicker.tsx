
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

const PriceTicker = () => {
  // Mock data - in production this would come from an API
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

  // In a real app, this would fetch data from an API
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price changes for the ticker animation
      setPriceData(prevData => 
        prevData.map(item => ({
          ...item,
          price: +(item.price * (1 + (Math.random() * 0.002 - 0.001))).toFixed(2),
          change: +(item.change + (Math.random() * 0.1 - 0.05)).toFixed(1)
        }))
      );
      
      setExchangeRates(prevRates => 
        prevRates.map(rate => ({
          ...rate,
          rate: +(rate.rate * (1 + (Math.random() * 0.002 - 0.001))).toFixed(2),
          change: +(rate.change + (Math.random() * 0.1 - 0.05)).toFixed(1)
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Create duplicate ticker content for seamless animation
  const tickerContent = [...priceData, ...exchangeRates, ...priceData, ...exchangeRates];

  return (
    <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap">
      <div className="ticker-wrapper inline-block whitespace-nowrap animate-ticker">
        {tickerContent.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;

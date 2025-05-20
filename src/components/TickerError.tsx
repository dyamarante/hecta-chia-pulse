
import React from 'react';

interface TickerErrorProps {
  message: string;
}

const TickerError = ({ message }: TickerErrorProps) => {
  return (
    <div className="ticker-container py-1 text-sm overflow-hidden whitespace-nowrap bg-red-50">
      <div className="text-center text-red-500">
        {message} - Usando dados simulados.
      </div>
    </div>
  );
};

export default TickerError;

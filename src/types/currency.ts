
export interface PriceData {
  asset: string;
  price: number;
  currency: string;
  change: number;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
}

// Interface para resposta da API CurrencyFreaks
export interface CurrencyFreaksResponse {
  base: string;
  date: string;
  rates: {
    BRL?: string;
    CNY?: string;
    AED?: string;
    EUR?: string;
  };
}

// Interface para resposta da API PTAX
export interface PTAXResponse {
  value?: Array<{
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
  }>;
}

export type DataSource = 'API' | 'PTAX' | 'FALLBACK';

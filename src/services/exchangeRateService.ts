
import { CurrencyFreaksResponse, PTAXResponse } from '@/types/currency';

// Chave API para CurrencyFreaks
const API_KEY = '583477b244014fca8bf97efe5b39b3c8';

// Busca taxas de câmbio da API CurrencyFreaks
export const fetchCurrencyFreaksRates = async (): Promise<CurrencyFreaksResponse> => {
  const response = await fetch(
    `https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=BRL,CNY,AED,EUR`
  );
  
  if (!response.ok) {
    throw new Error('Falha ao obter taxas de câmbio');
  }
  
  return await response.json();
};

// Busca taxa PTAX para BRL do Banco Central
export const fetchPTAXRate = async (): Promise<number | null> => {
  // Formatar a data no formato esperado pela API PTAX (MM-DD-YYYY)
  const today = new Date();
  const ptaxDate = today.toISOString().split('T')[0];
  
  try {
    const response = await fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@d)?@d='${ptaxDate}'&$top=1&$format=json`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data: PTAXResponse = await response.json();
    
    if (data.value && data.value.length > 0) {
      return data.value[0].cotacaoCompra;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao obter taxa PTAX:', error);
    return null;
  }
};

// Verifica se deve usar PTAX para BRL (após 15h BRT)
export const shouldUsePTAX = (): boolean => {
  const nowBRT = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const hour = new Date(nowBRT).getHours();
  return hour >= 15;
};

// Calcula a variação percentual entre dois valores
export const calculatePercentChange = (oldValue: number, newValue: number): number => {
  if (!oldValue || oldValue === 0) return 0;
  return +((newValue / oldValue - 1) * 100).toFixed(2);
};

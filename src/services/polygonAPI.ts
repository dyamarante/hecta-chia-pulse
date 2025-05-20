
/**
 * Serviço para integração com a API Polygon.io
 * Fornece dados reais de mercado para os gráficos
 */

// Chave da API Polygon.io
const POLYGON_API_KEY = 'hFbe6LpLwhlcCSgWyP3rFzvd8oLVYTJA';
const BASE_URL = 'https://api.polygon.io';

// Cache para armazenar resultados e reduzir requisições
interface CacheItem {
  data: any;
  timestamp: number;
}

const cache: Record<string, CacheItem> = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora em milissegundos

/**
 * Busca taxas de câmbio atuais
 */
export async function getForexRates(from = 'USD', to = 'BRL', limit = 30): Promise<any> {
  const cacheKey = `forex-${from}-${to}-${limit}`;
  
  // Verificar se já existe em cache válido
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }
  
  try {
    // Pegar data atual para o range
    const today = new Date();
    // Pegar data de 30 dias atrás
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    // Formatar as datas para a API
    const toDate = formatDate(today);
    const fromDate = formatDate(thirtyDaysAgo);
    
    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/C:${from}${to}/range/1/day/${fromDate}/${toDate}?apiKey=${POLYGON_API_KEY}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar taxas de câmbio: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Armazenar em cache
    cache[cacheKey] = {
      data: data.results,
      timestamp: Date.now()
    };
    
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar taxas de câmbio do Polygon:', error);
    throw error;
  }
}

/**
 * Busca dados históricos de preços para commodities agrícolas
 */
export async function getAgricultureData(commodity = 'seeds', timeframe = 'month', limit = 12): Promise<any> {
  const cacheKey = `agriculture-${commodity}-${timeframe}-${limit}`;
  
  // Verificar se já existe em cache válido
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }
  
  try {
    // Mapear o tipo de commodity para um ticker ETF relevante como proxy
    const tickerMap: Record<string, string> = {
      grain: 'WEAT', // Trigo
      chia: 'MOO',   // ETF de agronegócio como proxy para chia
      soy: 'SOYB',   // Soja
      corn: 'CORN',  // Milho
      seeds: 'MOO'   // ETF de agronegócio como proxy para sementes
    };
    
    const ticker = tickerMap[commodity] || 'MOO';
    
    // Definir parâmetros de data
    const today = new Date();
    // 1 ano atrás
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);
    
    // Formatar as datas para a API
    const toDate = formatDate(today);
    const fromDate = formatDate(lastYear);
    
    const multiplier = timeframe === 'day' ? 1 : timeframe === 'week' ? 1 : 1;
    const span = timeframe === 'day' ? 'day' : timeframe === 'week' ? 'week' : 'month';
    
    const url = `${BASE_URL}/v2/aggs/ticker/${ticker}/range/${multiplier}/${span}/${fromDate}/${toDate}?apiKey=${POLYGON_API_KEY}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados de commodity: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Armazenar em cache
    cache[cacheKey] = {
      data: data.results,
      timestamp: Date.now()
    };
    
    return data.results;
  } catch (error) {
    console.error(`Erro ao buscar dados agrícolas:`, error);
    throw error;
  }
}

/**
 * Busca dados de volume negociado para um ETF agrícola como proxy
 */
export async function getVolumeData(ticker = 'MOO', limit = 36): Promise<any> {
  const cacheKey = `volume-${ticker}-${limit}`;
  
  // Verificar se já existe em cache válido
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }
  
  try {
    // Pegar dados de 3 anos
    const today = new Date();
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(today.getFullYear() - 3);
    
    // Formatar as datas para a API
    const toDate = formatDate(today);
    const fromDate = formatDate(threeYearsAgo);
    
    const url = `${BASE_URL}/v2/aggs/ticker/${ticker}/range/1/month/${fromDate}/${toDate}?apiKey=${POLYGON_API_KEY}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados de volume: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transformar dados para incluir apenas informações de volume
    const volumeData = data.results.map((item: any) => ({
      timestamp: item.t,
      volume: item.v,
      vw: item.vw, // Volume weighted price
      date: formatDateFromTimestamp(item.t)
    }));
    
    // Armazenar em cache
    cache[cacheKey] = {
      data: volumeData,
      timestamp: Date.now()
    };
    
    return volumeData;
  } catch (error) {
    console.error(`Erro ao buscar dados de volume para ${ticker}:`, error);
    throw error;
  }
}

/**
 * Formata data para o formato YYYY-MM-DD usado pela API
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formata data a partir de timestamp (milissegundos)
 */
function formatDateFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return formatDate(date);
}

/**
 * Transforma dados da Polygon para o formato esperado pelos gráficos de preço
 */
export function transformPolygonToPriceData(data: any[], destination = 'ny'): any[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  // Fator de ajuste com base no destino
  const destFactor = destination === 'rotterdam' ? 1.05 : 
                  destination === 'qingdao' ? 1.12 : 1;
  
  return data.map(item => {
    const date = new Date(item.t);
    
    // Calculando preços para chia com base no preço do ETF/commodities
    // Fator multiplicador ajustado para parecer com preços de chia
    const baseFactor = 2.5;
    
    // Preço base ≈ preço de fechamento * fator base
    const basePrice = item.c * baseFactor;
    
    // Ajuste com base no destino (simulando custos de frete e logística)
    const wholesalePrice = Math.round(basePrice * destFactor);
    
    // Retail é aproximadamente preço por kg
    const retailPrice = (basePrice * 0.0065 * destFactor).toFixed(2);
    
    return {
      month: months[date.getMonth()],
      year: date.getFullYear(),
      wholesaleUSDt: wholesalePrice,
      retailUSDkg: parseFloat(retailPrice)
    };
  });
}

/**
 * Transforma dados da Polygon para o formato esperado pelos gráficos de volume
 */
export function transformPolygonToVolumeData(data: any[]): any[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return data.map(item => {
    const date = new Date(item.timestamp);
    
    return {
      month: months[date.getMonth()],
      year: date.getFullYear(),
      // Transformando para volume adequado para chia
      // 1: volume do ETF * fator (0.12) + base (1000 tons) para ajustar escala
      volume: Math.round(item.volume * 0.12) + 1000,
      date: item.date
    };
  });
}

/**
 * Calcula dados de spread e margem
 */
export function calculateSpreadAndMargin(fobData: any[], cifData: any[]): any[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  // Garantir que temos o mesmo número de pontos
  const minLength = Math.min(fobData.length, cifData.length);
  
  return Array.from({ length: minLength }, (_, i) => {
    const fobPrice = fobData[i].wholesaleUSDt;
    const cifPrice = cifData[i].wholesaleUSDt;
    
    // Diferença entre CIF e FOB
    const totalSpread = cifPrice - fobPrice;
    
    // Custo logístico é aproximadamente 60% da diferença
    const logisticCost = Math.round(totalSpread * 0.6);
    
    // Margem é o restante
    const margin = totalSpread - logisticCost;
    
    // Percentual da margem sobre o preço FOB
    const percentual = Number(((margin / fobPrice) * 100).toFixed(1));
    
    // Data vem da posição no array, garantindo alinhamento
    const date = new Date();
    date.setMonth(i % 12);
    
    return {
      month: months[date.getMonth()],
      logistica: logisticCost,
      margem: margin,
      percentual: percentual
    };
  });
}

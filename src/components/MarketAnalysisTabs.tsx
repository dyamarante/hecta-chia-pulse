
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FOBPriceChart from './charts/FOBPriceChart';
import CIFPriceChart from './charts/CIFPriceChart';
import SpreadMarginChart from './charts/SpreadMarginChart';
import VolumeExportChart from './charts/VolumeExportChart';
import { ChartDataProvider } from '@/contexts/ChartDataContext';

const MarketAnalysisTabs = () => {
  const { t, i18n } = useTranslation(['home']);
  
  return (
    <ChartDataProvider>
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-hecta-gray">
            {i18n.language === 'pt' && 'Análise de Mercado em Tempo Real'}
            {i18n.language === 'en' && 'Real-Time Market Analysis'}
            {i18n.language === 'zh' && '实时市场分析'}
            {i18n.language === 'ar' && 'تحليل السوق في الوقت الحقيقي'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fob" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              <TabsTrigger value="fob">
                {i18n.language === 'pt' && 'Preço FOB'}
                {i18n.language === 'en' && 'FOB Price'}
                {i18n.language === 'zh' && '离岸价格'}
                {i18n.language === 'ar' && 'سعر فوب'}
              </TabsTrigger>
              <TabsTrigger value="cif">
                {i18n.language === 'pt' && 'Preço CIF'}
                {i18n.language === 'en' && 'CIF Price'}
                {i18n.language === 'zh' && '到岸价格'}
                {i18n.language === 'ar' && 'سعر سيف'}
              </TabsTrigger>
              <TabsTrigger value="spread">
                {i18n.language === 'pt' && 'Spread & Margem'}
                {i18n.language === 'en' && 'Spread & Margin'}
                {i18n.language === 'zh' && '价差和利润率'}
                {i18n.language === 'ar' && 'الفارق والهامش'}
              </TabsTrigger>
              <TabsTrigger value="volume">
                {i18n.language === 'pt' && 'Volume Exportado'}
                {i18n.language === 'en' && 'Export Volume'}
                {i18n.language === 'zh' && '出口量'}
                {i18n.language === 'ar' && 'حجم التصدير'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="fob">
              <FOBPriceChart />
            </TabsContent>
            
            <TabsContent value="cif">
              <CIFPriceChart />
            </TabsContent>
            
            <TabsContent value="spread">
              <SpreadMarginChart />
            </TabsContent>
            
            <TabsContent value="volume">
              <VolumeExportChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ChartDataProvider>
  );
};

export default MarketAnalysisTabs;

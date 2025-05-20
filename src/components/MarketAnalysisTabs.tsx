
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FOBPriceChart from './charts/FOBPriceChart';
import CIFPriceChart from './charts/CIFPriceChart';
import SpreadMarginChart from './charts/SpreadMarginChart';
import VolumeExportChart from './charts/VolumeExportChart';

const MarketAnalysisTabs = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-hecta-gray">
          Análise de Mercado em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fob" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="fob">Preço FOB</TabsTrigger>
            <TabsTrigger value="cif">Preço CIF</TabsTrigger>
            <TabsTrigger value="spread">Spread & Margem</TabsTrigger>
            <TabsTrigger value="volume">Volume Exportado</TabsTrigger>
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
  );
};

export default MarketAnalysisTabs;

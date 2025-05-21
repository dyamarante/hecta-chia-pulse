
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, ShieldCheck } from 'lucide-react';

interface CertificateDownloadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
}

const CertificateDownloadDialog: React.FC<CertificateDownloadDialogProps> = ({
  isOpen,
  onOpenChange,
  onDownload
}) => {
  const [selectedMarket, setSelectedMarket] = React.useState("");
  const { t, i18n } = useTranslation(['certifications']);

  const markets = [
    { 
      value: "eua", 
      label: i18n.language === 'pt' ? "EUA" :
             i18n.language === 'en' ? "USA" :
             i18n.language === 'zh' ? "美国" :
             "الولايات المتحدة"
    },
    { 
      value: "ue", 
      label: i18n.language === 'pt' ? "União Europeia" :
             i18n.language === 'en' ? "European Union" :
             i18n.language === 'zh' ? "欧盟" :
             "الاتحاد الأوروبي"
    },
    { 
      value: "asia", 
      label: i18n.language === 'pt' ? "Ásia" :
             i18n.language === 'en' ? "Asia" :
             i18n.language === 'zh' ? "亚洲" :
             "آسيا"
    },
    { 
      value: "orientemedio", 
      label: i18n.language === 'pt' ? "Oriente Médio" :
             i18n.language === 'en' ? "Middle East" :
             i18n.language === 'zh' ? "中东" :
             "الشرق الأوسط"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('download_certificates_title')}</DialogTitle>
          <DialogDescription>
            {t('select_market_description')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="market" className="text-sm font-medium">
              {t('market')}
            </label>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger>
                <SelectValue placeholder={t('select_market')} />
              </SelectTrigger>
              <SelectContent>
                {markets.map((market) => (
                  <SelectItem key={market.value} value={market.value}>
                    {market.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedMarket && (
            <Tabs defaultValue="organic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="organic">{t('organic')}</TabsTrigger>
                <TabsTrigger value="safety">{t('food_safety')}</TabsTrigger>
                <TabsTrigger value="esg">{t('esg')}</TabsTrigger>
              </TabsList>
              <TabsContent value="organic" className="space-y-2">
                <div className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span>USDA Organic Certificate.pdf</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={onDownload}>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('download')}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="safety" className="space-y-2">
                <div className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>BRCGS Food Safety Report.pdf</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={onDownload}>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('download')}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="esg" className="space-y-2">
                <div className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-amber-600" />
                    </div>
                    <span>SMETA 4-Pillar Summary.pdf</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={onDownload}>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('download')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDownloadDialog;

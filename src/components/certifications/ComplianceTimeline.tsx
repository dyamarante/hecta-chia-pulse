
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimelineEvent {
  year: number;
  event: string;
}

const ComplianceTimeline: React.FC = () => {
  const { t, i18n } = useTranslation(['certifications']);

  const getLocalizedEvent = (key: string): string => {
    switch(key) {
      case 'usda_organic':
        return i18n.language === 'zh' ? 'USDA有机认证' : t('usda_organic');
      case 'eu_organic_cor':
        return i18n.language === 'zh' ? '欧盟有机认证 + COR' : 'EU Organic + COR';
      case 'brcgs_upgrade':
        return i18n.language === 'zh' ? 'BRCGS A → 2023年升级至AA+' : 'BRCGS A → upgrade AA+ in 2023';
      case 'kosher_ou':
        return i18n.language === 'zh' ? '犹太洁食OU' : 'Kosher OU';
      case 'halal_smeta':
        return i18n.language === 'zh' ? '清真GCC + SMETA 4P' : 'Halal GCC + SMETA 4P';
      case 'non_gmo':
        return i18n.language === 'zh' ? '非转基因项目验证' : 'Non-GMO Project Verified';
      default:
        return key;
    }
  };

  const timelineEvents: TimelineEvent[] = [
    { year: 2018, event: getLocalizedEvent('usda_organic') },
    { year: 2019, event: getLocalizedEvent('eu_organic_cor') },
    { year: 2020, event: getLocalizedEvent('brcgs_upgrade') },
    { year: 2021, event: getLocalizedEvent('kosher_ou') },
    { year: 2022, event: getLocalizedEvent('halal_smeta') },
    { year: 2023, event: getLocalizedEvent('non_gmo') },
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
        {t('compliance_timeline')}
      </h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="inline-flex gap-8 pb-8 px-4">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center min-w-[200px] relative"
            >
              <div className="bg-hecta-gold text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">
                {event.year}
              </div>
              <div className="text-center">
                <p className="font-medium text-hecta-gray">{event.event}</p>
              </div>
              {index < timelineEvents.length - 1 && (
                <div className="absolute top-8 left-1/2 w-[calc(100%+2rem)] h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComplianceTimeline;

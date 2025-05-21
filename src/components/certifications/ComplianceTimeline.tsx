
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimelineEvent {
  year: number;
  event: string;
}

const ComplianceTimeline: React.FC = () => {
  const { t, i18n } = useTranslation(['certifications']);

  const timelineEvents: TimelineEvent[] = [
    { 
      year: 2018, 
      event: i18n.language === 'pt' ? 'USDA Organic' :
             i18n.language === 'en' ? 'USDA Organic' :
             i18n.language === 'zh' ? 'USDA有机认证' :
             'USDA العضوي'
    },
    { 
      year: 2019, 
      event: i18n.language === 'pt' ? 'EU Organic + COR' :
             i18n.language === 'en' ? 'EU Organic + COR' :
             i18n.language === 'zh' ? '欧盟有机认证 + COR' :
             'الاتحاد الأوروبي العضوي + COR'
    },
    { 
      year: 2020, 
      event: i18n.language === 'pt' ? 'BRCGS A → upgrade AA+ em 2023' :
             i18n.language === 'en' ? 'BRCGS A → upgraded to AA+ in 2023' :
             i18n.language === 'zh' ? 'BRCGS A → 2023年升级至AA+' :
             'BRCGS A → تمت الترقية إلى AA+ في 2023'
    },
    { 
      year: 2021, 
      event: i18n.language === 'pt' ? 'Kosher OU' :
             i18n.language === 'en' ? 'Kosher OU' :
             i18n.language === 'zh' ? '犹太洁食OU' :
             'كوشر OU'
    },
    { 
      year: 2022, 
      event: i18n.language === 'pt' ? 'Halal GCC + SMETA 4P' :
             i18n.language === 'en' ? 'Halal GCC + SMETA 4P' :
             i18n.language === 'zh' ? '清真GCC + SMETA 4P' :
             'حلال GCC + SMETA 4P'
    },
    { 
      year: 2023, 
      event: i18n.language === 'pt' ? 'Non-GMO Project Verified' :
             i18n.language === 'en' ? 'Non-GMO Project Verified' :
             i18n.language === 'zh' ? '非转基因项目验证' :
             'مشروع خالٍ من المواد المعدلة وراثيًا تم التحقق منه'
    },
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

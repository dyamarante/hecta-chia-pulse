
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimelineEvent {
  year: string;
  event: string;
}

const ComplianceTimeline: React.FC = () => {
  const { t } = useTranslation(['certifications']);

  const timelineEvents: TimelineEvent[] = [
    { year: t('2018'), event: t('usda_organic') },
    { year: t('2019'), event: t('eu_organic_cor') },
    { year: t('2020'), event: t('brcgs_upgrade') },
    { year: t('2021'), event: t('kosher_ou') },
    { year: t('2022'), event: t('halal_smeta') },
    { year: t('2023'), event: t('non_gmo') }
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

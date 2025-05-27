
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCertificationContext } from '@/contexts/CertificationContext';

const ComplianceTimeline: React.FC = () => {
  const { translations } = useCertificationContext();

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
        {translations.compliance_timeline}
      </h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="inline-flex gap-8 pb-8 px-4">
          {translations.timeline.map((event, index) => (
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
              {index < translations.timeline.length - 1 && (
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


import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

const FaqSection: React.FC = () => {
  const { t } = useTranslation(['certifications']);

  // Using translation keys instead of hardcoded text with language conditionals
  const faqKeys: FaqItem[] = [
    {
      questionKey: 'faq.certificate_dates.question',
      answerKey: 'faq.certificate_dates.answer'
    },
    {
      questionKey: 'faq.usda_seal.question',
      answerKey: 'faq.usda_seal.answer'
    },
    {
      questionKey: 'faq.second_party_audits.question',
      answerKey: 'faq.second_party_audits.answer'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
        {t('faq')}
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqKeys.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {t(faq.questionKey)}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{t(faq.answerKey)}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;

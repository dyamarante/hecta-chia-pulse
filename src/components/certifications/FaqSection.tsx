
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const { t, i18n } = useTranslation(['certifications']);

  const faqs: FaqItem[] = [
    {
      question: i18n.language === 'pt' ? "Por que alguns certificados não mostram a data de inspeção deste ano?" :
                i18n.language === 'en' ? "Why don't some certificates show this year's inspection date?" :
                i18n.language === 'zh' ? "为什么某些证书没有显示今年的检查日期？" :
                "لماذا لا تظهر بعض الشهادات تاريخ التفتيش لهذا العام؟",
      answer: i18n.language === 'pt' ? "Publicamos apenas versões que não expõem dados sensíveis; a validade legal está no blockchain." :
             i18n.language === 'en' ? "We publish only versions that do not expose sensitive data; legal validity is on the blockchain." :
             i18n.language === 'zh' ? "我们仅发布不暴露敏感数据的版本；法律有效性在区块链上。" :
             "نحن ننشر فقط الإصدارات التي لا تكشف البيانات الحساسة؛ الصلاحية القانونية موجودة على البلوكشين."
    },
    {
      question: i18n.language === 'pt' ? "Posso usar o selo USDA na embalagem da minha marca?" :
                i18n.language === 'en' ? "Can I use the USDA seal on my brand's packaging?" :
                i18n.language === 'zh' ? "我可以在我的品牌包装上使用USDA标志吗？" :
                "هل يمكنني استخدام ختم USDA على عبوة علامتي التجارية؟",
      answer: i18n.language === 'pt' ? "Sim, desde que não modifique o status orgânico do produto em sua planta e cite nosso certificado NOP." :
             i18n.language === 'en' ? "Yes, as long as you do not modify the organic status of the product in your facility and cite our NOP certificate." :
             i18n.language === 'zh' ? "是的，只要您不在工厂中更改产品的有机状态，并引用我们的NOP证书。" :
             "نعم، طالما أنك لا تعدل الحالة العضوية للمنتج في منشأتك وتشير إلى شهادة NOP الخاصة بنا."
    },
    {
      question: i18n.language === 'pt' ? "A Hecta oferece suporte para auditorias de segunda parte?" :
                i18n.language === 'en' ? "Does Hecta provide support for second-party audits?" :
                i18n.language === 'zh' ? "Hecta是否为第二方审核提供支持？" :
                "هل توفر Hecta الدعم لعمليات تدقيق الطرف الثاني؟",
      answer: i18n.language === 'pt' ? "Disponibilizamos salas virtuais e acesso a relatórios; auditor presencial pode ser agendado em até 30 dias." :
             i18n.language === 'en' ? "We provide virtual rooms and access to reports; an in-person auditor can be scheduled within 30 days." :
             i18n.language === 'zh' ? "我们提供虚拟会议室和报告访问权限；现场审核员可在30天内安排。" :
             "نوفر غرفًا افتراضية وإمكانية الوصول إلى التقارير؛ يمكن جدولة مدقق شخصي في غضون 30 يومًا."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
        {t('faq')}
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileText, QrCode, Calendar, Clock, ShieldCheck } from 'lucide-react';

const Certificacoes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['certifications']);

  const certifications = [
    {
      id: 'usda',
      name: t('usda_organic'),
      scope: t('nop_regulation'),
      benefits: [
        t('no_synthetic_pesticides'),
        t('required_for_organic_label')
      ],
      validity: i18n.language === 'pt' ? 'Auditor externo anual. Certificado vigente até dez/2025.' :
               i18n.language === 'en' ? 'Annual external auditor. Certificate valid until Dec/2025.' :
               i18n.language === 'zh' ? '年度外部审核员。证书有效期至2025年12月。' :
               'المدقق الخارجي السنوي. الشهادة صالحة حتى ديسمبر/2025.',
      auditor: 'AMS',
      image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
    },
    {
      id: 'eu',
      name: t('eu_organic'),
      scope: t('eu_regulation'),
      benefits: [
        t('preferential_eu_entry'),
        t('eligibility_for_organic_claims')
      ],
      validity: i18n.language === 'pt' ? 'Certificador ECOCERT — validade jun/2025' :
               i18n.language === 'en' ? 'ECOCERT certifier — valid until Jun/2025' :
               i18n.language === 'zh' ? 'ECOCERT认证机构 — 有效期至2025年6月' :
               'مصدق ECOCERT — صالح حتى يونيو/2025',
      auditor: 'ECOCERT',
      image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
    },
    {
      id: 'cor',
      name: t('cor_canada'),
      scope: t('canadian_organic_regime'),
      benefits: [
        t('complies_bilateral_equivalence'),
        t('access_health_bulk_retailers')
      ],
      validity: i18n.language === 'pt' ? 'Certificado #COR-21-247, válido fev/2026' :
               i18n.language === 'en' ? 'Certificate #COR-21-247, valid until Feb/2026' :
               i18n.language === 'zh' ? '证书 #COR-21-247，有效期至2026年2月' :
               'شهادة #COR-21-247، صالحة حتى فبراير/2026',
      auditor: 'COR',
      image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
    },
    {
      id: 'jas',
      name: t('jas_organic'),
      scope: t('japan_compulsory'),
      benefits: [
        i18n.language === 'pt' ? 'Isenção de inspeção fitossanitária adicional' :
        i18n.language === 'en' ? 'Exemption from additional phytosanitary inspection' :
        i18n.language === 'zh' ? '免除额外植物检疫检查' :
        'إعفاء من التفتيش الصحي النباتي الإضافي',
        
        i18n.language === 'pt' ? 'Uso do logotipo JAS nas embalagens' :
        i18n.language === 'en' ? 'Use of JAS logo on packaging' :
        i18n.language === 'zh' ? '包装上可使用JAS标志' :
        'استخدام شعار JAS على العبوات'
      ],
      validity: i18n.language === 'pt' ? 'Auditor MAFF-acreditado — validade mar/2026' :
               i18n.language === 'en' ? 'MAFF-accredited auditor — valid until Mar/2026' :
               i18n.language === 'zh' ? 'MAFF认可的审核员 — 有效期至2026年3月' :
               'مدقق معتمد من MAFF — صالح حتى مارس/2026',
      auditor: 'MAFF',
      image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
    },
    {
      id: 'brcgs',
      name: t('brcgs_food_safety'),
      scope: t('gfsi_global'),
      benefits: [
        i18n.language === 'pt' ? 'Grau máximo de segurança alimentar' :
        i18n.language === 'en' ? 'Maximum degree of food safety' :
        i18n.language === 'zh' ? '最高级别的食品安全' :
        'أقصى درجة من سلامة الغذاء',
        
        i18n.language === 'pt' ? 'Reduz necessidade de segunda-parte sobre auditorias' :
        i18n.language === 'en' ? 'Reduces need for second-party audits' :
        i18n.language === 'zh' ? '减少对第二方审核的需求' :
        'يقلل من الحاجة إلى عمليات تدقيق الطرف الثاني'
      ],
      validity: i18n.language === 'pt' ? 'Emitido por SGS — resultado AA+ (auditoria surpresa).' :
               i18n.language === 'en' ? 'Issued by SGS — AA+ result (surprise audit).' :
               i18n.language === 'zh' ? 'SGS颁发 — AA+结果（突击审核）' :
               'صادرة عن SGS — نتيجة AA+ (تدقيق مفاجئ).',
      auditor: 'Complete Food Safety Ltd',
      image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
    },
    {
      id: 'fda',
      name: 'FDA FCE/Bio-T',
      scope: t('fda_registration'),
      benefits: [
        i18n.language === 'pt' ? 'Conformidade FSMA para importadores EUA' :
        i18n.language === 'en' ? 'FSMA compliance for US importers' :
        i18n.language === 'zh' ? '符合美国进口商FSMA要求' :
        'امتثال FSMA للمستوردين الأمريكيين'
      ],
      validity: i18n.language === 'pt' ? 'FFR #18521423952 renovado 2024/2026' :
               i18n.language === 'en' ? 'FFR #18521423952 renewed 2024/2026' :
               i18n.language === 'zh' ? 'FFR #18521423952 已续期 2024/2026' :
               'تم تجديد FFR #18521423952 2024/2026',
      auditor: 'FDA',
      image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
    },
    {
      id: 'kosher',
      name: 'Kosher (OU)',
      scope: i18n.language === 'pt' ? 'Pareve — aceito em 100+ países' :
             i18n.language === 'en' ? 'Pareve — accepted in 100+ countries' :
             i18n.language === 'zh' ? 'Pareve — 在100多个国家被接受' :
             'باريف — مقبول في أكثر من 100 دولة',
      benefits: [
        i18n.language === 'pt' ? 'Amplia alcance a consumidores com dieta kosher, veganos e vegetarianos' :
        i18n.language === 'en' ? 'Extends reach to consumers with kosher diets, vegans and vegetarians' :
        i18n.language === 'zh' ? '扩大对遵循犹太洁食、纯素食和素食者的覆盖范围' :
        'يوسع الوصول إلى المستهلكين الذين يتبعون نظام كوشر الغذائي، والنباتيين',
        
        i18n.language === 'pt' ? 'Requisito para muitas redes de varejo dos EUA' :
        i18n.language === 'en' ? 'Requirement for many US retail chains' :
        i18n.language === 'zh' ? '许多美国零售连锁店的要求' :
        'متطلب للعديد من سلاسل البيع بالتجزئة في الولايات المتحدة'
      ],
      validity: i18n.language === 'pt' ? 'Rabbi audit trimestral' :
               i18n.language === 'en' ? 'Quarterly Rabbi audit' :
               i18n.language === 'zh' ? '季度拉比审核' :
               'تدقيق ربعي من الحاخام',
      auditor: 'OU Kosher Certification',
      image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
    },
    {
      id: 'halal',
      name: 'Halal GCC',
      scope: i18n.language === 'pt' ? 'GSO 2055-1 – Emirados, Arábia Saudita & MENA' :
             i18n.language === 'en' ? 'GSO 2055-1 – Emirates, Saudi Arabia & MENA' :
             i18n.language === 'zh' ? 'GSO 2055-1 – 阿联酋、沙特阿拉伯和中东北非' :
             'GSO 2055-1 – الإمارات، المملكة العربية السعودية ومنطقة الشرق الأوسط وشمال أفريقيا',
      benefits: [
        i18n.language === 'pt' ? 'Porta de entrada para 420 mi consumidores muçulmanos' :
        i18n.language === 'en' ? 'Gateway to 420 million Muslim consumers' :
        i18n.language === 'zh' ? '通向4.2亿穆斯林消费者的门户' :
        'بوابة إلى 420 مليون مستهلك مسلم',
        
        i18n.language === 'pt' ? 'Selo de pureza e transparência' :
        i18n.language === 'en' ? 'Seal of purity and transparency' :
        i18n.language === 'zh' ? '纯度和透明度的标志' :
        'ختم النقاء والشفافية'
      ],
      validity: i18n.language === 'pt' ? 'Certifier: AHF (validade out/2025)' :
               i18n.language === 'en' ? 'Certifier: AHF (valid until Oct/2025)' :
               i18n.language === 'zh' ? '认证方: AHF (有效期至2025年10月)' :
               'المصدق: AHF (صالح حتى أكتوبر/2025)',
      auditor: 'American Halal Foundation',
      image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
    },
    {
      id: 'nongmo',
      name: 'Non-GMO Project Verified',
      scope: i18n.language === 'pt' ? 'USA & Canadá' :
             i18n.language === 'en' ? 'USA & Canada' :
             i18n.language === 'zh' ? '美国和加拿大' :
             'الولايات المتحدة وكندا',
      benefits: [
        i18n.language === 'pt' ? 'Garantia third-party de ausência de OGM' :
        i18n.language === 'en' ? 'Third-party guarantee of absence of GMOs' :
        i18n.language === 'zh' ? '第三方保证不含转基因成分' :
        'ضمان من طرف ثالث لغياب الكائنات المعدلة وراثياً',
        
        i18n.language === 'pt' ? 'Alta aceitação em lojas "natural/wholefood"' :
        i18n.language === 'en' ? 'High acceptance in "natural/wholefood" stores' :
        i18n.language === 'zh' ? '在"天然/全食品"商店中高度认可' :
        'قبول عالي في متاجر "الطبيعية/الأغذية الكاملة"'
      ],
      validity: i18n.language === 'pt' ? 'ID #NGPV-021-CHI-2024 (renov. anual)' :
               i18n.language === 'en' ? 'ID #NGPV-021-CHI-2024 (annual renewal)' :
               i18n.language === 'zh' ? 'ID #NGPV-021-CHI-2024 (年度更新)' :
               'معرف #NGPV-021-CHI-2024 (تجديد سنوي)',
      auditor: 'nongmoproject.org',
      image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
    },
    {
      id: 'smeta',
      name: 'SMETA 4-Pillar',
      scope: i18n.language === 'pt' ? 'Trabalho, Saúde & Segurança, Meio Ambiente, Ética' :
             i18n.language === 'en' ? 'Labor, Health & Safety, Environment, Ethics' :
             i18n.language === 'zh' ? '劳工、健康与安全、环境、道德' :
             'العمل، الصحة والسلامة، البيئة، الأخلاقيات',
      benefits: [
        i18n.language === 'pt' ? 'Prova de responsabilidade social corporativa' :
        i18n.language === 'en' ? 'Proof of corporate social responsibility' :
        i18n.language === 'zh' ? '企业社会责任的证明' :
        'دليل على المسؤولية الاجتماعية للشركات',
        
        i18n.language === 'pt' ? 'Aceito por grandes varejistas globais' :
        i18n.language === 'en' ? 'Accepted by major global retailers' :
        i18n.language === 'zh' ? '受到全球主要零售商的认可' :
        'مقبول من قبل كبار تجار التجزئة العالميين'
      ],
      validity: i18n.language === 'pt' ? 'Auditor NSF-Sedex; renovado jan/2025' :
               i18n.language === 'en' ? 'Auditor NSF-Sedex; renewed Jan/2025' :
               i18n.language === 'zh' ? '审核员 NSF-Sedex; 2025年1月更新' :
               'المدقق NSF-Sedex؛ تم التجديد يناير/2025',
      auditor: 'Sedex',
      image: '/lovable-uploads/0bb62fb2-d29a-4a46-922c-7f83c8aae5dc.png'
    },
    {
      id: 'gluten',
      name: i18n.language === 'pt' ? 'Non-GMO / Gluten-Free (Interno)' :
            i18n.language === 'en' ? 'Non-GMO / Gluten-Free (Internal)' :
            i18n.language === 'zh' ? '非转基因 / 无麸质（内部）' :
            'خالي من المواد المعدلة وراثيًا / خالي من الغلوتين (داخلي)',
      scope: i18n.language === 'pt' ? 'Lotes controlados' :
             i18n.language === 'en' ? 'Controlled batches' :
             i18n.language === 'zh' ? '受控批次' :
             'دفعات مراقبة',
      benefits: [
        i18n.language === 'pt' ? 'Análises ELISA <10 ppm (glúten)' :
        i18n.language === 'en' ? 'ELISA analyses <10 ppm (gluten)' :
        i18n.language === 'zh' ? 'ELISA分析 <10 ppm（麸质）' :
        'تحليلات ELISA <10 جزء في المليون (غلوتين)',
        
        i18n.language === 'pt' ? 'Relatórios no blockchain Hecta' :
        i18n.language === 'en' ? 'Reports on Hecta blockchain' :
        i18n.language === 'zh' ? 'Hecta区块链上的报告' :
        'تقارير على بلوكتشين Hecta'
      ],
      validity: i18n.language === 'pt' ? 'Batch-based; disponível por QR' :
               i18n.language === 'en' ? 'Batch-based; available via QR' :
               i18n.language === 'zh' ? '基于批次；通过二维码可获取' :
               'على أساس الدفعة؛ متاح عبر رمز QR',
      auditor: i18n.language === 'pt' ? 'Interno' :
              i18n.language === 'en' ? 'Internal' :
              i18n.language === 'zh' ? '内部' :
              'داخلي',
      image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
    }
  ];

  const timelineEvents = [
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

  const faqs = [
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

  const handleRedirectToContact = () => {
    navigate('/contato');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-hecta-gold/10 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hecta-gray mb-6">
            {t('trust_across_borders')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            {t('certifications_description')}
          </p>
          <Button 
            onClick={handleRedirectToContact}
            className="bg-hecta-gold hover:bg-hecta-gold/90 text-white px-6 py-3 text-lg"
          >
            <FileText className="mr-2" />
            {t('download_certificates')}
          </Button>
        </div>
      </section>
      
      {/* Certificates Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            {t('certification_matrix')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 bg-white h-24 flex items-center justify-center border-b">
                  <img 
                    src={cert.image} 
                    alt={`${cert.name} logo`} 
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-2 bg-hecta-green/10 border-hecta-green/30 text-hecta-gray w-fit">
                    {cert.scope}
                  </Badge>
                  <CardTitle>{cert.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 font-semibold mb-2">{t('key_benefits')}</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {cert.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-500">
                    <p><span className="font-medium">{t('validity')}</span> {cert.validity}</p>
                    <p><span className="font-medium">{t('auditor')}</span> {cert.auditor}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-hecta-gold text-hecta-gold hover:bg-hecta-gold/10"
                    onClick={handleRedirectToContact}
                  >
                    {t('view_certificate')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blockchain Verification */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-hecta-gray mb-6">
                {t('digital_verification')}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('digital_verification_description')}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <FileText />, text: t('certificate_pdf') },
                  { icon: <QrCode />, text: t('lab_results') },
                  { icon: <Clock />, text: t('blockchain_timestamp') }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-hecta-gold">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="bg-hecta-green hover:bg-hecta-green/90 text-white"
                onClick={handleRedirectToContact}
              >
                <QrCode className="mr-2" />
                {t('qr_demo')}
              </Button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-white border rounded-lg overflow-hidden shadow-lg p-8 max-w-md w-full">
                <div className="border-4 border-dashed border-gray-200 p-6 flex justify-center items-center mb-6">
                  <QrCode size={180} className="text-hecta-gray" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">{t('batch')}</span>
                    <span className="font-medium">HCT-BR-2024-05781</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">{t('harvest')}</span>
                    <span className="font-medium">
                      {i18n.language === 'pt' ? t('may_2024') :
                       i18n.language === 'en' ? t('may_2024') :
                       i18n.language === 'zh' ? t('may_2024') :
                       t('may_2024')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">{t('blockchain_hash')}</span>
                    <span className="font-medium text-xs">0x7fE5...93c1</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">{t('verified')}</span>
                    <Badge className="bg-green-500">{t('authentic')}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 bg-gray-50">
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
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
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
      </section>
      
      {/* Certificate Download Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    <Button size="sm" variant="ghost" onClick={handleRedirectToContact}>
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
                    <Button size="sm" variant="ghost" onClick={handleRedirectToContact}>
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
                    <Button size="sm" variant="ghost" onClick={handleRedirectToContact}>
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
    </div>
  );
};

export default Certificacoes;

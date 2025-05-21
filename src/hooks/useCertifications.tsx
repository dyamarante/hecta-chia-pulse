
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface Certification {
  id: string;
  name: string;
  scope: string;
  benefits: string[];
  validity: string;
  auditor: string;
  image: string;
}

export const useCertifications = () => {
  const { i18n } = useTranslation(['certifications']);
  
  const certifications: Certification[] = [
    {
      id: 'usda',
      name: 'USDA Organic',
      scope: i18n.language === 'pt' ? 'Regulamento NOP (7 CFR Part 205) — EUA' :
             i18n.language === 'en' ? 'NOP Regulation (7 CFR Part 205) — USA' :
             i18n.language === 'zh' ? 'NOP法规 (7 CFR Part 205) — 美国' :
             'لائحة NOP (7 CFR Part 205) — الولايات المتحدة',
      benefits: [
        i18n.language === 'pt' ? 'Sem pesticidas sintéticos' :
        i18n.language === 'en' ? 'No synthetic pesticides' :
        i18n.language === 'zh' ? '无合成农药' :
        'لا مبيدات اصطناعية',
        
        i18n.language === 'pt' ? 'Necessário para uso do selo "Orgânico" em rótulos dos EUA' :
        i18n.language === 'en' ? 'Required for use of "Organic" seal on US labels' :
        i18n.language === 'zh' ? '美国产品标签使用"有机"字样的必要条件' :
        'مطلوب لاستخدام ختم "العضوي" على الملصقات الأمريكية'
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
      name: i18n.language === 'pt' ? 'União Europeia Orgânico' :
            i18n.language === 'en' ? 'EU Organic' :
            i18n.language === 'zh' ? '欧盟有机' :
            'الاتحاد الأوروبي العضوي',
      scope: i18n.language === 'pt' ? 'Regulamento (UE) 2018/848 — União Europeia' :
             i18n.language === 'en' ? 'Regulation (EU) 2018/848 — European Union' :
             i18n.language === 'zh' ? '欧盟法规 (EU) 2018/848 — 欧盟' :
             'لائحة (EU) 2018/848 — الاتحاد الأوروبي',
      benefits: [
        i18n.language === 'pt' ? 'Entrada preferencial na UE' :
        i18n.language === 'en' ? 'Preferential entry into the EU' :
        i18n.language === 'zh' ? '欧盟优先入境' :
        'دخول تفضيلي إلى الاتحاد الأوروبي',
        
        i18n.language === 'pt' ? 'Elegibilidade para alegações de "Produto orgânico"' :
        i18n.language === 'en' ? 'Eligibility for "Organic product" claims' :
        i18n.language === 'zh' ? '符合"有机产品"声明资格' :
        'الأهلية لوضع علامات "منتج عضوي"'
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
      name: i18n.language === 'pt' ? 'COR Canadá' :
            i18n.language === 'en' ? 'COR Canada' :
            i18n.language === 'zh' ? 'COR加拿大' :
            'COR كندا',
      scope: i18n.language === 'pt' ? 'Regime Orgânico Canadense — Canadá' :
             i18n.language === 'en' ? 'Canadian Organic Regime — Canada' :
             i18n.language === 'zh' ? '加拿大有机制度 — 加拿大' :
             'النظام العضوي الكندي — كندا',
      benefits: [
        i18n.language === 'pt' ? 'Cumpre com equivalência bilateral NOP↔COR' :
        i18n.language === 'en' ? 'Complies with bilateral equivalence NOP↔COR' :
        i18n.language === 'zh' ? '符合NOP↔COR双边等效要求' :
        'يتوافق مع المعادلة الثنائية بين NOP وCOR',
        
        i18n.language === 'pt' ? 'Acesso a varejistas de "Saúde & Granel"' :
        i18n.language === 'en' ? 'Access to "Health & Bulk" retailers' :
        i18n.language === 'zh' ? '可进入"健康与散装"零售商' :
        'الوصول إلى تجار التجزئة "الصحة والكميات الكبيرة"'
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
      name: i18n.language === 'pt' ? 'JAS Orgânico (MAFF)' :
            i18n.language === 'en' ? 'JAS Organic (MAFF)' :
            i18n.language === 'zh' ? 'JAS有机认证 (MAFF)' :
            'JAS العضوي (MAFF)',
      scope: i18n.language === 'pt' ? 'Obrigatório para "orgânico" no Japão' :
             i18n.language === 'en' ? 'Compulsory for "organic" in Japan' :
             i18n.language === 'zh' ? '在日本标注"有机"的强制性要求' :
             'إلزامي لـ "العضوي" في اليابان',
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
      name: i18n.language === 'pt' ? 'BRCGS Segurança Alimentar AA+' :
            i18n.language === 'en' ? 'BRCGS Food Safety AA+' :
            i18n.language === 'zh' ? 'BRCGS食品安全AA+' :
            'BRCGS سلامة الغذاء AA+',
      scope: i18n.language === 'pt' ? 'GFSI global (auditoria não anunciada)' :
             i18n.language === 'en' ? 'GFSI global (unannounced audit)' :
             i18n.language === 'zh' ? 'GFSI全球认证（无预警审核）' :
             'GFSI العالمي (تدقيق غير معلن)',
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
      scope: i18n.language === 'pt' ? 'Registro de Instalação Alimentar & Alimentos Acidificados' :
             i18n.language === 'en' ? 'Food Facility Registration & Acidified Foods' :
             i18n.language === 'zh' ? '食品设施注册与酸化食品' :
             'تسجيل منشأة الأغذية والأغذية المحمضة',
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

  return { certifications };
};
